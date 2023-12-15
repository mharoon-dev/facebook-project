// sideBar
let sideBar = document.querySelector(".siderBar");
let toggleBtn = document.querySelector('#toggleBtn')
let crossBtn = document.querySelector('#crossBtn')

// side bar navbar
toggleBtn.addEventListener('click' , () => {
    sideBar.style.transform = "translate(0%)"
    sideBar.style.transition = "0.5s"
})

// side navbar close
crossBtn.addEventListener('click' , () => {
    sideBar.style.transform = "translate(-110%)"
    sideBar.style.transition = "0.5s"
})

////////////////////////////////////////////

// left side menu
let menuBarName = [
    {
        image:'../assets/home/home content/user account button image.png',
        name: JSON.parse(localStorage.getItem("loggedInuser")).FirstName
    },
    {
        image:'../assets/home/home content/1 person image.png',
        name:'Find friends'
    },
    {
        image:'../assets/home/home content/2 video saver image.png',
        name:'Saved'
    },
    {
        image:'../assets/home/home content/3 clock image.png',
        name:'Memories'
    },
    {
        image:'../assets/home/home content/4 people image.png',
        name:'Groups'
    },
    {
        image:'../assets/home/home content/5 video image.png',
        name:'Video'
    },
    {
        image:'../assets/home/home content/6 feeding image.png',
        name:'Feed'
    },
    {
        image:'../assets/home/home content/7 star image.png',
        name:'Event'
    },
    {
        image:'../assets/home/home content/8 ads manager image.png',
        name:'Ads Manager'
    },
    {
        image:'../assets/home/home content/9 crisis response image.png',
        name:'Crisis Response'
    }
]
let leftSideBarRow = document.querySelector('.leftSideBarRow')
// left side bar home content 
menuBarName.forEach((menuCard) => {
    leftSideBarRow.innerHTML += `
            <div class="col-12 p-4 ps-3 leftBarBtn">
                <img style="border-radius:50%;" src="${menuCard['image']}" width="35rem">
                <span id="${menuCard['name']}">${menuCard['name']}</span>
            </div>`
});

//////////////////////////////////////////

// right side menu
let rightSideBar = [
    {
        image:'../assets/home/home right bar content/friend 1.jpg',
        name:'Ateeq'
    },
    {
        image:'../assets/home/home right bar content/friend 2.jpg',
        name:'Fuzail Attari'
    },
    {
        image:'../assets/home/home right bar content/friend 3.jpg',
        name:'Abdul Ghani'
    },
    {
        image:'../assets/home/home right bar content/friend 4.jpg',
        name:'Yousuf '
    },
    {
        image:'../assets/home/home right bar content/friend 5.jpg',
        name:'Hassan Malik'
    },
    // {
    //     image:'../assets/home/home right bar content/friend 6.jpg',
    //     name:'Video'
    // },
    // {
    //     image:'../assets/home/home right bar content/friend 7.jpg',
    //     name:'Feed'
    // },
    // {
    //     image:'../assets/home/home right bar content/friend 8.jpg',
    //     name:'Event'
    // },
    // {
    //     image:'../assets/home/home right bar content/friend 9.jpg',
    //     name:'Ads Manager'
    // },

]
let rightSideBarRow = document.querySelector('.rightSideBarRow')
// right side bar home content
rightSideBar.forEach((friend) => {
    rightSideBarRow.innerHTML += `
            <div class="col-12 p-lg-3 p-2 ps-3 rightBarBtn">
                <img style="border-radius:50%;
                border:none;" src="${friend['image']}" width="40rem">
                <span id="${friend['name']}">${friend['name']}</span>
            </div>`
});

///////////////////////////////////////////

// posts 

let modal = document.querySelector('.modal')
let postBtn = document.querySelector('#postBtn')
let fileInput = document.querySelector('.fileInput')
let discriptionInput = document.querySelector('.discriptionInput')

///////////////////////////////////////////

// displaying post 

let centerAreaPosts = document.querySelector('.centerArea')

