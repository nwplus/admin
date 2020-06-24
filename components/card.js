import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    background-color: #F8F8F8;
`

const Header = styled.div`
    background-color: #EDEDED;
    padding: 24px 40px;
    display: flex;
    align-items: center;
`

const Title = styled.h1`
    font-size: 24px;
    margin: 0;
`

const Subtitle = styled.p`
    font-size: 16px;
    margin: 0;
    margin-left: 24px;
`

const Button = styled.button`
    margin-left: auto;
`

const Content = styled.div`
    padding: 40px;
`

export default ({title, subtitle, author, buttonText, onClick, children}) => (
    <Card>
        <Header>
            <Title>
                {title}
            </Title>
            {
                subtitle &&
                <Subtitle>
                    {subtitle} by <b>{author}</b>
                </Subtitle>
            }
            <Button onClick={onClick}>
                {buttonText}
            </Button>
        </Header>
        <Content>
            {children}
        </Content>
    </Card>
)