import { gql } from "@apollo/client";

export const CreateTodoMutation = gql`
    mutation CreateTodo($input: NewTodo!) {
        createTodo(input: $input) {
            id
        }
    }
`;

export const DeleteTodoMutation = gql`
    mutation DeleteTodo($input: ID!) {
        deleteTodo(input: $input)
    }
`;

export const EditTodoMutation = gql`
    mutation EditTodo($input: EditTodo!) {
        editTodo(input: $input) {
            id,
            name,
            startDate,
            category {
                id
            },
            repeatable,
            repeat {
                rule,
                value,
            }
        }
    }
`;

export const CreateCategoryMutation = gql`
    mutation CreateCategory($input: NewCategory!) {
        createCategory(input: $input) {
            id
        }
    }
`;

export const DeleteCategoryMutation = gql`
    mutation DeleteCategory($input: ID!) {
        deleteCategory(input: $input)
    }
`;

export const EditCategoryMutation = gql`
    mutation EditCategory($input: EditCategory!) {
        editCategory(input: $input) {
            id,
            name,
            faCode,
            color,
        }
    }
`;

export const ToggleTodoMutation = gql`
    mutation ToggleCheck($input: ToggleCheck!) {
        toggleCheck(input: $input) {
		    id,
            checked
	    }
    }
`;