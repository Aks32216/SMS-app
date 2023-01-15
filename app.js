const express=require("express");
const nexmo=require("nexmo");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const socketio=require("socket.io");
const port=3000;


// init app

const app=express();

app.set('view engine','html');
app.engine('html',ejs.renderFile);

app.use(express.static(__dirname+'/public'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// index route

app.get('/',(req,res)=>{
    res.render('index');
})


const server=app.listen(port,()=>{
    console.log(`server started on ${port}`);
})