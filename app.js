const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const {handleRegUser, handleLoginUser, getShops, getSpecShops, makeApp,}  =require("./controllers/admincontroller/usercontroller")
const {handleRegAdmin,handleAdminLogin,setComp,getSpecApp,getSpecSlot,allApp,adminSlot}=require("./controllers/admincontroll")
const app= express()
app.use(express.json())
app.use(cors())
async function connect(){
   await mongoose.connect('mongodb+srv://Sudipto200:sdapp@cluster0.4xiftbs.mongodb.net/app',{ useNewUrlParser: true, useUnifiedTopology: true})
}
//Schemas


//Models
//const user= mongoose.model('User',UserSchema)
//const admin= mongoose.model('Admin',AdminSchema)
//const slots= mongoose.model('slots',SlotsSchema)

//Home
app.get('/',(req,res)=>{
    res.send("Welcome to Appointment Maker API")
})
//Registers and Logins-------------------->

app.post('/registeruser',handleRegUser)
app.post('/registeradmin',handleRegAdmin)
app.post('/adminlogin',handleAdminLogin)
app.post('/userlogin',handleLoginUser)
app.post('/adminslot',adminSlot)
app.get('/getapp/:id',getSpecApp)
 app.post('/setcomp',setComp)
app.get('/allapp/:id',allApp)
app.get('/getslot/:id',getSpecSlot)
 //User dashboard-------------------->
app.get('/shops',getShops)
app.get('/shops/:id',getSpecShops)
app.post('/makeapp',makeApp) 

//Middle wares
app.use(connect(),()=>{
    console.log('connection successful')
})
app.listen(3001,()=>{
    console.log("listening in 3000")
})