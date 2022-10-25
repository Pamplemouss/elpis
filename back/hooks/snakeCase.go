package main

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/99designs/gqlgen/plugin/modelgen"
)

var matchFirstCap = regexp.MustCompile("(.)([A-Z][a-z]+)")
var matchAllCap = regexp.MustCompile("([a-z0-9])([A-Z])")

func ToSnakeCase(str string) string {
	snake := matchFirstCap.ReplaceAllString(str, "${1}_${2}")
	snake = matchAllCap.ReplaceAllString(snake, "${1}_${2}")
	return strings.ToLower(snake)
}

var jsonTagRegexp = regexp.MustCompile(`json:"(.*?)"`)
var bsonTagRegexp = regexp.MustCompile(`bson:"(.*?)"`)
var jsonTagGroupRegexp = regexp.MustCompile(`json:"(.*?)"`)
var bsonTagGroupRegexp = regexp.MustCompile(`bson:"(.*?)"`)

func mutateSnakeCaseHook(b *modelgen.ModelBuild) *modelgen.ModelBuild {
	for _, model := range b.Models {
		for _, field := range model.Fields {
			jsonTagGrouped := jsonTagGroupRegexp.FindStringSubmatch(field.Tag)
			bsonTagGrouped := bsonTagGroupRegexp.FindStringSubmatch(field.Tag)
			snakeCaseJson := ToSnakeCase(jsonTagGrouped[1])
			snakeCaseBson := ToSnakeCase(bsonTagGrouped[1])
			field.Tag = jsonTagRegexp.ReplaceAllString(field.Tag, fmt.Sprintf(`json:"%s"`, snakeCaseJson))
			field.Tag = bsonTagRegexp.ReplaceAllString(field.Tag, fmt.Sprintf(`bson:"%s"`, snakeCaseBson))

			// Solution plus propre mais impossible
			//field.Tag = jbsonTagRegexp.ReplaceAllString(field.Tag, fmt.Sprintf(`$1:"` + ToSnakeCase(`$2`) + `"`))
		}
	}
	return b
}
