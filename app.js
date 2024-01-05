// import { auth, createUserWithEmailAndPassword, db, doc,  getDoc,  onAuthStateChanged, sendPasswordResetEmail, setDoc, signInWithEmailAndPassword } from "./utilities/fireBaseConfig.js";
import { auth, createUserWithEmailAndPassword, db, doc, getDoc, onAuthStateChanged, sendPasswordResetEmail, setDoc, signInWithEmailAndPassword } from "./utilities/fireBaseConfig.js";



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



// signut form
let firstName = document.querySelector('#FirstName') 
let lastName = document.querySelector('#lastName') 
let email = document.querySelector('#email') 
let password = document.querySelector('#password') 
let signupBtn = document.querySelector('#signupBtn') 

let uid;



// fire base signUp functionality
let signUpHandler = () => {
  // checking the function
  console.log("signup handler is working!");

  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    uid = user.uid;
    console.log(user.uid);
    alert("You are Signed Up successfully!")

    await setDoc(doc(db, "users", uid), {
      firstName: firstName.value,
      lastName: lastName.value,
      fullName: `${firstName.value} ${lastName.value}`,
      email: email.value,
      id: uid,
    });
    
    alert("your data is saved!")
    // diverting to home page
    setTimeout(() => {
            window.location.href = "home/index.html" 
    }, 1000);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}
signupBtn.addEventListener('click' , signUpHandler)
/////////////////////////////////////////

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
          alert("your data is found \n now you are diverting to the home page!")
          window.location = "../home/index.html"
      } else {
          console.log("No such document!");
          alert("sorry you are not registered!")
      }
    } else {
      if (location.pathname !== "/index.html") {
        window.location = "/index.html"
      }
    }
  });


/////////////////////////////////////////


// fire base login functionality
let loginEmail = document.querySelector('#loginEmail')
let loginPassword = document.querySelector('#loginPassword')
let loginBtn = document.querySelector('#loginBtn')

// login handler
let loginHandler = () => {
//   // checking function
  console.log("login handler is working!");

//   // fire base functionality
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then(async(userCredential) => {
//       // Signed in 
    const user = userCredential.user;
    alert("you are logged in sucessfully!")
    setTimeout(() => {
      window.location = "../home/index.html"
    }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
}
loginBtn.addEventListener('click' , loginHandler)

/////////////////////////////////////////


/////////////////////////////////////////
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
    // ..
  });
}
forgetPassword.addEventListener("click" , forgetPasswordHandler)
  /////////////////////////////////////////