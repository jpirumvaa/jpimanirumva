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


  auth.onAuthStateChanged(user=>{
    if(user){
        console.log("Hello from user:", user.uid)
        db.collection('users').doc(user.uid).get().then(info=>{
          if(info.data().isAdmin===true){
            admin.style.display='inline-block'
            logoBtn.style.display="inline-block"
            logBtn.style.display= 'none'
          }else{
            admin.style.display= 'none' 
            logoBtn.style.display="inline-block" 
            logBtn.style.display= 'none'         
            
          }
        })
    }else{
      logoBtn.style.display="none"
      admin.style.display= 'none' 
      logBtn.style.display= 'inline-block'
      profileP.style.display='none'
    }
  })

  logoBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    auth.signOut().then(()=>{
        window.location="../pages/login.html"
        console.log("Signed Out successfully")
    })
  })