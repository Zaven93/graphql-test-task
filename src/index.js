import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer, gql } from 'apollo-server-express'
import { resolvers } from './resolver'
import { typeDefs } from './typeDefs'
import isAuth from './middleware/is-auth'

const server = async () => {
    const app = express()

    app.use(isAuth)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            isAuth: req.isAuth
        })
    })

    server.applyMiddleware({ app })

    const PORT = process.env.PORT || 5000

    try {
        await mongoose.connect(
            'mongodb+srv://test_admin:admin123456@graphql-test-task.7ddqq.mongodb.net/<dbname>?retryWrites=true&w=majority',
            { useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true }
        )
        console.log('Successfully connected to database')
    } catch (error) {
        console.log(error)
    }

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}

server()
