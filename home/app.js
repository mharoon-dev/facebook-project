import { addDoc, auth, collection, db, doc, getDoc, getDocs, getDownloadURL, onAuthStateChanged, query, ref, setDoc, signOut, uploadBytes, where , uploadBytesResumable, storage, deleteDoc } from "../utilities/fireBaseConfig.js";

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


// left side menu
let menuBarName = [
    {
        image:'../assets/home/home content/user account button image.png',
        name: "userName"
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


// checking user in logged in or not
let uid;
let userDetails;
onAuthStateChanged(auth, async(user) => {
    if (user) {
      uid = user.uid;
      console.log(uid);
      
      // alert("wait, checking your data!")
      
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
          userDetails = docSnap.data();
          console.log(await userDetails);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");

      } 
} else {
    if(location.pathname !== "../index.html") {
        window.location = "../index.html"
    }
}
});


// logout
let logoutBtn = document.querySelector('#logoutBtn')

logoutBtn.addEventListener('click' , () => {

    signOut(auth).then(() => {
        alert("You are SignOut sucessfully!")
        window.location.href = '../index.html'
      }).catch((error) => {
        // An error happened.
      });

})


// displaying post 

let centerAreaPosts = document.querySelector('.centerArea')

let displayingPost = async() => {

    console.log("display post handler is working!");

    const q = query(collection(db, "posts"));

    const querySnapshot = await getDocs(q);
    querySnapshot?.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());

    if (doc.data().file) {
        centerAreaPosts.innerHTML += `
        <div class="col-12 mt-4" >
        <div class="bg-white pt-3" "
        style="border-radius: 15px; box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);">
       
        <div class="d-flex justify-content-between align-items-center p-1 ">
       
        <div class="d-flex justify-content-center align-items-center">
        <img class="ms-2 me-2 " width="40rem" src="../assets/home/user account button image.png" style="border-radius:50% ;">
        <h6 class="mb-0" id="userNameInPost" style="text-transform: capitalize;">${doc?.data()?.userDetails?.fullName}</h6>
        </div>
       
        <div class="d-flex justify-content-center align-items-center dropdown">
        <img class="ms-2 me-2 " class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" width="30rem" src="../assets/home/home center content/post handler Btn.png">
        <ul class="dropdown-menu">
        <li><a class="dropdown-item"  data-bs-toggle="modal"onclick="editPostHandler('${doc.id}')" data-bs-target="#staticBackdrop">Edit</a></li>
        <li><a class="dropdown-item" onclick="deletePostHandler('${doc.id}')">Delete</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        </ul>
       
        </div>
        </div>
       
        <!-- discription area -->
        <div class="d-flex justify-content-start align-items-center mt-0 ps-2 p-1 pb-0">
        <p class="mb-2" id="description">${doc?.data()?.discription}</p>
        </div>
       
        <!-- image area -->
        <div class=" p-0 m-0 w-100 mb-2">
        <img class="w-100" src="${doc?.data()?.file}">
        </div>

        <div class="d-flex justify-content-start align-items-center w-100 ms-2 my-0">
        <img src="../assets/home/home center content/like btn.png" width="20rem">
        <h6 class="p-0 my-1 ms-1"></h6>
        </div>
        <div class="d-flex justify-content-start align-items-center  mx-2">
        <hr class="w-100 mt-1 mb-2">
        </div>
       
        <!-- like and comment area -->
        <div class="d-flex justify-content-around align-items-center p-0 m-0">
       
        <button onclick=""  class="w-50 p-2 d-flex  justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 0px 10px;"><img src="../assets/home/home center content/like icon(without like ).png" class="me-1" width="20rem"> Like</button>

        <button class="w-50 p-2 d-flex justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 10px 0px;">
        <img src="../assets/home/home center content/comment btn.png" class="me-1" width="17rem"> Comment</button>

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
        <h6 class="mb-0" id="userNameInPost" style="text-transform: capitalize;">${doc.data().userDetails?.fullName}</h6>
        </div>
       
        <div class="d-flex justify-content-center align-items-center dropdown">
        <img class="ms-2 me-2 " class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" width="30rem" src="../assets/home/home center content/post handler Btn.png">
        <ul class="dropdown-menu">
        <li><a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editPostHandler('${doc.id}')">Edit</a></li>
        <li><a class="dropdown-item" onclick="deletePostHandler('${doc.id}')">Delete</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        </ul>
       
        </div>
        </div>
       
        <!-- discription area -->
        <div class="d-flex justify-content-start align-items-center mt-0 ps-2 p-1 pb-0">
        <p class="mb-2" id="description">${doc.data().discription}</p>
        </div>
       
        <div class="d-flex justify-content-start align-items-center w-100 ms-2 my-0">
        <img src="../assets/home/home center content/like btn.png" width="20rem">
        <h6 class="p-0 my-1 ms-1"></h6>
        </div>
        <div class="d-flex justify-content-start align-items-center  mx-2">
        <hr class="w-100 mt-1 mb-2">
        </div>
       
        <!-- like and comment area -->
        <div class="d-flex justify-content-around align-items-center p-0 m-0">
       
        <button onclick=""  class="w-50 p-2 d-flex  justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 0px 10px;"><img src="../assets/home/home center content/like icon(without like ).png" class="me-1" width="20rem"> Like</button>

        <button class="w-50 p-2 d-flex justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 10px 0px;">
        <img src="../assets/home/home center content/comment btn.png" class="me-1" width="17rem"> Comment</button>

        </div>
       
        </div>
        </div>`;
    }


    });

} 
displayingPost()


