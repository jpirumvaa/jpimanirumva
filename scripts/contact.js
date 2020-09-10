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
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify(data),      
        }

        fetch('https://jpirumvaa-jp-irumva-api-3.glitch.me/messages', options).then(res=>{
            res.json().then((response)=>{
                console.log(response)
            }).then(()=>{
                alert("Thank you for sending your message.")
                contForm.reset()
                window.location='../pages/index.html'
            })
        })
    }else{
        alert("An error occured. Fill the form correctly and try again.")
    }
})
fetch('https://jpirumvaa-jp-irumva-api-3.glitch.me/messages').then(()=>{
        container.style.display= 'block'
        spinner.style.display='none'
    }).catch((e)=>{
        alert("An error occured. Check your network and try again.")
        console.log(e)
})


//     console.log(info.docs)
// }).then(()=>{
//     container.style.display= 'block'
//     spinner.style.display='none'
// }).catch((e)=>{
//     alert("An error occured. Check your network and try again.")
//     console.log(e)
// })