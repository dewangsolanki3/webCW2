import React from 'react'
import loader from './loader.gif'


let Spinner = () => {
    return (
        <div>
            <img src={loader} alt=" Please hold on ..." style={{width:'190px', display: 'block', margin: 'auto'}} />
        </div>
    )
}

export default Spinner