let displayingPost = () => {
    let posts = JSON.parse(localStorage.getItem("posts")) || []
    // console.log(posts);

    posts.reverse().forEach((post) => {
        // post HTML
       if (post.file) {
        centerAreaPosts.innerHTML += `
        <div class="col-12 mt-4" >
        <div class="bg-white pt-3" "
        style="border-radius: 15px; box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);">
        
        <div class="d-flex justify-content-between align-items-center p-1 ">
        
        <div class="d-flex justify-content-center align-items-center">
        <img class="ms-2 me-2 " width="40rem" src="../assets/home/user account button image.png" style="border-radius:50% ;">
        <h6 class="mb-0" id="userNameInPost" style="text-transform: capitalize;">${post.user.fullName}</h6>
        </div>
        
        <div class="d-flex justify-content-center align-items-center dropdown">
        ${JSON.parse(localStorage.getItem("loggedInuser")).fullName === post?.user?.fullName ? `<img class="ms-2 me-2 " class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" width="30rem" src="../assets/home/home center content/post handler Btn.png">
        <ul class="dropdown-menu">
        <li><a class="dropdown-item" onclick="editPostHandler(${post?.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</a></li>
        <li><a class="dropdown-item" onclick="deleteHandler(${post?.id})">Delete</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        </ul>` :``}
        
        </div>
        </div>
        
        <!-- discription area -->
        <div class="d-flex justify-content-start align-items-center mt-1 ps-2 p-1 pb-0">
        <p class="mb-2" id="description">${post?.discription}</p>
        </div>
        
        <!-- image area -->
        <div class=" p-0 m-0 w-100 ">
        <img class="w-100" src="${post?.file}">
        </div>
        
        
        <!-- like and comment area -->
        <div class="d-flex justify-content-around align-items-center p-0 m-0">
        <button class="w-50 p-2" style="border: 1px solid lightgrey; background-colwhitesmoke; border-radius:0px 0px 0px 10px;">Like</button>
        <button class="w-50 p-2" style="border: 1px solid lightgrey; background-colwhitesmoke; border-radius:0px 0px 10px 0px;">Comment</button>
        </div>
        
        </div>
        </div>`;
       } else {
        centerAreaPosts.innerHTML += `
        <div class="col-12 mt-4" >
        <div class="bg-white pt-3" "
        style="border-radius: 15px; box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);">
        
        <div class="d-flex justify-content-between align-items-center p-1 ">
        
        <div class="d-flex justify-content-center align-items-center">
        <img class="ms-2 me-2 " width="40rem" src="../assets/home/user account button image.png" style="border-radius:50% ;">
        <h6 class="mb-0" id="userNameInPost" style="text-transform: capitalize;">${post.user.fullName}</h6>
        </div>
        
        <div class="d-flex justify-content-center align-items-center dropdown">
        ${JSON.parse(localStorage.getItem("loggedInuser")).fullName === post?.user?.fullName ? `<img class="ms-2 me-2 " class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" width="30rem" src="../assets/home/home center content/post handler Btn.png">
        <ul class="dropdown-menu">
        <li><a class="dropdown-item" onclick="editPostHandler(${post?.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</a></li>
        <li><a class="dropdown-item" onclick="deleteHandler(${post?.id})">Delete</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        </ul>` :``}
        
        </div>
        </div>
        
        <!-- discription area -->
        <div class="d-flex justify-content-start align-items-center mt-1 ps-2 p-1 pb-0">
        <p class="mb-2" id="description">${post?.discription}</p>
        </div>
        
        <!-- like and comment area -->
        <div class="d-flex justify-content-around align-items-center p-0 m-0">
        <button class="w-50 p-2" style="border: 1px solid lightgrey; background-colwhitesmoke; border-radius:0px 0px 0px 10px;">Like</button>
        <button class="w-50 p-2" style="border: 1px solid lightgrey; background-colwhitesmoke; border-radius:0px 0px 10px 0px;">Comment</button>
        </div>
        
        </div>
        </div>`;
       }
        
    })
    
} 
displayingPost()

