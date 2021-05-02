import React, { useState } from 'react';
import styled from 'styled-components';

import AvatarImg from '../../../assets/images/cryptopunk2.png';

const Card = styled.div `
    height: 60vh;
    width: 30%;
    border-radius: 0px 8px 8px 0px;
    border-left: 0.5px solid black;
    padding: 1em 0.5em;
    background: rgb(194,193,196);
    background: linear-gradient(0deg, rgba(194,193,196,1) 0%, rgba(226,226,235,1) 35%, rgba(255,255,255,1) 100%);
    box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
`

const Connect = styled.button `
    border: 1.5px solid black;
    border-radius: 15px;
    color: black;
    background: transparent;
    padding: 0.5em 1em;
    font-size: 1em;
    margin-top: 0.7em;
    float: right;
    margin-right: 1em;
`

const Avatar = styled.img `
    width: 4em;
    border: 2px solid black;
    border-radius: 50%;
    float: right;
    margin-right: 1em;
`

export const CardRight = () => {

    return (
        <Card>
            <div className="card-header">
                <Avatar src={ AvatarImg } />
          </div>
        </Card>
    )
}