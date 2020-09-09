const featuredWorksDOM= document.querySelector(".featured-activities")
const summary= document.querySelector(".blog-summary")
const container= document.querySelector('.container')
const spinner= document.querySelector('.load')



const displayHomeProjects= (projects)=>{    
    let homeResults="" 

    projects.slice(0,4).forEach(item=>{
        let project= item.data()
        homeResults+=`
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
    featuredWorksDOM.innerHTML=homeResults
}

container.style.display= 'none'
db.collection('projects').get().then(info=>{
    displayHomeProjects(info.docs)
}).then(()=>{
    container.style.display= 'block'
    spinner.style.display='none'
}).catch((e)=>{
    alert("An error occured. Check your network and try again.")
    console.log(e)
})

//Blogs

const setupBlogSummary= (data)=>{
    let blogSummaryUI="";
    data.slice(0,2).forEach(item=>{
        const blogSummary= item
        if(blogSummary!=undefined){
            const blSummary=`

            <div class="blog">
                <h2>${blogSummary.title}</h2>
                <p>${blogSummary.body.slice(0, 300)}.......<a href="./blog.html">Continue Reading</a></p>
            </div>
            `
            blogSummaryUI+=blSummary
        }


    })
    summary.innerHTML= blogSummaryUI
}

fetch('https://jpirumvaa-jp-irumva-api-3.glitch.me/blogs').then(res=>{
    res.json().then((response)=>{
        console.log(response.retrievedBlogs)
        setupBlogSummary(response.retrievedBlogs)
    })
}).then(()=>{
    container.style.display= 'block'
    spinner.style.display='none'
}).catch((e)=>{
    alert("An error occured. Check your network and try again.")
    console.log(e)
})