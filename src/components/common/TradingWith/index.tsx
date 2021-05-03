import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: white;
    font-size: 1.5em;
    width: 60%;
    height: 2em;
    background: #000000;
    border-bottom: 1px solid gray;
    border-top: 4px solid #424542;
    border-radius: 10px 10px 0 0;
`

export const TradingWith = () => {
    return (
        <Container>
            Trading With:
        </Container>
    )
};