// posts 
let modal = document.querySelector('.modal')
let postBtn = document.querySelector('#postBtn')
let fileInput = document.querySelector('#fileInput')
let discriptionInput = document.querySelector('.discriptionInput')



// uploading post

let selectedFile;
let selectedFileName;
let url;
let postObj;

let postHandler = async() => {

    // uploading files

    selectedFile = fileInput.files[0]; 
    selectedFileName = `${new Date().getTime()}-${selectedFile?.name}`;
    console.log(selectedFile);
    console.log('===> fileName ' + selectedFileName);
  

  
    const storageRef = ref(storage, selectedFileName);
  
    
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is ' + progress + '% done');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.error('Upload error:', error);
    },
    async () => {

      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        url = await downloadURL
        console.log('url ==>', url);

        if (await fileInput.files[0] && await url) {
            postObj = {
              discription: discriptionInput.value || '',
              file: await url || '',
              userDetails: userDetails || '',
            }
        } else {
            postObj = {
                discription: discriptionInput.value || '',
                userDetails: userDetails || '',
            }
        }
        console.log(postObj)

        // saving data in fireStore
        const docRef = await addDoc(collection(db, "posts"), postObj);
      
      });

    }
  );

  fileInput.files = ''
  discriptionInput.value = ''

  displayingPost()
}
postBtn.addEventListener('click' , postHandler)


// edit post
let editPostText = document.querySelector('#editPostText')
let updateBtn = document.querySelector('#updateBtn')
let editpost;
// window.editPostHandler = async (postId) => {
//     console.log("postId for edit handler ==>>" + postId);

//     const q = query(collection(db, "posts"));
//     const querySnapshot = await getDocs(q);

//     editpost = querySnapshot.forEach(async(doc) => {
//         if (doc.id == postId) {
//             editPostText.textContent = doc.data().discription
//         }
//     });
// }

// update post

// let updatePostHandler = () => {
    
// }



// delete post

window.deletePostHandler = async (postId) => {
    console.log('postId ==>>' + postId);

await deleteDoc(doc(db, "posts", await postId ));
displayingPost()
} 






// function deleteHandler(postId) {

//     let filtration = postsFromLocalStorage.filter( (post) => post.id !== postId)
//     // console.log(filtration);

//     // giving data to localStorage
//     localStorage.setItem('posts' , JSON.stringify(filtration))

//     // reloading the page
//     location.reload()

// }












// let likeHandler = (postId) => {
//     // console.log(postId);
//     let posts = JSON.parse(localStorage.getItem('posts'))

//     let postLiked = posts.find( (post) => {
//         if (post['id'] == postId) return post
//     })
//     // console.log(postLiked);

//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInuser'))
//     // console.log(loggedInUser);

//      const alreadyLiked = postLiked['likes'].find( (likeByUserEmail) => {
//          if (likeByUserEmail == loggedInUser['email']) return likeByUserEmail
//     })

