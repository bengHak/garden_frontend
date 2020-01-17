import React from 'react';
import './TotalAttendance.css';
import {connect} from "react-redux";

class TotalAttendance extends React.Component{
    state = {
        start_date: '2019-01-15',
        period: 21
    };

    buildCalendar = () => {
        const start = this.state.start_date;
        const attendance = this.props.attendance;
        const { dispatch } = this.props;
        console.log(start);
        console.log(attendance);
        console.log("-----------------------");
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

const mapStateToProps = state => ({
    users: state.users,
    attendance: state.attendance,
});

export default connect(
    mapStateToProps,
)(TotalAttendance);