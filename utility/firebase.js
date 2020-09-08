/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import * as Parser from 'json2csv';
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

const webCollection = 'Website_content';
const faqCollection = FAQ;
const Hackathons = 'Hackathons';

export const formatDate = (date) => {
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

export default fireDb;
