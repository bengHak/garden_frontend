import React from 'react';
import './TotalAttendance.css';

class TotalAttendance extends React.Component{
    state = {
        start_date: '2019-12-23',
        period: 21
    };

    buildCalendar = () => {
        const start = this.state.start_date;
    };

    render() {
        return (
            <div className="TotalAttendance">
                <br/>
                <h2>출석부</h2>
                <WeekAttendance week='1주차' className='week-attendance'/>
                <WeekAttendance week='2주차' className='week-attendance'/>
                <WeekAttendance week='3주차' className='week-attendance'/>
            </div>
        )
    }
}

class WeekAttendance extends React.Component{
    render() {
        return (
            <div>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
            </div>
        );
    }
}

class DailyAttendance extends React.Component {
    render() {
        const progress = 66;
        const top = (100-progress) + '%';
        return (
            <div className='daily-attendance'>
                <div
                    className='daily-progress'
                    style={{
                        position: 'absolute',
                        backgroundColor:'#84db87',
                        borderRadius: '5px',
                        top: top,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        fontSize: '1.1rem',
                    }}
                >
                    {progress}%
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: 0,
                        right: 0,
                    }}
                >12/31</div>
            </div>
        );
    }
}

export default TotalAttendance;