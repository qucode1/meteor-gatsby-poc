import React, { Fragment } from "react"
import { Route, Link } from 'react-router-dom'
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import Job from "./Job"

const JobList = ({ jobs, loading }) => (
  <Fragment>
    {!loading && jobs.map(job => <Job key={job._id} job={job} />)}
  </Fragment>
)

const jobQuery = gql`
  query Jobs {
    jobs {
      _id
      title
      locations
      shortDescription
    }
  }
`
export default graphql(jobQuery, {
  props: ({ data }) => ({ ...data })
})(JobList)
