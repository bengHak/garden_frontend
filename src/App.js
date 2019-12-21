import React from 'react';
import Header from './components/Header';
import AchiveGraph from './components/AchiveGraph';
import DailyAttendance from './components/DailyAttendance';
import TotalAttendance from './components/TotalAttendance';
import Rank from './components/Rank';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main-body">
        <Header></Header>
        <AchiveGraph></AchiveGraph>
        <DailyAttendance></DailyAttendance>
        <TotalAttendance></TotalAttendance>
        <Rank></Rank>
      </div>
    </div>
  );
}

export default App;
