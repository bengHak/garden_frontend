import React from 'react';

class TotalAttendance extends React.Component{
    render() {
        return (
            <div className="TotalAttendance">
                <br/>
                <br/>
                <h2>출석부</h2>
                <WeekAttendance className='week-attendance'/>
                <WeekAttendance className='week-attendance'/>
                <WeekAttendance className='week-attendance'/>
            </div>
        )
    }
}

class WeekAttendance extends React.Component{
    render() {
        return (
            <>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
                <DailyAttendance className='daily-attendance'/>
            </>
        );
    }
}

class DailyAttendance extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

export default TotalAttendance;