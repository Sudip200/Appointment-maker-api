const { admin,user } =require('../models/model')
const jwt = require('jsonwebtoken')
const secretKey = 'sudiptoapp'
const handleRegAdmin=(req,res)=>{
    const {email,name,password,shop} =req.body
    console.log(req.body)
    admin.create({name:name,email:email,password:password,shopName:shop},(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({msg:'error'})
        }else{
            const token = jwt.sign({userid:result._id,email:result.email},secretKey,{expiresIn:'1h'});
            res.json({msg:'success',token:token})
        }
    })  
}
const handleAdminLogin=(req,res)=>{
    const {email,password} =req.body
    admin.find({email:email,password:password},(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({msg:'error'})
        }else if(!result){
            res.status(401).json({msg:'not found'})
        }else{
            const token =jwt.sign({userid:result._id,email:result.email},secretKey,{expiresIn:'1h'});
            res.json({msg:'success',token:token})
        }
        
    })
}

const adminSlot=(req,res)=>{
     const {name,Object}=req.body
     console.log(req.body)
     admin.findOneAndUpdate({shopName:name},{dayslot:Object},(err,result)=>{
         if(err) console.log(err)
         res.json({msg:result})
     })
}
const getSpecApp=(req,res)=>{
    const {id}=req.params
    admin.findById(id,(err,result)=>{
     res.json({app:result.appointments})
    })
 
}
const setComp=(req,res)=>{
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
}
const allApp=(req,res)=>{
    const {id} =req.params
    
    admin.findById(id,(err,result)=>{
        if(err) console.log(err)
          console.log(result)
          res.json({appointments:result.appointments})
      })
}
const getSpecSlot=(req,res)=>{
    const {id} =req.params
    
    admin.findById(id,(err,result)=>{
        if(err) console.log(err)
          console.log(result)
          res.json({slots:result.dayslot})
      })
}
module.exports={
    handleRegAdmin,
    handleAdminLogin,
    adminSlot,
    getSpecApp,
    allApp,
    getSpecSlot,
    setComp
}