import React, { useEffect, useState } from 'react'
import Activity from './components/Activity';
import './App.css';


function App() {
  const [week, setWeek] = useState([])
  const [weekId, setWeekId] = useState('')
  const [activity, setActivity] = useState('')
  const [activityId, setActivityId] = useState('')
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [specificActivity, setSpecificActivity] = useState('')
  const [updateActivity, setUpdateActivity] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/weekdays')
    .then(res => res.json())
    .then(res => setWeek(res))
  }, [week])

  useEffect(() => console.log(updateActivity), [updateActivity])

  const fetchArr = async () => {
    await fetch('http://localhost:3000/data', {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weekday: selectedDay,
        })
    })
    .then(res => res.json())
    .then(res => setWeek(res))
    }

    const getMultipleRequests = () => {
      fetch('http://localhost:3000/multiple')
      .then(res => res.json)
      .then(data => console.log(data))
    }

    const postActivity = () => {
      fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
          value: activity,
          weekday: selectedDay,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    };
  
    const putActivity = () => {
      fetch('http://localhost:3000/update', {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newActivity: updateActivity,
          activityId: activityId,
          weekId: weekId
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  

    const deleteActivity =()=>{

      fetch(`http://localhost:3000/delete/${activityId}`, {
        method:'delete'
      })
      .then(res=>res.json())
      .then(data => console.log('yes'))
    }

    const fetchIds = (weekId, activityId) => {
      setActivityId(activityId)
      setWeekId(weekId)
    }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Calendar</h1>
      <Activity 
        week={week}
        // id 
        setActivityId={setActivityId} 
        activityId={activityId}
        //value 
        activity={activity} 
        setActivity={setActivity}
        //select day
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        //requests
        putActivity={putActivity}
        postActivity={postActivity}
        //functions
        updateActivity={updateActivity}
        setUpdateActivity={setUpdateActivity}
        fetchIds={fetchIds}
        weekId={weekId}
        deleteActivity={deleteActivity}

      />
  

      <button className="getBtn" onClick={fetchArr}>Get a random activity</button>
      <button className="getBtn" onClick={getMultipleRequests}>Get multiple activities</button>
      </header>
    </div> 
  );
}

export default App;
