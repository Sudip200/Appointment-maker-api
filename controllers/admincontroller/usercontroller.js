const { admin,user } =require('../../models/model')

const handleRegUser=(req,res)=>{
    const {email,name,password} =req.body
    user.create({name:name,email:email,password:password},(err,result)=>{
        if(err) console.log(err)
        res.json({msg:'success'})
    })
}
const handleLoginUser=(req,res)=>{
    const {email,password} =req.body
    user.find({email:email,password:password},(err,result)=>{
        if(err) console.log(err)
        res.json({msg:'found'})
    })
}
const getShops=(req,res)=>{
    admin.find().then((result)=>{
        // if (err) console.log(err)
         console.log(result)
         res.json({all:result})
     }).catch(err=>console.log(err))
}

const getSpecShops=(req,res)=>{
    const {id} =req.params
    console.log(id)
    admin.findById(id,(err,result)=>{
        if(err) console.log(err)
          console.log(result)
          res.json({shop:result.shopName,
                  slots:result.dayslot})
      })
}
const makeApp=(req,res)=>{
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
}
module.exports={
    handleRegUser,
    handleLoginUser,
    getShops,
    makeApp,
    getSpecShops
}
