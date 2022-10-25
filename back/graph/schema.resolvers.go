package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/Pamplemouss/elpis/back/configs"
	"github.com/Pamplemouss/elpis/back/graph/generated"
	"github.com/Pamplemouss/elpis/back/graph/model"
)

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	todo, err := db.CreateTodo(&input)
	return todo, err
}

// CreateCategory is the resolver for the createCategory field.
func (r *mutationResolver) CreateCategory(ctx context.Context, input model.NewCategory) (*model.Category, error) {
	panic(fmt.Errorf("not implemented: CreateCategory - createCategory"))
}

// Todos is the resolver for the todos field.
func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	todos, err := db.GetTodos()
	return todos, err
}

// Categories is the resolver for the categories field.
func (r *queryResolver) Categories(ctx context.Context) ([]*model.Category, error) {
	panic(fmt.Errorf("not implemented: Categories - categories"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
var (
	db = configs.ConnectDB()
)
