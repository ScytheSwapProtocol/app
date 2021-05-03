import React, { useState } from 'react';
import styled from 'styled-components';

import AvatarImg from '../../../assets/images/cryptopunk2.png';

const Card = styled.div `
    height: 60vh;
    width: 30%;
    border-radius: 0px 8px 8px 0px;
    border-left: 0.5px solid gray;
    border-right: 4px solid #424542;
    border-bottom: 4px solid #424542;
    padding: 1em 0.5em;
    background: linear-gradient(to bottom, #000000 0%, #8e8ea7 42%, #ffffff 100%);
`

const Connect = styled.button `
    border: 1.5px solid black;
    border-radius: 15px;
    color: white;
    background: transparent;
    padding: 0.5em 1em;
    font-size: 1em;
    margin-top: 0.7em;
    float: right;
    margin-right: 1em;
`

const Avatar = styled.img `
    width: 4em;
    border: 2px solid white;
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