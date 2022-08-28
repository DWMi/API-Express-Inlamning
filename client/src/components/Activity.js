import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Activity = ({ week, setActivityId, activityId, setActivity, activity, setSelectedDay, selectedDay, setUpdateActivity, updateActivity, postActivity, putActivity, fetchIds, weekId, deleteActivity }) => {






  const findSpecificActivity = () => {
    return activityId ? week.find(el => el.id === weekId).activities.find(element => element.id === activityId).activity : ""
  }

  return (
    <div>

    {/* PUT */}
      {activityId ? (
        <input onChange={e =>setUpdateActivity(e.target.value)} placeholder={findSpecificActivity()}/>
      ) : (
        <input disabled placeholder="Please select an activity to update" />
      )}
        <button onClick={putActivity}>PUT</button>
        <button onClick={deleteActivity}>DELETE</button>

      {/*POST */}
      <input placeholder="POST" onChange={(e) => setActivity(e.target.value)} />
      <label htmlFor="weekday">Weekday:</label>
        <select name="weekday" id="weekday" onChange={(e) => setSelectedDay(e.target.value)}>
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
                            <p onClick={() => fetchIds(item.id, itemB.id)} style={{border:'1px solid white', padding:'10px'}} key={itemB.id}>{itemB.activity}</p>
                            
                            
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
