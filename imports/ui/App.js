import React, { Fragment } from "react"
import { withApollo } from "react-apollo"

import JobList from "./JobList"
import Auth from "./Auth"

const App = ({ client }) => (
  <Fragment>
    <h1>Jobs</h1>
    <Auth client={client} />
    <JobList />
  </Fragment>
)

export default withApollo(App)
