import { gql } from "@apollo/client";

export const QUERY_ALL_CATEGORIES = gql`
    query GetAllCategories {
        categories {
        name
        products {
            id
            name
            inStock
            gallery
            description
            category
            attributes {
            id
            name
            type
            items {
                id
                value
                displayValue
            }
            }
            prices {
            currency {
                label
                symbol
            }
            amount
            }
            brand
        }
    }
  }
`

export const QUERY_CATEGORY = gql`
query GetCategory {
    category {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`

export const QUERY_CURRENCIES = gql`
  query GetCurrencies {
      currencies {
          label
          symbol
      }
  }`