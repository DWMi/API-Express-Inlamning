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

let dataApi = [];



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("client"))




app.get('/weekdays', (req, res) => {
    return res.send(week)
})



app.get('/data/:value', (req, res) => {

    const randomDataIndex = Math.floor(Math.random() * dataApi.length);
    const findWeekdayIndex = week.findIndex(el => el.weekday === req.params.value)

    week[findWeekdayIndex].activities.push({activity: dataApi[randomDataIndex].activity, id: nanoid()})
        res.json(week)

})

app.put('/update', (req, res) => {
    const { newActivity, activityId, weekId } = req.body

    week.find(element =>element.id === weekId).activities.find(el => el.id === activityId).activity =  newActivity
    res.json(week)
})


app.get('/multiple', async (req, res) => {
    await Promise.all(week.map(async () => { 
        await getApiRequest()
    }))

    await loopSavedMultipleData()
        res.json(week)
})

const getApiRequest =  async () => {
    try {
    
        const response = await axios.get('http://www.boredapi.com/api/activity')
        if (response) {
            dataApi.push({
                activity: response.data.activity,
                id: nanoid()
            })
        }
        
        
    } catch (err) {
    
    }
    
}


const loopSavedMultipleData = async () => {

        week.map((item, index) => { 
            return item.activities.splice(0, item.activities.length,{
                activity: dataApi[Math.floor(Math.random() * dataApi.length)]?.activity,
                id: nanoid()
            })
        })

}

app.post('/post', (req, res) => {
    const { value, weekday } = req.body
    const selectedActivities = week.find((el) => el.weekday === weekday).activities
    selectedActivities.push({
        id: nanoid(),
        activity: value
    })

    res.json(week)
})



app.delete('/delete/:id', (req, res)=>{

    try {
    const weekdayId = week.find(el => el.activities.find(e => e.id === req.params.id)).id
    const weekdayIndex = week.findIndex(el => el.id === weekdayId)
    const activityIndex = week.find(el => el.id === weekdayId).activities.findIndex(e => e.id === req.params.id)

    week[weekdayIndex].activities.splice(activityIndex, 1)

    res.json(week)
    }catch(err) {
        res.status(404).json(err.message)
    }
    
})

app.listen(port, () => console.log("App is running on port " + port))