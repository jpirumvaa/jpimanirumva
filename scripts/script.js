const addBtn= document.querySelector('.add')
const adminForm=document.querySelector('.admin-form')
const profileName= document.querySelector(".prof-name")


function showHide(ele){
    ele.style.display= ele.style.display=="block"?"none":"block"
}
addBtn.addEventListener('click', ()=>{
    showHide(adminForm)
    adminUpdate.style.display= 'none'
})
