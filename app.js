import { auth, createUserWithEmailAndPassword, db, doc, getDoc, onAuthStateChanged, sendPasswordResetEmail, setDoc, signInWithEmailAndPassword } from "./utilities/fireBaseConfig.mjs";
import { addInDBById, getData, login, signUp } from "./utilities/functions.mjs";



/////////////////////////////////////////
// // signup modal display
let signupForm = document.querySelector('.signup-modal')
let createAccountBtn = document.querySelector('.createAccounnt-btn')

createAccountBtn.addEventListener('click' , () => {
    signupForm.style.display = "block"
})

let crossBtn = document.querySelector('#crossBtn')
crossBtn.addEventListener('click' , ()=> {
    signupForm.style.display = "none"
})



// checking user in logged in or not
onAuthStateChanged(auth, async(user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);
    alert("wait, checking your data!")
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // alert("your data is found \n now you are diverting to the home page!")
        window.location = "../home/index.html"
    } else {
        console.log("No such document!");
        // alert("sorry you are not registered!")
    }
  } else {
    if (location.pathname !== "/index.html") {
      window.location = "/index.html"
    }
  }
});



// signut form
let firstName = document.querySelector('#FirstName') 
let lastName = document.querySelector('#lastName') 
let email = document.querySelector('#email') 
let password = document.querySelector('#password') 
let signupBtn = document.querySelector('#signupBtn') 


let uid;
let userObj;
// fire base signUp functionality
let signUpHandler = async() => {
  // checking the function
  console.log("signup handler is working!");
  
  userObj = {
    firstName:firstName.value,
    lastName:lastName.value,
    fullName: `${firstName.value} ${lastName.value}`,
    email:email.value
  }
  console.log(userObj);
  
  let signup = await signUp(email.value, password.value)
  uid = await signup.data.user.uid;
  console.log(signup);
  console.log("uid ==>>> " + uid);
  // alert("You are Signed Up successfully!")
  // return
  if (signup.status) {
    let saveUserById = await addInDBById(userObj, uid , "users")
    console.log(saveUserById);
    // alert("your data is saved!")
    setTimeout(() => {
            window.location.href = "home/index.html" 
    }, 1000);
  }

}
signupBtn.addEventListener('click' , signUpHandler)


// fire base login functionality
let loginEmail = document.querySelector('#loginEmail')
let loginPassword = document.querySelector('#loginPassword')
let loginBtn = document.querySelector('#loginBtn')

// login handler
let loginHandler = async() => {
// checking function
  console.log("login handler is working!");

// fire base functionality
let logIn = await login(loginEmail.value , loginPassword.value)
console.log(logIn);
if (logIn.status) {
  let gettingData = await getData(logIn.data.user.uid , "users")
  console.log(gettingData);

    // alert("you are logged in sucessfully!")
    setTimeout(() => {
      window.location = "../home/index.html"
    }, 1000);
}
}
loginBtn.addEventListener('click' , loginHandler)



// forget password 
let forgetPassword = document.querySelector('#forgetPassword')
let forgetPasswordHandler = () => {
  console.log("forget password function is working!");
  sendPasswordResetEmail(auth, loginEmail.value)
  .then(() => {
    // Password reset email sent!
    alert("Check your email to reset the password!")
//     // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
forgetPassword.addEventListener("click" , forgetPasswordHandler)
  /////////////////////////////////////////