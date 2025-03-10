/* eslint-disable no-console */
import download from 'downloadjs'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import JSZip from 'jszip'
import { APPLICATION_STATUS, FAQ, FAQCategory } from '../constants'
import { calculateTotalScore, convertToCamelCase, filterHackerInfoFields, flattenObj, orderObj } from './utilities'

if (!firebase.apps.length) {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  }
  firebase.initializeApp(config)
  firebase.firestore().settings({
    ignoreUndefinedProperties: true,
  })
}

export const db = firebase.firestore()
export const storage = firebase.storage()
export const { firestore } = firebase

const faqCollection = FAQ
const Hackathons = 'Hackathons'
const InternalWebsitesCollection = 'InternalWebsites'
const CMSCollection = 'CMS'
const PortalCollection = 'Portal'
export const HackerEvaluationHackathon = 'cmd-f2025'

export const getTimestamp = () => {
  return firebase.firestore.Timestamp.now()
}

// formats timestamp to yyyy-mm-dd hh:mm of type string
export const formatDate = (date, isGMT = false) => {
  if (!date) {
    date = getTimestamp().seconds
  }
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000
  if (!isGMT) {
    date = new Date(date * 1000)
  }
  // convert to RFC3339 then to yyyy-mm-dd hh:mm
  return new Date(date - timeZoneOffset).toISOString().slice(0, -1).slice(0, -7).replace('T', ' ')
}

export const getHackathons = async () => {
  return db
    .collection('Hackathons')
    .get()
    .then(querySnapshot => {
      const hackathons = []
      querySnapshot.forEach(doc => {
        const year = doc.id.slice(-4)
        if (year >= '2024' && year <= '2025') {
          hackathons.push(doc.id)
        }
      })
      return hackathons
    })
}

