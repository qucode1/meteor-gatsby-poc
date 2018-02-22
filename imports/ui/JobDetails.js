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
                    <div className="root">
                        <h2>{title}</h2>
                        <div className="content">
                            {locations && locations.length > 0 &&
                                <ul>{locations.map(loc =>
                                    <li key={`${_id}-${loc}`}>
                                        {loc}
                                    </li>)}
                                </ul>
                            }
                            <p>{description}</p>
                        </div>
                    </div >
                )
            }
            <Link to='/'><Button name="Go Back" /></Link>
            <style jsx>{`
                .root {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 100%;
                    border: 5px solid rebeccapurple;
                    border-radius: 5px;
                    margin: auto
                  }
                  h2 {
                    background-color: rebeccapurple;
                    color: #fff;
                    width: 100%;
                    margin: 0;
                    padding: 5px 10px;
                  }
                  .content {
                      padding: 5px;
                  }
                  ul {
                    list-style-type: none;
                    display: flex;
                    margin: 0;
                    padding: 5px
                  }
                  li {
                    background-color: rgb(206, 60, 60);
                    color: #fff;
                    padding: 5px;
                    margin: 5px;
                  }
            `}</style>
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