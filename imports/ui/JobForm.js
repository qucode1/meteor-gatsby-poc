import React, { Component } from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const createJob = gql`
  mutation createJob(
    $title: String!
    $description: String
    $locations: [String]
  ) {
    createJob(title: $title, description: $description, locations: $locations) {
      _id
    }
  }
`

class JobForm extends Component {
  submitForm = e => {
    e.preventDefault()
    this.props
      .createJob({
        variables: {
          title: this.title.value
        }
      })
      .catch(error => {
        console.error(error)
      })
    this.title.value = ""
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input type="text" ref={input => (this.title = input)} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default graphql(createJob, {
  name: "createJob",
  options: {
    refetchQueries: ["Jobs"]
  }
})(JobForm)
