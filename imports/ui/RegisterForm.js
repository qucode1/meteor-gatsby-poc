import React, { Component } from "react"
import { Accounts } from "meteor/accounts-base"

import Button from "./Button"

export default class RegisterForm extends Component {
  registerUser = e => {
    e.preventDefault()
    Accounts.createUser(
      {
        email: this.email.value,
        password: this.password.value
      },
      error => {
        !error && this.props.client.resetStore()
        error && console.log(error)
      }
    )
  }

  render() {
    return (
      <form onSubmit={this.registerUser}>
        <input type="email" ref={input => (this.email = input)} />
        <input type="password" ref={input => (this.password = input)} />
        <Button type="submit" name="Register" color="rebeccapurple" bgColor="#fff" />
      </form>
    )
  }
}
