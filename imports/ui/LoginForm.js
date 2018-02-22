import React, { Component } from "react"
import { Accounts } from "meteor/accounts-base"

import Button from "./Button"

export default class LoginForm extends Component {
  login = e => {
    e.preventDefault()
    Meteor.loginWithPassword(this.email.value, this.password.value, error => {
      !error && this.props.client.resetStore()
      error && console.log(error)
    })
  }

  render() {
    return (
      <form onSubmit={this.login}>
        <input type="email" ref={input => (this.email = input)} />
        <input type="password" ref={input => (this.password = input)} />
        <Button type="submit" name="Login" color="rebeccapurple" bgColor="#fff" />
      </form>
    )
  }
}
