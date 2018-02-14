import { createApolloServer } from "meteor/apollo"
import { makeExecutableSchema } from "graphql-tools"
import merge from "lodash/merge"

import JobSchema from "../../api/job/job.graphql"
import JobResolvers from "../../api/job/resolvers"
import UserSchema from "../../api/user/user.graphql"
import UserResolvers from "../../api/user/resolvers"

// hiiiiiiiii
const typeDefs = [JobSchema, UserSchema]
const resolvers = merge(JobResolvers, UserResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

createApolloServer({ schema })
