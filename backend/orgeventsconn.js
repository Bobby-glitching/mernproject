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
    date:Date,
    venue: String,
    price:Number,
    capacity:Number,
    booked:Number,
    aboutevent:String
    }, { collection: 'events' });
    module.exports=mongoose.model('events', userSchema)