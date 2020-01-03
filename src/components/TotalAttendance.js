import React from 'react';
import './TotalAttendance.css';
import {connect} from "react-redux";

class TotalAttendance extends React.Component{
    state = {
        start_date: '2019-12-23',
        period: 21
    };

    buildCalendar = () => {
        const start = this.state.start_date;
        const attendance = this.props.attendance;
        const { dispatch } = this.props;

        let days = [];
        //dispatch({type: 'DATE_ADD_REQUEST', payload: {'date':'2019-12-31'}});
    };

    render() {
        this.buildCalendar();
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
});

export default connect(
    mapStateToProps,
)(TotalAttendance);