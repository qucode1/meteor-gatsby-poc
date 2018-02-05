import React, { Fragment } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import JobForm from "./JobForm"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import LogoutButton from "./Button"

const Auth = ({ loading, user, client }) => {
  const logout = () => {
    Meteor.logout()
    client.resetStore()
  }
  return (
    <Fragment>
      {!loading && user._id ? (
        <Fragment>
          <LogoutButton onClick={logout} name="Logout" />
          <JobForm />
        </Fragment>
      ) : (
        <Fragment>
          <RegisterForm client={client} />
          <LoginForm client={client} />
        </Fragment>
      )}
    </Fragment>
  )
}

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
})(Auth)
