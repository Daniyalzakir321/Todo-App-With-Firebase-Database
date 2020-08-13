// Name : M.Daniyal Zakir
// Roll No: WM5912
// Email: daniyalzakir03@gmail.com
// Assignment-12: TODO WEB APP WITH FIREBASE DATABASE

var li=document.getElementById("li")

function add_item(){
var items=document.getElementById("items")
if(items.value=="")
{
Swal.fire("Please enter todo items. <br> Can not add empty list.")
}
else{

//  FIREBASE DATA INSERTION
var key=firebase.database().ref("DATABASE").push().key;
// getData(key,abc)
firebase.database().ref("DATABASE/"+ key ).set({
uid: key,
value: items.value  
})
getData(key)


// Items
var create_li=document.createElement("li")
var li_Text=document.createTextNode(items.value)
create_li.appendChild(li_Text)


// Edit  Button
var edit_btn= document.createElement("img")
edit_btn.src='Images/edit.png'
edit_btn.alt="EDIT"
edit_btn.setAttribute("onclick","edit_li(this)")
create_li.appendChild(edit_btn)


// Delete  Button
var del_btn= document.createElement("img")
del_btn.src='Images/bin.png'
del_btn.alt="DELETE"
del_btn.className="delclass"
del_btn.setAttribute("onclick","delete_li(this)")
create_li.appendChild(del_btn)


// Span To Store Firebase Realtime Key
var span= document.createElement("span")
var text=document.createTextNode(key)
span.appendChild(text)
create_li.appendChild(span)

li.appendChild(create_li)

items.value=""

}
}



// FIREBASE GET DATA
function getData(key){
firebase.database().ref("DATABASE/"+key).on("value",function(data){
var datas=data.val().value
console.log(datas)
  
var b= document.getElementById("b")
b.innerHTML= datas
})
}
  


// FIREBASE DELETING A SINGLE LI
function delete_li(rm){
var key2= rm.parentNode.lastChild.innerHTML
console.log("Last Child: "+ key2)
firebase.database().ref("DATABASE/"+ key2).remove()
rm.parentNode.remove()
sweetAlertSuccessMsg("Deleted Successfully")
}



// FIREBASE EDIT VALUE
function edit_li(e){ 
var val= e.parentNode.firstChild.nodeValue  
edit_Val= prompt("Enter Edit Value", val)
e.parentNode.firstChild.nodeValue= edit_Val

  var key2= e.parentNode.lastChild.innerHTML
  firebase.database().ref("DATABASE/"+ key2).set({
  uid: key2,
  value: edit_Val 
  })

sweetAlertSuccessMsg("Edit Successfully") 
}





// function getData(key,abc){
  // console.log(key)
  // var scoreListing=document.querySelectorAll(".scoreListing")
  // for(var i=0; i<scoreListing.length; i++){
  //   console.log(scoreListing[i])
  //   scoreListing[i].remove()
  // }

  // On Page Load
// firebase.database().ref("DATABASE/"+key).on("value",function(data){
// var datas=data.val().value
// console.log(data.val().uid)
// var items=document.getElementById("items")
// items.innerHTML= datas
// abc.value=datas
// console.log(abc)
// console.log(abc.value)
// console.log(abc.value=datas)

// var a= document.getElementById("a")
// var b= document.getElementById("b")
// b.innerHTML= datas

  
  // firebase.database().ref("DATABASE").on("value",function(data){
  // var database= data.val()
  // var key=Object.keys(database)
  // console.log(key)

  // for(var i=0; i<key.length; i++){
  //  var k=key[i]
  //  var uid= database[k].uid
  //  var val= database[k].value
  //  console.log(uid, val)
   
  // var li=document.createElement("li", uid +" : "+  val)
  // li.className="scoreListing"
  // li.parent="scorelist"  
  // console.log(li)


// })
// }
// getData()









// DELETING ALL ITEMS FROM FIREBASE
// With Sweet Alert Library
function del_all_item(){

  Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete Whole TODO List & its Data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
       li.innerHTML="";
      //  FIREBASE REMOVE ALL DATA
      firebase.database().ref("DATABASE").remove()

        Swal.fire(
          'Deleted!',
          'Your TODO List & Its Data Has Been Deleted.',
          'success'
        )
      }
    })
}





// Sweet Alert Library
function sweetAlertSuccessMsg(msg){
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: msg
  })  
}

// =======================================================================



function storeData(){
var key=(Math.random()*44).toFixed()
var items=document.getElementById("items")
var stud={
  ID: key,
  Name: "Daniyal" 
}
var key=(Math.random()*321).toFixed()
firebase.database().ref("DATABASE/TODO-"+ key).push(stud)
}
// storeData()



function getDataFirebase(){
  // On Page Load
  firebase.database().ref("DATABASE").on("value",function(data){
    // Direct Without Page Loading
    // firebase.database().ref("DATABASE").on("child_added",function(data){
    data.val()
  })
}
// getDataFirebase()
