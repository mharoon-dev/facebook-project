import {
  addInDB,
  addInDBById,
  getAllDataOrderedByTimestamp,
  getData,
  logout,
  updateData,
} from "../utilities/functions.mjs";
import {
  addDoc,
  auth,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  getDownloadURL,
  onAuthStateChanged,
  query,
  ref,
  setDoc,
  uploadBytes,
  where,
  uploadBytesResumable,
  storage,
  deleteDoc,
} from "../utilities/fireBaseConfig.mjs";

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

// left side menu
let menuBarName = [
  {
    image: "../assets/home/home content/user account button image.png",
    name: "UserName",
  },
  {
    image: "../assets/home/home content/1 person image.png",
    name: "Find friends",
  },
  {
    image: "../assets/home/home content/2 video saver image.png",
    name: "Saved",
  },
  {
    image: "../assets/home/home content/3 clock image.png",
    name: "Memories",
  },
  {
    image: "../assets/home/home content/4 people image.png",
    name: "Groups",
  },
  {
    image: "../assets/home/home content/5 video image.png",
    name: "Video",
  },
  {
    image: "../assets/home/home content/6 feeding image.png",
    name: "Feed",
  },
  {
    image: "../assets/home/home content/7 star image.png",
    name: "Event",
  },
  {
    image: "../assets/home/home content/8 ads manager image.png",
    name: "Ads Manager",
  },
  {
    image: "../assets/home/home content/9 crisis response image.png",
    name: "Crisis Response",
  },
];
let leftSideBarRow = document.querySelector(".leftSideBarRow");
// left side bar home content
menuBarName.forEach((menuCard) => {
  leftSideBarRow.innerHTML += `
            <div id="SideBar${menuCard["name"]}Div" class="col-12 p-4 ps-3 d-flex justify-content-start align-items-center leftBarBtn">
                <img style="border-radius:50%;" class="me-2" src="${menuCard["image"]}" width="35rem">
                <span id="leftBar${menuCard["name"]}">${menuCard["name"]}</span>
            </div>`;
});