////////////////////////////////////////////////

// post function
postBtn.addEventListener('click', () => {
    let posts = JSON.parse(localStorage.getItem('posts')) || []
    let postObj;

    if (fileInput.value) {
        // console.log(fileInput.value);
        postObj = {
            id:Date.now(),
            discription: discriptionInput.value,
            file:fileInput.value,
            user: JSON.parse(localStorage.getItem('loggedInuser'))
        }
        console.log(postObj);
    } else {
        postObj = {
            id:id=Date.now(),
            discription: discriptionInput.value,
            user: JSON.parse(localStorage.getItem('loggedInuser'))
        }
        console.log(postObj);
    }

    // giviing data to popsts array
    posts.push(postObj)
    console.log(posts);

    // giving posts array to localStorage
    localStorage.setItem("posts" , JSON.stringify(posts))

    // emptying the felids 
    fileInput.value = ''
    discriptionInput.value = ''

    // reloading the page
    location.reload()


//     // getting data from localStorage
//     let posts = JSON.parse(localStorage.getItem("posts")) || []
//     console.log(posts);



//     // let selectedFile = fileInput.files[0];
//     // let discriptionValue = discriptionInput.value;

//     // if (selectedFile || discriptionValue) {
//     //     let reader = new FileReader();

//     //     reader.onload = function (event) {
//     //         let fileUrl = event.target.result || false;

//     //         // data of post
//     //         postObj = {
//     //             id: Date.now(),
//     //             discription: discriptionValue,
//     //             file: fileUrl || '',
//     //             userDetails: JSON.parse(localStorage.getItem('loggedInuser'))
//     //         };

//     //         // emptying the fields of post modal
//     //         discriptionInput.value = '';
//     //         fileInput.value = '';

//     //         // adding data in localStorage
//     //         postsData.push(postObj);
//     //         localStorage.setItem("postsData", JSON.stringify(postsData));

//     //         // Displaying posts after adding a new post
//     //         // displayPosts();
//     //     };

//     //     if (selectedFile) {
//     //         reader.readAsDataURL(selectedFile);
//     //     } else {
//     //         // If no file is selected, invoke onload with null result
//     //         reader.onload({ target: { result: null } });
//     //     }
//     // }
});

// // delete post

function deleteHandler(postId) {
    // console.log(postId);

    // getting data form localStorage
    let postsFromLocalStorage = JSON.parse(localStorage.getItem('posts'))
    // console.log(postsFromLocalStorage);

    let filtration = postsFromLocalStorage.filter( (post) => post.id !== postId)
    // console.log(filtration);

    // giving data to localStorage
    localStorage.setItem('posts' , JSON.stringify(filtration))

    // reloading the page
    location.reload()

}

   
////////////////////////////////////////

// edit function
let editTextArea = document.querySelector('.editTextArea')
let oldPost;
let oldPostIndex;

function editPostHandler(postId) {
    // console.log(postId);

    // geting data from localStorage
    let postsData = JSON.parse(localStorage.getItem("posts"))
    // console.log(postsData);

    // FINDING THE POST
    let findPost = postsData.find( post => post.id == postId )
    let findPostIndex = postsData.findIndex( post => post.id == postId )
    // console.log(findPostIndex);

    // content of post giving to input
    editTextArea.innerHTML = findPost['discription']

    // saving data in old post
    oldPost = findPost
    oldPostIndex = findPostIndex

}


///////////////////////////////////////////

let updateBtn = document.querySelector('#updateBtn')

function updateHandler() {

    // making an obbject for updated post
    let postObj = {
        id: oldPost['id'],
        discription: editTextArea.value ||  oldPost['discription'],
        file: oldPost['file'],
        user: oldPost['user'],
    } 
    // console.log(postObj);

    // data from localStorage
    let postData = JSON.parse(localStorage.getItem('posts'))
    postData.splice(oldPostIndex , 1 , postObj)
    
    // giving data to localStorage
    let posts = (localStorage.setItem('posts' , JSON.stringify(postData)))

    // reloading the page
    location.reload()
}


