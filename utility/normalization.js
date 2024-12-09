import { getAllApplicants } from './firebase'

export const transformScores = () => {
  getAllApplicants(applicants => {
    console.log(applicants)
  })
}
