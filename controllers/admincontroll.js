const { admin,user } =require('../models/model')
const handleRegAdmin=(req,res)=>{
    const {email,name,password,shop} =req.body
    admin.create({name:name,email:email,password:password,shopName:shop},(err,result)=>{
        if(err) console.log(err)
        res.json({msg:'success'})
    })  
}
const handleAdminLogin=(req,res)=>{
    const {email,password} =req.body
    admin.find({email:email,password:password},(err,result)=>{
        if(err) console.log(err)
        res.json({msg:'found'})
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