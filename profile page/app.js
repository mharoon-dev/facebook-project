import {
  auth,
  collection,
  db,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getDownloadURL,
  onAuthStateChanged,
  query,
  ref,
  storage,
  uploadBytesResumable,
} from "../utilities/fireBaseConfig.mjs";
import {
  addInDB,
  getData,
  updateData,
  uploadFile,
} from "../utilities/functions.mjs";

// sideBar
let sideBar = document.querySelector(".siderBar");
let toggleBtn = document.querySelector("#toggleBtn");
let crossBtn = document.querySelector("#crossBtn");

// side bar navbar
toggleBtn.addEventListener("click", () => {
  sideBar.style.transform = "translate(0%)";
  sideBar.style.transition = "0.5s";
});

// side navbar close
crossBtn.addEventListener("click", () => {
  sideBar.style.transform = "translate(-110%)";
  sideBar.style.transition = "0.5s";
});

////////////////////////////////////////////

let userNameInProfile = document.querySelector(".userNameInProfile");
// userNameInProfile.textContent = JSON.parse(localStorage.getItem('loggedInuser'))['fullName']
////////////////////////////////////////////

// right side menu
let rightSideBar = [
  {
    image: "../assets/home/home right bar content/friend 1.jpg",
    name: "Ateeq",
  },
  {
    image: "../assets/home/home right bar content/friend 2.jpg",
    name: "Fuzail Attari",
  },
  {
    image: "../assets/home/home right bar content/friend 3.jpg",
    name: "Abdul Ghani",
  },
  {
    image: "../assets/home/home right bar content/friend 4.jpg",
    name: "Yousuf ",
  },
  {
    image: "../assets/home/home right bar content/friend 5.jpg",
    name: "Hassan Malik",
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
];
let rightSideBarRow = document.querySelector(".rightSideBarRow");
// right side bar home content
rightSideBar.forEach((friend) => {
  rightSideBarRow.innerHTML += `
            <div class="col-12 p-lg-3 p-2 ps-3 rightBarBtn">
                <img style="border-radius:50%;
                border:none;" src="${friend["image"]}" width="40rem">
                <span id="${friend["name"]}">${friend["name"]}</span>
            </div>`;
});

let userProfileImage = document.getElementById("userProfileImage");
let profileSmallImage = document.querySelector(".profileSmallImage");
let dropdownProfileImage = document.querySelector(".dropdownProfileImage");
let postImage = document.querySelector(".postImage");
let userName = document.getElementById("userName");

let loggedInUserCheck = onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      userDetails = docSnap.data();
      if (await userDetails) {
        displayingPost();
      }
      console.log(await userDetails);
      userName.textContent = userDetails.fullName ? userDetails.fullName : "";
      userProfileImage.src = userDetails.profileImage
        ? userDetails.profileImage
        : "../assets/home/user account button image.png";
      postImage.src = userDetails.profileImage
        ? userDetails.profileImage
        : "../assets/home/user account button image.png";
      dropdownProfileImage.src = userDetails.profileImage
        ? userDetails.profileImage
        : "../assets/home/user account button image.png";
      profileSmallImage.src = userDetails.profileImage
        ? userDetails.profileImage
        : "../assets/home/user account button image.png";
    } else {
      console.log("No such document!");
    }
  }
});

/// profile image
let profileFileInput = document.getElementById("profileFileInput");

userProfileImage.addEventListener("click", function () {
  document.getElementById("profileFileInput").click();
});

let file;
let selectedProfileImage;
let uid;
let userDetails;

let selectedProfile = profileFileInput.addEventListener(
  "change",
  async function (event) {
    file = event.target.files[0];
    selectedProfileImage = `${new Date().getTime()}-${file?.name}`;
    console.log(file);
    console.log(selectedProfileImage);

    if (file.type !== "video/mp4") {
      console.log(file.type);
      let uploadProfileImage = await uploadFile(file, selectedProfileImage);
      console.log("your file is uploaded!");
      let saveImage = (userDetails.profileImage =
        uploadProfileImage.downloadURL);
      console.log(await userDetails);

      if (userDetails.profileImage) {
        let addProfileImage = await updateData(userDetails, uid, "users");
        window.location.reload();
        return await downloadURL;
      }
    } else {
      console.log("sorry your selected file is video!");
    }
  }
);

