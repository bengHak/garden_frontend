import React from "react";
import "./TotalAttendance.css";
import axios from "axios";
import { getKoreaDateString } from "../libs";

class TotalAttendance extends React.Component {
  state = {
    start_date: "2021-01-01",
    end_date: "2021-01-31",
    period: 29,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(`/v1/gets/${this.state.start_date}/${this.state.end_date}/`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
      });
  };

  buildCalendar = () => {
    let table = [];
    let thead = [];

    let attendance = this.state.data;
    let attendance_data = [];

    for (let i = 0; i < Object.keys(attendance).length; i++) {
      attendance_data.push(attendance[Object.keys(attendance)[i]]);
    }

    for (let i = 0; i < attendance_data.length - 1; i++) {
      for (let j = 0; j < attendance_data.length - 1; j++) {
        if (
          Object.keys(attendance_data[j]["commits"]).length <
          Object.keys(attendance_data[j + 1]["commits"]).length
        ) {
          let temp = attendance_data[j];
          attendance_data[j] = attendance_data[j + 1];
          attendance_data[j + 1] = temp;
        }
      }
    }

    thead.push(<th>No</th>);
    thead.push(<th>이름</th>);
    thead.push(<th>출석률</th>);
    // thead.push(<th>순위</th>);
    for (let i = 0; i < this.state.period; i++) {
      if (i < 9) {
        thead.push(<th>0{i + 1}</th>);
      } else {
        thead.push(<th>{i + 1}</th>);
      }
    }
    table.push(<tr className="thead">{thead}</tr>);

    for (let i = 0; i < attendance_data.length; i++) {
      let row = [];
      let today = new Date(getKoreaDateString(new Date()));
      let startDateObject = new Date(this.state.start_date);
      console.log(today);
      console.log(startDateObject);
      let diff =
        Math.round((today - startDateObject) / (1000 * 60 * 60 * 24)) + 1;
      let attendance_cnt = Object.keys(attendance_data[i].commits).length;
      let attendance_ratio = Math.round((attendance_cnt / diff) * 100);

      row.push(<td>{i + 1}</td>);
      row.push(<td>{attendance_data[i].github_username}</td>);
      row.push(<td>{attendance_ratio}%</td>);

      let date = this.state.start_date;
      let todaySting = getKoreaDateString(new Date());
      console.log(todaySting);

      for (let j = 0; j < this.state.period; j++) {
        if (date === todaySting) {
          if (attendance_data[i].commits[date] !== undefined) {
            row.push(<td className="attend"></td>);
          } else {
            row.push(<td className="absent"></td>);
          }
          for (let k = j + 1; k < this.state.period; k++) {
            row.push(<td className="none"></td>);
          }
          break;
        }
        if (attendance_data[i].commits[date] !== undefined) {
          row.push(<td className="attend"></td>);
        } else {
          row.push(<td className="absent"></td>);
        }
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        date = getKoreaDateString(newDate);
      }

      table.push(<tr>{row}</tr>);
    }
    return table;
  };

  render() {
    console.log(this.state);
    return (
      <div className="TotalAttendance">
        <br />
        <h1>전체 출석부</h1>
        <h4>1차: 2021.01.01 ~ 2021.01.29</h4>
        <h3>한 시간에 한번씩 갱신됩니다!</h3>
        <table className="attendanceTable">
          {this.state.data ? this.buildCalendar() : null}
        </table>
      </div>
    );
  }
}

export default TotalAttendance;
