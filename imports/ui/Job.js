import React, { Fragment } from "react"
import { graphql, compose } from "react-apollo"
import { Link } from "react-router-dom"
import gql from "graphql-tag"

import Button from "./Button"

const EditButton = Button
const DeleteButton = Button

const Job = ({ job, user, loading, deleteJob }) => (
  <Fragment>
    <h3>{job.title}</h3>
    <p>{job.locations}</p>
    <Link to={`/job/${job._id}`} >More Details...</Link>
    {!loading &&
      user._id && (
        <Fragment>
          <Link to={`/job/${job._id}/edit`} >Edit</Link>
          <DeleteButton
            onClick={() => {
              deleteJob({ variables: { id: job._id } })
            }}
            name="Delete"
          />
        </Fragment>
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
