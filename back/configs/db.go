package configs

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Pamplemouss/elpis/back/graph/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DB struct {
	client *mongo.Client
}

func ConnectDB() *DB {
	client, err := mongo.NewClient(options.Client().ApplyURI(EnvMongoURI()))
	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	//ping the database
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")
	return &DB{client: client}
}

func colHelper(db *DB, collectionName string) *mongo.Collection {
	return db.client.Database("Elpis").Collection(collectionName)
}

func (db *DB) CreateTodo(input *model.NewTodo) (*model.Todo, error) {
	collection := colHelper(db, "todos")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	fmt.Printf("%+v\n", input)
	res, err := collection.InsertOne(ctx, input)

	if err != nil {
		return nil, err
	}

	todo := &model.Todo{
		ID:         res.InsertedID.(primitive.ObjectID).Hex(),
		Name:       input.Name,
		StartDate:  input.StartDate,
		Repeatable: input.Repeatable,
	}

	return todo, err
}

func (db *DB) GetTodos() ([]*model.Todo, error) {
	collection := colHelper(db, "todos")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var todos []*model.Todo
	defer cancel()

	res, err := collection.Find(ctx, bson.M{})

	if err != nil {
		return nil, err
	}

	defer res.Close(ctx)
	for res.Next(ctx) {
		var singleTodo *model.Todo
		if err = res.Decode(&singleTodo); err != nil {
			log.Fatal(err)
		}
		todos = append(todos, singleTodo)
	}

	return todos, err
}
