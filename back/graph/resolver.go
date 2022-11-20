package graph

import "github.com/Pamplemouss/elpis/back/configs"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

func NewResolver(db *configs.DB) *Resolver {
	return &Resolver{
		db: db,
	}
}

type Resolver struct {
	db *configs.DB
}
