const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://purple:purple2557@cluster0.nophevg.mongodb.net/Purple?retryWrites=true&w=majority")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const userSchema = new mongoose.Schema({
    username: String,
    name:String,
    email:String,
    password: String
    }, { collection: 'orglog' });
    module.exports=mongoose.model('orglog', userSchema)