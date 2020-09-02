import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

const createClient = (ctx: NextPageContext) =>
	new ApolloClient({
		uri: "http://localhost:4000/graphql",
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						events: {
							keyArgs: [],
							merge(_ignored, incoming) {
								return incoming;
							},
						},
					},
				},
			},
		}),
		credentials: "include",
		headers: {
			cookie:
				(typeof window === "undefined"
					? ctx?.req?.headers.cookie
					: undefined) || "",
		},
	});

export const withApollo = createWithApollo(createClient);
