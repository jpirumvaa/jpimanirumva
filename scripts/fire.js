const admin= document.querySelector('.admin')
const logBtn= document.querySelector('.logbtn')
const logoBtn= document.querySelector('#logoutBtn')
const profileP= document.querySelector('.profi')
const navMenu= document.querySelector('#menu')
const navList= document.querySelector('.nav-list')
const navPart=document.querySelector('.nav-icon')


  navMenu.addEventListener('click',()=>{
    navList.classList.toggle('show')
    navPart.classList.toggle('display')
  })



var firebaseConfig = {
    apiKey: "AIzaSyCpZkW_WyIlVBxeNNvN2DWWxQ5BHbnIV50",
    authDomain: "jp-brand.firebaseapp.com",
    databaseURL: "https://jp-brand.firebaseio.com",
    projectId: "jp-brand",
    storageBucket: "jp-brand.appspot.com",
    messagingSenderId: "404159335393",
    appId: "1:404159335393:web:6742dc1c651844e7a260a0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth= firebase.auth()
  const db=firebase.firestore()

const token= localStorage.getItem('token')

if(token!==""){
  logoBtn.style.display="inline-block"
  logBtn.style.display= 'none'
  const uid= localStorage.getItem('uid')
  fetch(`https://jpirumvaa-jp-irumva-api-3.glitch.me/users/profile/${uid}`).then(res=>{
  res.json().then(results=>{
    if(results.isAdmin===true){
      admin.style.display= 'inline-block' 
    }else{
      admin.style.display= 'none'  
    }
    console.log("Hello Rwanda", results)
  })  
  })
}else{
  console.log("No Token available")
  logoBtn.style.display="none" 
  logBtn.style.display= "inline-block" 
  admin.style.display= 'none'
}

  logoBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.setItem('token', '')
    localStorage.setItem('uid', '')
    window.location="../pages/login.html"
    console.log("Signed Out successfully")

    console.log(localStorage.getItem('token'))
  })

const clearUserData= ()=>{
      setTimeout(()=>{ 
        localStorage.removeItem("token")
        localStorage.removeItem("uid")
    }, 10800000)
};    
clearUserData()