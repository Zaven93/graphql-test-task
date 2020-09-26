import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Article } from './models/Article'
import { User } from './models/User'

export const resolvers = {
    Query: {
        articles: (parent, args, context, info) => {
            if (!context.isAuth) {
                throw new Error('Unauthenticated!')
            }
            return Article.find()
        },
        articleById: async (_, { id }) => {
            try {
                const article = await Article.findById(id)
                if (!article) {
                    throw new Error("Article with such an id doesn't exist")
                }
                return article
            } catch (error) {
                console.log(error)
            }
        },
        login: async (_, { input: { email, password } }) => {
            try {
                const user = await User.findOne({ email })

                if (!user) {
                    throw new Error("User doesn't exist")
                }

                const isEqual = await bcrypt.compare(password, user.password)

                if (!isEqual) {
                    throw new Error('Password is incorrect')
                }

                const token = jwt.sign({ userId: user.id, email: user.email }, 'zaven05091993', {
                    expiresIn: '1h'
                })

                return { userId: user.id, token, tokenExpiration: 1 }
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {
        createArticle: async (_, { title, description, imageUrl }) => {
            const newArticle = new Article({ title, description, imageUrl })
            await newArticle.save()
            return newArticle
        },
        createUser: async (_, { email, password }) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 10)

                const user = new User({
                    email,
                    password: hashedPassword
                })

                await user.save()

                return user
            } catch (error) {
                console.log(error)
            }
        }
    }
}
