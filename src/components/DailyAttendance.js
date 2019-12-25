import React from 'react';
import { connect } from 'react-redux'

class DailyAttendance extends React.Component{
    render() {
        return (
            <>
            {this.props.users.map((user) =>(
                    <User
                        name={user.name}
                    />
                ))}
            </>
        )
    }
}

const User = (name) => (
    <h1>{name}</h1>
);

const mapStateToProps = state => ({
    users: state.users
});

export default connect(
    mapStateToProps,
)(DailyAttendance);