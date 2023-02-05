const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app= express()
app.use(express.json())
app.use(cors())
async function connect(){
   await mongoose.connect('mongodb+srv://Sudipto200:sdapp@cluster0.4xiftbs.mongodb.net/app',{ useNewUrlParser: true, useUnifiedTopology: true})
}
//Schemas
const UserSchema= new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    appointments:[]
})
const AdminSchema= new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    shopName:String,
    dayslot:Object,
        appointments:[{
            user:String,
            service:String, 
            date:String,
            time:String,
            isComp:Boolean,
            msg:String,
        }]
    
    
})

//Models
const user= mongoose.model('User',UserSchema)
const admin= mongoose.model('Admin',AdminSchema)
//const slots= mongoose.model('slots',SlotsSchema)


//Registers and Logins-------------------->

app.post('/registeruser',(req,res)=>{
    const {email,name,password} =req.body
    user.create({name:name,email:email,password:password},(err,result)=>{
        if(err) console.log(err)
        res.json({msg:'success'})
    })
})
app.post('/registeradmin',(req,res)=>{
    const {email,name,password,shop} =req.body
    admin.create({name:name,email:email,password:password,shopName:shop},(err,result)=>{
        if(err) console.log(err)
        res.json({msg:'success'})
    })
    
})
app.post('/adminlogin',(req,res)=>{
    const {email,password} =req.body
    admin.find({email:email,password:password},(err,result)=>{
        if(err) console.log(err)
        res.json({msg:'found'})
    })
})
app.post('/userlogin',(req,res)=>{
    const {email,password} =req.body
    user.find({email:email,password:password},(err,result)=>{
        if(err) console.log(err)
        res.json({msg:'found'})
    })
})


//Admins dashboard------------------>
app.post('/adminslot',(req,res)=>{
    const {name,Object}=req.body
    console.log(req.body)
//63b53314237119df4cb0c46f
     admin.findOneAndUpdate({shopName:name},{dayslot:Object},(err,result)=>{
         if(err) console.log(err)
         res.json({msg:result})
     })
})
app.get('/getapp/:id',(req,res)=>{
    const {id}=req.params
    admin.findById(id,(err,result)=>{
     res.json({app:result.appointments})
    })
    
 })
 app.post('/setcomp',(req,res)=>{
    const {adminemail,time}=req.body
    admin.findOne({email:adminemail},(err,result)=>{
        console.log('result'+result);
        result.appointments.map((item)=>{
            if(item.time===time){
                item.isComp=true
            }
        })
        console.log(result)
        admin.findOneAndUpdate({email:adminemail},{appointments:result.appointments},(err,result)=>{
            if (err) console.log(err)
            res.json({msg:result})
        })
       
        
    })
})
app.get('/allapp/:id',(req,res)=>{
    const {id} =req.params
    
    admin.findById(id,(err,result)=>{
        if(err) console.log(err)
          console.log(result)
          res.json({appointments:result.appointments})
      })
})
app.get('/getslot/:id',(req,res)=>{
    const {id} =req.params
    
    admin.findById(id,(err,result)=>{
        if(err) console.log(err)
          console.log(result)
          res.json({slots:result.dayslot})
      })
})
 //User dashboard-------------------->
app.get('/shops',(req,res)=>{
    admin.find().then((result)=>{
       // if (err) console.log(err)
        console.log(result)
        res.json({all:result})
    }).catch(err=>console.log(err))
})
app.get('/shops/:id',(req,res)=>{
    const {id} =req.params
    console.log(id)
    admin.findById(id,(err,result)=>{
        if(err) console.log(err)
          console.log(result)
          res.json({shop:result.shopName,
                  slots:result.dayslot})
      })
})
app.post('/makeapp',(req,res)=>{
    const {userid,name,service,date,day,time,msg,Object,useremail}=req.body
    admin.findOneAndUpdate({shopName:name},{$push:{appointments:{
        user:userid,
        service:service,
        date:date,
        day:day,
        time:time,
        isComp:false,
        msg:msg,
       // Object:Object
    }}},(err,result)=>{
        if (err) console.log(err)
        admin.findOneAndUpdate({shopName:name},{dayslot:Object},(err,shop)=>{
            if(err) console.log(err)
            user.findOneAndUpdate({email:useremail},{$push:{appointments:{
        user:userid,
        service:service,
        date:date,
        day:day,
        time:time,
        isComp:false,
        msg:msg,

            }}},(err,result)=>{
                if (err) console.log(err)
                console.log("result"+result)
                res.json({msg:shop})
            })
            console.log(shop)
           
        })
        
        
    })
})


 





//Middle wares
app.use(connect(),()=>{
    console.log('connection successful')
})






app.listen(3001,()=>{
    console.log("listening in 3000")
})

// {"_id":{"$oid":"63b53314237119df4cb0c46f"},"name":"Goutam Das","password":"12345","email":"dassudipto@gmail.com","dayslot":
// {"mon":["5-6"],"tue":["9-10","10-11","11-12","5-6"],"wed":["9-10","10-11","11-12","5-6"],"thus":["9-10","10-11","11-12","5-6","6-9"],"fri":["1-2"],"sat":["9-10","10-11","11-12","5-6"],"sun":["9-10","10-11","11-12","5-6"]},"__v":{"$numberInt":"0"},"appointments":[{"user":"63abec6ec739fe6fcddc210e","service":"engine van ","date":"01-12-2023","time":"1-2","isComp":false,"msg":"please complete my work","_id":{"$oid":"63ae8e3d7ad97f63fbc1f441"}},{"user":"63abec6ec739fe6fcddc210e","service":"welding ","date":"02-12-2023","time":"12-1","isComp":false,"msg":"please complete my work","_id":{"$oid":"63ae914a8c9bba074bb334b0"}},{"user":"63abec6ec739fe6fcddc210e","service":"welding ","date":"05-12-2023","time":"3-4","isComp":false,"msg":"please complete my work","_id":{"$oid":"63b50e70783b61d6460f1fda"}},{"user":"63abec6ec739fe6fcddc210e","service":"welding ","date":"05-12-2023","time":"3-4","isComp":false,"msg":"please complete my work","_id":{"$oid":"63b6780c10a7e536223cd3bf"}},{"user":"63abec6ec739fe6fcddc210e","service":"welding ","date":"05-12-2023","time":"9-10","isComp":false,"msg":"please complete my work","_id":{"$oid":"63b6786e10a7e536223cd3c9"}},{"user":"63abec6ec739fe6fcddc210e","service":"welding ","date":"05-12-2023","time":"9-10","isComp":false,"msg":"please complete my work","_id":{"$oid":"63b6796fcfb73bdfd9a06e8f"}},{"user":"63abec6ec739fe6fcddc210e","service":"welding ","date":"05-12-2023","time":"10-11","isComp":false,"msg":"please complete my work","_id":{"$oid":"63b6798ecfb73bdfd9a06e9d"}},{"user":"63abec6ec739fe6fcddc210e","service":"welding ","date":"05-12-2023","time":"9-12","isComp":true,"msg":"please complete my work","_id":{"$oid":"63b67a8c41a36c37d9d55c13"}},{"user":"63abec6ec739fe6fcddc210e","service":"welding ","date":"05-12-2023","time":"9-12","isComp":true,"msg":"please complete my work",
// "_id":{"$oid":"63b67ada7c4ba0ed5dd9664a"}}],"shopName":"Bimala Cycle Store"}