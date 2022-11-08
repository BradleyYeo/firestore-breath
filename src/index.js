// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
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

async function createEvent(eventTitle, description, eventDate, category) {
  console.log(eventTitle, description, eventDate, category);
  const newDoc = await addDoc(events, {
    title: eventTitle,
    description: description,
    date: Timestamp.fromDate(eventDate),
    category: category,
  });
}

async function queryDoc() {
  const eventQuery = query(events, limit(10));
  const querySnapshot = await getDocs(eventQuery);
  let cardOutput =
    "<div class='card border-dark mb-3 col-lg-8 col-md-6 ' style='width: 24rem;''>";
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
        "<div class='card border-dark mb-3 col-8' style='width: 24rem;''>")
  );

  document.getElementById("events").innerHTML = cardOutput;
}

queryDoc();
