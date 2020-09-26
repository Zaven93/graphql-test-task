import React, { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import ArticleContext from './articleContext/index'
import { Container, Segment, Image, Header } from 'semantic-ui-react'

const GET_ARTICLE_BY_ID = gql`
    query getArticleById($id: ID!) {
        articleById(id: $id) {
            id
            title
            description
            imageUrl
        }
    }
`

const ArticleInfo = ({ match }) => {
    const { loading, error, data } = useQuery(GET_ARTICLE_BY_ID, {
        variables: { id: match.params.id }
    })
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Some error occured</div>
    }
    const { id, title, description, imageUrl } = data.articleById
    return (
        <Container className="articles-container">
            <Segment key={id}>
                <div className="article-data">
                    <Image className="image" src={imageUrl} />
                    <Header as="h3">{title}</Header>
                    {description}
                </div>
            </Segment>
        </Container>
    )
}

export default ArticleInfo