const SideBarUserNameDiv = document.getElementById("SideBarUserNameDiv");
SideBarUserNameDiv.addEventListener("click", () => {
  window.location = "../profile page/profile.html";
});

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
                <img id="friendProfileImage" src="${friend["image"]}">
                <span id="${friend["name"]}">${friend["name"]}</span>
            </div>`;
});

// checking user in logged in or not

let profileSmallImage = document.querySelector(".profileSmallImage");
let dropdownProfileImage = document.querySelector(".dropdownProfileImage");
let postImage = document.querySelector(".postImage");
let createPostImage = document.querySelector(".createPostImage");
let leftBarUserName = document.querySelector("#leftBarUserName");

let uid;
let userDetails;
let loggedInUserCheck = onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);

    // alert("wait, checking your data!")

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      userDetails = docSnap.data();
      displayingPost(userDetails);

      console.log(await userDetails);

      leftBarUserName.textContent = userDetails.fullName
        ? userDetails.fullName
        : "User Name";
      dropdownProfileImage.src = userDetails.profileImage
        ? userDetails.profileImage
        : "../assets/home/user account button image.png";
      profileSmallImage.src = userDetails.profileImage
        ? userDetails.profileImage
        : "../assets/home/user account button image.png";
      createPostImage.src = userDetails.profileImage
        ? userDetails.profileImage
        : "../assets/home/user account button image.png";
      // postImage.src = userDetails.profileImage
      //   ? userDetails.profileImage
      //   : "../assets/home/user account button image.png";

      return await userDetails;
    } else {
      console.log("No such document!");
    }
  } else {
    if (location.pathname !== "../index.html") {
      window.location = "../index.html";
    }
  }
});

// logout
let logoutBtn = document.querySelector("#logoutBtn");
let logOut = logout;
if (logOut.status) {
  alert("You are SignOut sucessfully!");
  window.location.href = "../index.html";
}
logoutBtn.addEventListener("click", logOut);

// displaying post

let centerAreaPosts = document.querySelector(".centerArea");
let displayingPost = async (loggedInuserDetails) => {
  console.log("display post handler is working!");

  try {
    let getPostData = await getAllDataOrderedByTimestamp("posts");
    console.log(getPostData);

    if (getPostData.status) {
      getPostData.data.reverse().forEach(async (doc) => {
        centerAreaPosts.innerHTML += `
        <div class="col-12 mt-4" >
        <div class="bg-white pt-3 post"
        style="border-radius: 15px; box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);">
       
        <div class="d-flex justify-content-between align-items-center p-1 ">
       
        <div class="d-flex justify-content-center align-items-center">
        <img class="ms-2 me-2 postImage" width="40rem" src="${
          doc.data()?.userDetails.profileImage
            ? doc.data()?.userDetails.profileImage
            : `../assets/home/user account button image.png`
        }" style="border-radius:50% ;">
        <h6 class="mb-0" id="userNameInPost" style="text-transform: capitalize;">${
          doc.data()?.userDetails?.fullName
        }</h6>
        </div>
       
        ${
          doc.data().userDetails.email == loggedInuserDetails.email
            ? `<div class="d-flex justify-content-center align-items-center dropdown">
        <img class="ms-2 me-2 " class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" width="30rem" src="../assets/home/home center content/post handler Btn.png">

        
        <ul class="dropdown-menu">
        <li><a class="dropdown-item"  data-bs-toggle="modal" onclick="editPostHandler('${doc.id}')" data-bs-target="#staticBackdrop">Edit</a></li>
        <li><a class="dropdown-item" onclick="deletePostHandler('${doc.id}')">Delete</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        </ul>
       
        </div>`
            : ""
        }
        
        </div>
       
        <!-- discription area -->
        <div class="d-flex justify-content-start align-items-center mt-0 ps-2 p-1 pb-0">
        <p class="mb-2" id="description">${doc.data()?.discription}</p>
        </div>

        <!-- file (image/video) area -->
        ${
          doc.data()?.file
            ? `<div class=" mt-0 mb-2 pb-0 fileDiv">
        ${
          doc.data()?.fileType == "video/mp4"
            ? `<video class="postVideoUrl" controls><source src="${
                doc.data()?.file
              }" type="video/mp4"></video>`
            : `<img class="postImageUrl" src="${
                doc.data()?.file
              }" alt="Post image">`
        }
        </div>`
            : ""
        }

        <div class="d-flex justify-content-start align-items-center w-100 ms-2 my-0">
        <img src="../assets/home/home center content/like btn.png" width="20rem">
        <h6 class="p-0 my-1 ms-1 " id="likeNumbers-${doc.id}">${
          doc.data()?.likeKey?.length ? doc.data()?.likeKey?.length : ''
        }</h6>
        </div>
        <div class="d-flex justify-content-start align-items-center  mx-2">
        <hr class="w-100 mt-1 mb-2">
        </div>
       
        <!-- like and comment area -->
        <div class="d-flex justify-content-around align-items-center p-0 m-0">
       
        <button onclick="likeHandler('${doc.id}', '${
        loggedInuserDetails.email
      }', document.querySelector('#likeNumbers-${
        doc.id
      }') , document.querySelector('#likeIcon-${
        doc.id
      }') ) " class="w-50 p-2 d-flex  justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 0px 10px;"><img id="likeIcon-${
        doc.id
      }" src="${
        doc?.data()?.likeKey?.includes(loggedInuserDetails.email)
          ? "../assets/home/home center content/like icon(with like ).png"
          : "../assets/home/home center content/like icon(without like ).png"
      }" class="me-1" width="20rem"> Like</button>

        <button
         class="w-50 p-2 d-flex justify-content-center align-items-center" style="border: 1px solid lightgrey; background-color: #fcfcfc; border-radius:0px 0px 10px 0px;">
        <img src="../assets/home/home center content/comment btn.png" class="me-1" width="17rem"> Comment</button>

        </div>
       
        </div>
        </div>`;
      });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// posts
let fileInput = document.querySelector("#fileInput");
let discriptionInput = document.querySelector(".discriptionInput");
let postBtn = document.querySelector("#postBtn");

// uploading post
let selectedFile;
let selectedFileName;
let url;
let postObj;

