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
module.exports={
    user,admin
}