export default {
  Query: {
    user(obj, args, { user }) {
      return user || {}
    }
  },
  User: {
    email: ({ emails }) => (emails ? emails[0].address : null)
  }
}
