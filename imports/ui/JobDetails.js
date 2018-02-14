import React, { Fragment } from 'react'
import { Link } from "react-router-dom"
import { graphql } from 'react-apollo';
import gql from "graphql-tag"

const JobDetails = ({ loading, job: { _id, title, description, locations } = {} }) => {
    return (
        <Fragment>
            {loading
                ? null
                : (
                    <Fragment>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        {locations && locations.length > 0 && <ul>
                            {locations.map(loc => <li key={`${_id}-${loc}`}>{loc}</li>)}
                        </ul>}
                    </Fragment>
                )
            }
            <Link to='/'>Go Back</Link>
        </Fragment>
    )
}

const jobDetailsQuery = gql`
    query JobDetails($id: String!) {
        job(_id: $id) {
        _id
        title
        description
        locations
        }
    }

`

export default graphql(jobDetailsQuery, {
    props: ({ data }) => ({ ...data }),
    options: (ownProps) => ({ variables: { id: ownProps.match.params.id } })
})(JobDetails)