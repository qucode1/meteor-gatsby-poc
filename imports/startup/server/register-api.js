import { createApolloServer } from "meteor/apollo"
import { makeExecutableSchema } from "graphql-tools"
import cors from "cors"
import merge from "lodash/merge"

import JobSchema from "../../api/job/job.graphql"
import JobResolvers from "../../api/job/resolvers"
import UserSchema from "../../api/user/user.graphql"
import UserResolvers from "../../api/user/resolvers"

// hiiiiiiiiiiiiiiii

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}
const typeDefs = [JobSchema, UserSchema]
const resolvers = merge(JobResolvers, UserResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

createApolloServer({ schema }, { configServer: expressServer => expressServer.use(cors(corsOptions)) })
