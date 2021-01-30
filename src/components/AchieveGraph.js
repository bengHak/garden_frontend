import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./AchieveGraph.css";
import { connect } from "react-redux";
import axios from "axios";
import { getKoreaDateString } from "../libs";

class AchieveGraph extends React.Component {
  state = {
    githubID: "",
    bookmarked: false,
    attendance: {},
    period: 26,
    start_date: "2021-02-01",
    end_date: "2021-02-26",
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get("/v1/gets/2021-01-01/2021-01-29/").then((res) => {
      this.setState({
        ...this.state,
        attendance: res.data,
      });
    });
  };

  getBookmarked = () => {
    const githubID = localStorage.getItem("githubID");
    if (githubID !== null) {
      return githubID;
    } else return false;
  };

  bookmarkID = (id) => {
    if (!this.props.users.some((item) => item.name === id)) return false;
    localStorage.setItem("githubID", id);
    return true;
  };

  clearBookmark = () => {
    localStorage.removeItem("githubID");
    alert("ID 등록해제 되었습니다.");
    this.setState({
      ...this.state,
      bookmarked: false,
    });
  };

  calculateProgress = (id) => {
    let attendance = this.state.attendance;
    let attendance_data = [];

    for (let i = 0; i < Object.keys(attendance).length; i++) {
      attendance_data.push(attendance[Object.keys(attendance)[i]]);
    }

    const userInfo = attendance_data.find((row) => {
      if (row.github_username === id) return row;
    });
    if (userInfo === undefined) return false;
    else {
      let count = Object.keys(userInfo["commits"]).length;
      return Math.floor((count / period) * 100);
    }
  };

  getAttendance = () => {
    let total_attendance_count = 0;
    let today_attendance_count = 0;
    let attendance = this.state.attendance;
    let attendance_data = [];

    for (let i = 0; i < Object.keys(attendance).length; i++) {
      attendance_data.push(attendance[Object.keys(attendance)[i]]);
    }
    // 최적화 어떻게 하면 좋을지???
    const todayString = getKoreaDateString(new Date());

    for (let i = 0; i < attendance_data.length; ++i) {
      // console.log(attendance_data);
      if (attendance_data.length < 1) {
        break;
      }
      total_attendance_count += Object.keys(attendance_data[i]["commits"])
        .length;
      if (todayString in attendance_data[i]["commits"]) {
        today_attendance_count += 1;
      }
    }

    return {
      total_attendance_count,
      today_attendance_count,
    };
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      githubID: e.target.value,
    });
  };

  handleSubmit = () => {
    if (this.bookmarkID(this.state.githubID)) {
      this.setState({
        ...this.state,
        bookmarked: true,
      });
      alert(this.state.githubID + "님 환영합니다!");
    } else {
      alert("존재하지 않는 ID입니다.");
      // this.setState({
      //     ...this.state,
      //     "githubID": ''
      // })
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  render() {
    const attendance_data = this.getAttendance();
    const total_attendance_count = attendance_data["total_attendance_count"];
    const today_attendance_count = attendance_data["today_attendance_count"];
    const total_attendance =
      this.state.period * Object.keys(this.state.attendance).length; // 29일 인원수
    const today_attendance = Object.keys(this.state.attendance).length; // 인원수
    const today_progress = Math.floor(
      (today_attendance_count / today_attendance) * 100
    );
    const total_progress = Math.floor(
      (total_attendance_count / total_attendance) * 100
    );

    // this.clearBookmark();
    const bookMarkedID = this.getBookmarked();
    let progress = 0;
    let progressTitle = "";

    if (bookMarkedID !== false) {
      progress += this.calculateProgress(bookMarkedID);
      progressTitle += bookMarkedID + "님의";
      if (!this.state.bookmarked) {
        this.setState({
          ...this.state,
          bookmarked: true,
        });
      }
    }

    return (
      <>
        {this.state.bookmarked ? null : (
          <div className="register-id">
            <input
              className="register-input"
              type="text"
              name="githubID"
              placeholder="ID를 등록해주세요!"
              value={this.state.githubID}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            <button className="register-button" onClick={this.handleSubmit}>
              <span>등록</span>
            </button>
          </div>
        )}
        <div
          style={{
            position: "relative",
            // backgroundColor: '#BBB',
            padding: "20px",
          }}
        >
          {this.state.bookmarked ? (
            <button className="unregister-button" onClick={this.clearBookmark}>
              ID등록해제
            </button>
          ) : (
            <></>
          )}
          {this.state.bookmarked ? (
            <CustomGraph
              title={progressTitle}
              color="#99c0ff"
              percentage={progress}
            />
          ) : null}
          <CustomGraph
            title="오늘"
            color="#fc857e"
            percentage={today_progress}
          />
          <CustomGraph
            title="전체"
            color="#84db87"
            percentage={total_progress}
          />
        </div>
      </>
    );
  }
}

class CustomGraph extends React.Component {
  render() {
    const percentage = this.props.percentage;
    const thisColor = this.props.color;
    const thisWidth = window.innerWidth > 700 ? "20vw" : "70vw";
    return (
      <div
        style={{
          margin: "10px",
          width: { thisWidth },
          display: "inline-block",
        }}
      >
        <CircularProgressbarWithChildren
          value={percentage}
          // text={`달성률 ${percentage}%`}
          background="1"
          backgroundPadding="3"
          styles={buildStyles({
            backgroundColor: thisColor,
            // strokeLinecap: "butt",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
          })}
        >
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}>
            {this.props.title}
            <br />
            달성률 {percentage}%
          </div>
        </CircularProgressbarWithChildren>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  attendance: state.attendance,
});

export default connect(mapStateToProps)(AchieveGraph);
