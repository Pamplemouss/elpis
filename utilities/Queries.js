import { gql } from "@apollo/client";

export const TodosQuery = gql`
    query Todos {
        todos {
            id
            name
            startDate
            checked
            category {
                id
                name
                faCode
                color
            }
            repeatable
            repeat {
                rule
                value
            }
        }
    }
`;

export const CategoriesQuery = gql `
    query Categories {
        categories {
            id
            name
            faCode
            color
        }       
    }
`