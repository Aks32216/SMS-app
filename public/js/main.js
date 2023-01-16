let number=document.getElementById('number');
let text=document.getElementById('message');
let button=document.getElementById('button');
let response=document.querySelector('.response');

button.addEventListener('click',()=>{
    let num=number.value.replace(/\D/g,'');
    let msg=text.value;
    // console.log(num,msg,'inside listner');
    
    const socket=io();
    socket.on('smsStatus',(data)=>{
        console.log(data,'client side')
        response.innerText=`Message Sent Successfully to ${data.number}`;
    })

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