// Name : M.Daniyal Zakir
// Roll No: WM5912
// Email: daniyalzakir03@gmail.com
// Assignment-12: TODO WEB APP WITH FIREBASE DATABASE

var li=document.getElementById("li")

// FIREBASE GET DATA
firebase.database().ref("DATABASE").on("child_added",function(data){
  var uid=data.val().uid
  var datas=data.val().value

    
  // Items
  var create_li=document.createElement("li")
  var li_Text=document.createTextNode(datas)
  create_li.appendChild(li_Text)
    
    
  // Edit  Button
  var edit_btn= document.createElement("img")
  edit_btn.src='Images/edit.png'
  edit_btn.alt="EDIT"
  edit_btn.setAttribute("id",uid)
  edit_btn.setAttribute("onclick","edit_li(this)")
  create_li.appendChild(edit_btn)
    
    
  // Delete  Button
  var del_btn= document.createElement("img")
  del_btn.src='Images/bin.png'
  del_btn.alt="DELETE"
  del_btn.className="delclass"
  del_btn.setAttribute("id",uid)
  del_btn.setAttribute("onclick","delete_li(this)")
  create_li.appendChild(del_btn)
    
    
  li.appendChild(create_li)
  items.value=""
    
})
    


//  FIREBASE DATA INSERTION
function add_item(){
var items=document.getElementById("items")
if(items.value=="")
{
Swal.fire("Please enter todo items. <br> Can not add empty list.")
}
else{
var key=firebase.database().ref("DATABASE").push().key;
firebase.database().ref("DATABASE/"+ key ).set({
uid: key,
value: items.value  })
}
}



// FIREBASE DELETING A SINGLE LI
function delete_li(key){
firebase.database().ref("DATABASE/"+ key.id).remove()
key.parentNode.remove()
sweetAlertSuccessMsg("Deleted Successfully")
}



// FIREBASE EDIT VALUE
function edit_li(key){   
edit_Val= prompt("Enter Edit Value",  key.parentNode.firstChild.nodeValue )
firebase.database().ref("DATABASE/"+ key.id).set({
  uid: key.id,
  value: edit_Val 
})
key.parentNode.firstChild.nodeValue= edit_Val
sweetAlertSuccessMsg("Edit Successfully") 
}




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
