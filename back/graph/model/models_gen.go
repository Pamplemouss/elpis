// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"time"
)

type Category struct {
	ID     string `json:"id" bson:"_id"`
	Name   string `json:"name" bson:"name"`
	FaCode string `json:"fa_code" bson:"fa_code"`
	Color  string `json:"color" bson:"color"`
}

type NewTodo struct {
	Name       string     `json:"name" bson:"name"`
	CategoryID string     `json:"category_id" bson:"category_id"`
	StartDate  time.Time  `json:"start_date" bson:"start_date"`
	Repeatable bool       `json:"repeatable" bson:"repeatable"`
	Repeat     *NewRepeat `json:"repeat" bson:"repeat"`
}

type Repeat struct {
	Rule  string `json:"rule" bson:"rule"`
	Value []*int `json:"value" bson:"value"`
}

type Todo struct {
	ID         string       `json:"id" bson:"_id"`
	Name       string       `json:"name" bson:"name"`
	Category   *Category    `json:"category" bson:"category"`
	Checked    []*time.Time `json:"checked" bson:"checked"`
	StartDate  time.Time    `json:"start_date" bson:"start_date"`
	Repeatable bool         `json:"repeatable" bson:"repeatable"`
	Repeat     *Repeat      `json:"repeat" bson:"repeat"`
}

type EditRepeat struct {
	Rule  string `json:"rule" bson:"rule"`
	Value []*int `json:"value" bson:"value"`
}

type EditTodo struct {
	ID         string      `json:"id" bson:"_id"`
	Name       *string     `json:"name" bson:"name"`
	CategoryID *string     `json:"category_id" bson:"category_id"`
	StartDate  *time.Time  `json:"start_date" bson:"start_date"`
	Repeatable *bool       `json:"repeatable" bson:"repeatable"`
	Repeat     *EditRepeat `json:"repeat" bson:"repeat"`
}

type EditTodoCategory struct {
	ID         string  `json:"id" bson:"_id"`
	CategoryID *string `json:"category_id" bson:"category_id"`
}

type EditTodoName struct {
	ID   string `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name"`
}

type EditTodoRepeat struct {
	ID         string      `json:"id" bson:"_id"`
	Repeatable *bool       `json:"repeatable" bson:"repeatable"`
	Repeat     *EditRepeat `json:"repeat" bson:"repeat"`
}

type EditTodoStartDate struct {
	ID        string     `json:"id" bson:"_id"`
	StartDate *time.Time `json:"start_date" bson:"start_date"`
}

type NewCategory struct {
	Name   string `json:"name" bson:"name"`
	FaCode string `json:"fa_code" bson:"fa_code"`
	Color  string `json:"color" bson:"color"`
}

type NewRepeat struct {
	Rule  string `json:"rule" bson:"rule"`
	Value []*int `json:"value" bson:"value"`
}
