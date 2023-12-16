let loggedInUser = JSON.parse(localStorage.getItem('loggedInuser'))
console.log(loggedInUser);
if (loggedInUser) {
        window.location.href = './home/index.html';
} else {
    console.log("sorry");
}


// signup modal display

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
let FirstName = document.querySelector('#FirstName') 
let lastName = document.querySelector('#lastName') 
let email = document.querySelector('#email') 
let password = document.querySelector('#password') 
let signupBtn = document.querySelector('#signupBtn') 

signupBtn.addEventListener('click' , () => {
    let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || []
    console.log(usersInfo);

    // checking empty feilds
    if (FirstName.value === '' || lastName.value === '' || email.value === '' || password.value === '') {
    alert('Please fill the form completely!')
    } else {                
        // username and email checking
        let userAlreadyTaken = usersInfo.find((user) => {
            if (user.email == email.value ) {
                alert("this email address is aleady taken.")
                return user  
            } 
        });
        
        // user's data saving in object
        if (!userAlreadyTaken) {
            let user = {
                FirstName: FirstName.value,
                lastName: lastName.value,
                fullName: FirstName.value + " " + lastName.value,
                email: email.value,
                password: password.value,
        };

        // pushing user data in to usersInfo
        usersInfo.push(user)

        // saving data in localStorage
        localStorage.setItem("usersInfo" , JSON.stringify(usersInfo))
        
        // emptying felids 
        FirstName.value = ''
        lastName.value = ''
        email.value = ''
        password.value = ''

        signupForm.style.display = "none"
        }

    }
})


// login form 
let loginEmail = document.querySelector('#loginEmail')
let loginPassword = document.querySelector('#loginPassword')
let loginBtn = document.querySelector('#loginBtn')

// login handler
loginBtn.addEventListener('click', () => {
    let gettingUsers = JSON.parse(localStorage.getItem("usersInfo"))

    // cheking user in localStorage 
    let userFound = gettingUsers.find( (user) => {
        if (user.email == loginEmail.value) return user
    })

    // password checking if email address is found
    if (userFound) {
        if (loginPassword.value == userFound.password) {
            
            // giving data of loggedin user to localStorage
            localStorage.setItem("loggedInuser" , JSON.stringify(userFound))

            // diverting to home page
            setTimeout(() => {
                window.location.href = "../home/index.html" 
            }, 1000);

        } else {
            alert("sorry your password is wrong!")
        }
    } else {
        alert("sorry your email address is not found!")
    }
})
