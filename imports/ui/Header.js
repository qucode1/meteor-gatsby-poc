import React, { Fragment } from 'react'

import Auth from "./Auth"

const Header = ({ client }) => {
    return (
        <Fragment>
            <h2>Job CMS</h2>
            <Auth client={client} />
        </Fragment>
    )
}

export default Header