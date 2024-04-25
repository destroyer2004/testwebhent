require('dotenv').config()
const express = require('express')
const request =require('request')
const bodyParser=require('body-parser')
const mongoose = require("mongoose");
const ejs =require("ejs")
const encrypt = require("mongoose-encryption");
//mongoose.connect("mongodb://localhost:27017/test_dev", { useNewUrlParser: true });
// const https = require("https");
// const db = require("./src/config/db");
// const signin =require("./models/signin.js")
// //connect to mongodb
// db.connect();
mongoose.connect("mongodb://localhost:27017/test_dev");
const app = express()

// console.log(process.env.API_KEY)
const port = 3300
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + "/signup.html");
// })
app.get('/index', (req, res) => {
  res.render("index");
})
app.get('/signup', (req, res) => {
  res.render("signup",{ message: '' });
})
app.get('/login',(req,res) =>{
  res.render("login",{ message: '' });
})

  const userSchema = new mongoose.Schema({
    newname: String,
    newemail: String,
    newpassword: String,
  });

//let listuser=[];

// userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:['newpassword']})
const user = mongoose.model("user", userSchema);
// app.get('/', (req, res) => {
//   user.find({}, function(err, list){
//     res.render("signup", {list : list})
// });
// })

app.post('/signup',function(req,res){
   //console.log(req.body);
    let name =req.body.fname;
    let email =req.body.email;
    let password =req.body.password;
    //const newusers= user.findOne({ newname: name });
    // if (newusers===NULL) {
    //   console.log('Tài khoản đã tồn tại');
    //   res.render("signup", { message: 'Tài khoản đã tồn tại' });
    //   res.redirect("/");
    // } 
    // else
    // {
    //   const newuser = new user({
    //     newname : name,
    //     newemail : email,
    //     newpassword : password    
    //   })
    //   //listuser.push(newuser); 
    //   user.insertMany(newuser); 
    user.findOne({ newname: name })
    .then(users => {
        if (users) {
            // Nếu tìm thấy người dùng, thực hiện xử lý tương ứng
               res.render("signup", { message: 'Tài khoản đã tồn tại' });
               res.redirect("/signup");
        } else {
            // Nếu không tìm thấy người dùng, thực hiện xử lý tương ứng
          const newuser = new user({
          newname : name,
          newemail : email,
          newpassword : password    
        })
        // newuser.save(function(err){
        //   if(err)
        //   {
        //     console.log(err)
        //   }
        //   else 
        //   {
        //     res.render("signup")
        //   }
        // })
        user.insertMany(newuser); 
        res.redirect("/signup");
        }
    })
    .catch(err => {
        // Xử lý lỗi nếu có
        console.error(err);
    });    
})
app.post('/login',function(req,res){
  const useremail =req.body.email;
  const userpassword=req.body.password;
  user.findOne({ newemail: useremail })
    .then(users => {
        if (users) {
            // Nếu tìm thấy người dùng, thực hiện xử lý tương ứng
               res.render("login", { message: 'Success' });
               res.redirect("/login");
        } else {
            // Nếu không tìm thấy người dùng, thực hiện xử lý tương ứng
            res.render("login", { message: 'email or password is incorrect' });
        res.redirect("/signup");
        }
    })
    .catch(err => {
        // Xử lý lỗi nếu có
        console.error(err);
    }); 
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})