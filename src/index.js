// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  limit,
  Timestamp,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDoJzxr5VfFnkAr8nyoZ2LKiSYu6dWt1vs",
  authDomain: "freecode-56b4c.firebaseapp.com",
  projectId: "freecode-56b4c",
  storageBucket: "freecode-56b4c.appspot.com",
  messagingSenderId: "8167992149",
  appId: "1:8167992149:web:1a1b8361542208f168dddc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const events = collection(db, "events");

async function createEvent() {
  const newDoc = await addDoc(events, {
    title: "Board Games at King and the Pawn",
    description:
      "Meet new friends (or hang out with old ones) on a fun night out with games , food, and drinks! Individuals and groups are both welcome.",
    date: Timestamp.fromDate(new Date("Decemberber 3, 2022 17:30:00")),
    category: "games",
  });
}

async function queryDoc() {
  const eventQuery = query(events, limit(10));
  const querySnapshot = await getDocs(eventQuery);
  let cardOutput =
    "<div class='card border-dark mb-3 col-lg-8 col-md-6 ' style='width: 30rem;''>";
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const allDocs = querySnapshot.docs.forEach(
    (e) =>
      (cardOutput +=
        "<div class='card-body'>" +
        "<h3 class='card-title'>" +
        e.data().title +
        "</h3>" +
        "<h5 class='card-subtitle' style='color:#877457'>" +
        e.data().date.toDate().toLocaleDateString("en-US", options) +
        "</h5>" +
        "<br>" +
        "<p class='card-text'>" +
        e.data().description +
        "</p>" +
        "</div>" +
        "</div>" +
        "<div class='card border-dark mb-3 col-8' style='width: 30rem;''>")
  );

  document.getElementById("events").innerHTML = cardOutput;
}

// createEvent();
queryDoc();