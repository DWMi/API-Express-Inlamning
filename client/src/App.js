import React, { useEffect, useState } from 'react'
import Activity from './components/Activity';
import './App.css';


function App() {
  const [week, setWeek] = useState([])
  const [weekId, setWeekId] = useState('')
  const [activity, setActivity] = useState('')
  const [activityId, setActivityId] = useState('')
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [updateActivity, setUpdateActivity] = useState('')
  const [btnClicked, setBtnClicked] = useState(false)
 
  useEffect(() => {
    fetch('http://localhost:3000/weekdays')
    .then(res => res.json())
    .then(data => setWeek(data))
  }, [])



  const getAct = async () => {
    await fetch(`http://localhost:3000/data/${selectedDay}`)
    .then(res => res.json())
    .then(data => setWeek(data))
    }

    const getMultipleRequests = () => {
      fetch('http://localhost:3000/multiple')
      .then(res => res.json())
      .then(data => setWeek(data))

      setBtnClicked(true)
    }

    const postActivity = () => {
      if(activity.length > 1){

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
              .then((data) => setWeek(data));
      }
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
      .then(data => setWeek(data))
      setUpdateActivity('')
    }
  

    const deleteActivity =()=>{

      fetch(`http://localhost:3000/delete/${activityId}`, {
        method:'delete'
      })
      .then(res=>res.json())
      .then(data => setWeek(data))
      setActivityId('')
    }

    const fetchIds = (weekId, activityId) => {
      setActivityId(activityId)
      setWeekId(weekId)
    }

  return (
    <div className="App">
      <header className="App-header">  </header>
      <h1>Random Activities Generator for bored peoples</h1>
      <Activity 
        week={week}
        // id 
        activityId={activityId}
        //value 
        activity={activity} 
        setActivity={setActivity}
        //select day
        setSelectedDay={setSelectedDay}
        //requests
        putActivity={putActivity}
        postActivity={postActivity}

        updateActivity={updateActivity}
        setUpdateActivity={setUpdateActivity}
        fetchIds={fetchIds}
        weekId={weekId}
        deleteActivity={deleteActivity}

      />
      <button className="getBtn" onClick={getMultipleRequests}>Fetch activities</button>
      {
      btnClicked ? <button className="getBtn" onClick={getAct}>Fetch one activity</button> : <button disabled className="getBtn" onClick={getAct}>Fetch one activity</button>
      }
    
      
    </div> 
  );
}

export default App;
