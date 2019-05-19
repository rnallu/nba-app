import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDpFrbllEH7YEq6CP8EbrXbi1L9r4PmULM",
  authDomain: "my-react-nba.firebaseapp.com",
  databaseURL: "https://my-react-nba.firebaseio.com",
  projectId: "my-react-nba",
  storageBucket: "my-react-nba.appspot.com",
  messagingSenderId: "558096658987",
  appId: "1:558096658987:web:c15bf9b130b29a12"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref("articles");
const firebaseTeams = firebaseDB.ref("teams");
const firebaseVideos = firebaseDB.ref("videos");

const firebaseMapper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseMapper
};
