const express = require("express")
const usermongconn = require("./usermongconn")
const orgmongconn = require("./orgmongconn")
const orgeventsconn = require("./orgeventsconn")
const usereventsconn = require("./usereventsconn")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//login

app.get("/userlogin", cors(), (req, res) => {

})


app.post("/userlogin", async (req, res) => {
    const { username, password } = req.body
    console.log("reached backend with password")
    try {
        const check = await usermongconn.findOne({ username: username })

        if (check) {
            res.json({ success: true, check })
            console.log("packet send")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
        console.log("packet send fail")
    }

})



app.post("/usersignup", async (req, res) => {
    const { username, name, email, password } = req.body

    const data = {
        username: username,
        name: name,
        email: email,
        password: password
    }

    try {
        const check = await usermongconn.findOne({ username: username })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await usermongconn.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.get("/orglogin", cors(), (req, res) => {

})


app.post("/orglogin", async (req, res) => {
    const { username, password } = req.body
    console.log("reached backend with password")
    try {
        const check = await orgmongconn.findOne({ username: username })

        if (check) {
            res.json({ success: true, check })
            console.log("packet send")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
        console.log("packet send fail")
    }
})



app.post("/orgsignup", async (req, res) => {
    const { username, name, email, password } = req.body

    const data = {
        username: username,
        name: name,
        email: email,
        password: password
    }

    try {
        const check = await orgmongconn.findOne({ username: username })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await orgmongconn.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/orgnewevent", async (req, res) => {
    const { username, eventName, venue,date, price, capacity, booked, aboutEvent } = req.body

    const data = {
        username: username,
        eventname: eventName,
        date:date,
        venue: venue,
        price: price,
        capacity: capacity,
        booked: booked,
        aboutevent: aboutEvent
    }

    try {
        const check = await orgeventsconn.findOne({ eventname: eventName })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await orgeventsconn.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/orghome", async (req, res) => {

    const { username } = req.body
    console.log("reached backend with password")
    try {
        const check = await orgeventsconn.find({ username: username })

        if (check) {
            res.json({ success: true, check })
            console.log("events packet send")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
        console.log("packet send fail")
    }

})

app.post("/orgprofile", async (req, res) => {
    const { username} = req.body
    console.log("organizer reached backend for profile")
    try {
        const check = await orgmongconn.findOne({ username: username })

        if (check) {
            res.json({ success: true, check })
            console.log("packet send")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
        console.log("packet send fail")
    }
})

app.post("/userhome", async (req, res) => {

    console.log("reached user backend with password")
    try {
        const check = await orgeventsconn.find({ })

        if (check) {
            res.json({ success: true, check })
            console.log("events packet send")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
        console.log("packet send fail")
    }

})

app.post("/updateTickets", async (req, res) => {
    const { username,
        selectedEvent,
        ticketsRequired,selectedcapacity } = req.body

    const data = {
        username: username,
        eventname: selectedEvent,
        booked: ticketsRequired}
       

    try {
        const check = await usereventsconn.insertMany([data])
        const filter = { eventname:selectedEvent  };
        const update = { $set: { booked : selectedcapacity + ticketsRequired } };
        await orgeventsconn.updateOne(filter, update)

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
        }



    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/userbooking", async (req, res) => {
    const { username} = req.body
    console.log("organizer reached backend for profile")
    try {
        const check = await usereventsconn.find({ username: username })

        if (check) {
            res.json({ success: true, check })
            console.log("packet send")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
        console.log("packet send fail")
    }
})

app.post("/userprofile", async (req, res) => {
    const { username} = req.body
    console.log("organizer reached backend for profile")
    try {
        const check = await usermongconn.findOne({ username: username })

        if (check) {
            res.json({ success: true, check })
            console.log("packet send")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
        console.log("packet send fail")
    }
})

app.listen(8000, () => {
    console.log("port connected");
})
