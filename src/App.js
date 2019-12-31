import React from 'react';
import Header from './components/Header';
import AchieveGraph from './components/AchieveGraph';
import TodayAttendance from './components/TodayAttendance';
import TotalAttendance from './components/TotalAttendance';
import Rank from './components/Rank';

import Modal from './components/Modal';

import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false,
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  render(){
    return (
    <div className="App">
      <div className="main-body">
        <Header></Header>
        <AchieveGraph></AchieveGraph>
        <TodayAttendance></TodayAttendance>
          <hr/>
        <TotalAttendance></TotalAttendance>
          <hr/>
        <Rank></Rank>
        <button onClick={this.openModal}>Modal Open</button>
        <Modal isOpen={this.state.isModalOpen} close={this.closeModal}/>
      </div>
    </div>
    );
  }
}

export default App;
