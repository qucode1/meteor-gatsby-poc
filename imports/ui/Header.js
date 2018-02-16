import React, { Fragment } from 'react'

import Auth from "./Auth"

const Header = ({ client }) => {
    return (
        <div className="root">
            <h2>Job CMS</h2>
            <Auth client={client} />
            <style jsx>{`
                .root {
                    display: flex;
                    justify-content: space-between;
                    background-color: rebeccapurple;
                    color: #fff;
                    padding: 15px 10px
                }
                h2 {
                    margin: 0
                }
            `}</style>

        </div>
    )
}

export default Header