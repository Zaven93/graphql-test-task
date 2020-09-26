import { Schema, model } from 'mongoose'

const ArticleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String
        }
    },
    { timestamps: true }
)

export const Article = model('Article', ArticleSchema)
