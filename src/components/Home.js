import React from "react";

import Header from "./Header";
import AchieveGraph from "./AchieveGraph";
import TodayAttendance from "./TodayAttendance";
import TotalAttendance from "./TotalAttendance";
import Rank from "./Rank";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  render() {
    return (
      <div className="App">
        <div className="main-body">
          <Header></Header>
          <hr />
          <AchieveGraph></AchieveGraph>
          <hr />
          <TodayAttendance></TodayAttendance>
          <hr />
          <TotalAttendance></TotalAttendance>
          <hr />
          {/* <Rank></Rank> */}
        </div>
      </div>
    );
  }
}

export default Home;
