const express=require("express");
const {Vonage} = require('@vonage/server-sdk');
const bodyParser=require("body-parser");
const ejs=require("ejs");
const socketio=require("socket.io");
const port=3000;
const dotenv=require('dotenv');
dotenv.config();

// vonage setup

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

// init app

const app=express();

app.set('view engine','html');
app.engine('html',ejs.renderFile);

app.use(express.static(__dirname+'/public'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// index get route

app.get('/',(req,res)=>{
    res.render('index');
})


// post route

app.post('/',(req,res)=>{
    // res.send(req.body);
    // console.log(req.body);
    const from = "Vonage APIs";
    const to = req.body.number;
    const text =req.body.message;
    console.log(to,' ',text);
    async function sendSMS() {
        await vonage.sms.send({to, from, text})
            .then(resp => { 
                console.log('Message sent successfully'); 
                const data={
                    id:resp.messages[0]['message-id'],
                    number:resp.messages[0]['to']
                }
                console.log(data);
                io.emit('smsStatus',data);
                console.log('emitted data');
            })
            .catch(err => { 
                console.log('There was an error sending the messages.'); 
                console.error(err); 
            });
    }
    
    sendSMS();
})


const server=app.listen(port,()=>{
    console.log(`server started on ${port}`);
})

// connect to socket

const io=socketio(server);
io.on('connected',()=>{
    console.log('connected');
    io.on('disconnect',()=>{
        console.log('disconnected');
    })
})