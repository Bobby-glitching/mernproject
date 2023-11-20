const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://purple:purple2557@cluster0.nophevg.mongodb.net/Purple?retryWrites=true&w=majority")
.then(()=>{
    console.log("venue collection connected");
})
.catch(()=>{
    console.log('failed');
})


const userSchema = new mongoose.Schema({
    username:String,
    eventname:String,
    booked:Number,
    }, { collection: 'bookedevents' });
    module.exports=mongoose.model('bookedevents', userSchema)