//     if (alreadyLiked) {
//         const indexOfUser = postLiked.likes.indexOf(alreadyLiked);
//         postLiked.likes.splice(indexOfUser, 1);
//       } else {
//         postLiked.likes.push(loggedInUser['email']);
//       }

//       localStorage.setItem("posts", JSON.stringify(posts))
//       location.reload()
// }







// ////////////////////////////////////////////////

// // post function
// postBtn.addEventListener('click', () => {
//     let posts = JSON.parse(localStorage.getItem('posts')) || []
//     let postObj;

//     if (fileInput.value) {
//         // console.log(fileInput.value);
//         postObj = {
//             id:Date.now(),
//             discription: discriptionInput.value,
//             likes: [],
//             comment: [],
//             file:fileInput.value,
//             user: JSON.parse(localStorage.getItem('loggedInuser'))
//         }
//         console.log(postObj);
//     } else {
//         postObj = {
//             id:id=Date.now(),
//             discription: discriptionInput.value,
//             likes: [],
//             comment: [],
//             user: JSON.parse(localStorage.getItem('loggedInuser'))
//         }
//         console.log(postObj);
//     }

//     // giviing data to popsts array
//     posts.push(postObj)
//     console.log(posts);

//     // giving posts array to localStorage
//     localStorage.setItem("posts" , JSON.stringify(posts))

//     // emptying the felids 
//     fileInput.value = ''
//     discriptionInput.value = ''

//     // reloading the page
//     location.reload()


// //     // getting data from localStorage
// //     let posts = JSON.parse(localStorage.getItem("posts")) || []
// //     console.log(posts);



// //     // let selectedFile = fileInput.files[0];
// //     // let discriptionValue = discriptionInput.value;

// //     // if (selectedFile || discriptionValue) {
// //     //     let reader = new FileReader();

// //     //     reader.onload = function (event) {
// //     //         let fileUrl = event.target.result || false;

// //     //         // data of post
// //     //         postObj = {
// //     //             id: Date.now(),
// //     //             discription: discriptionValue,
// //     //             file: fileUrl || '',
// //     //             userDetails: JSON.parse(localStorage.getItem('loggedInuser'))
// //     //         };

// //     //         // emptying the fields of post modal
// //     //         discriptionInput.value = '';
// //     //         fileInput.value = '';

// //     //         // adding data in localStorage
// //     //         postsData.push(postObj);
// //     //         localStorage.setItem("postsData", JSON.stringify(postsData));

// //     //         // Displaying posts after adding a new post
// //     //         // displayPosts();
// //     //     };

// //     //     if (selectedFile) {
// //     //         reader.readAsDataURL(selectedFile);
// //     //     } else {
// //     //         // If no file is selected, invoke onload with null result
// //     //         reader.onload({ target: { result: null } });
// //     //     }
// //     // }
// });

// // // delete post



   
// ////////////////////////////////////////

// // edit function
// let editTextArea = document.querySelector('.editTextArea')
// let oldPost;
// let oldPostIndex;

// function editPostHandler(postId) {
//     // console.log(postId);

//     // geting data from localStorage
//     let postsData = JSON.parse(localStorage.getItem("posts"))
//     // console.log(postsData);

//     // FINDING THE POST
//     let findPost = postsData.find( post => post.id == postId )
//     let findPostIndex = postsData.findIndex( post => post.id == postId )
//     // console.log(findPostIndex);

//     // content of post giving to input
//     editTextArea.innerHTML = findPost['discription']

//     // saving data in old post
//     oldPost = findPost
//     oldPostIndex = findPostIndex

// }


// ///////////////////////////////////////////

// let updateBtn = document.querySelector('#updateBtn')

// function updateHandler() {

//     // making an obbject for updated post
//     let postObj = {
//         id: oldPost['id'],
//         discription: editTextArea.value ||  oldPost['discription'],
//         file: oldPost['file'],
//         user: oldPost['user'],
//         likes: oldPost.likes,
//         comment: oldPost.comment
//     } 
//     // console.log(postObj);

//     // data from localStorage
//     let postData = JSON.parse(localStorage.getItem('posts'))
//     postData.splice(oldPostIndex , 1 , postObj)
    
//     // giving data to localStorage
//     let posts = (localStorage.setItem('posts' , JSON.stringify(postData)))

//     // reloading the page
//     location.reload()
// }

// //////////////////////////////////////////

