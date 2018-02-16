import React, { Fragment } from "react"
import { Route } from 'react-router-dom'
import { withApollo } from "react-apollo"

import Index from './Index'
import Header from './Header'
import JobDetails from "./JobDetails"
import JobForm from "./JobForm"

const App = ({ client }) => (
    <Fragment>
        <Header client={client} />
        <main>
            <Route exact path='/' component={Index} />
            <Route exact path='/job/:id' component={JobDetails} />
            <Route exact path='/job/:id/edit' render={(props) => <JobForm update {...props} />} />
            <Route exact path='/jobs/new' component={JobForm} />
        </main>
        <style jsx global>{`
      html {
          box-sizing: border-box;
          font-family: sans-serif;
      }
      *, *:before, *:after {
          box-sizing: inherit
      }
      html, body {
          margin: 0;
          padding: 0
      }
      main {
          padding: 10px
      }
      button {
          cursor: pointer;
          background-color: rebeccapurple;
          color: #fff;
          padding: 8px;
          margin: 5px;
          border: none;
          box-shadow: inset 1px -2px 4px rgba(0,0,0,.4), inset -1px 2px 4px rgba(255,255,255,.4), 2px 2px 5px rgba(0,0,0,.3)
      }
  `}</style>
    </Fragment>
)

export default withApollo(App)
