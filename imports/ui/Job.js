import React, { Fragment } from "react"
import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"

import DeleteButton from "./Button"

const Job = ({ job, user, loading, deleteJob }) => (
  <Fragment>
    <h3>{job.title}</h3>
    <p>{job.description}</p>
    <p>{job.locations}</p>
    {!loading &&
      user._id && (
        <DeleteButton
          onClick={() => {
            deleteJob({ variables: { id: job._id } })
          }}
          name="Delete"
        />
      )}
  </Fragment>
)

const deleteJob = gql`
  mutation deleteJob($id: String!) {
    deleteJob(_id: $id)
  }
`

const userQuery = gql`
  query User {
    user {
      _id
      email
    }
  }
`

export default compose(
  graphql(userQuery, {
    props: ({ data }) => ({ ...data })
  }),
  graphql(deleteJob, {
    name: "deleteJob",
    options: {
      refetchQueries: ["Jobs"]
    }
  })
)(Job)