let centerAreaPosts = document.querySelector(".centerArea");
let displayingPost = async () => {
  console.log("display post handler is working!");

  const q = query(collection(db, "posts"));

  const querySnapshot = await getDocs(q);
  querySnapshot?.forEach(async (doc) => {
    if (doc.data().userDetails.email == (await userDetails.email)) {
      centerAreaPosts.innerHTML += `
            <div class="col-12 mt-4" >
            <div class="bg-white pt-3 post"
            style="border-radius: 15px; box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
            -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);">
           
            <div class="d-flex justify-content-between align-items-center p-1 ">
           
            <div class="d-flex justify-content-center align-items-center">
            <img class="ms-2 me-2 postImage" width="40rem" src="${
              doc?.data()?.userDetails.profileImage
                ? doc?.data()?.userDetails.profileImage
                : `../assets/home/user account button image.png`
            }" style="border-radius:50% ;">
            <h6 class="mb-0" id="userNameInPost" style="text-transform: capitalize;">${
              doc?.data()?.userDetails?.fullName
            }</h6>
            </div>
           
            <div class="d-flex justify-content-center align-items-center dropdown">
            <img class="ms-2 me-2 " class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" width="30rem" src="../assets/home/home center content/post handler Btn.png">
    
            
            <ul class="dropdown-menu">
            <li><a class="dropdown-item"  data-bs-toggle="modal" onclick="editPostHandler('${
              doc.id
            }')" data-bs-target="#staticBackdrop">Edit</a></li>
            <li><a class="dropdown-item" onclick="deletePostHandler('${
              doc.id
            }')">Delete</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            </ul>
           
            </div>
            
            </div>
           
            <!-- discription area -->
            <div class="d-flex justify-content-start align-items-center mt-0 ps-2 p-1 pb-0">
            <p class="mb-2" id="description">${doc?.data()?.discription}</p>
            </div>
    
            <!-- file (image/video) area -->
            ${
              doc.data().file
                ? `<div class=" mt-0 mb-2 pb-0 fileDiv">
            ${
              doc?.data()?.fileType == "video/mp4"
                ? `<video class="postVideoUrl" controls><source src="${
                    doc?.data()?.file
                  }" type="video/mp4"></video>`
                : `<img class="postImageUrl" src="${
                    doc?.data()?.file
                  }" alt="Post image">`
            }
            </div>`
                : ""
            }
    
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
};
// displayingPost();

// // posts
let fileInput = document.querySelector("#fileInput");
let discriptionInput = document.querySelector(".discriptionInput");
let postBtn = document.querySelector("#postBtn");

// uploading post

let selectedFile;
let selectedFileName;
let url;
let postObj;
let fileArea;

let postHandler = async () => {
  // Check if either description or file is provided
  if (discriptionInput.value || fileInput.files.length > 0) {
    postObj = {
      discription: discriptionInput.value || "",
      userDetails: userDetails || "",
    };

    // Check if a file is selected
    if (fileInput.files.length > 0) {
      selectedFile = fileInput.files[0];
      selectedFileName = `${new Date().getTime()}-${selectedFile.name}`;
      postObj.fileType = selectedFile.type;

      const storageRef = ref(storage, selectedFileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is " + progress + "% done");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload error:", error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            url = await downloadURL;
            postObj.file = url;
            // saving data into firestore
            const savingData = await addInDB(postObj, "posts");
            window.location.reload();
          });
        }
      );
    } else {
      // If no file is selected, save the post with description only
      console.log('No file added!');
      const savingData = await addInDB(postObj, "posts");
      window.location.reload();
    }
  } else {
    // If neither description nor file is provided, do not proceed
    alert('No description or file added!');
  }
};
postBtn.addEventListener("click", postHandler);

// edit post
let editPostText = document.querySelector("#editPostText");
let selectedPostId;
let selectedPost;
window.editPostHandler = async (postId) => {
  console.log("postId for edit handler ==>>" + postId);

  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);

  selectedPost = querySnapshot.forEach(async (post) => {
    if (post.id == postId) {
      editPostText.textContent = post.data().discription;
      console.log(post.data());
      selectedPostId = await post.id;
      selectedPost = await post.data();
    }
  });
};

let updateBtn = document.querySelector("#updateBtn");

const updatePostHandler = async () => {
  selectedPost.discription = editPostText.value;
  console.log(await selectedPost);
  updateData(selectedPost, selectedPostId, "posts");
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};
updateBtn.addEventListener("click", updatePostHandler);

// delete post
window.deletePostHandler = async (postId) => {
  console.log("postId ==>>" + postId);
  await deleteDoc(doc(db, "posts", await postId));
  window.location.reload();
};

// // displaying post

// let centerAreaPosts = document.querySelector('.centerArea')

// let displayingPost = () => {
//     let posts = JSON.parse(localStorage.getItem("posts")) || []
//     // console.log(posts);

//     posts.reverse().forEach((post) => {
//         // post HTML
//        if (post.file) {
//         centerAreaPosts.innerHTML += `
//         <div class="col-12 mt-4" >
//         <div class="bg-white pt-3" "
//         style="border-radius: 15px; box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
//         -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
//         -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);">

//         <div class="d-flex justify-content-between align-items-center p-1 ">

//         <div class="d-flex justify-content-center align-items-center">
//         <img class="ms-2 me-2 " width="40rem" src="../assets/home/user account button image.png" style="border-radius:50% ;">
//         <h6 class="mb-0" id="userNameInPost" style="text-transform: capitalize;">${post.user.fullName}</h6>
//         </div>

//         <div class="d-flex justify-content-center align-items-center dropdown">
//         ${JSON.parse(localStorage.getItem("loggedInuser")).fullName === post?.user?.fullName ? `<img class="ms-2 me-2 " class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" width="30rem" src="../assets/home/home center content/post handler Btn.png">
//         <ul class="dropdown-menu">
//         <li><a class="dropdown-item" onclick="editPostHandler(${post?.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</a></li>
//         <li><a class="dropdown-item" onclick="deleteHandler(${post?.id})">Delete</a></li>
//         <li><a class="dropdown-item" href="#">Profile</a></li>
//         </ul>` :``}

//         </div>
//         </div>

//         <!-- discription area -->
//         <div class="d-flex justify-content-start align-items-center mt-1 ps-2 p-1 pb-0">
//         <p class="mb-2" id="description">${post?.discription}</p>
//         </div>

//         <!-- image area -->
//         <div class=" p-0 m-0 w-100 mb-2">
//         <img class="w-100" src="${post?.file}">
//         </div>

//         <div class="d-flex justify-content-start align-items-center w-100 ms-2 my-0">
//         <img src="../assets/home/home center content/like btn.png" width="20rem">
//         <h6 class="p-0  my-1 ms-1">${post.likes.length}</h6>
//         </div>
//         <div class="d-flex justify-content-start align-items-center  mx-2">
//         <hr class="w-100 mt-1 mb-2">
//         </div>

//         <!-- like and comment area -->
//         <div class="d-flex justify-content-around align-items-center p-0 m-0">

//         <button onclick="likeHandler(${post['id']})"  class="w-50 p-2 d-flex  justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 0px 10px;"><img src="../assets/home/home center content/like icon(without like ).png" class="me-1" width="20rem"> Like</button>

//         <button class="w-50 p-2 d-flex justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 10px 0px;">
//         <img src="../assets/home/home center content/comment btn.png" class="me-1" width="17rem"> Comment</button>

//         </div>

//         </div>
//         </div>`;
//        } else {
//         centerAreaPosts.innerHTML += `
//         <div class="col-12 mt-4" >
//         <div class="bg-white pt-3" "
//         style="border-radius: 15px; box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
//         -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
//         -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);">

//         <div class="d-flex justify-content-between align-items-center p-1 ">

//         <div class="d-flex justify-content-center align-items-center">
//         <img class="ms-2 me-2 " width="40rem" src="../assets/home/user account button image.png" style="border-radius:50% ;">
//         <div>
//         <h6 class="mb-0" id="userNameInPost" style="text-transform: capitalize;">${post.user.fullName}</h6>
//         </div>
//         </div>

//         <div class="d-flex justify-content-center align-items-center dropdown">
//         ${JSON.parse(localStorage.getItem("loggedInuser")).fullName === post?.user?.fullName ? `<img class="ms-2 me-2 " class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" width="30rem" src="../assets/home/home center content/post handler Btn.png">

//         <ul class="dropdown-menu">
//         <li><a class="dropdown-item" onclick="editPostHandler(${post?.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</a></li>
//         <li><a class="dropdown-item" onclick="deleteHandler(${post?.id})">Delete</a></li>
//         <li><a class="dropdown-item" href="#">Profile</a></li>
//         </ul>` :``}

//         </div>
//         </div>

//         <!-- discription area -->
//         <div class="d-flex justify-content-start align-items-center mt-1 ps-2 p-1 pb-0">
//         <p class="mb-2" id="description">${post?.discription}</p>
//         </div>

//         <div class="d-flex justify-content-start align-items-center w-100 ms-2 my-0">
//         <img src="../assets/home/home center content/like btn.png" width="20rem">
//         <h6 class="p-0  my-1 ms-1">${post.likes.length}</h6>
//         </div>
//         <div class="d-flex justify-content-start align-items-center  mx-2">
//         <hr class="w-100 mt-1 mb-2">
//         </div>

//         <!-- like and comment area -->
//         <div class="d-flex justify-content-around align-items-center p-0 m-0">

//         <button onclick="likeHandler(${post['id']})" class="w-50 p-2 d-flex justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius: 0px 0px 0px 10px;">
//         <img src="../assets/home/home center content/like icon(without like ).png" class="me-1" width="20rem"> Like
//       </button>

//         <button class="w-50 p-2 d-flex justify-content-center align-items-center" style="border: 1px solid lightgrey; border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 10px 0px; border-radius:0px 0px 10px 0px;">
//         <img src="../assets/home/home center content/comment btn.png" class="me-1" width="17rem"> Comment</button>

//         </div>

//         </div>
//         </div>`;
//        }

//     })

// }
// displayingPost()

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

// function deleteHandler(postId) {
//     // console.log(postId);

//     // getting data form localStorage
//     let postsFromLocalStorage = JSON.parse(localStorage.getItem('posts'))
//     // console.log(postsFromLocalStorage);

//     let filtration = postsFromLocalStorage.filter( (post) => post.id !== postId)
//     // console.log(filtration);

//     // giving data to localStorage
//     localStorage.setItem('posts' , JSON.stringify(filtration))

//     // reloading the page
//     location.reload()

// }

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

//////////////////////////////////////////

// let logoutBtn = document.querySelector('#logoutBtn')

// logoutBtn.addEventListener('click' , () => {

//     localStorage.removeItem('loggedInuser')

//     window.location.href = '../index.html'
// })
