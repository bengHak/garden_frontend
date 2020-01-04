import React from 'react';
import './TotalAttendance.css';
import {connect} from "react-redux";

class TotalAttendance extends React.Component{
    state = {
        start_date: '2019-12-23',
        period: 21
    };

    componentDidMount() {
        this.buildCalendar();
    }

    buildCalendar = () => {
        const start = this.state.start_date;
        const attendance = this.props.attendance;
        const { dispatch } = this.props;

        let days = [];
        let date = new Date(this.state.start_date);
        for(let i=0; i<this.state.period; ++i) {
            let month = ''+(date.getMonth()+1);
            let day = ''+date.getDate();

            if(month.length < 2)
                month = '0' + month;
            if(day.length < 2)
                day = '0' + day;
            const dateString = date.getFullYear()+'-'+month+'-'+day;

            // console.log(dateString);
            dispatch({type: 'DATE_ADD_REQUEST', payload: {'date':dateString}});
            date.setDate(date.getDate()+1);
        }
    };

    render() {
        console.log(this.props.dates);
        this.sortDate();
        return (
            <div className="TotalAttendance">
                <br/>
                <h2>출석부</h2>
            </div>
        )
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

const mapStateToProps = state => ({
    users: state.users,
    attendance: state.attendance,
    dates: state.dates,
});

export default connect(
    mapStateToProps,
)(TotalAttendance);