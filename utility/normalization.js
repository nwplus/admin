import { getAllGradedApplicants, HackerEvaluationHackathon, updateDocument } from './firebase'
import * as math from 'mathjs'
import firebase from 'firebase'

// this is what the data looks like in firebase
// {
// 	[applicantId: string]: {
// 		score: {
// 			// ... other stuff
// 				scores: {
// 					[questionName: string]: {
// 						lastUpdated: Date
// 						lastUpdatedBy: string
// 						score: number
// 					}
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
      if (!applicants) {
        resolve({})
        return
      }

      applicants.forEach(applicant => {
        if (!applicant?._id || !applicant?.score?.scores) return

        const {
          _id,
          score: { scores },
        } = applicant

        Object.entries(scores).forEach(([questionName, value]) => {
          if (!value?.lastUpdatedBy || !value?.score) return

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
      resolve(result)
    })
  })
}

export const calculateNormalizedScores = async () => {
  const data = await transformScores()
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
  await updateNormalizedScores(normalizedScores)
}

export const updateNormalizedScores = async normalizedScores => {
  const db = firebase.firestore()

  // Restructure normalized scores by applicant ID
  const applicantScores = {}

  // Reorganize data by applicant ID
  Object.entries(normalizedScores).forEach(([grader, questions]) => {
    Object.entries(questions).forEach(([questionName, scores]) => {
      scores.forEach(([normalizedScore, applicantId]) => {
        if (!applicantScores[applicantId]) {
          applicantScores[applicantId] = {}
        }
        if (!applicantScores[applicantId][questionName]) {
          applicantScores[applicantId][questionName] = normalizedScore
        }
      })
    })
  })

  // Update Firebase
  const promises = Object.entries(applicantScores).map(([applicantId, questions]) => {
    // Create update object with dot notation
    const updates = {}
    Object.entries(questions).forEach(([questionName, normalizedScore]) => {
      updates[`score.scores.${questionName}.normalizedScore`] = normalizedScore
    })
    console.log(updates)

    return db
      .collection('Hackathons')
      .doc(HackerEvaluationHackathon)
      .collection('Applicants')
      .doc(applicantId)
      .update(updates)
  })

  try {
    await Promise.all(promises)
    console.log('Successfully updated normalized scores in Firebase')
  } catch (error) {
    console.error('Error updating normalized scores:', error)
    throw error
  }
}
