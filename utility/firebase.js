/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { FAQ, FAQCategory } from '../constants';

if (!firebase.apps.length) {
  const config = {
    apiKey:
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
      process.env.NUXT_ENV_FIREBASE_API_KEY,
    authDomain:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
      process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
    databaseURL:
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
      process.env.NUXT_ENV_FIREBASE_DATABASE_URL,
    projectId:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
    measurementId:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
      process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID,
    appId:
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
      process.env.NUXT_ENV_FIREBASE_APP_ID,
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
      process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
  };
  firebase.initializeApp(config);
}

export const db = firebase.firestore();
export const storage = firebase.storage();

const webCollection = 'Website_content';
const faqCollection = FAQ;
const Hackathons = 'Hackathons';

export const formatDate = (date) => {
  if (!date) {
    return 'invalid date';
  }
  date = new Date(date * 1000);
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date - timeZoneOffset)
    .toISOString()
    .slice(0, -1)
    .slice(0, -4)
    .replace('T', ' ');
};

export const getTimestamp = () => {
  return firebase.firestore.Timestamp.now();
};

export const getDocument = async (hackathon, collection) => {
  if (collection === hackathon) {
    const ref = db.collection(webCollection).doc(hackathon);
    const data = await ref.get();
    return data.data();
  }
  const ref = db
    .collection(webCollection)
    .doc(hackathon)
    .collection(collection);
  return (await ref.get()).docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
};

export const updateDocument = (hackathon, collection, docId, object) => {
  db.collection(webCollection)
    .doc(hackathon)
    .collection(collection)
    .doc(docId)
    .update(object);
};

export const addDocument = async (hackathon, collection, object) => {
  const ref = await db
    .collection(webCollection)
    .doc(hackathon)
    .collection(collection)
    .add(object);
  return ref.id;
};

export const deleteDocument = async (hackathon, collection, docId) => {
  await db
    .collection(webCollection)
    .doc(hackathon)
    .collection(collection)
    .doc(docId)
    .delete();
};

export const getHackathons = async () => {
  return db
    .collection('Hackathons')
    .get()
    .then((querySnapshot) => {
      const hackathons = [];
      querySnapshot.forEach((doc) => {
        hackathons.push(doc.id);
      });
      return hackathons;
    });
};

export const getHackathonPaths = async () => {
  const hackathons = await getHackathons();
  const paths = hackathons.map((id) => {
    return {
      params: { id },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const updateHackathonField = async (hackathonId, updateObj) => {
  db.collection(Hackathons).doc(hackathonId).update(updateObj);
};

export const getHackathonSnapShot = (hackathonId, callback) => {
  return db
    .collection(Hackathons)
    .doc(hackathonId)
    .onSnapshot((doc) => callback(doc));
};

const getFaqCategory = (faqCategory) => {
  switch (faqCategory) {
    case FAQCategory.LOGS:
      return FAQCategory.LOGS;
    case FAQCategory.TEAMS:
      return FAQCategory.TEAMS;
    case FAQCategory.MISC:
      return FAQCategory.MISC;
    default:
      return FAQCategory.GENERAL;
  }
};

const getFaq = async (faqID) => {
  const faqData = (await db.collection(faqCollection).doc(faqID).get()).data();
  return faqData
    ? {
        id: faqID,
        question: faqData.question ? faqData.question : 'Empty question field',
        answer: faqData.answer ? faqData.answer : 'Empty answer field',
        category: faqData.category
          ? getFaqCategory(faqData.category)
          : FAQCategory.MISC,
        lastModified: faqData.lastModified
          ? formatDate(faqData.lastModified.seconds)
          : formatDate(getTimestamp().seconds),
        lastModifiedBy: faqData.lastModifiedBy || 'Unknown user',
        hackathonIDs: faqData.hackathonIDs ? faqData.hackathonIDs : [],
      }
    : null;
};

const getfaqIDs = async () => {
  return (await db.collection(faqCollection).get()).docs.map((doc) => doc.id);
};

export const getFaqs = async () => {
  const faqIDs = await getfaqIDs();
  const faqs = {};
  for (const faqID of faqIDs) {
    const currFaq = await getFaq(faqID);
    if (currFaq) {
      faqs[faqID] = currFaq;
    }
  }
  return faqs;
};

export const addFaq = async (faq) => {
  const ref = db.collection(faqCollection).doc();
  const currDate = getTimestamp();
  await ref.set({
    question: faq.question,
    category: faq.category,
    answer: faq.answer,
    lastModified: currDate,
    lastModifiedBy: faq.lastModifiedBy,
    hackathonIDs: faq.hackathonIDs,
  });
  return ref.id;
};
export const updateFaq = async (faqID, faq) => {
  const ref = db.collection(faqCollection).doc(faqID);
  const currDate = getTimestamp();
  await ref.update({
    question: faq.question || 'Empty Question Field',
    category: faq.category || 'None',
    answer: faq.answer || 'Empty Answer',
    lastModified: currDate,
    lastModifiedBy: faq.lastModifiedBy,
    hackathonIDs: faq.hackathonIDs,
  });
};
export const deleteFaq = async (faqID) => {
  await db.collection(faqCollection).doc(faqID).delete();
};

export const updateSponsor = async (website, sponsor) => {
  if (sponsor.id) {
    const ref = db
      .collection('Hackathons')
      .doc(website)
      .collection('Sponsors')
      .doc(sponsor.id);
    await ref.set(sponsor);
    return sponsor.id;
  }
  delete sponsor.id;
  const ref = db
    .collection('Hackathons')
    .doc(website)
    .collection('Sponsors')
    .doc();
  await ref.set(sponsor);
  return ref.id;
};

export const deleteSponsor = async (website, sponsorId) => {
  const ref = db
    .collection('Hackathons')
    .doc(website)
    .collection('Sponsors')
    .doc(sponsorId);
  await ref.delete();
};
export const getSponsors = async (website) => {
  const refs = await db
    .collection('Hackathons')
    .doc(website)
    .collection('Sponsors')
    .get();
  const sponsors = {};
  refs.docs.forEach((doc) => {
    sponsors[doc.id] = doc.data();
  });
  return sponsors;
};

export const uploadSponsorImageToStorage = async (website, file) => {
  try {
    const ref = storage.ref(`sponsor/${website}/${file.name}`);
    const uploadData = await ref.put(file);
    return uploadData.ref.getDownloadURL();
  } catch (e) {
    alert(e);
    return null;
  }
};
export const getImageFilebyName = async (website, imgURL) => {
  const imgId = imgURL.split('/').slice(-1)[0];
  const ref = await storage
    .ref(`sponsor/${website}`)
    .child(imgId)
    .getDownloadURL();
  return ref;
};
export const deleteSponsorImagefromStorage = async (website, imgName) => {
  const ref = storage.ref(`sponsor/${website}/${imgName}`);
  await ref.delete();
};

export const logout = async () => {
  await firebase.auth().signOut();
};

export const subscribeToFlags = (id, cb) => {
  return db
    .collection(Hackathons)
    .doc(id)
    .onSnapshot((snap) => {
      cb(snap.data().featureFlags);
    });
};

export const updateFlags = async (id, flags) => {
  const doc = {
    featureFlags: flags,
  };
  return db.collection(Hackathons).doc(id).update(doc);
};
