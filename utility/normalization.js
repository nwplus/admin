import { getAllGradedApplicants } from './firebase'

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
    return result
  })
}