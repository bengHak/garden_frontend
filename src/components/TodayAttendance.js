import React from 'react';
import { connect } from 'react-redux'
import './TodayAttendance.css'

class TodayAttendance extends React.Component{
    render() {
        return (
            <div className="today_attendance">
            {this.props.attendance.map((att) =>{
                console.log(att);
                return (
                    <User
                        //각 위젯을 구별할 unique key 필요
                        key={att.id}
                        name={att.username}
                    />
                );
            })}
            </div>
        )
    }
}

const User = ({name}) => {
    const githubURL = 'http://github.com/'+name;
    const avatarImg = 'https://avatars.githubusercontent.com/'+name;

    let att = false;

    return (
        <div className="User">
            <h5>{name}</h5>
            <a href={githubURL}>
                <img src={avatarImg} width="100px"/>
            </a>
            {
                att ? <h5>출석 성공!</h5>: <h5>아직</h5>
            }
        </div>
    )
};

const mapStateToProps = state => ({
    users: state.users,
    attendance: state.attendance,
});

export default connect(
    mapStateToProps,
)(TodayAttendance);