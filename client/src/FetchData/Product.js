import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
	query getProductById($productId: String!) {
		product(id: $productId) {
			id
			brand
			name
			gallery
			inStock
			prices {
				currency {
					symbol
				}
				amount
			}
			category
			description
			attributes {
				id
				name
				type
				items {
					displayValue
					value
					id
				}
			}
		}
	}
`;
