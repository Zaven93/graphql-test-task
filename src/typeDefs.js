import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Query {
        articles: [Article!]!
        login(input: LoginInput): AuthData!
        articleById(id: ID!): Article!
    }

    type Article {
        id: ID!
        title: String
        description: String
        imageUrl: String
    }

    type User {
        id: ID!
        email: String!
        password: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Mutation {
        createArticle(title: String!, description: String!, imageUrl: String!): Article!
        createUser(email: String!, password: String!): User!
    }
`
