const container= document.querySelector('.log-container')
const spinner= document.querySelector('.load')
const userIntro= document.querySelector('.user-intro')
const pass= document.querySelector('.pass-view')
const fullProfile= document.querySelector('.full-profile')

const profileForm= document.querySelector('.profile-f')
const userName= document.querySelector('.profile-name')
const displayName= document.querySelector('.display-name')
const profForm= document.querySelector(".prof-form")

const setupProfile = (user)=>{
    console.log(user.name)

let ui=`   
    
        <div class="center">
            <img alt="profile" class="profile" src="../utils/profile.png"/>
            <h1>${user.displayName===""?user.name:user.displayName}</h1>
        </div>              
            `
let profUI= `
    <p><b>Registered Email:</b> ${user.email}</p>
    <p><b>Password:</b> ${user.password}.</p>
    <p><b>User Name:</b> ${user.name}</p>
    <p><b>Display Name:</b> ${user.displayName}</p>
    <p><b>Location:</b><br>
    Latitude: ${user.location.latitude===undefined?"No Latitude to show": user.location.latitude}<br>
    Longitude: ${user.location.longitude===undefined?"No Longituded to show": user.location.longitude}</p>
    <img src="https://maps.googleapis.com/maps/api/staticmap?center=${user.location.latitude},${user.location.longitude}&zoom=14&size=400x300&sensor=false&key=YOUR_KEY">
    <a href="https://www.openstreetmap.org/#map=18/${user.location.latitude}/${user.location.longitude}">View Map</a>
    `
    userIntro.innerHTML= ui
    fullProfile.innerHTML=profUI
}

let id;
console.log(id)
const getProfileInfo= (data)=>{
    profileForm.addEventListener('submit', e=>{
        e.preventDefault()
        db.collection('users').doc(data).update({
            name: userName.value,
            displayName: displayName.value
        }).then(()=>{
            profileForm.reset()
            db.collection('users').doc(data).get().then(info=>{
                setupProfile(info.data())            
            })
        }).then(()=>{
            profForm.style.display="none"
            alert("Updated successfully")
        })
    })

}


auth.onAuthStateChanged(user=>{
    if(user){
        console.log("Hello from user:", user.uid)
        id= user.uid
        getProfileInfo(user.uid)
        db.collection('users').doc(user.uid).get().then(info=>{
            setupProfile(info.data())            
        }).then(()=>{
            container.style.display= 'block'
            spinner.style.display='none'
        }).catch((e)=>{
            alert("An error occured. Check your network and try again.")
            console.log(e)
        })
        
    }else{
        logoBtn.style.display="none"
        admin.style.display= 'none' 
        logBtn.style.display= 'inline-block'
        profileP.style.display='none'
    }
})

/*
db.collection('users').get().then(info=>{    
    console.log(info.docs)
})
*/