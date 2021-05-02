import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: black;
    font-size: 1.5em;
    width: 60%;
    height: 2em;
    background: white;
    border-bottom: 1px solid #D0D4DD;
`

export const TradingWith = () => {
    return (
        <Container>
            Trading With:
        </Container>
    )
};