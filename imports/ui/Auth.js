import React, { Fragment } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import Button from "./Button"

const LogoutButton = Button
const RebuildButton = Button

const Auth = ({ loading, user, client }) => {
  const logout = () => {
    Meteor.logout()
    client.resetStore()
  }
  const triggerRebuild = () => {
    fetch(Meteor.settings.public.buildHook, {
      method: 'POST'
    }).catch(error => console.error('Error', error))
      .then(() => console.log("Rebuild successfully triggered"))
  }
  return (
    <Fragment>
      {!loading && user._id ? (
        <Fragment>
          <LogoutButton onClick={logout} name="Logout" />
          <RebuildButton onClick={triggerRebuild} name="Rebuild" />
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