export const getHackathonPaths = async () => {
  const hackathons = await getHackathons()
  const paths = hackathons.map(id => {
    return {
      params: { id },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const updateHackathonField = async (hackathonId, updateObj) => {
  db.collection(Hackathons).doc(hackathonId).update(updateObj)
}

export const getHackathonSnapShot = (hackathonId, callback) => {
  return db
    .collection(Hackathons)
    .doc(hackathonId)
    .onSnapshot(doc => callback(doc))
}

export const getEvent = (eventID, data) => {
  return data
    ? {
        eventID,
        key: data.key || eventID,
        title: data.title || 'Empty event field',
        text: data.text || 'Empty text description for event',
        date: data.date ? formatDate(data.date.seconds) : formatDate(getTimestamp().seconds),
        points: data.points >= 0 ? data.points : '0',
        type: data.type || 'minievents',
        lastModified: data.lastModified ? formatDate(data.lastModified.seconds) : formatDate(getTimestamp().seconds),
        lastModifiedBy: data.lastModifiedBy || 'Unknown user',
      }
    : null
}

export const getEvents = async hackathon => {
  const eventIDs = await db.collection('Hackathons').doc(hackathon).collection('DayOf').get()
  const events = {}
  eventIDs.docs.forEach(doc => {
    const currEvent = getEvent(doc.id, doc.data())
    if (currEvent) events[doc.id] = currEvent
  })
  return events
}

export const addEvent = async (hackathon, event) => {
  const ref = db.collection('Hackathons').doc(hackathon).collection('DayOf').doc()
  await ref.set({
    title: event.title,
    key: ref.id,
    text: event.text,
    date: event.date,
    points: event.points || '0',
    lastModified: getTimestamp(),
    lastModifiedBy: event.lastModifiedBy,
  })
  return ref.id
}

export const updateEvent = async (hackathon, event) => {
  const ref = db.collection('Hackathons').doc(hackathon).collection('DayOf').doc(event.eventID)
  const currDate = getTimestamp()
  await ref.update({
    title: event.title || 'Empty event field',
    key: event.key || event.eventID,
    text: event.text || 'Empty text description for event',
    date: event.date || currDate,
    points: event.points || '0',
    lastModified: currDate,
    lastModifiedBy: event.lastModifiedBy,
  })
}

export const deleteEvent = async (hackathon, eventID) => {
  await db.collection('Hackathons').doc(hackathon).collection('DayOf').doc(eventID).delete()
}

// Rewards
export const getReward = (rewardID, data) => {
  return data
    ? {
        rewardID,
        reward: data.reward || 'Empty reward field', // Title of the reward
        key: data.key || rewardID, // Key of the reward (defaults to rewardID)
        type: data.type, // Reward type
        blurb: data.blurb || 'Empty blurb description for reward', // Short description of the reward
        from: data.from || 'None', // Source or sponsor of the reward
        imgName: data.imgName || 'None', // Image name (if applicable)
        imgURL: data.imgURL || '', // URL to the reward image
        prizesAvailable: data.prizesAvailable || '0', // Number of winners for the reward
        requiredPoints: data.requiredPoints || '0', // Points required to win the reward
        lastmod: data.lastmod ? formatDate(data.lastmod.seconds) : formatDate(getTimestamp().seconds), // Last modified date
        lastmodBy: data.lastmodBy || 'Unknown user', // Last person who modified the reward
      }
    : null
}

export const getRewards = async hackathon => {
  const rewardIDs = await db.collection('Hackathons').doc(hackathon).collection('Rewards').get()
  const rewards = {}
  rewardIDs.docs.forEach(doc => {
    const currReward = getReward(doc.id, doc.data())
    if (currReward) rewards[doc.id] = currReward
  })
  return rewards
}

export const addReward = async (hackathon, reward) => {
  const ref = db.collection('Hackathons').doc(hackathon).collection('Rewards').doc()
  await ref.set({
    reward: reward.reward, // Title of the reward
    key: ref.id, // Key generated for the reward
    type: reward.type, // Reward type
    blurb: reward.blurb, // Short description of the reward
    imgName: reward.imgName, // Image name (if applicable)
    imgURL: reward.imgURL, // URL to the reward image
    prizesAvailable: reward.prizesAvailable, // Number of prizes we have
    requiredPoints: reward.requiredPoints, // Points required to win the reward
    lastmod: getTimestamp(), // Timestamp of when the reward was last modified
    lastmodBy: reward.lastmodBy, // User who last modified the reward
  })
  return ref.id
}

export const updateReward = async (hackathon, reward) => {
  const ref = db.collection('Hackathons').doc(hackathon).collection('Rewards').doc(reward.rewardID)
  const currDate = getTimestamp()
  await ref.update({
    reward: reward.reward || 'Empty reward field',
    key: reward.key || reward.rewardID,
    type: reward.type,
    blurb: reward.blurb || 'Empty blurb description for reward',
    from: reward.from || 'None',
    imgName: reward.imgName || 'None',
    imgURL: reward.imgURL || '',
    prizesAvailable: reward.prizesAvailable || '0',
    requiredPoints: reward.requiredPoints || '0',
    lastmod: currDate,
    lastmodBy: reward.lastmodBy,
  })
}

export const deleteReward = async (hackathon, rewardID) => {
  await db.collection('Hackathons').doc(hackathon).collection('Rewards').doc(rewardID).delete()
}
// Rewards ^^

const getFaqCategory = faqCategory => {
  switch (faqCategory) {
    case FAQCategory.LOGS:
      return FAQCategory.LOGS
    case FAQCategory.TEAMS:
      return FAQCategory.TEAMS
    case FAQCategory.MISC:
      return FAQCategory.MISC
    default:
      return FAQCategory.GENERAL
  }
}

const getFaq = (faqID, faqData) => {
  return faqData
    ? {
        id: faqID,
        question: faqData.question ? faqData.question : 'Empty question field',
        answer: faqData.answer ? faqData.answer : 'Empty answer field',
        category: faqData.category ? getFaqCategory(faqData.category) : FAQCategory.MISC,
        lastModified: faqData.lastModified
          ? formatDate(faqData.lastModified.seconds)
          : formatDate(getTimestamp().seconds),
        lastModifiedBy: faqData.lastModifiedBy || 'Unknown user',
        hackathonIDs: faqData.hackathonIDs ? faqData.hackathonIDs : [],
      }
    : null
}

export const getFaqs = async () => {
  const faqIDs = await db.collection(faqCollection).get()
  const faqs = {}
  faqIDs.docs.forEach(doc => {
    const currFaq = getFaq(doc.id, doc.data())
    if (currFaq) {
      faqs[doc.id] = currFaq
    }
  })
  return faqs
}

export const addFaq = async faq => {
  const ref = db.collection(faqCollection).doc()
  const currDate = getTimestamp()
  await ref.set({
    question: faq.question,
    category: faq.category,
    answer: faq.answer,
    lastModified: currDate,
    lastModifiedBy: faq.lastModifiedBy,
    hackathonIDs: faq.hackathonIDs,
  })
  return ref.id
}
export const updateFaq = async (faqID, faq) => {
  const ref = db.collection(faqCollection).doc(faqID)
  const currDate = getTimestamp()
  await ref.update({
    question: faq.question || 'Empty Question Field',
    category: faq.category || 'None',
    answer: faq.answer || 'Empty Answer',
    lastModified: currDate,
    lastModifiedBy: faq.lastModifiedBy,
    hackathonIDs: faq.hackathonIDs,
  })
}
export const deleteFaq = async faqID => {
  await db.collection(faqCollection).doc(faqID).delete()
}

export const updateSponsor = async (website, sponsor) => {
  if (sponsor.id) {
    const ref = db.collection('Hackathons').doc(website).collection('Sponsors').doc(sponsor.id)
    await ref.set(sponsor)
    return sponsor.id
  }
  delete sponsor.id
  const ref = db.collection('Hackathons').doc(website).collection('Sponsors').doc()
  await ref.set(sponsor)
  return ref.id
}

export const deleteSponsor = async (website, sponsorId) => {
  const ref = db.collection('Hackathons').doc(website).collection('Sponsors').doc(sponsorId)
  await ref.delete()
}
export const getSponsors = async website => {
  const refs = await db.collection('Hackathons').doc(website).collection('Sponsors').get()
  const sponsors = {}
  refs.docs.forEach(doc => {
    sponsors[doc.id] = doc.data()
  })
  return sponsors
}

export const uploadSponsorImageToStorage = async (website, file) => {
  try {
    const ref = storage.ref(`sponsor/${website}/${file.name}`)
    const uploadData = await ref.put(file)
    return uploadData.ref.getDownloadURL()
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e)
    return null
  }
}

export const uploadLivesiteLogoToStorage = async file => {
  try {
    const ref = storage.ref(`logo.svg`)
    const uploadData = await ref.put(file)
    return uploadData.ref.getDownloadURL()
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e)
    return null
  }
}

export const getImageFilebyName = async (website, imgURL) => {
  const imgId = imgURL.split('/').slice(-1)[0]
  const ref = await storage.ref(`sponsor/${website}`).child(imgId).getDownloadURL()
  return ref
}
export const deleteSponsorImagefromStorage = async (website, imgName) => {
  const ref = storage.ref(`sponsor/${website}/${imgName}`)
  await ref.delete()
}

export const logout = async () => {
  await firebase.auth().signOut()
}

export const subscribeToFlags = (id, cb) => {
  return db
    .collection(Hackathons)
    .doc(id)
    .onSnapshot(snap => {
      cb(snap.data().featureFlags)
    })
}

export const updateFlags = async (id, flags) => {
  const doc = {
    featureFlags: flags,
  }
  return db.collection(Hackathons).doc(id).update(doc)
}

// www-specific

export const subscribeToHiringSettings = cb => {
  return db
    .collection(Hackathons)
    .doc('www')
    .onSnapshot(snap => {
      cb(snap.data().hiring)
    })
}

export const updateHiringSettings = async hiringSettings => {
  const doc = {
    hiring: hiringSettings,
  }
  return db.collection(Hackathons).doc('www').update(doc)
}

export const subscribeToCtaLink = cb => {
  return db
    .collection(Hackathons)
    .doc('www')
    .onSnapshot(snap => {
      cb(snap.data().CTALink)
    })
}

export const updateCtaLink = async ctaLink => {
  const doc = {
    CTALink: ctaLink,
  }
  return db.collection(Hackathons).doc('www').update(doc)
}

/// www-specific end

export const updateTags = async (id, tags) => {
  const doc = { tags }
  return db.collection(Hackathons).doc(id).update(doc)
}

export const subscribeToCMSStatus = dateCallback => {
  return db
    .collection(InternalWebsitesCollection)
    .doc(CMSCollection)
    .onSnapshot(snap => {
      const { offUntilDate } = snap.data()
      dateCallback(offUntilDate)
    })
}

const portalDocRef = db.collection(InternalWebsitesCollection).doc(PortalCollection)

const announcementsRef = hackathon => {
  return db.collection(Hackathons).doc(hackathon).collection('Announcements')
}

export const subscribeToLivesiteAnnouncements = (hackathon, callback) => {
  return announcementsRef(hackathon)
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => {
      const announcements = {}
      querySnapshot.docs.forEach(doc => {
        announcements[doc.id] = doc.data()
      })
      callback(announcements)
    })
}

export const updateAnnouncement = async (hackathon, announcement) => {
  if (announcement.id) {
    const ref = announcementsRef(hackathon).doc(announcement.id)
    delete announcement.id
    await ref.set(announcement)
    return announcement.id
  }
  announcement.timestamp = Date.now()
  const ref = await announcementsRef(hackathon).doc().set(announcement)
  console.log(ref)
  return ref
}

export const deleteAnnouncement = async (hackathon, id) => {
  await announcementsRef(hackathon).doc(id).delete()
}

export const subscribeToPortalSettings = callback => {
  return db
    .collection(InternalWebsitesCollection)
    .doc(PortalCollection)
    .onSnapshot(doc => callback(doc.data()))
}

export const updatePortalSettings = async data => {
  return portalDocRef.update(data)
}

export const getLivesiteQuicklinks = async (hackathon, callback) => {
  const eventIDs = await db.collection('Hackathons').doc(hackathon).collection('QuickLinks').orderBy('label').get()
  return callback(
    eventIDs.docs.map(doc => {
      return doc.data()
    })
  )
}

const quicklinksRef = hackathon => {
  return db.collection(Hackathons).doc(hackathon).collection('QuickLinks')
}

export const subscribeToLivesiteQuicklinks = (hackathon, callback) => {
  return quicklinksRef(hackathon)
    .orderBy('label')
    .onSnapshot(querySnapshot => {
      const quicklinks = {}
      querySnapshot.docs.forEach(doc => {
        quicklinks[doc.id] = doc.data()
      })
      callback(quicklinks)
    })
}

export const updateQuicklink = async (hackathon, quicklink) => {
  if (quicklink.id) {
    quicklink.lastModified = getTimestamp()
    const ref = quicklinksRef(hackathon).doc(quicklink.id)
    delete quicklink.id
    await ref.set(quicklink)
    return quicklink.id
  }
  quicklink.lastModified = getTimestamp()
  const ref = await quicklinksRef(hackathon).doc().set(quicklink)
  return ref
}

export const deleteQuicklink = async (hackathon, id) => {
  await quicklinksRef(hackathon).doc(id).delete()
}

export const subscribeToPortalSchedule = (hackathon, callback) => {
  return db
    .collection(Hackathons)
    .doc(hackathon)
    .collection('DayOf')
    .onSnapshot(querySnapshot => {
      const events = {}
      querySnapshot.docs.forEach(doc => {
        events[doc.id] = {
          ...doc.data(),
          eventID: doc.id,
        }
      })
      callback(events)
    })
}

export const addPortalEvent = async (hackathon, event) => {
  const ref = db.collection('Hackathons').doc(hackathon).collection('DayOf').doc()
  // delete event.eventID
  // delete event.key
  event.eventID = ref.id
  event.key = ref.id
  await ref.set({
    ...event,
    lastModified: getTimestamp(),
  })
  return ref.id
}

export const updatePortalEvent = async (hackathon, event) => {
  const ref = db.collection('Hackathons').doc(hackathon).collection('DayOf').doc(event.eventID)
  // delete event.eventID
  // delete event.key
  await ref.update({
    ...event,
    lastModified: getTimestamp(),
  })
}

export const deletePortalEvent = async (hackathon, eventID) => {
  await db.collection('Hackathons').doc(hackathon).collection('DayOf').doc(eventID).delete()
}

export const createProject = async (hackathon, project) => {
  await db.collection('Hackathons').doc(hackathon).collection('Projects').add(project)
}

const projectsRef = hackathon => {
  return db.collection(Hackathons).doc(hackathon).collection('Projects')
}

export const subscribeToProjects = (hackathon, callback) => {
  return projectsRef(hackathon)
    .orderBy('title')
    .onSnapshot(querySnapshot => {
      const projects = {}
      querySnapshot.docs.forEach(doc => {
        projects[doc.id] = doc.data()
      })
      callback(projects)
    })
}

export const updateProject = async (hackathon, project) => {
  if (project.id) {
    const ref = projectsRef(hackathon).doc(project.id)
    delete project.id
    await ref.set(project)
    return project.id
  }
  const ref = await projectsRef(hackathon).doc().set(project)
  console.log(ref)
  return ref
}

export const deleteProject = async (hackathon, id) => {
  await projectsRef(hackathon).doc(id).delete()
}

export const getHackerInfo = async (callback, hackathon, collection) => {
  const res = []
  db.collection('Hackathons')
    .doc(hackathon)
    .collection(collection)
    .onSnapshot(snap => {
      const hackerInfoPromises = snap.docs.map(async doc => {
        return orderObj(flattenObj(await filterHackerInfoFields(db, doc.data(), hackathon, collection)))
      })
      Promise.all(hackerInfoPromises).then(callback)
    })
  return res
}

export const getApplicants = async hackathon => {
  const data = await db.collection('Hackathons').doc(hackathon).collection('Applicants').get()
  return data.docs.map(doc => doc.data())
}
// Asessment portal
export const getAllApplicants = async callback => {
  return db
    .collection('Hackathons')
    .doc(HackerEvaluationHackathon)
    .collection('Applicants')
    .where('status.applicationStatus', '!=', 'inProgress')
    .onSnapshot(snap => {
      callback(
        snap.docs
          .map(doc => doc.data())
          .filter(a => a.basicInfo.identifyAsUnderrepresented !== 'no') // cmd-f filter; remove after
          .sort((a, b) => a.submission?.lastUpdated - b.submission?.lastUpdated)
      )
    })
}

export const getApplicantsToAccept = async (
  score,
  zscore,
  numHackathonsMin,
  numHackathonsMax,
  yearLevelsSelected,
  contributionRolesSelected,
  numExperiencesMin,
  numExperiencesMax
) => {
  const applicants = await db.collection('Hackathons').doc(HackerEvaluationHackathon).collection('Applicants').get()

  return applicants.docs
    .filter(app => {
      const appData = app.data()
      const appStatus = appData.status.applicationStatus

      if (appStatus !== APPLICATION_STATUS.scored.text) return false

      // score
      if (score !== undefined && appData.score.totalScore < score) return false

      // zscore
      const { NumExperiences, ResponseOneScore, ResponseTwoScore, ResponseThreeScore } = appData.score.scores || {}
      const totalZScore = [
        NumExperiences?.normalizedScore,
        ResponseOneScore?.normalizedScore,
        ResponseTwoScore?.normalizedScore,
        ResponseThreeScore?.normalizedScore,
      ].reduce((acc, normalizedScore) => acc + (normalizedScore !== undefined ? normalizedScore : 0), 0)

      if (zscore !== undefined && totalZScore < zscore) return false

      // range of hackathons attended
      const numHackathonsAttended = appData.skills?.numHackathonsAttended
      if (
        (numHackathonsMin !== undefined && Number(numHackathonsAttended) < Number(numHackathonsMin)) ||
        (numHackathonsMax !== undefined && Number(numHackathonsAttended) > Number(numHackathonsMax))
      ) {
        return false
      }

      // range for year level
      const yearLevel = appData.basicInfo?.educationLevel
      if (yearLevelsSelected && yearLevelsSelected.length > 0 && !yearLevelsSelected.includes(yearLevel)) {
        return false
      }

      // for intended role
      if (contributionRolesSelected && contributionRolesSelected.length > 0) {
        const contributionRoles = appData.skills?.contributionRole || {}
        const hasValidRole = contributionRolesSelected.some(
          role => contributionRoles[convertToCamelCase(role)] === true
        )
        if (!hasValidRole) return false
      }

      // range for # of experiences
      const numExperiences = appData.score?.scores?.NumExperiences.score
      if (
        (numExperiencesMin !== undefined && Number(numExperiences) < Number(numExperiencesMin)) ||
        (numExperiencesMax !== undefined && Number(numExperiences) > Number(numExperiencesMax))
      ) {
        return false
      }

      return true
    })
    .map(doc => doc.data())
}

export const getCSVData = async () => {
  const apps = await db
    .collection('Hackathons')
    .doc(HackerEvaluationHackathon)
    .collection('Applicants')
    .where('status.applicationStatus', '!=', 'inProgress')
    .get()
  const CSV = apps.docs.map(doc => {
    const {
      basicInfo: {
        legalFirstName,
        legalLastName,
        preferredName,
        email,
        educationLevel,
        phoneNumber,
        school,
        countryOfResidence,
        major,
      },
      status: { applicationStatus },
      skills: { firstTimeHacker },
      submission: { lastUpdated },
    } = doc.data()
    const totalScore = doc.data().score?.totalScore ?? '?'
    return [
      legalFirstName,
      legalLastName,
      preferredName,
      email,
      phoneNumber,
      school,
      educationLevel,
      countryOfResidence,
      totalScore,
      applicationStatus,
      major,
      firstTimeHacker,
      lastUpdated.toDate(),
    ]
  })
  CSV.unshift([
    'First Name',
    'Last Name',
    'Preferred Name',
    'Email',
    'Phone Number',
    'School Name',
    'Level of Study',
    'Country',
    'Total Score',
    'Application Status',
    'Major',
    'First time hacker?',
    'Last Updated',
  ])
  return CSV
}


// export const getRaffleNumbers = async () => {
//   const apps = await db
//     .collection('Hackathons')
//     .doc(HackerEvaluationHackathon)
//     .collection('Applicants')
//     .where('dayOf.checkedIn', '==', true)
//     .get();

//   // Use Promise.all to handle asynchronous logic for each applicant
//   const CSV = await Promise.all(
//     apps.docs.map(async (doc) => {
//       const {
//         basicInfo: {
//           legalFirstName,
//           legalLastName,
//           preferredName,
//           email,
//           phoneNumber,
//         },
//         dayOf,
//       } = doc.data();

//       // Ensure dayOf.events exists before proceeding
//       if (!dayOf?.events || !Array.isArray(dayOf.events)) return null;

//       // Fetch event documents for each event in dayOf.events
//       const dayOfDocsPromises = dayOf.events.map((e) =>
//         db
//           .collection('Hackathons')
//           .doc(HackerEvaluationHackathon)
//           .collection('DayOf')
//           .doc(e.eventId)
//           .get()
//       );
      
//       // Wait for all dayOfDocs to resolve
//       const dayOfDocs = await Promise.all(dayOfDocsPromises);
      
//       // Calculate total points from events
//       const totalPoints = dayOfDocs.reduce(
//         (acc, curr) => acc + Number(curr.data()?.points ?? 0),
//         0
//       );

//       // Calculate raffle entries based on total points
//       const totalRaffleEntries = Math.floor(totalPoints / 15);

//       return [
//         legalFirstName,
//         legalLastName,
//         preferredName,
//         email,
//         phoneNumber,
//         totalPoints.toString(),
//         totalRaffleEntries.toString(),
//       ];
//     })
//   );

//   // Filter out null results (in case any docs didn't have events or checked-in status)
//   const validCSV = CSV.filter((entry) => entry !== null);

//   // Add headers to CSV
//   validCSV.unshift([
//     'First Name',
//     'Last Name',
//     'Preferred Name',
//     'Email',
//     'Phone Number',
//     'Total Points',
//     'Raffle Entries',
//   ]);

//   console.log(validCSV);

//   return validCSV;
// };

export const getRaffleWheelEmails = async () => {
  const apps = await db
    .collection('Hackathons')
    .doc(HackerEvaluationHackathon)
    .collection('Applicants')
    .where('dayOf.checkedIn', '==', true)
    .get();

  // Create an array to hold all rows for the raffle entries
  const raffleEntries = [];
  let counter = 1; // Initialize a counter

  // Iterate over the documents and calculate raffle entries for each user
  for (const doc of apps.docs) {
    const {
      basicInfo: { email, legalFirstName, preferredName, legalLastName },
      dayOf,
    } = doc.data();

    if (!dayOf?.events || !Array.isArray(dayOf.events)) continue;

    // Determine the name to use
    const displayName = (preferredName?.trim() || legalFirstName) + " " + legalLastName;

    // Fetch event documents for each event in dayOf.events
    const dayOfDocsPromises = dayOf.events.map((e) =>
      db
        .collection('Hackathons')
        .doc(HackerEvaluationHackathon)
        .collection('DayOf')
        .doc(e.eventId)
        .get()
    );

    const dayOfDocs = await Promise.all(dayOfDocsPromises);

    // Calculate total points from events (+15 from check-in)
    const totalPoints =
      15 +
      dayOfDocs.reduce((acc, curr) => acc + Number(curr.data()?.points ?? 0), 0);

    // Calculate raffle entries based on total points
    const totalRaffleEntries = Math.floor(totalPoints / 15);

    // Add the user's data multiple times based on raffle entries
    for (let i = 0; i < totalRaffleEntries; i++) {
      raffleEntries.push([counter, `${displayName} [${counter}]`, email]); 
      counter++; // Increment counter
    }
  }

  // Prepare CSV with "Number", "First Name + Number", and "Raffle Entries" columns
  const CSV = [
    ['Number', 'Name + Number', 'Raffle Entries'],
    ...raffleEntries,
  ];

  console.log(CSV);

  return CSV;
};


export const getResumeFile = async userId => {
  try {
    const ref = storage.ref(`applicantResumes/${userId}`)
    return await ref.getDownloadURL()
  } catch (e) {
    return undefined
  }
}

export const getWaiverFile = async userId => {
  try {
    const ref = storage.ref(`hackerWaivers/${userId}`)
    return await ref.getDownloadURL()
  } catch (e) {
    return undefined
  }
}

export const getAllResumes = async () => {
  const apps = await db
    .collection('Hackathons')
    .doc(HackerEvaluationHackathon)
    .collection('Applicants')
    .where('status.applicationStatus', '!=', 'inProgress')
    .get()

  const sharableApps = apps.docs.filter(app => {
    const {
      termsAndConditions: { shareWithSponsors },
    } = app.data()
    return shareWithSponsors
  })

  const namesAndIds = sharableApps.map(doc => {
    const {
      basicInfo: { firstName, lastName },
    } = doc.data()
    return {
      id: doc.id,
      name: `${firstName} ${lastName}`,
    }
  })

  const urlPromises = namesAndIds.map(async info => {
    const url = await getResumeFile(info.id)
    return { ...info, url }
  })

  const APPUrls = await Promise.all(urlPromises)

  const zip = new JSZip()
  const zipPromises = APPUrls.map(async ({ url, name }) => {
    const resume = (await fetch(url)).blob()
    zip.file(`${name}.pdf`, resume, { binary: true })
  })
  await Promise.all(zipPromises)
  const finishedZip = await zip.generateAsync({ type: 'blob' })
  download(finishedZip, 'Resumes', 'application/zip')
}

export const updateApplicantScore = async (applicantID, newScores, oldScores, comment, adminEmail) => {
  const totalScore = newScores ? calculateTotalScore(newScores) : null
  const scoresWithUpdatedTimes = Object.entries(newScores).reduce((prev, [question, scoreObj]) => {
    const scoreChanged = oldScores?.[question]?.score !== scoreObj.score
    return {
      ...prev,
      [question]: {
        ...scoreObj,
        lastUpdated: scoreChanged ? getTimestamp() : oldScores?.[question]?.lastUpdated,
        lastUpdatedBy: scoreChanged ? adminEmail : oldScores?.[question]?.lastUpdatedBy,
      },
    }
  }, {})

  db.collection('Hackathons')
    .doc(HackerEvaluationHackathon)
    .collection('Applicants')
    .doc(applicantID)
    .update({
      score: {
        scores: scoresWithUpdatedTimes,
        totalScore,
        comment,
      },
    })

  return scoresWithUpdatedTimes
}

export const updateApplicantStatus = async (userId, applicationStatus, hackathon) => {
  const statusUpdate = {
    'status.applicationStatus': applicationStatus,
  }

  if (applicationStatus === 'acceptedAndAttending') {
    statusUpdate['status.attending'] = true
    statusUpdate['status.responded'] = true
  } else if (applicationStatus === 'acceptedUnRSVP') {
    statusUpdate['status.attending'] = false
    statusUpdate['status.responded'] = true
  }

  return db
    .collection('Hackathons')
    .doc(hackathon || HackerEvaluationHackathon)
    .collection('Applicants')
    .doc(userId)
    .update(statusUpdate)
}

export const getApplicantTags = async (userId, callback) => {
  return db
    .collection('Hackathons')
    .doc(HackerEvaluationHackathon)
    .collection('Applicants')
    .doc(userId)
    .onSnapshot(snap => {
      callback(snap.data().applicantTags ?? [])
    })
}

export const updateApplicantTags = async (userId, applicantTags) => {
  return db
    .collection('Hackathons')
    .doc(HackerEvaluationHackathon)
    .collection('Applicants')
    .doc(userId)
    .update({ applicantTags })
}

export const getAllGradedApplicants = async callback => {
  return db
    .collection('Hackathons')
    .doc(HackerEvaluationHackathon)
    .collection('Applicants')
    .where('status.applicationStatus', '==', 'scored')
    .onSnapshot(snap => {
      callback(
        snap.docs
          .map(doc => doc.data())
          .filter(a => a.basicInfo.identifyAsUnderrepresented !== 'no') // cmd-f filter; remove after
          .sort((a, b) => a.submission?.lastUpdated - b.submission?.lastUpdated)
      )
    })
}

// hacker application questions specific
export const getHackerAppQuestions = async (selectedHackathon, category) => {
  const data = await db.collection('HackerAppQuestions').doc(selectedHackathon.slice(0, -4)).collection(category).get()
  return data.docs.map(doc => doc.data())
}

export const updateHackerAppQuestions = async (selectedHackathon, questions, category) => {
  const hackathonRef = db.collection('HackerAppQuestions').doc(selectedHackathon.slice(0, -4))
  const categoryRef = hackathonRef.collection(category)

  const batch = db.batch()

  // clear all
  const existingDocs = await categoryRef.get()
  existingDocs.forEach(doc => {
    batch.delete(doc.ref)
  })

  questions.forEach((question, index) => {
    const newDocRef = categoryRef.doc(`${index.toString().padStart(3, '0')}`)
    batch.set(newDocRef, question)
  })
  await batch.commit()
}

export const getHackerAppQuestionsMetadata = async (selectedHackathon, category) => {
  const categoryRef = await db.collection('HackerAppQuestions').doc(selectedHackathon.slice(0, -4)).get()
  return categoryRef.data()[category]
}

export const updateHackerAppQuestionsMetadata = async (selectedHackathon, category, updatedMetadata) => {
  const doc = {
    [category]: updatedMetadata,
  }
  return db.collection('HackerAppQuestions').doc(selectedHackathon.slice(0, -4)).set(doc, { merge: true })
}

export const getSpecificHackerAppQuestionOptions = async (category, formInput) => {
  const querySnapshot = await db
    .collection('HackerAppQuestions')
    .doc(HackerEvaluationHackathon.slice(0, -4))
    .collection(category)
    .where('formInput', '==', formInput)
    .get()

  if (querySnapshot.empty) {
    console.warn(`No document found with formInput: ${formInput} in category: ${category}`)
    return null
  }

  const matchedElement = querySnapshot.docs[0]
  const { options } = matchedElement.data()
  return options
}

// hacker application questions specific end

export const updateWaiver = async (userId, waiver, status, hackathon) => {
  return db
    .collection('Hackathons')
    .doc(hackathon || HackerEvaluationHackathon)
    .collection('Applicants')
    .doc(userId)
    .update({
      [`basicInfo.${waiver}`]: status,
    })
}
