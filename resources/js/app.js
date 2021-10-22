import axios from 'axios'; 
import Noty from 'noty';
import  initAdmin  from './admin'

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        cartCounter.innerHTML = res.data.totalQty;
        new Noty({
            type:'success',
            theme:'mint',
            timeout:1000,
            text: "Item added to cart",
            progressBar:false
          }).show();
    }).catch(err =>{
        new Noty({
            type:'error',
            theme:'mint',
            timeout:1000,
            text: "Something went wrong",
            progressBar:false
          }).show();

    })
}
addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
        
    });

 
});

//Remove alert message after x second

const alertMsg = document.querySelector('#sucess-alert');
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove();
    },2000);
}

let adminAreaPath = window.location.pathname;
if(adminAreaPath.includes('admin')){
    initAdmin()

}