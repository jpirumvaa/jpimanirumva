const messages= document.querySelector(".messages")
const addForm= document.querySelector(".admin-f")
const adminAdd=document.querySelector('.admin-form')
const adminUpdate= document.querySelector('.update-form')
const updateForm= document.querySelector('.update')

const avatar= document.querySelector(".avatar")
const author= document.querySelector(".author")
const title=document.querySelector(".article-title")
const articleBody= document.querySelector(".article-body")

const updateAuthor= document.querySelector(".update-author")
const updateTitle=document.querySelector(".update-article-title")
const updateArticleBody= document.querySelector(".update-article-body")
const updateAvatar= document.querySelector(".update-avatar")

const articlesPart= document.querySelector('.articles-part')
const realArticles= document.querySelector('.arti')

const container= document.querySelector('.projects-container')
const spinner= document.querySelector('.load')

const setupMessages= (data)=>{
    let messageUI= `<h2 class="center">Messages</h2>`
    data.forEach(item=>{
        const message= item.data()
        
        if(message!=undefined){
            const mess=`
            <div class="message">
                <h4>${message.name}</h4>
                <p>${message.message}</p>
            </div>
            <hr/>
            `
            messageUI+=mess
        }

    })
    messages.innerHTML= messageUI
}



db.collection('messages').get().then(info=>{
    setupMessages(info.docs)
})

var today = new Date();
let month= today.getMonth()
let realMonth;
switch (month) {
    case 0:
        realMonth="January"        
        break;
    case 1:
        realMonth= "February"
        break;
    case 2:
        realMonth="March"        
        break;
    case 3:
        realMonth= "April"
        break;
    case 4:
        realMonth="May"        
        break;
    case 5:
        realMonth= "June"
        break;
    case 6:
        realMonth="July"        
        break;
    case 7:
        realMonth= "August"
        break;
    case 8:
        realMonth="September"        
        break;
    case 9:
        realMonth= "October"
        break;
    case 10:
        realMonth="November"        
        break;
    case 11:
        realMonth= "December"
        break;
    default:
        realMonth= "N/M"
        break;
}
let day= today.getDay()
let realDay;
switch (day) {
    case 0:
        realDay="Sunday"        
        break;
    case 1:
        realDay= "Monday"
        break;
    case 2:
        realDay="Tuesday"        
        break;
    case 3:
        realDay= "Wednesday"
        break;
    case 4:
        realDay="Thursday"        
        break;
    case 5:
        realDay= "Friday"
        break;
    case 6:
        realDay="Saturday"        
        break;
    default:
        realDay= "N/D"
        break;
}
var date = `${realDay}, ${realMonth} ${today.getDate()}, ${today.getFullYear()}`;
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let publicationTime= today.getTime()

var dateTime=`${date} ${time}`

var reader;
var files=[];
var imageURLs=[]

avatar.onchange= e =>{
    files= e.target.files;
    reader= new FileReader();
    reader.onload=function(){
        imageURLs.push(reader.result)       
        
    }
    reader.readAsDataURL(files[0])
    
}
addForm.addEventListener('submit', e=>{
    e.preventDefault() 
    const data= {
        title: title.value,
        author: author.value,
        body: articleBody.value,
        date: dateTime,
        avatarURL: imageURLs[0],
        dateofPublication: `${publicationTime}`
    }

    const options={
        method: 'POST',
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpwLml3d3Z2YmJAZ21haWwuY29tIiwidXNlcklkIjoiNWY1NjIyZmMzNjc2NTI0M2UwYWE3MWViIiwiaWF0IjoxNTk5NDgwNjA1LCJleHAiOjE1OTk0OTE0MDV9.BA5o8wP4AG81KWZt1tkzvyq3PQJomsjtL2KlgMw9upc"
        },
        body: JSON.stringify(data),      
    }
    fetch('http://localhost:5000/blogs', options).then(res=>{
        console.log(data)
        console.log(res)
        res.json().then((response)=>{
            console.log(response)
        })
    }).then(()=>{
        alert("Thank you for submitting your form.")
        addForm.reset()
        imageURLs= []
    }).then(()=>{
        articlesPart.innerHTML=""
        db.collection('articles').get().then(info=>{
        setupArticles(info.docs)
    })
    }).catch(e=>{
        console.log(e)
    })
    //fetch('https://jpirumvaa-jp-irumva-api-2.glitch.me/blogs', options)   
//         db.collection('articles').add({
//             title: title.value,
//             author: author.value,
//             body: articleBody.value,
//             avatarURL: imageURLs[0],
//             likes:[],
//             comments:[],
//             date: dateTime,
//             dateofPublication: publicationTime
//         }).then(()=>{
//             alert("Thank you for submitting your form.")
//             addForm.reset()
//             imageURLs= []
//         }).then(()=>{
//             articlesPart.innerHTML=""
//             db.collection('articles').get().then(info=>{
//             setupArticles(info.docs)
//         })
//         }).catch((e)=>console.log(e))

})


const setupArticles= (data)=>{
    let header= document.createElement('tr')
    header.setAttribute('class', "title")
    let articleUI=`                    
    <tr class="title">
        <th>Article Name</th>
        <th>Date of Publication</th>
        <th>Edit Blog</th>
        <th>Delete</th>
    </tr>`;
    header.innerHTML= articleUI
    articlesPart.appendChild(header)
    data.forEach(item=>{
        const article= item.data()
        const articleId= item.id
        if(article!=undefined){
            let tr= document.createElement('tr')
            tr.setAttribute('data-id', articleId)

            
            const art=`
                    <td class="article-title">${article.title}</td>
                    <td>${article.date}</td>
                    <td class="center"><img onclick= editItem(${articleId}) class= "edit" src="https://img.icons8.com/pastel-glyph/30/000000/edit.png"/></td>
                    <td class="center"><img onclick= deleteItem(${articleId})  id="${articleId}" class="delete"  src="https://img.icons8.com/color/30/000000/delete-forever.png"/></td>
            `
            tr.innerHTML=art
            articlesPart.appendChild(tr)
        }

    })
}

function deleteItem(e){
    let id= e.getAttribute('id')
    db.collection('articles').doc(id).delete().then(()=>{
        articlesPart.innerHTML=""
        db.collection('articles').get().then(info=>{
        setupArticles(info.docs)
        })    
    })

}



const editArticle= (data)=>{
    adminUpdate.style.display='block'
    let article= data.data()
    let id= data.id
    updateAuthor.value= article.author
    updateTitle.value= article.title
    updateAvatar.src= article.avatarURL
    updateArticleBody.value= article.body
    updateForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        adminAdd.style.display='none'
        db.collection('articles').doc(id).update({
            author:updateAuthor.value,
            body: updateArticleBody.value,
            avatarURL: updateAvatar.src,
            title: updateTitle.value,
            comments: [],
            likes: [],
        }).then(()=>alert("Updated Successfully")).then(()=>{
            updateForm.reset()
            articlesPart.innerHTML=""
            db.collection('articles').get().then(info=>{
            setupArticles(info.docs)
            })
        }).catch((e)=>alert("An error occured. Please, try again"))
    })

}



function editItem(e){
    let id= e.getAttribute('id')
    db.collection('articles').doc(id).get().then(info=>{
        editArticle(info)    
    })
}

db.collection('articles').get().then(info=>{
    setupArticles(info.docs)
}).then(()=>{
    container.style.display= 'block'
    spinner.style.display='none'
}).catch((e)=>{
    alert("An error occured. Check your network and try again.")
    console.log(e)
})
