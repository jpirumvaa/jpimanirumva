const projectsDOM= document.querySelector(".domworks")
const projFooter= document.querySelector('.cont-footer')
const container= document.querySelector('.projects-container')
const spinner= document.querySelector('.load')

async function getProjects(){
    try{
        let results = await fetch('../Projects/projects.json')
        let data= await results.json()
        let projects= data.items

        return projects
    }catch(error){
        console.log(error)
    }
    
}


const displayProjects= (projects)=>{
    let results=""

    projects.forEach(item=>{
        let project= item.data()
        /*
        db.collection("projects").add({
            name: project.name,
            img: project.img,
            description: project.description,
            url: project.url
        }).then((data)=>console.log(data))*/
    results+=`
        <article class="work">
            <div class="img-container">
                <img class="work-img" src="${project.img}" alt="${project.name}">
                <div class="description">
                    <p>${project.description}</p>
                </div>
                
            </div>
            <h2>${project.name}</h2>
            <h3><a href="${project.url}" target="_blank">View Project</a></h3>				
        </article>
`
    })
    projectsDOM.innerHTML=results  
}







db.collection('projects').get().then(info=>{
    displayProjects(info.docs)
}).then(()=>{
    container.style.display= 'block'
    spinner.style.display='none'
}).catch((e)=>{
    alert("An error occured. Check your network and try again.")
    console.log(e)
})
/*
document.addEventListener("DOMContentLoaded", ()=>{
    const ui= new UI()
    getProjects().then(projects=>ui.displayProjects(projects))
    getProjects().then(projects=>ui.displayHomeProjects(projects))
})
*/