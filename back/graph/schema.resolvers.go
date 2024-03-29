package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/Pamplemouss/elpis/back/graph/generated"
	"github.com/Pamplemouss/elpis/back/graph/model"
)

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	return r.db.CreateTodo(&input)
}

// CreateCategory is the resolver for the createCategory field.
func (r *mutationResolver) CreateCategory(ctx context.Context, input model.NewCategory) (*model.Category, error) {
	return r.db.CreateCategory(&input)
}

// EditTodo is the resolver for the editTodo field.
func (r *mutationResolver) EditTodo(ctx context.Context, input model.EditTodo) (*model.Todo, error) {
	return r.db.EditTodo(&input)
}

// EditCategory is the resolver for the editCategory field.
func (r *mutationResolver) EditCategory(ctx context.Context, input model.EditCategory) (*model.Category, error) {
	return r.db.EditCategory(&input)
}

// DeleteTodo is the resolver for the deleteTodo field.
func (r *mutationResolver) DeleteTodo(ctx context.Context, input string) (bool, error) {
	return r.db.DeleteTodo(&input)
}

// DeleteCategory is the resolver for the deleteCategory field.
func (r *mutationResolver) DeleteCategory(ctx context.Context, input string) (bool, error) {
	return r.db.DeleteCategory(&input)
}

// ToggleCheck is the resolver for the toggleCheck field.
func (r *mutationResolver) ToggleCheck(ctx context.Context, input model.ToggleCheck) (*model.Todo, error) {
	return r.db.ToggleCheck(&input)
}

// Todos is the resolver for the todos field.
func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	return r.db.GetTodos()
}

// Category is the resolver for the category field.
func (r *queryResolver) Category(ctx context.Context, id string) (*model.Category, error) {
	return r.db.GetCategoryById(id)
}

// Categories is the resolver for the categories field.
func (r *queryResolver) Categories(ctx context.Context) ([]*model.Category, error) {
	return r.db.GetCategories()
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
