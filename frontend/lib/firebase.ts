import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvTNdS1Eh9hlUmzq0gU4dmZaq6JFX9iXU",
  authDomain: "paraswift-c4980.firebaseapp.com",
  projectId: "paraswift-c4980",
  storageBucket: "paraswift-c4980.firebasestorage.app",
  messagingSenderId: "159434411887",
  appId: "1:159434411887:web:ab8ebe197d2190d172629a"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);