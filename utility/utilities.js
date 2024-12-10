import { QUESTION_TYPES, SCORING } from '../constants'

// given hex color code, convert to RGBA with given alpha value
export const hexToRgba = (hex, a = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${a})`
    : `rgba(0, 0, 0, ${a})`
}

// Given an object, take its values and sum them up
export const calculateTotalScore = hackerScore => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue[1]?.score ?? 0
  const maxScore = Object.values(SCORING).reduce((acc, curr) => acc + curr.value * curr.weight, 0)

  // filter out scores with weight zero
  const validScores = Object.entries(hackerScore).filter(entry => {
    const field = entry[0]
    let label = ''
    switch (field) {
      case 'ResumeScore':
        label = SCORING.RESUME.label
        break
      case 'NumExperiences':
        label = SCORING.NUM_EXP.label
        break
      case 'ResponseOneScore':
        label = SCORING.ESSAY1.label
        break
      case 'ResponseTwoScore':
        label = SCORING.ESSAY2.label
        break
      case 'ResponseThreeScore':
        label = SCORING.ESSAY3.label
        break
      default:
        break
    }
    const scoringItem = Object.values(SCORING).find(item => item.label === label)
    return scoringItem && scoringItem.weight !== 0
  })
  const totalScore = Object.values(validScores).reduce(reducer, 0)

  return Math.min(maxScore, totalScore)
}

// Given an object, flatten all key/values, taking all nested properties to top level
export const flattenObj = obj => {
  const result = {}
  for (const index in obj) {
    if (typeof obj[index] === 'function') continue
    if (typeof obj[index] === 'object' && !Array.isArray(obj[index])) {
      const temp = flattenObj(obj[index])
      for (const key of Object.keys(temp)) {
        result[key] = temp[key]
      }
    } else {
      result[index] = obj[index]
    }
  }
  return result
}

// Given an object, order key/value pairs alphabetically
export const orderObj = unorderedObj => {
  const orderedObj = Object.keys(unorderedObj)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unorderedObj[key]
      return obj
    }, {})
  return orderedObj
}

const returnTrueKey = obj => {
  if (!obj) return ''
  const keys = Object.keys(obj)
  for (const key of keys) {
    if (obj[key] === true) return key
  }
  return ''
}

// create string from multiselect object (true/false selection)
const createStringFromSelection = (selection, other = '') => {
  if (!selection) return other
  const commonSelect = Object.keys(selection)
    .filter(key => {
      if (other && key === 'other') {
        // if there is an 'other' option where user can input a custom answer, ignore the key
        return false
      }
      return selection[key]
    })
    .join(', ')

  const res = commonSelect + (commonSelect && other ? ', ' : '') + other // add custom answer to the end

  return res
}

// Specifically for hacker info page - fixes/removes certain fields for table display
export const filterHackerInfoFields = (obj, collection) => {
  let newObj = {}
  if (collection === 'Applicants') {
    delete obj.questionnaire?.eventsAttended
    newObj = {
      id: obj._id,
      ...obj.basicInfo,
      ...obj.status,
      ...obj.questionnaire,
      firstTimeHacker: obj.skills?.firstTimeHacker,
    }
    newObj.ethnicity = returnTrueKey(obj.basicInfo?.ethnicity)
    newObj.dietaryRestriction = createStringFromSelection(
      obj.basicInfo?.dietaryRestriction,
      obj.basicInfo?.otherDietaryRestriction || ''
    )
    newObj.pronouns = createStringFromSelection(obj.basicInfo?.pronouns, obj.basicInfo?.otherPronoun || '')
    newObj.role = returnTrueKey(obj.skills?.contributionRole)
    newObj.major = createStringFromSelection(obj.basicInfo?.major, obj.basicInfo?.otherMajor || '')
    newObj.culturalBackground = createStringFromSelection(
      obj.basicInfo?.culturalBackground,
      obj.basicInfo?.otherCulturalBackground || ''
    )
    newObj.race = createStringFromSelection(obj.basicInfo?.race, obj.basicInfo?.otherRace || '')
    newObj.MLHCodeOfConduct = obj.termsAndConditions?.MLHCodeOfConduct
    newObj.MLHPrivacyPolicy = obj.termsAndConditions?.MLHPrivacyPolicy
    newObj.MLHEmailSubscription = obj.termsAndConditions?.MLHEmailSubscription
    newObj.day1Breakfast = obj.dayOf?.day1?.breakfast?.length || 0
    newObj.day1Lunch = obj.dayOf?.day1?.lunch?.length || 0
    newObj.day1Dinner = obj.dayOf?.day1?.dinner?.length || 0
    newObj.day2Breakfast = obj.dayOf?.day2?.breakfast?.length || 0
    newObj.day2Lunch = obj.dayOf?.day2?.lunch?.length || 0
    newObj.day2Dinner = obj.dayOf?.day2?.dinner?.length || 0
    newObj.checkedIn = obj.dayOf?.checkedIn || false
    newObj.longAnswers1 = obj.skills?.longAnswers1 || false
    newObj.longAnswers2 = obj.skills?.longAnswers2 || false
    newObj.longAnswers3 = obj.skills?.longAnswers3 || false

    newObj.attendedEvents = obj.dayOf?.events?.map(e => e.eventName).join(', ') ?? ''
  } else if (collection === 'Projects') {
    newObj = { ...obj }
    delete newObj.grades
    delete newObj.teamMembers
    delete newObj.sponsorPrizes
    delete newObj.lastEditedBy
    delete newObj.links
  } else if (collection === 'DayOf') {
    newObj = { ...obj }
  }
  Object.keys(newObj).forEach(key => {
    if (typeof newObj[key] !== 'number') {
      newObj[key] = String(newObj[key])
    }
  })
  return newObj
}

export const validateQuestions = questions => {
  for (const question of questions) {
    if (
      [
        QUESTION_TYPES.SCHOOL,
        QUESTION_TYPES.COUNTRY,
        QUESTION_TYPES.MAJOR,
        QUESTION_TYPES.PORTFOLIO,
        QUESTION_TYPES.LEGALNAME,
      ].includes(question.type)
    ) {
      continue
    }

    if (!question.formInput || question.formInput.trim() === '') {
      return false
    }
  }
  return true
}

export const convertToCamelCase = str => {
  return str
    .split(' ')
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('')
}
