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


  const data= {
  email: userEmail,
  password: userPassword
}

const options={
    method: 'POST',
    headers: {
        accept: "application/json",
        "content-type": "application/json"
    },
    body: JSON.stringify(data),      
}
  fetch('https://jpirumvaa-jp-irumva-api-3.glitch.me/users/login', options).then(results=>{
    results.json().then((response)=>{
      if(!response.token){
        console.log("No Token Available")
        alert("Error signing in. Check you credentials and try again")
      }else{
        console.log(response.token)
        localStorage.setItem('token', `Bearer ${response.token}`)
        logForm.reset()
        window.location="../pages/index.html"
      }
  }).catch((e)=>{
    console.log("Can't signin")
    console.log(e)
    alert("Either Email or password is incorrect. Check your input and try again.")
})
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
