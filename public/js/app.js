

// INITILIZATION FOR THE NAVBAR

$(document).ready(function(){
    $('.sidenav').sidenav();
  });

  $(document).ready(function(){
    $('.modal').modal();
  });
      // TOAST FOR ALERT
      var toastHTML = '<span>I am toast content</span><button class="btn-flat toast-action">Undo</button>';
  
        
      // CLICK EVENT FOR THE DELETE BUTTON

      $(function(){


$('.deletes').on('click',function(e){
e.preventDefault();
const orderId = $(this).data("id");
console.log(orderId);

console.log(location.pathname)
axios({
  method: 'delete',
  url: `${location.pathname}/${orderId}`,
  data:{
    name:'deleteMe'
  }
  
}).then(data=>{
  console.log('i m working')
  location.reload()
  
}).catch(err=>{
  location.replace('/user/login')
})


});

// EVENT FOR UPDATE THE PRODUCT
$('.updateMe').on('click',function(e){
e.preventDefault();
const id = $(this).data('id');
const name = $("#autocomplete-input").val(),
price = $("#autocomplete-input2").val();
console.log(name,price)
axios({
method:'patch',
url:`/products/${id}`,
data:{
name:name,
price:price,
updateOn:'noUpdate'


}



}).then(data=>{

location.reload();

}).catch(err=>{

location.replace('/user/login');
})


})



      })