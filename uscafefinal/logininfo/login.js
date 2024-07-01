const express = require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https=require("https");

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/login.html");
});

app.post("/", function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const phone=req.body.phone;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                    PHONE: phone
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/8099a0fca6";

    const options= {
        method: "POST",
        auth: "manasvi:6d6b13faecf9f258a9da0dbec09561d0-us10"
    };

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/login-success.html");
        }
        else{
            res.sendFile(__dirname + "/login-failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);
    request.end();

});

// to redirect user to login page if he sucks!
app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000);



// mailchimp api Key:
// f6815f411cc3fd7e54e3ff6dd466890e-us17

//audience id
// c931f3b1fb






// let form=document.querySelector("form");
// let email = document.querySelector("#email");
// let password = document.querySelector("#password");
// let emailicon = document.querySelector(".emailicon");
// let passicon = document.querySelector(".passicon");
// let errormsg = document.querySelector("#errormsg");
// let submitbtn=document.querySelector("button");
// let checkemail = () => {
//   let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
//   if (email.value == "" || !email.value.match(pattern)) {
//     emailicon.classList.add("fa-shake");
//     emailicon.style.color = "#ec0909";
//     return false;
//   } else {
//     emailicon.classList.replace("fa-envelope", "fa-circle-check");
//     emailicon.classList.remove("fa-shake");
//     emailicon.style.color = "#00c300";
//     return true;
//   }
// };

// let checkpassword = () => {
//   let pattern = /^[A-Za-z]\w{7,14}$/;
//   if (password.value == "" || !password.value.match(pattern)) {
//     passicon.classList.add("fa-shake");
//     passicon.style.color = "#ec0909";
//     errormsg.style.display = "inline";
//     return false;
//   } else {
//     passicon.style.color = "#00c300";
//     errormsg.style.display = "none";
//     passicon.classList.remove("fa-shake");
//     return true;
//   }
// };

// email.onkeyup=checkemail;
// password.onkeyup=checkpassword

// passicon.onclick = () => {
//   if (password.type == "password") {
//     password.setAttribute("type", "text");
//     passicon.classList.replace("fa-eye-slash", "fa-eye");
//   } else {
//     password.setAttribute("type", "password");
//     passicon.classList.replace("fa-eye", "fa-eye-slash");
//   }
// };

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     if(emailicon.classList.contains("fa-circle-check") && passicon.style.color=="rgb(0, 195, 0)"){
//         Swal.fire(
//             'Login succesfully ',
//             'Go to your profile page',
//             'success'
//           )
//     }
//     else{
//         Swal.fire(
//             'Enter Valid Input',
//             'login error',
//             'error'
//           )
       
//     }
    
// })



