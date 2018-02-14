import React, { Fragment } from "react"
import { Route } from 'react-router-dom'
import { withApollo } from "react-apollo"

import Index from './Index'
import JobDetails from "./JobDetails"
import JobForm from "./JobForm"

const App = () => (
  <Fragment>
    <Route exact path='/' component={Index} />
    <Route exact path='/job/:id' component={JobDetails} />
    <Route exact path='/job/:id/edit' render={(props) => <JobForm update {...props} />} />
    <Route exact path='/jobs/new' component={JobForm} />
  </Fragment>
)

export default App
