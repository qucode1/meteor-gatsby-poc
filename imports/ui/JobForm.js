import React, { Component, Fragment } from "react"
import gql from "graphql-tag"
import { graphql, compose } from "react-apollo"
import { Link, Redirect } from 'react-router-dom'

import Button from './Button'

class JobForm extends Component {
  constructor(props) {
    super(props)
    const { job = {} } = props
    const { _id, title, description, locations } = job
    this.state = {
      title: "",
      description: "",
      locations: [],
      submitted: false
    }
  }
  componentWillReceiveProps({ job: { title, description, locations } = {} }) {
    this.setState({
      title: title || "",
      description: description || "",
      locations: locations || []
    })
  }
  submitForm = e => {
    e.preventDefault()

    const variables = {}
    this.state.title
      && (variables.title = this.state.title)
    this.state.description
      && (variables.description = this.state.description)
    this.state.locations
      && this.state.locations.length > 0
      && (variables.locations = this.state.locations)

    this.props.update
      ? (
        (variables.id = this.props.job._id),
        this.props
          .updateJob({
            variables
          })
          .catch(error => {
            console.error(error)
          }),
        this.setState({
          submitted: true
        })
      )
      : (
        this.props
          .createJob({
            variables
          })
          .catch(error => {
            console.error(error)
          }),
        this.setState({
          submitted: true
        })
      )
  }
  addLocation = (e) => {
    e.preventDefault()
    const newLocations = [
      ...this.state.locations,
      this.newLocation.value
    ]
    this.setState({ locations: newLocations })
    this.newLocation.value = ""
  }
  handleChange = e => {
    const { target: { name, type, value } } = e
    e.preventDefault()
    switch (type) {
      case ("text"):
      case ("textarea"):
        this.setState({
          [name]: value
        })
        break
    }
  }
  render() {
    return (
      <div className="root">
        <Link to="/"><Button name="Go Back" /></Link>
        <form onSubmit={this.submitForm}>
          {this.props.update
            ? <legend><h1>Update Job: {this.state.title}</h1></legend>
            : <legend><h1>Add Job</h1></legend>
          }
          <input
            name="title"
            type="text"
            placeholder="Job Title"
            onChange={this.handleChange}
            value={this.state.title}
          />
          {this.state.locations
            && this.state.locations.length > 0
            && (
              <ul>
                {this.state.locations.map(location => (
                  <li key={`${this.props.job_id}-${location}`} >
                    {location}
                  </li>
                ))}
              </ul>
            )
          }
          <input type="text" ref={input => this.newLocation = input} placeholder="Location" />
          <button onClick={this.addLocation}>Add Location</button>
          <textarea
            name="description"
            cols="50"
            rows="10"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <button className="submit" type="submit">
            {this.props.update ? 'Update Job' : 'Add Job'}
          </button>
        </form>
        {
          this.state.submitted && (
            <Redirect
              push
              to={this.props.update ? `/job/${this.props.job._id}` : `/`}
            />
          )
        }
        <style jsx>{`
          .root {
            --padding: 5px;
            --margin: 5px;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%
          }
          form {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            align-self: center;
            border: 5px solid rebeccapurple;
            border-radius: 5px;
          }
          legend {
            background-color: rebeccapurple;
            color: #fff;
            width: 100%;
            padding: 0 10px;
          }
          ul {
            list-style-type: none;
            display: flex;
          }
          li {
            background-color: rgb(206, 60, 60);
            color: #fff;
          }
          textarea {
            border-radius: 5px;
            border: 1px solid rgba(0,0,0,.3);
          }
          input, textarea, ul, li {
            padding: var(--padding);
            margin: var(--margin);
          }
          input, textarea {
            width: calc(100% - var(--padding) - var(--margin))
          }
          .submit {
            align-self: flex-end;
          }
          `}</style>
      </div>
    )
  }
}

const createJob = gql`
  mutation createJob(
    $title: String!
    $description: String
    $locations: [String]
  ) {
    createJob(
      title: $title, 
      description: $description, 
      locations: $locations
    ) {
      _id
    }
  }
`

const updateJob = gql`
  mutation(
    $id: String!, 
    $title: String, 
    $description: String, 
    $locations: [String]
  ) {
    updateJob(
      _id: $id, 
      title: $title, 
      description: $description, 
      locations: $locations
    )
}
`

const jobQuery = gql`
  query jobDetails($id: String!) {
    job(_id: $id) {
      _id
      title
      shortDescription
      description
      locations
    }
  }
`

export default compose(
  graphql(createJob, {
    name: "createJob",
    options: {
      refetchQueries: ["Jobs"]
    }
  }),
  graphql(updateJob, {
    name: "updateJob",
    options: {
      refetchQueries: ["JobDetails", "Jobs"]
    }
  }),
  graphql(jobQuery, {
    props: ({ data }) => ({ ...data }),
    options: (ownProps) => ({
      variables: { id: ownProps.match.params.id },
      refetchQueries: ["Jobs"],
    }),
    skip: ownProps => !ownProps.update
  })
)(JobForm)
