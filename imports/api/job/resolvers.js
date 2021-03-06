import Jobs from "./jobs"
import { userInfo } from "os"

export default {
  Query: {
    jobs(obj, args, { user }) {

      return Jobs.find({}).fetch()
    },
    job(obj, { _id }, { user }) {
      return Jobs.findOne({ _id })
    }
  },
  Mutation: {
    createJob(obj, { title, description, locations }, { user }) {
      if (user._id) {
        const shortDescription = description.substring(0, 96) + "..."
        const jobId = Jobs.insert({
          title,
          shortDescription,
          description,
          locations
        })
        return Jobs.findOne(jobId)
      } else return `You are not authorized to do create a Job`
    },
    deleteJob(obj, { _id }, { userId }) {
      if (userId) {
        Jobs.remove({ _id })
        return `Job (${_id}) has been removed!`
      } else return `You are not authorized to do delete a Job`
    },
    updateJob(obj, { _id, title, description, locations }, { userId }) {
      if (userId) {
        const updates = {}
        title && (updates.title = title)
        description && (
          updates.description = description,
          updates.shortDescription = description.length > 100 ? description.substring(0, 96) + "..." : description
        )
        locations && locations.length > 0 && (updates.locations = locations)

        Jobs.update({ _id }, { $set: { ...updates } })
        return `Job (${_id}) has been updated!`
      } else return `You are not authorized to do update a Job`
    }
  }
}
