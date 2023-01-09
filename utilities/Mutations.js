import { gql } from "@apollo/client";

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
    mutation ToggleCheck($input: toggleCheck!) {
        toggleCheck(input: $input) {
		    id,
            checked
	    }
    }
`;