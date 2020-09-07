import {checkRequired, checkLength, checkEmail} from './signform.js'

const contForm= document.querySelector('.cont-form')
const contEmail= document.querySelector('.cont-email')
const contUsername= document.querySelector('.cont-username')
const contMessage= document.querySelector('.cont-message')

const container= document.querySelector('.log-container')
const spinner= document.querySelector('.load')

contForm.addEventListener('submit', function(e){
    e.preventDefault()  
    checkRequired([contUsername, contEmail, contMessage])
    checkLength(contMessage, 50, 3000)
    checkEmail(contEmail)

    if(contUsername.value!=""&&contEmail.value !=""&&contMessage.value!=""){
        const data={
            name: contUsername.value,
            email: contEmail.value,
            message: contMessage.value
        }
        const options={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpwLml2dnZiYkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZjRjNzUwZWZkYWQwOTI1NTA0MDg0ZmIiLCJpYXQiOjE1OTg4NDYyMjMsImV4cCI6MTU5ODg1NzAyM30.ND-HyogCdY2yN4oEi-qJHnrSIgKAlJ5ZlSAYoGc-9pE`
              },
            body: JSON.stringify(data),
            mode: 'no-cors'
            
        }

        fetch('http://localhost:5000/messages', options).then(res=>{
        console.log(data)
        console.log(res)
    })
        
        // db.collection('messages').add({
        //     name: contUsername.value,
        //     email: contEmail.value,
        //     message: contMessage.value
        // }).then(()=>{
        //     alert("Thank you for sending your message.")
        //     contForm.reset()
        //     window.location='../pages/index.html'
        // })
    }else{
        alert("An error occured. Fill the form correctly and try again.")
    }
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