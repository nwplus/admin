module.exports = () => {
  if (process.env.DEPLOY_ENV !== "PRODUCTION") return {}
  return {
    env: {
      NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDGa7alU0NhfBATSQ6CalkY4Za9wWPrM7o",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "nwplus-ubc.firebaseapp.com",
      NEXT_PUBLIC_FIREBASE_DATABASE_URL: "https://nwplus-ubc.firebaseio.com",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: "nwplus-ubc",
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "nwplus-ubc.appspot.com",
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-BT2W7DSL1G",
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "306881258768",
      NEXT_PUBLIC_FIREBASE_APP_ID: "1:306881258768:web:bc922148732abee79f7195"
    }
  }
}