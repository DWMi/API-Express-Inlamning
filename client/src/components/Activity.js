import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";

const Activity = ({ week, setActivityId, activityId, setActivity, activity, setSelectedDay, selectedDay }) => {

  useEffect(() => {
    console.log(activityId);
  }, [activityId])

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

  return (
    <div>
   
    {/* PUT */}
      {activityId ? (
        <input placeholder={activityId ? week.find((el) => el.id === activityId).activities : ""}/>
      ) : (
        <input disabled placeholder="Please select an activity" />
      )}


      {/*POST */}
      <input placeholder="POST" onChange={(e) => setActivity(e.target.value)} />
      <label htmlFor="cars">Weekday:</label>
        <select defaultValue={"Monday"} name="weekday" id="weekday" onChange={(e) => setSelectedDay(e.target.value)}>
          {
           week && week.map(item => {
              return <option key={item.id} value={item.weekday}>{item.weekday}</option>
            })
          }
        </select>
      <button onClick={() => postActivity()}>Post</button>


      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {week &&
              week.map((item) => <th key={item.id}>{item.weekday}</th>)}
          </tr>
        </thead>
        <tbody>
           <tr>
            {week &&
              week.map((item) => {
                return (
         
                  <td key={item.id} style={{fontSize: '11px'}}>
                        {item.activities.map(itemB => {
                          return (
                            
                            
                      
                            <p onClick={() => setActivityId(item.id)} style={{border:'1px solid black', padding:'10px'}} key={itemB.key}>{itemB.activity}</p>
                            
                            
                            )
                        })}

                       </td>  
              
                  
                );
              })}
              </tr>
 
        </tbody>
      </Table>


    </div>
  );
};

export default Activity;
