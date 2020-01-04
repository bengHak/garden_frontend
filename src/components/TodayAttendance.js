import React from 'react';
import { connect } from 'react-redux'
import './TodayAttendance.css'

class TodayAttendance extends React.Component{
    render() {
        return (
            <div className="today_attendance">
                <br/>
                <br/>
                <h2>오늘의 출석부</h2>
            {this.props.attendance.map((att) =>{
                const today = new Date();
                let month = ''+(today.getMonth()+1);
                let day = ''+today.getDate();

                if(month.length < 2)
                    month = '0' + month;
                if(day.length < 2)
                    day = '0' + day;
                const todayString = today.getFullYear()+'-'+month+'-'+day;
                const today_attendance = todayString in att['attendance'];
                //console.log(todayString);

                return (
                    <User
                        //각 위젯을 구별할 unique key 필요
                        key={att.id}
                        name={att.username}
                        att={today_attendance}
                    />
                );
            })}
            </div>
        )
    }
}

const User = ({name, att}) => {
    const githubURL = 'http://github.com/'+name;
    const avatarImg = 'https://avatars.githubusercontent.com/'+name;
    const bgColor = att ? '#84db87' : '#ccc'
    const opa = att ? 1 : 0.3;

    return (
        <div className="User" style={{backgroundColor:bgColor, opacity:opa}}>
            <h5>{name}</h5>
            <a href={githubURL}>
                <img src={avatarImg} alt='github_img' width="100px"/>
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
