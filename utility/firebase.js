/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

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

const storage = firebase.storage();
const webCollection = 'Website_content';

const fireDb = {
  getNumberOfApplicants: (callback) => {
    db.collection('hacker_email_2020').onSnapshot(callback);
  },
  getNumberOfAccepted: (callback) => {
    db.collection('hacker_info_2020')
      .where('tags.accepted', '==', true)
      .onSnapshot(callback);
  },
  getScored: (callback) => {
    db.collection('hacker_info_2020')
      .where('score.finalScore', '>', -1)
      .onSnapshot(callback);
  },
  // applicantToCSV: async () => {
  //   const hackerReference = db.collection('hacker_info_2020');
  //   const snapshot = await hackerReference.get();
  //   const hackerInfo = snapshot.docs.map(doc => doc.data());
  //   const parser = new Parser.Parser();
  //   const csv = parser.parse(hackerInfo);
  //   return csv;
  // },
  isAdmin: async (email) => {
    const ref = db.collection('admins');
    const admins = (await ref.get()).docs;
    for (const admin of admins) {
      const col = ref.doc(admin.id);
      const userData = (await col.get()).data();
      if (userData.email === email) return true;
    }
    return false;
  },
  getFlags: async () => {
    const websites = await fireDb.getWebsites();
    const featureFlags = {};
    for (const website of websites) {
      const websiteDataRef = await db
        .collection(webCollection)
        .doc(website)
        .get();
      const websiteData = websiteDataRef.data();
      featureFlags[website] = websiteData.featureFlags;
    }
    return featureFlags;
  },
  updateFlags: async (website, flags) => {
    const websiteDataRef = db.collection(webCollection).doc(website);
    await websiteDataRef.update({ featureFlags: flags });
  },
  getWebsites: async () => {
    const ref = db.collection(webCollection);
    return (await ref.get()).docs.map((doc) => doc.id);
  },
  getIntroText: async () => {
    const websites = await fireDb.getWebsites();
    const introTexts = {};
    for (const website of websites) {
      const websiteData = (
        await db.collection(webCollection).doc(website).get()
      ).data();
      introTexts[website] = {
        introText: websiteData.IntroText
          ? websiteData.IntroText.toString()
          : '',
        introSubtext: websiteData.IntroSubtext
          ? websiteData.IntroSubtext.toString()
          : '',
        introLastEditedBy: websiteData.IntroLastEditedBy || undefined,
        introLastEditedDate: websiteData.IntroLastEditedDate || undefined,
        introButtonEnabled: websiteData.IntroButtonEnabled,
        introButtonLink: websiteData.IntroButtonLink,
        introSignUpButtonText: websiteData.SignUpButtonText,
        introSignUpText: websiteData.SignUpText,
      };
    }
    return introTexts;
  },
  getEvents: async () => {
    const websites = await fireDb.getWebsites();
    const events = {};
    for (const website of websites) {
      const websiteData = await db
        .collection(webCollection)
        .doc(website)
        .collection('Events')
        .get();
      events[website] = await websiteData.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          text: data.text || '',
          order: data.order,
          imageLink: data.imageLink || '',
          eventLink: data.eventLink || '',
          signupLink: data.signupLink || '',
          eventLastEditedBy: data.eventLastEditedBy || undefined,
          eventLastEditedDate: data.eventLastEditedDate || undefined,
          enabled: data.enabled,
        };
      });
    }
    return events;
  },
  addEvent: async (website, event) => {
    const ref = db.collection(webCollection).doc(website).collection('Events');
    await ref.add({
      title: event.title || '',
      order: parseInt(event.order) || -1,
      text: event.text || '',
      eventLink: event.eventLink || '',
      learnMoreLink: event.learnMoreLink || '',
      signupLink: event.signupLink || '',
      imageLink: event.imageLink || '',
      enabled: true,
      eventLastEditedBy: event.eventLastEditedBy,
      eventLastEditedDate: event.eventLastEditedDate.toDateString(),
    });
  },
  updateEvent: async (website, event) => {
    const ref = db
      .collection(webCollection)
      .doc(website)
      .collection('Events')
      .doc(event.id);
    await ref.update({
      title: event.title || '',
      order: parseInt(event.order) || -1,
      text: event.text || '',
      eventLink: event.eventLink || '',
      learnMoreLink: event.learnMoreLink || '',
      signupLink: event.signupLink || '',
      imageLink: event.imageLink || '',
      eventLastEditedBy: event.eventLastEditedBy,
      eventLastEditedDate: event.eventLastEditedDate.toDateString(),
    });
  },
  updateEventEnabled: async (website, event) => {
    const ref = db
      .collection(webCollection)
      .doc(website)
      .collection('Events')
      .doc(event.id);
    await ref.update({
      enabled: event.enabled,
    });
  },
  updateIntroText: async (
    website,
    introText,
    introSubtext,
    user,
    date,
    enabled = undefined,
    signupLink = undefined,
    signupButtonText = undefined,
    signupText = undefined
  ) => {
    const ref = db.collection(webCollection).doc(website);
    await ref.update({
      IntroText: introText,
      IntroSubtext: introSubtext,
      IntroLastEditedBy: user,
      IntroLastEditedDate: date,
      IntroButtonEnabled: enabled || false,
      IntroButtonLink: signupLink || '',
      SignUpButtonText: signupButtonText || '',
      SignUpText: signupText || '',
    });
  },
  setSponsor: async (website, sponsor) => {
    const ref = db
      .collection("Hackathons")
      .doc(website)
      .collection('Sponsors')
      .doc(sponsor.name);
    await ref.set({
      imgURL: sponsor.imgURL,
      name: sponsor.name,
      link: sponsor.link,
      tier: sponsor.tier,
      lastmod: sponsor.lastmod
    })
  },
  deleteSponsor: async(website, sponsorName) => {
    const ref = db
      .collection("Hackathons")
      .doc(website)
      .collection("Sponsors")
      .doc(sponsorName);
    await ref.delete();
  },
  getSponsors: async(website) => { 
    var A = {};
    const refs = await db.collection("Hackathons").doc(website).collection("Sponsors").get();
    refs.docs.forEach(doc => {A[doc.id] = doc.data()})
    return A;
  },
  async uploadImages(website, files) {
    const failedUploads = [];
    for (const file of files) {
      try {
        const ref = storage.ref(`${website}/${file.name}`);
        await ref.put(file);
        if (file.altImage) {
          const altRef = storage.ref(`${website}/alt${file.name}`);
          await altRef.put(file.altImage);
        }
      } catch (e) {
        console.log(e);
        failedUploads.push(file.name);
        continue;
      }
      try {
        await this.addSponsorInformation(website, {
          image: file.name,
          name: file.sponsorName.trim(),
          url: file.url.trim(),
          rank: file.rank,
          altImage: file.altImage ? `alt${file.name}` : null,
        });
      } catch (e) {
        const ref = storage.ref(`${website}/${file.name}`);
        await ref.delete();
        if (file.altImage) {
          const altRef = storage.ref(`${website}/alt${file.name}`);
          await altRef.delete();
        }
        console.log(e);
        failedUploads.push(file.name);
      }
    }
    return failedUploads;
  },
  getTimestamp: () => {
    return firebase.firestore.Timestamp.now();
  },
  getImageUrl: async (WebDocument, imageref) => {
    const image = storage.ref(`${WebDocument}/${imageref}`);
    const url = await image.getDownloadURL();
    return url;
  },
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

export default fireDb;
