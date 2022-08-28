import express from "express";
import { nanoid } from "nanoid";
import axios from 'axios'
import cors from 'cors'



const app = express()
const port = 3000
app.use(cors())
let week = [

    {
        id:nanoid(),
        weekday:"Monday",
        activities: []
    },
    {
        id:nanoid(),
        weekday:"Tuesday",
        activities: []
    },
    {
        id:nanoid(),
        weekday:"Wednesday",
        activities: []
    },
    {
        id:nanoid(),
        weekday:"Thursday",
        activities: []
    },
    {
        id:nanoid(),
        weekday:"Friday",
        activities: []
    },
    {
        id:nanoid(),
        weekday:"Saturday",
        activities: []
    },
    {
        id:nanoid(),
        weekday:"Sunday",
        activities: []
    }

]

let dataApi;
let dataApi2 = [];

const fetchData = (weekday) => {


     axios.get('http://www.boredapi.com/api/activity')
            .then(response => {
                if(response) {
                    dataApi = response.data
                }
                pushData(weekday)

                }
            )
            .catch(function (error) {
                    console.log(error);
                    if (dataApi) {
                        pushData(weekday)
                    }
                })
                     
}

const pushData = (value) => {
    const dayId = week.findIndex(element => element.weekday === value)
               

    week[dayId].activities.push({
        activity: dataApi.activity,
        key: nanoid()
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

/* ANVÄND DETTA ISTÄLLET*/
app.get('/weekdays', (req, res) => {
    
    return res.send(week)
})


/* DETTA SKALL BARA RETURNERA 'SUCCESS' POST ?*/ 
app.post('/data', (req, res) => {
    const { weekday } = req.body
 
        fetchData(weekday)
   
    return res.json(week)
    // return res.json('SUCCESS')
})

app.put('/update', (req, res) => {
    const { newActivity, activityId, weekId } = req.body

    week.find(element =>element.id === weekId).activities.find(el => el.id === activityId).activity =  newActivity
    console.log(week);
})


app.get('/multiple', (req, res) => {
    week.map((item) => { 
        axios.get('http://www.boredapi.com/api/activity')
        .then(response => {
            if(response) { 
                dataApi2.push({
                    activity: response.data.activity,
                    id: nanoid()
                })
            }
            console.log(dataApi2);
            }
        )
        .catch(function (error) {
                console.log(error);
            })
    })
    loopSaveMultipleData()
})


//FIXAAAAAA
const loopSaveMultipleData = () => {
    if(dataApi2.length > 0) {
        week.map((item, index) => {
            
            return item.activities.splice(0, item.activities.length,{
                activity: dataApi2[index]?.activity,
                id: nanoid()
            })
            
            
         })
    }

}

app.post('/post', (req, res) => {
    const { value, weekday } = req.body
    const selectedActivities = week.find((el) => el.weekday === weekday).activities
    selectedActivities.push({
        id: nanoid(),
        activity: value
    })
  
    return res.json(req.body)
})

app.delete('/delete/:id', (req, res)=>{


    
    const weekdayId = week.find(el => el.activities.find(e => e.id === req.params.id))
    const activityIndex = week.find(el => el.activities).activities.findIndex(e => e.id === req.params.id)

    console.log(activities2);

})

app.listen(port, () => console.log("App is running on port " + port))

/* SKAPA EN TILL KNAPPFAN OCH DEN SKA BARA HÄMTA EN ÅT GÅNGEN*/