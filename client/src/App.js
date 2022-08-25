import React, { useEffect, useState } from 'react'
import Activity from './components/Activity';
import './App.css';


function App() {
  const [week, setWeek] = useState([])
  const [activity, setActivity] = useState('')
  const [activityId, setActivityId] = useState('')
  const [selectedDay, setSelectedDay] = useState('Monday')

  useEffect(() => {
    // fetchArr()
  }, [])

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay])

  const fetchArr = () => {
     fetch('http://localhost:3000/data')
    .then(res => res.json())
    .then(res => setWeek(res))
    }

    const fetchActivityId = (id) => {
      return id;
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

      />
  

      <button className="getBtn" onClick={fetchArr}>Get Activities</button>
      </header>
    </div>
  );
}

export default App;
