let number=document.getElementById('number');
let text=document.getElementById('message');
let button=document.getElementById('button');

button.addEventListener('click',()=>{
    let num=number.value.replace(/\D/g,'');
    let msg=text.value;
    console.log(num,msg,'inside listner');
    
    fetch('/', {
    method: 'post', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({number:num,message:msg}),
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
},false)