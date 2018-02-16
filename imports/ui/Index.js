import React, { Fragment } from 'react'
import { graphql } from "react-apollo"
import { Link } from "react-router-dom"
import gql from 'graphql-tag'


import JobList from './JobList'
import JobForm from './JobForm'

const Index = ({ loading, user }) => (
    <Fragment>

        <h1>Jobs</h1>
        {
            !loading && user._id
            && <Link to="/jobs/new">Add a Job</Link>
        }
        <JobList />
    </Fragment>
)

const userQuery = gql`
    query User {
        user {
      _id
      email
    }
    }
`

export default graphql(userQuery, {
    props: ({ data }) => ({ ...data })
})(Index)