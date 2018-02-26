import { createApolloServer } from "meteor/apollo"
import { makeExecutableSchema } from "graphql-tools"
import cors from "cors"
import merge from "lodash/merge"

import JobSchema from "../../api/job/job.graphql"
import JobResolvers from "../../api/job/resolvers"
import UserSchema from "../../api/user/user.graphql"
import UserResolvers from "../../api/user/resolvers"

// hiiiiiiiiiiiiiiii
const allowedOrigins = ["http://localhost:3000", "http://localhost:8000", "https://yannick-lernt.de", "https://naughty-jones-4790d1.netlify.com"]

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}
const typeDefs = [JobSchema, UserSchema]
const resolvers = merge(JobResolvers, UserResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

createApolloServer({ schema }, { configServer: expressServer => expressServer.use(cors(corsOptions)) })
