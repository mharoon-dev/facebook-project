// sideBar

let sideBar = document.querySelector(".siderBar");
let toggleBtn = document.querySelector('#toggleBtn')
let crossBtn = document.querySelector('#crossBtn')

toggleBtn.addEventListener('click' , () => {
    sideBar.style.transform = "translate(0%)"
    sideBar.style.transition = "0.5s"
})

crossBtn.addEventListener('click' , () => {
    sideBar.style.transform = "translate(-110%)"
    sideBar.style.transition = "0.5s"
})

// right side menu
let menuBarName = [
    {
        image:'../assets/home/home content/user account button image.png',
        name:'Muhammad Haroon'
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

menuBarName.forEach((menuCard) => {
    leftSideBarRow.innerHTML += `
            <div class="col-12 p-4 ps-3 leftBarBtn">
                <img src="${menuCard['image']}" width="35rem">
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

rightSideBar.forEach((friend) => {
    rightSideBarRow.innerHTML += `
            <div class="col-12 p-lg-3 p-2 ps-3 rightBarBtn">
                <img style="border-radius:50%;
                border:none;" src="${friend['image']}" width="40rem">
                <span id="${friend['name']}">${friend['name']}</span>
            </div>`
});