let postHandler = async () => {
  // Check if either description or file is provided
  if (discriptionInput.value || fileInput.files.length > 0) {
    postObj = {
      discription: discriptionInput.value || "",
      userDetails: userDetails || "",
      likeKey: [],
      commentKey: [],
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
          console.error("Upload error:", error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            url = await downloadURL;
            postObj.file = url;
            // saving data into firestore
            const savingData = await addInDB(postObj, "posts");
            console.log((await postObj) + " ===>> postObj");
            alert("your post is saved");
            window.location.reload();
          });
        }
      );
    } else {
      // No file is selected
      console.log("No file added!");
      const savingData = await addInDB(postObj, "posts");
      window.location.reload();
    }
  } else {
    // description or file does not provided
    alert("No description or file added!");
  }
};
postBtn.addEventListener("click", postHandler);

// edit post
let editPostText = document.querySelector("#editPostText");
let selectedPostId;
let selectedPost;
window.editPostHandler = async (postId) => {
  console.log("postId for edit handler ==>>" + postId);

  try {
    const getPostsForEdit = await getAllDataOrderedByTimestamp("posts");
    console.log(getPostsForEdit);

    if (getPostsForEdit.status) {
      selectedPost = getPostsForEdit.data.forEach(async (post) => {
        if (post.id == postId) {
          console.log(post.data());
          editPostText.textContent =
            post.data().discription == "" ? "" : post.data().discription;
          selectedPostId = await post.id;
          selectedPost = await post.data();
        }
      });
    }
  } catch (error) {
    console.log(error + " ==>> error");
  }
};

// update handler
let updateBtn = document.querySelector("#updateBtn");
const updatePostHandler = async () => {
  selectedPost.discription = editPostText.value;
  console.log("Selected post:", selectedPost);
  console.log("Selected post ID:", selectedPostId);

  try {
    const updatePost = await updateData(selectedPost, selectedPostId, "posts");

    if (updatePost.status) {
      // alert("Post updated!");
      setTimeout(() => {
        window.location.reload();
      }, 8000);
    } else {
      alert(
        "Failed to update post: " + (updatePost.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Error updating post: " + error.message);
  }
};
updateBtn.addEventListener("click", updatePostHandler);

// delete post
window.deletePostHandler = async (postId) => {
  console.log("postId ==>>" + postId);
  deleteDoc(doc(db, "posts", await postId));
  alert(await "Your post has deleted!");
  setTimeout(() => {
    window.location.reload();
  }, 5000);
};

// like handler
window.likeHandler = async (
  postId,
  loggedInuserEmail,
  likeElement,
  likeIcon
) => {
  if (postId && loggedInuserEmail && likeElement) {
    console.log(await postId);
    console.log(await loggedInuserEmail);
    console.log(await likeElement);
    console.log(await likeIcon);

    try {
      let getPost = await getData(await postId, "posts");
      let postDetails = await getPost.data;
      console.log(await postDetails);

      const ifAlreadyLiked = postDetails.likeKey.find((likeByUserEmail) => {
        if (likeByUserEmail == loggedInuserEmail) return likeByUserEmail;
      });

      if (ifAlreadyLiked) {
        const indexOfUser = postDetails.likeKey.indexOf(ifAlreadyLiked);
        postDetails.likeKey.splice(indexOfUser, 1);
        console.log(postDetails);

        // updating data in db
        const updateData = await addInDBById(postDetails, postId, "posts");

        // updating like numbers
        likeElement.textContent = postDetails.likeKey.length;

        // updating like icon
        likeIcon.src =
          "../assets/home/home center content/like icon(without like ).png";
      } else {
        postDetails.likeKey.push(loggedInuserEmail);
        console.log(postDetails);

        // updating data in db
        const updateData = await addInDBById(postDetails, postId, "posts");

        // updating like numbers
        likeElement.textContent = postDetails.likeKey.length;

        // updating like icon
        likeIcon.src =
          "../assets/home/home center content/like icon(with like ).png";
      }
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("postId or loggedInuserEmail is not provided");
  }
};

// likechecks
// window.likeChecks = async (postId) => {
//   if (postId) {
//     try {
//       let getPost = await getData(postId, "posts");
//       let postLikesDetails = getPost.data.likeKey;
//       console.log(postLikesDetails);
//     } catch (error) {
//       console.log(error.message);
//     }
//   } else {
//     console.log("postId is not provided");
//   }
