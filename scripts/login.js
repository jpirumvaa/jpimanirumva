import {checkRequired} from './signform.js'

const logForm= document.querySelector('.login-form')
const logEmail= document.querySelector(".log-email")
const logPassword= document.querySelector('.log-password')

const container= document.querySelector('.log-container')
const spinner= document.querySelector('.load')

const reset= document.querySelector('.reset')
const forgotBtn= document.querySelector('.f-pass')
const resetEmail= document.querySelector('.reset-email')
const save= document.querySelector('.save')


logForm.addEventListener('submit', function(e){
  e.preventDefault()
  checkRequired([logEmail, logPassword])
  const userEmail= logEmail.value
  const userPassword= logPassword.value
  auth.signInWithEmailAndPassword(userEmail, userPassword).then(userInfo=>{
    logForm.reset()
    window.location="../pages/index.html"
}).catch((e)=>{
    console.log("Can't signin")
    console.log(e)
    alert("Either Email or password is incorrect. Check your input and try again.")
})
})
forgotBtn.addEventListener('click', e=>{
  e.preventDefault()
  reset.style.display= reset.style.display=='block'?'none':'block'
})
console.log(resetEmail.value)
save.addEventListener('click', (e)=>{
  e.preventDefault()
  auth.sendPasswordResetEmail(resetEmail.value).then(()=>{
    console.log("Password reset email sent successfully")
    reset.style.display= 'none'
  }).catch((e)=>{
    alert(e.message)
    console.log(e)
  })
})

db.collection('users').get().then(info=>{    
  console.log(info.docs)
}).then(()=>{
  container.style.display= 'block'
  spinner.style.display='none'
}).catch((e)=>{
  alert("An error occured. Check your network and try again.")
  console.log(e)
})
