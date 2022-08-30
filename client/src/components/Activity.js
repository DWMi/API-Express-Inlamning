import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";

const Activity = ({ week, activityId, setActivity, activity, setSelectedDay, setUpdateActivity, postActivity, putActivity, fetchIds, weekId, deleteActivity,updateActivity}) => {





  const findSpecificActivity = () => {
    return activityId && week ? week.find(el => el.id === weekId).activities.find(element => element.id === activityId)?.activity : ""
  }

  return (
    <div>

    {/* PUT */}
      {activityId ? (
        <>
        <input onChange={e =>setUpdateActivity(e.target.value)} placeholder={findSpecificActivity()} value={updateActivity}/>
      
        <button onClick={putActivity}>PUT</button>
        <button onClick={deleteActivity}>DELETE</button>
        </>
      ) : (
        <>
        <input disabled size="lg" placeholder="Select an activity!" />
        <button disabled onClick={putActivity}>PUT</button>
        <button disabled onClick={deleteActivity}>DELETE</button>
        </>
      )}
        
      

      {/*POST */}
      <input placeholder="Write an activity" onChange={(e) => setActivity(e.target.value)} />
      {activity  ? <button onClick={() => postActivity()}>Post</button> : <button disabled onClick={() => postActivity()}>Post</button> }
      <label htmlFor="weekday">Weekday:</label>
        <select name="weekday" id="weekday" onChange={(e) => setSelectedDay(e.target.value)}>
          {
            week && week.map(item => {
              return <option key={item.id} value={item.weekday}>{item.weekday}</option>
            })
          }
        </select>
      


      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {week &&
              week.map((item) => <th key={item.id}>{item.weekday}</th>)
              }
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
