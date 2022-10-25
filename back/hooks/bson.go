package main

import (
	"github.com/99designs/gqlgen/plugin/modelgen"
)

func mutateBsonHook(b *modelgen.ModelBuild) *modelgen.ModelBuild {
	for _, model := range b.Models {
		for _, field := range model.Fields {

			name := field.Name
			if name == "id" {
				name = "_id"
			}
			field.Tag += ` bson:"` + name + `"`
		}
	}
	return b
}
