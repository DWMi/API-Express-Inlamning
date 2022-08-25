import express from "express";
import { nanoid } from "nanoid";
import http from 'http'
import axios from 'axios'
import cors from 'cors'
import { arrayBuffer } from "stream/consumers";


const app = express()
const port = 3000
app.use(cors())
let week = [

    {
        id:nanoid(),
        weekday:"Monday",
        activities: [],
        key: ''
    },
    {
        id:nanoid(),
        weekday:"Tuesday",
        activities: [],
        key: '' 
    },
    {
        id:nanoid(),
        weekday:"Wednesday",
        activities: [],
        key: '' 
    },
    {
        id:nanoid(),
        weekday:"Thursday",
        activities: [],
        key: '' 
    },
    {
        id:nanoid(),
        weekday:"Friday",
        activities: [],
        key: '' 
    },
    {
        id:nanoid(),
        weekday:"Saturday",
        activities: [],
        key: '' 
    },
    {
        id:nanoid(),
        weekday:"Sunday",
        activities: [],
        key: '' 
    }

]

const activityFetcher = () => {
    week.map((item)  => {
     axios.get('http://www.boredapi.com/api/activity')
            .then(response => {
                return (
                    item.activities.push({
                        key: response.data.key,
                        activity:response.data.activity
                    })
                    
                )
                    
                })
            .catch(function (error) {
                    console.log(error);
                })   
        
    })
    
}



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("client"))

// app.get('/http', (req, res) => {
//     const url = "http://www.boredapi.com/api/activity"

//     http.get(url, (response) => {
//         let data = ''
        
//         response.on("data", chunk => {
//             data = data + chunk.toString()
//         })

//         response.on("end", () => {
//             const body = JSON.parse(data)
//             console.log(data);
//         })
//     })
// })
app.get('/read', (req, res) => {
    res.send(week)
})
app.get('/data', (req, res) => {
    activityFetcher()
    return res.json(week)
})


app.post('/post', (req, res) => {
    const { value, weekday } = req.body
    const selectedActivities = week.find((el) => el.weekday === weekday).activities
    selectedActivities.push({
        id: nanoid(),
        activity: value
    })
    console.log(selectedActivities);
    return res.json(req.body)
})

app.listen(port, () => console.log("App is running on port " + port))