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

// EditTodoName is the resolver for the editTodoName field.
func (r *mutationResolver) EditTodoName(ctx context.Context, input model.EditTodoName) (*model.Todo, error) {
	return r.db.EditTodoName(&input)
}

// EditTodoCategory is the resolver for the editTodoCategory field.
func (r *mutationResolver) EditTodoCategory(ctx context.Context, input model.EditTodoCategory) (*model.Todo, error) {
	return r.db.EditTodoCategory(&input)
}

// EditTodoStartDate is the resolver for the editTodoStartDate field.
func (r *mutationResolver) EditTodoStartDate(ctx context.Context, input model.EditTodoStartDate) (*model.Todo, error) {
	return r.db.EditTodoStartDate(&input)
}

// EditTodoRepeat is the resolver for the editTodoRepeat field.
func (r *mutationResolver) EditTodoRepeat(ctx context.Context, input model.EditTodoRepeat) (*model.Todo, error) {
	return r.db.EditTodoRepeat(&input)
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
