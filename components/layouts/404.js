import React from 'react';
import { css  } from '@emotion/core';

const Error404 = () => {
    return ( 

        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
                font-size: 4rem;
                font-family: 'Roboto Slab', serif;

            `}
        >No se puede Mostrar</h1>
    );
}
 
export default Error404;