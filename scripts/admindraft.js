const messages= document.querySelector(".messages")
const avatar= document.querySelector(".avatar")
const addForm= document.querySelector(".admin")
var reader;
var files=[];
var imageURLs=[]
const author= document.querySelector(".author")
const title=document.querySelector(".article-title")
const articleBody= document.querySelector(".article-body")
const articlesPart= document.querySelector('.articles-part')
const realArticles= document.querySelector('.arti')

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

avatar.onchange= e =>{
    files= e.target.files;
    reader= new FileReader();
    reader.onload=function(){
        imageURLs.push(reader.result)
        
        
    }
    reader.readAsDataURL(files[0])
    
}

db.collection('messages').get().then(info=>{
    setupMessages(info.docs)
}).catch((e)=>{
    alert("Unable to retrieve data. Please, check your network and try again.")
    console.log(e)
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
console.log(publicationTime)

var dateTime=`${date} ${time}`

addForm.addEventListener('submit', function(e){
    e.preventDefault() 
        db.collection('articles').add({
            title: title.value,
            author: author.value,
            body: articleBody.value,
            avatarURL: imageURLs[0],
            likes:[],
            comments:[],
            date: dateTime,
            timeOfPublication: publicationTime
        }).then(()=>{
            alert("Thank you for submitting your form.")
            addForm.reset()
        }).then(()=>{
            articlesPart.innerHTML=""
            db.collection('articles').get().then(info=>{
            setupArticles(info.docs)
        })
        }).catch((e)=>console.log(e))

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
    let articlesArray= []
    let sortedArticles=[]
    let articleIds=[];

    data.forEach(item=>{
        const article= item.data()
        articleIds.push(item.id)
        articlesArray.push(article)
        sortedArticles= articlesArray.sort((a,b)=>a.timeOfPublication - b.timeOfPublication)
        //console.log(article)
    })
    console.log(articleIds)

    sortedArticles.map(article=>{
        let articleId;
        articleIds.map(id=>{
            articleId= id
        })
        if(article!=undefined){
            let tr= document.createElement('tr')
            tr.setAttribute('data-id', articleId)

            
            const art=`
                    <td class="article-title">${article.title}</td>
                    <td>${article.date}</td>
                    <td class="center"><img src="https://img.icons8.com/pastel-glyph/30/000000/edit.png"/></td>
                    <td class="center"><img onclick= deleteItem(${articleId})  id="${articleId}" class="delete"  src="https://img.icons8.com/color/30/000000/delete-forever.png"/></td>
            `
            tr.innerHTML=art
            articlesPart.appendChild(tr)
        }
    })
}

function deleteItem(e){
    let id= e.getAttribute('id')
    db.collection('articles').doc(id).delete()
    articlesPart.innerHTML=""
    db.collection('articles').get().then(info=>{
    setupArticles(info.docs)
    })
    console.log(id)
}

db.collection('articles').get().then(info=>{
    setupArticles(info.docs)
}).catch((e)=>{
    alert("Unable to retrieve data. Please, check your network and try again.")
    console.log(e)
})
