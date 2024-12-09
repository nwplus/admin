import { getAllGradedApplicants } from './firebase'

export const transformScores = () => {
  getAllGradedApplicants(applicants => {
    applicants.forEach(applicant => {
      const {
        _id,
        score: { scores },
      } = applicant
      console.log('id', _id)
      Object.entries(scores).forEach(([key, value]) => {
        const { lastUpdatedBy, score } = value
        console.log(key, lastUpdatedBy, score)
      })
    })
  })
}
