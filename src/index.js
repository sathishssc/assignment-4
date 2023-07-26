const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.get('/',(req,res)=>{
    res.send("hello world!");
})

function check(num1,num2,res){

    if(num1 === "" && num2 === ""){
        res.status(400).json({
            status:"error",
            error:"please provide current input",
        })
    }
    if(isNaN(num1) || isNaN(num2)){
        res.status(400).json({
            status:"error",
            error:'invalid data type',
        })
    }
    if(num1<(-1000000) || num2<(-1000000)){
        res.status(400).json({
            status:"error",
            messege:'Underflow',
        })
    }
    if(num1>(1000000) || num2>(1000000)){
        res.status(400).json({
            status:"error",
            messege:'Overflow',
        })
    }
}

app.post('/add',(req,res)=>{
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    
    check(num1,num2,res);
    let sum = num1*num2;
    res.status(200).json({
        messege:'multiplication successfull',
        data:sum,
    })
})

app.post('/sub',(req,res)=>{
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    
    check(num1,num2,res);
    let sub = num1-num2;
    res.status(200).json({
        status: "success", 
        message: "the difference of given two numbers", 
        difference: sub
      
    })
})

app.post('/multiply',(req,res)=>{
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    
    check(num1,num2,res);
    let mult = num1*num2;
    res.status(200).json({
        status: "success", 
        message: "The product of given numbers", 
        result: mult,
    })
})

app.post('/divide',(req,res)=>{
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    if(num2 === 0){
        res.status(400).json({
            message:"Cannot divide by zero"
        })
    }
    check(num1,num2,res);
    try{
        res.status(200).json({
        status: "success", 
        message: "The product of given numbers", 
        result: num1/num2,
    })
    }
    catch(err){
        res.status(400).json({
        status: "failure", 
    })
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;