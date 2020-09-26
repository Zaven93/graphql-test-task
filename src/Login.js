import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Button, Form, Segment, Header, Icon, Input, Dimmer, Loader } from 'semantic-ui-react'

const LOGIN_USER = gql`
    query Login($input: LoginInput) {
        login(input: $input) {
            userId
            token
            tokenExpiration
        }
    }
`

const Login = ({ history }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [loginUser, { called, loading, data }] = useLazyQuery(LOGIN_USER, {
        variables: {
            input: { email: userData.email, password: userData.password }
        },
        onCompleted: (data) => {
            console.log('Data from oncompleted callback', data)
            localStorage.setItem('token', data.login.token)
            setUserData({
                email: '',
                password: ''
            })
            history.push('/articles')
        }
    })

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        loginUser()
    }

    return (
        <div className="login-container">
            <Header as="h2" icon textAlign="center">
                <Icon name="users" circular />
                <Header.Content>Login</Header.Content>
            </Header>
            <Segment inverted>
                <Form inverted onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Email</label>
                        <Input
                            icon="mail"
                            iconPosition="left"
                            name="email"
                            value={userData.email}
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input
                            icon="lock"
                            iconPosition="left"
                            type="password"
                            name="password"
                            value={userData.password}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Button primary type="submit">
                        {called && loading ? (
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        ) : (
                            'Login'
                        )}
                    </Button>
                </Form>
            </Segment>
        </div>
    )
}

export default Login
