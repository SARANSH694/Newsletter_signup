const express= require("express");
const bodyParser= require("body-parser");

const https=require("https");


const app= express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("Public"))

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const fn=req.body.fName;
    const ln=req.body.lName;
    const email=req.body.email;

    var data={
        members:[
            {
            email_address: email,
            status:"subscribed",
            merge_feild : {
                FNAME:fn,
                LNAME:ln
            }
        }
        ]
    };

    const jsonData=JSON.stringify(data);
    const url="https://us6.api.mailchimp.com/3.0/lists/LI";/*Put List id of mailchimp account in place of LI*/
    const options={
        method: "POST",
        auth:"saransh: AK" /* Put api key of mailchimp account in place of AK*/
    }
    const request=https.request(url,options,function(response){

        if(response.statuscode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(json.Data);
    request.end();
    
})

app.post("/faliure",function(req,res){
    res.redirect("/");
})

app.listen(port,function(){
    console.log("server is running on port 3000");
})



