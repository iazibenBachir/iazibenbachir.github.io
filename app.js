// Firebase App configuration
const firebaseConfig = {
  apiKey: "AIzaSyABF86TiFcgoluoA3IH9Hxa3rs6Lvt_qFk",
  authDomain: "iaziben-portfolio-form.firebaseapp.com",
  databaseURL: "https://iaziben-portfolio-form-default-rtdb.firebaseio.com",
  projectId: "iaziben-portfolio-form",
  storageBucket: "iaziben-portfolio-form.appspot.com",
  messagingSenderId: "442558498027",
  appId: "1:442558498027:web:68b29d6bc33c4e01af6aae",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refrence Messages Collection
let messagesref = firebase.database().ref("messages");

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const msg = document.getElementById("message");
let inputsValid = false;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  if (inputsValid) {
    // Submit Form to Firebase
    submitForm();
    //Show Msg Sent
    document.querySelector(".msg-sent").style.display = "block";
    // Remove Msg Sent
    setTimeout(() => {
      document.querySelector(".msg-sent").style.display = "none";
    }, "3000");
    // Reset Form
    form.reset();
    inputsValid=false;
  }
});

/*=====================
Contact Form Validation - client Side
=====================*/

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const msgValue = msg.value.trim();
  let usernameValid = false;
  let emailValid = false;
  let msgValid = false;

  if (usernameValue === "") {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
    usernameValid = true;
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
    emailValid = true;
  }
  if (msgValue === "") {
    setError(msg, "Please enter your message.");
  } else {
    setSuccess(msg);
    msgValid = true;
  }
  if(usernameValid && emailValid && msgValid){
    inputsValid=true;
  }
};

/*=====================
Contact Form - Firebase
=====================*/

function submitForm() {
  let usernameValue = username.value;
  let emailValue = email.value;
  let msgValue = msg.value;
  let newMessageRef = messagesref.push();
  newMessageRef.set({
    username: usernameValue,
    email: emailValue,
    msg: msgValue,
  });
}
/*=====================
INTRO ANIMATION
=====================*/
/*
const intro = document.querySelector('.intro');
const portfolioContent= document.querySelector('.portfolio-content');
setTimeout(()=>{
    intro.remove();
    portfolioContent.style.display='block';
    console.log('Hello');
},'3000');



*/
