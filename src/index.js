import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  Timestamp,
  orderBy,
  getCountFromServer,
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
    title: "BBQ Dinner",
    description:
      "Meet new friends (or hang out with old ones) on a fun night out with BBQ chicken and steak! Individuals and groups are both welcome.",
    date: Timestamp.fromDate(new Date("November 19, 2022 19:30:00")),
    category: "food",
  });
}

async function countEvents() {
  const snapshot = await getCountFromServer(events);
  document.getElementById("eventsCount").innerHTML = `<h2>${
    snapshot.data().count
  } Upcoming Events</h2>`;
  console.log(snapshot.data().count);
}

async function queryDoc() {
  const eventQuery = query(events, orderBy("date", "asc"));
  const querySnapshot = await getDocs(eventQuery);
  let cardOutput =
    "<div class='card border-dark mb-3 col-lg-4 col-md-6 col-sm-10' style='width: 30rem;''>";

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  querySnapshot.docs.forEach(function (e) {
    cardOutput += `<div class='card-body'>
      <h3 class='card-title'>${e.data().title}</h3>
     <h5 class='card-subtitle' style='color:#877457'>${e
       .data()
       .date.toDate()
       .toLocaleDateString("en-US", options)}</h5><br><p class='card-text'>${
      e.data().description
    }</p></div></div><div class='card border-dark mb-3 col-lg-4 col-md-6 col-sm-10' style='width: 30rem;''>`;
  });
  document.getElementById("events").innerHTML += cardOutput;
}

// createEvent();
countEvents();
queryDoc();
