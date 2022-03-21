import React from 'react';

export function Popup({content, children}) {

    return (
        <Popup inverted content={content} trigger={children}/>
    );
}