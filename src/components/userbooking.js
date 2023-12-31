import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function OrgHome() {
    const history = useNavigate();
    const location = useLocation();
    const username = location.state.id;
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post("https://violetapi.onrender.com/userbooking" ,{username,});

            if (response.data.success) {
                console.log("Login successful");
                setData(response.data.check);
            } else if (response.data === "notexist") {
                alert("No Events");
            } else {
                console.log("Login failed");
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log("Updated Data:", data);
    }, [data]);

    

    async function uhome(username) {
        history("/userhome", { state: { id: username } });
    }

    async function ubook(username) {
        history("/userbooking", { state: { id: username } });
    }

    async function uprofile(username) {
        history("/userprofile", { state: { id: username } });
    }

    async function ulogout() {
        history("/");
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    

    return (
        <div>
            <img style={{ width: "200px" }} src="./images/logo.jpg" alt="A hoe" />
            <h1 className="orgneweventhref">Hello {location.state.id} and welcome to the home</h1>

            <div className="orghomesidenav">
                <button onClick={() => uhome(username)}>Home</button>
                <button onClick={() => ubook(username)}>Bookings</button>
                <button onClick={() => uprofile(username)}>Profile</button>
                <button onClick={() => ulogout()}>Logout</button>
            </div>
            <h2 className="orgneweventhref">Upcoming Booked Events</h2>
            <div className="orghomecontainer">
                
                {data.map((item) => (
                    <div key={item._id}>
                        <button>
                        <p>Name: {item.eventname}</p>
                        <p>Tickets Booked:{item.booked}</p>
                        </button>
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default OrgHome;
