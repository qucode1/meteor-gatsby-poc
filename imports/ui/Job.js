import React, { Fragment } from "react"
import { graphql, compose } from "react-apollo"
import { Link } from "react-router-dom"
import gql from "graphql-tag"

import Button from "./Button"

const EditButton = Button
const DeleteButton = Button

function resolveScopedStyles(scope) {
  return {
    className: scope.props.className,
    styles: scope.props.children
  }
}

const scoped = resolveScopedStyles(
  <scope>
    <style jsx>{`
          .moreDetails, .edit {
            text-decoration: none;
            cursor: pointer;
            background-color: rebeccapurple;
            color: #fff;
            padding: 8px;
            border: none;
            box-shadow: inset 1px -2px 4px rgba(0,0,0,.4), inset -1px 2px 4px rgba(255,255,255,.4), 2px 2px 5px rgba(0,0,0,.3)
          }
          .moreDetails {
            grid-area: moreDetails
          }
          .edit {
            grid-area: edit;
          }
          .delete {
            display: none
          }
      `}</style>
  </scope>
)

const Job = ({ job, user, loading, deleteJob }) => (
  <div className="root">
    <h3 className="title">{job.title}</h3>
    {job.locations && job.locations.length > 0 && (
      <ul className="locations">
        {job.locations.map(loc => (
          <li key={`${job._id}-${loc}`} >{loc}</li>
        ))}
      </ul>
    )}
    <p className="description">{job.shortDescription}</p>
    <Link className={`moreDetails ${scoped.className}`} to={`/job/${job._id}`} >More Details...</Link>
    {!loading &&
      user._id && (
        <Fragment>
          <Link className={`edit ${scoped.className}`} to={`/job/${job._id}/edit`} >Edit</Link>
          <DeleteButton
            className={`delete ${scoped.className}`}
            onClick={() => {
              deleteJob({ variables: { id: job._id } })
            }}
            name="Delete"
          />
        </Fragment>
      )}
    {scoped.styles}
    <style jsx>{`
        .root {
          display: grid;
          grid-template-areas:  "title locations locations locations"
                                "sDescr sDescr sDescr moreDetails"
                                "edit edit edit edit";
          border: 2px solid rebeccapurple;
          margin: 10px 0px;
          padding: 5px;
          align-items: center;
          justify-content: space-between;
          grid-gap: 10px;
          box-shadow: 1px 2px 5px rgba(0,0,0,.3);
        }
        .title {
          grid-area: title
        }
        .locations {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: min-content;
          grid-gap: 5px;
          grid-area: locations;
          list-style-type: none;
          justify-content: flex-end;
        }
        .locations > li {
          background-color: rgb(206, 60, 60);
          color: #fff;
          padding: 5px;
          margin: 5px;
        }
        .description {
          grid-area: sDescr
        }
      `}</style>
  </div>
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
