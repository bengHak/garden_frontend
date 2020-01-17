import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './AchieveGraph.css';
import {connect} from "react-redux";

class AchieveGraph extends React.Component {
    state = {
        githubID: '',
        bookmarked: false
    };

    calculateProgress = (id) => {
        const attendance_data  = this.props.attendance;
        const userInfo = attendance_data.find(row => {
            if(row.username === id)
                return row;
        });
	// console.log(userInfo);
        if(userInfo === undefined)
            return false;
        else {
	    let count = Object.keys(userInfo['attendance']).length; 
            if (userInfo['attendance']['2020-01-14'] != undefined) {
                count -= 1;
	    }
            return Math.floor(count / 21 * 100);
        }
    };

    getBookmarked = () => {
        const githubID = localStorage.getItem('githubID');
        if(githubID !== null){
            return githubID;
        }
        else
            return false;
    };

    bookmarkID = (id) => {
        if(!(this.props.users.some( item => item.name === id)))
            return false;
        localStorage.setItem('githubID', id);
        return true;
    };

    clearBookmark = () => {
        localStorage.removeItem('githubID');
        alert('ID 등록해제 되었습니다.');
        this.setState({
            ...this.state,
            bookmarked: false
        });
    };

    getAttendance = () => {
        let total_attendance_count=0;
        let today_attendance_count=0;
        const attendance_data  = this.props.attendance;
        // 최적화 어떻게 하면 좋을지???
        // console.log(attendance_data);

        const today = new Date();
        let month = ''+today.getMonth()+1;
        let day = ''+today.getDate();

        if(month.length < 2)
            month = '0' + month;
        if(day.length < 2)
            day = '0' + day;
        const todayString = today.getFullYear()+'-'+month+'-'+day;

        for(let i=0; i<attendance_data.length; ++i){
           // console.log(attendance_data);
	    if(attendance_data.length < 1) {
	        break;
	    }
            total_attendance_count += Object.keys(attendance_data[i]['attendance']).length;
            if(todayString in attendance_data[i]['attendance']){
                today_attendance_count += 1;
            }
        }

        return {
            'total_attendance_count': total_attendance_count,
            'today_attendance_count': today_attendance_count
        };
    };

    handleChange = (e) => {
        this.setState({
            ...this.state,
            "githubID": e.target.value
        })
    };

    handleSubmit = () => {
        if(this.bookmarkID(this.state.githubID)) {
            this.setState({
                ...this.state,
                "bookmarked": true
            });
            alert(this.state.githubID + '님 환영합니다!');
        }
        else {
            alert('존재하지 않는 ID입니다.');
            // this.setState({
            //     ...this.state,
            //     "githubID": ''
            // })
        }
    };

    render(){
        const attendance_data = this.getAttendance();
        const total_attendance_count = attendance_data['total_attendance_count'];
        const today_attendance_count = attendance_data['today_attendance_count'];
        const total_attendance = 21 * 24; // 21일 24명
        const today_attendance = 24; // 24명
        const today_progress = Math.floor(today_attendance_count/today_attendance*100);
        const total_progress = Math.floor(total_attendance_count/total_attendance*100);

        // this.clearBookmark();
        const bookMarkedID = this.getBookmarked();
        let progress = 0;
        let progressTitle = '';

        if(bookMarkedID !== false) {
            progress += this.calculateProgress(bookMarkedID);
            progressTitle += bookMarkedID+'님의';
            if(!(this.state.bookmarked)) {
                this.setState({
                    ...this.state,
                    bookmarked: true
                });
            }
        }

        return (
            <>
                {
                    this.state.bookmarked ?
                        null
                        :
                        <div className='register-id'>
                            <input
                                className='register-input'
                                type='text'
                                name='githubID'
                                placeholder='ID를 등록해주세요!'
                                value={this.state.githubID}
                                onChange={this.handleChange}
                            />
                            <button className='register-button' onClick={this.handleSubmit}>
                                <span>등록</span>
                            </button>
                        </div>
                }
                <div
                    style={{
                        position: 'relative',
                        // backgroundColor: '#BBB',
                        padding: '20px'
                    }}
                >
                    { this.state.bookmarked ? <button className='unregister-button' onClick={this.clearBookmark}>ID등록해제</button> : <></>}
                    {
                        this.state.bookmarked ?
                            <CustomGraph title={progressTitle} color="#99c0ff" percentage={progress}/>
                            :
                            null
                    }
                    <CustomGraph title="오늘" color="#fc857e" percentage={today_progress}/>
                    <CustomGraph title="전체" color="#84db87" percentage={total_progress}/>
                </div>
            </>
        )
    }
}

class CustomGraph extends React.Component{
    render(){
        const percentage = this.props.percentage;
        const thisColor = this.props.color;
        const thisWidth = window.innerWidth > 700 ? '20vw' : '70vw';
        return (
            <div style={{margin:'10px', width: {thisWidth}, display:'inline-block'}}>
                <CircularProgressbarWithChildren
                    value={percentage}
                    // text={`달성률 ${percentage}%`}
                    background='1'
                    backgroundPadding='3'
                    styles={buildStyles({
                        backgroundColor: thisColor,
                        // strokeLinecap: "butt",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                        })}
                >
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>
                        {this.props.title}
                        <br/>
                        달성률 {percentage}%
                    </div>
                </CircularProgressbarWithChildren>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users,
    attendance: state.attendance,
});

export default connect(
    mapStateToProps,
)(AchieveGraph);
