import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    padding: 0 2em;
    height: 5em;
    margin: 2em 4em 0;
    background: #EEF0F3;
    box-shadow:  5px 5px 10px #d7d7d7,
    -5px -5px 10px #e9e9e9;
    transform: skewX(-10deg);
`

const Logo = styled.h1 `
    font-size: 1.2em;
`

const Content = styled.div `
    font-size: 1em;
`

export const Header = () => {
    return (
        <Container>
            <Logo>
                ScytheSwap v1
            </Logo>
            <Content>
                SCY Balance: 0
            </Content>
        </Container>
    )
}