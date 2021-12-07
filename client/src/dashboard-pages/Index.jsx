import React from "react";
import Axios from 'axios';
import {useState} from "react";
import { Link } from "react-router-dom";
//vv
import LoginPopUp from '../popups/LoginPopUp';
import useToken from '../popups/useToken';
//^^

function DbPage() {

  const [pumpList, setPumpList] = useState([]);

  const getData = () => {
    Axios.get("http://localhost:3001/data").then((response) => {
      setPumpList(response.data);
    });
  };
  //vv
  const { token, setToken } = useToken();

  if(!token) {
    return <LoginPopUp setToken={setToken} />
  }
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Dashboard</h1>
      <div className="btn-group mt-2 mb-2" role="group">
        <button className="btn-primary btn d-inline shadow" onClick={getData}>Show Data</button> 
        <Link to="/login" className="btn btn-light shadow">Go To Login Page</Link> 
      </div>
      <div className="row">
        <div className="col-8">
          <div className="card shadow">
            <table className="table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Pump ID</th>
                  <th>Battery Percentage</th>
                  <th>Daily Volume Sum</th>
                </tr>
              </thead>
              <tbody>
                {pumpList.map((val,key) => {
                  return(
                    <tr>
                      <td>{val.date_sensed}</td>
                      <td>{val.iwp_pump_id_fk}</td>
                      <td>{val.battery_percentage}</td>
                      <td>{val.daily_volume_sum}</td>
                    </tr>
                  );
                })}
                </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default DbPage;