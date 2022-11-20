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

	res, err := collection.InsertOne(ctx, input)
	if err != nil {
		return nil, err
	}

	category, err := db.GetCategoryById(input.CategoryID)
	if err != nil {
		return nil, err
	}

	todo := &model.Todo{
		ID:         res.InsertedID.(primitive.ObjectID).Hex(),
		Name:       input.Name,
		StartDate:  input.StartDate,
		Category:   category,
		Repeatable: input.Repeatable,
		Repeat:     (*model.Repeat)(input.Repeat),
	}

	return todo, err
}

func (db *DB) CreateCategory(input *model.NewCategory) (*model.Category, error) {
	collection := colHelper(db, "categories")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	res, err := collection.InsertOne(ctx, input)

	if err != nil {
		return nil, err
	}

	category := &model.Category{
		ID:     res.InsertedID.(primitive.ObjectID).Hex(),
		Name:   input.Name,
		FaCode: input.FaCode,
		Color:  input.Color,
	}

	return category, err
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

		singleTodo.Category, err = db.GetCategoryById(res.Current.Lookup("category_id").StringValue())
		if err != nil {
			return nil, err
		}

		if singleTodo.Checked == nil {
			singleTodo.Checked = make([]*time.Time, 0)
		}

		todos = append(todos, singleTodo)
	}

	return todos, err
}

func (db *DB) GetCategories() ([]*model.Category, error) {
	collection := colHelper(db, "categories")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var categories []*model.Category
	defer cancel()

	res, err := collection.Find(ctx, bson.M{})

	if err != nil {
		return nil, err
	}

	defer res.Close(ctx)
	for res.Next(ctx) {
		var singleCategory *model.Category
		if err = res.Decode(&singleCategory); err != nil {
			log.Fatal(err)
		}
		categories = append(categories, singleCategory)
	}

	return categories, err
}

func (db *DB) GetCategoryById(id string) (*model.Category, error) {
	ObjectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Fatal(err)
	}

	categoriesColl := colHelper(db, "categories")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	res := categoriesColl.FindOne(ctx, bson.M{"_id": ObjectID})
	category := model.Category{ID: id}

	res.Decode(&category)

	return &category, err
}
