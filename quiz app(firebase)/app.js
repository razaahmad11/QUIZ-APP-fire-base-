
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onChildAdded,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBQ84Ovw9nJymhmsTDmbgaWALacsc7Hld0",
  authDomain: "quizapp-ea135.firebaseapp.com",
  projectId: "quizapp-ea135",
  storageBucket: "quizapp-ea135.appspot.com",
  messagingSenderId: "783850293864",
  appId: "1:783850293864:web:82feea4c84048c6ebf09dd"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
var DATABASE = getDatabase(app);



window.logIn = function () {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(function (success) {
      console.log(success);
      if (email.includes('admin')){
          window.location.href = "quizAdmin.html";
      }else{
        window.location.href = "quizAttemp.html"
      }
      
    })
    .catch(function (error) {
      console.log("FIREBASE ERROR===>", error.code);
      if (error.code === "auth/user-not-found") {
        console.log("EMAIL NOT FOUND");
      }
    });
}




var DATABASE = getDatabase(app);
window.add = function () {
  var one = document.getElementById("one").value
  var two = document.getElementById("two").value
  var three = document.getElementById("three").value
  var four = document.getElementById("four").value
  var correctOpt = document.getElementById("correctOpt").value
  var quizValue = document.getElementById('quiz').value
  var quizData = {
    quiz: quizValue,
    option1: one,
    option2: two,
    option3: three,
    option4: four,
    correctAnswer: correctOpt
  };
  var referKey = ref(DATABASE);
  var studentKey = push(referKey).key;
  quizData.id = studentKey;
  console.log(quizData);
  var reference = ref(DATABASE, `quizs/${quizData.id}`);
  set(reference, quizData);
  // alert("quiz Added")
  getDataFromDatabase()
  document.getElementById('quiz').value = ''
}
function getDataFromDatabase() {
  list.innerHTML = "";
  var reference = ref(DATABASE, `quizs`);
  onChildAdded(reference, function (data) {
    if (data) {
      arr.push(data.val());
      render(data.val());
    }

  });
}
var arr = [];
var list = document.getElementById("list");
console.log(arr)
function render(data) {

  // for (var i = 0; i < arr.length; i++) {
  // console.log(arr)
  list.innerHTML += `<div class = "list-div"> <li class = "list">${data.quiz} <button class = "edit" onclick="edit('${data.id}')"><i class="fa-solid fa-pen"></i></button> <button class = "delete" onclick="deletequiz('${data.id}')"><i class="fa-solid fa-trash"></i></button> </li> <li>${data.option1}, ${data.option2},${data.option3},${data.option4}</li><div>`;
  // }
}
window.edit = function (id) {
  // console.log('id')

  var editquiz = prompt("enter")
  var refer = ref(DATABASE, `quizs/${id}`);
  update(refer, {
    quiz: editquiz,
  });
  getDataFromDatabase()
}
// console.log("hello")
window.deletequiz = function (id) {
  // var index = arr.findIndex(item => item.id === id);

  // if (index !== -1) {
  //     arr.splice(index, 1);

  var refer = ref(DATABASE, `quizs/${id}`);
  remove(refer)
    .then(() => {
      // console.log("Delete successful");
      getDataFromDatabase()
    })
    .catch((error) => {
      console.error("Delete error:", error);
    });
  // } else {
  //     console.error("Item not found in the array");
  // }
}

window.start = function () {
  var referKey = ref(DATABASE);
  var studentKey = push(referKey).key;
  quizData.id = studentKey;
  // console.log(quizData);
  var reference = ref(DATABASE, `quizs/${quizData.id}`);
  set(reference, quizData);
  // alert("quiz Added")
  getDataFromDatabase()
}




window.onload = getDataFromDatabase;

