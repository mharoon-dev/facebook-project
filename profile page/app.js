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


// check loggedin user
let userProfileImage = document.getElementById("userProfileImage");
let profileSmallImage = document.querySelector(".profileSmallImage");
let dropdownProfileImage = document.querySelector(".dropdownProfileImage");
let postImage = document.querySelector(".postImage");
let userName = document.getElementById("userName");

let uid;
let userDetails;

let loggedInUserCheck = onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = await user.uid;
    console.log(uid);

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      userDetails = docSnap.data();
      if (await userDetails) {
        displayingPost(userDetails);
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



// bg porofile image




// let bgProfileFileInput = document.querySelector('#bgProfileFileInput')
// bgProfileImage.addEventListener('dblclick' , () => {
//   bgProfileFileInput.click()
// })

// let BgFile;
// let bgSelectedProfileImage;

// let selectedBgProfile = bgProfileFileInput.addEventListener(
//   "change",
//   async function (event) {
//     BgFile = event.target.files[0];
//     bgSelectedProfileImage = `${new Date().getTime()}-${BgFile?.name}`;
//     console.log(BgFile);
//     console.log(bgSelectedProfileImage);

//     if (BgFile.type !== "video/mp4") {
//       console.log(BgFile.type);
//       let uploadProfileImage = await uploadFile(BgFile, bgSelectedProfileImage);
//       console.log("your file is uploaded!");
//       let saveImage = (userDetails.bgProfileImage =
//         uploadProfileImage.downloadURL);
//       console.log(await userDetails);

//       if (userDetails.bgProfileImage) {
//         let addBgProfileImage = await updateData(userDetails, uid, "users");
//         window.location.reload();
//         return await downloadURL;
//       }
//     } else {
//       console.log("sorry your selected file is video!");
//     }
//   }
// );




// profile image




// profile image
let profileFileInput = document.getElementById("profileFileInput");
userProfileImage.addEventListener("dblclick", function () {
  document.getElementById("profileFileInput").click();
});

let file;
let selectedProfileImage;

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


// displaying posts
let centerAreaPosts = document.querySelector(".centerArea");
let displayingPost = async (loggedInuserDetails) => {
  console.log("display post handler is working!");

  const q = query(collection(db, "posts"));

  const querySnapshot = await getDocs(q);
  querySnapshot?.forEach(async (doc) => {
    if (doc.data().userDetails.email == loggedInuserDetails.email) {
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




