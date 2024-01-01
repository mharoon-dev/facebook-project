import { auth, createUserWithEmailAndPassword, db, doc,  getDoc,  onAuthStateChanged, setDoc, signInWithEmailAndPassword } from "./utilities/fireBaseConfig.js";



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

// fire base signUp functionality
let signUpHandler = () => {
  // checking the function
  console.log("signup handler is working!");

  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    alert("You are Signed Up successfully!")
    
    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    alert("your data is saved!")
    // diverting to home page
    setTimeout(() => {
    window.location.href = "../home/index.html" 
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
    const uid = user.uid;
    console.log(uid);
    // alert("wait, checking your data!")
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  // alert("your data is found \n now you are diverting to the home page!")
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
  // checking function
  console.log("login handler is working!");

  // fire base functionality
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then(async(userCredential) => {
      // Signed in 
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









// let loggedInUser = JSON.parse(localStorage.getItem('loggedInuser'))
// console.log(loggedInUser);
// if (loggedInUser) {
//         window.location.href = './home/index.html';
// } else {
//     console.log("sorry");
// }







// signupBtn.addEventListener('click' , () => {
//     let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || []
//     console.log(usersInfo);

//     // checking empty feilds
//     if (FirstName.value === '' || lastName.value === '' || email.value === '' || password.value === '') {
//     alert('Please fill the form completely!')
//     } else {                
//         // username and email checking
//         let userAlreadyTaken = usersInfo.find((user) => {
//             if (user.email == email.value ) {
//                 alert("this email address is aleady taken.")
//                 return user  
//             } 
//         });
        
//         // user's data saving in object
//         if (!userAlreadyTaken) {
//             let user = {
//                 FirstName: FirstName.value,
//                 lastName: lastName.value,
//                 fullName: FirstName.value + " " + lastName.value,
//                 email: email.value,
//                 password: password.value,
//         };

//         // pushing user data in to usersInfo
//         usersInfo.push(user)

//         // saving data in localStorage
//         localStorage.setItem("usersInfo" , JSON.stringify(usersInfo))
        
//         // emptying felids 
//         FirstName.value = ''
//         lastName.value = ''
//         email.value = ''
//         password.value = ''

//         signupForm.style.display = "none"
//         }

//     }
// })


// // login form 
// let loginEmail = document.querySelector('#loginEmail')
// let loginPassword = document.querySelector('#loginPassword')
// let loginBtn = document.querySelector('#loginBtn')

// // login handler
// loginBtn.addEventListener('click', () => {
//     let gettingUsers = JSON.parse(localStorage.getItem("usersInfo"))

//     // cheking user in localStorage 
//     let userFound = gettingUsers.find( (user) => {
//         if (user.email == loginEmail.value) return user
//     })

//     // password checking if email address is found
//     if (userFound) {
//         if (loginPassword.value == userFound.password) {
            
//             // giving data of loggedin user to localStorage
//             localStorage.setItem("loggedInuser" , JSON.stringify(userFound))

//             // diverting to home page
//             setTimeout(() => {
//                 window.location.href = "../home/index.html" 
//             }, 1000);

//         } else {
//             alert("sorry your password is wrong!")
//         }
//     } else {
//         alert("sorry your email address is not found!")
//     }
// })
