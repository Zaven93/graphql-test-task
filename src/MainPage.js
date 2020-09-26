import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container, Segment, Image, Header } from 'semantic-ui-react'
import ArticleContext from './articleContext/index'

const LIST_ARTICLES = gql`
    query listArticles {
        articles {
            title
            description
            id
            imageUrl
        }
    }
`

const screenWidth = window.innerWidth

const MainPage = ({ history }) => {
    const { loading, error, data } = useQuery(LIST_ARTICLES)
    const [chosenArticle, setChosenArticle] = useState('')

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error)
        return <div>Some error</div>
    }
    return (
        <ArticleContext.Provider value={chosenArticle}>
            <Container className="articles-container">
                {data.articles.map((item) => (
                    <Segment
                        key={item.id}
                        onClick={() => {
                            return history.push(`/article/${item.id}`)
                        }}>
                        <div className="article-data">
                            <Image className="image" src={item.imageUrl} />
                            <Header as="h3">{item.title}</Header>
                            {screenWidth < 767 ? item.description.slice(0, 150) : item.description}
                            ...
                        </div>
                    </Segment>
                ))}
            </Container>
        </ArticleContext.Provider>
    )
}

export default MainPage
