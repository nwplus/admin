import { getAllGradedApplicants } from './firebase'
import * as math from 'mathjs'

// this is what the data looks like in firebase
// {
// 	[applicantId: string]: {
// 		score: {
// 			// ... other stuff
// 			scores: {
// 				[questionName: string]: {
// 					lastUpdated: Date
// 					lastUpdatedBy: string
// 					score: number
// 				}
// 			}
// 		}
// 	}
// }

// this is what the data looks like after transformation
// {
// 	"Jason": {
// 		"Q1": [[score, appId], [score2, appId2]]
// 	}
// }

export const transformScores = () => {
  const result = {}

  return new Promise(resolve => {
    getAllGradedApplicants(applicants => {
      applicants.forEach(applicant => {
        const {
          _id,
          score: { scores },
        } = applicant

        Object.entries(scores).forEach(([questionName, value]) => {
          const { lastUpdatedBy, score } = value

          if (!result[lastUpdatedBy]) {
            result[lastUpdatedBy] = {}
          }

          if (!result[lastUpdatedBy][questionName]) {
            result[lastUpdatedBy][questionName] = []
          }

          result[lastUpdatedBy][questionName].push([score, _id])
        })
      })

      console.log('Transformed data:', result)
      resolve(result)
    })
  })
}

export const calculateNormalizedScores = async () => {
  const data = await transformScores()
  console.log('Test data:', data)
  const normalizedScores = {}
  for (const grader in data) {
    normalizedScores[grader] = {}
    for (const question in data[grader]) {
      const scores = data[grader][question].map(([score, appId]) => score)
      const mean = math.mean(scores)
      const stdDev = math.std(scores)
      normalizedScores[grader][question] = data[grader][question].map(([score, appId]) => [
        stdDev === 0 ? 0 : (score - mean) / stdDev,
        appId,
      ])
    }
  }
  console.log(normalizedScores)
  return normalizedScores
}
