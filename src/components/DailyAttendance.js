import React from 'react';
import { connect } from 'react-redux'

class DailyAttendance extends React.Component{
    render() {
        return (
            <>
            {this.props.users.map((user) =>{
                return (
                    <User
                        //각 위젯을 구별할 unique key 필요
                        key={user.id}
                        name={user.name}
                    />
                );
            })}
            </>
        )
    }
}

const User = ({name}) => (
    <h3>{name}</h3>
);

const mapStateToProps = state => ({
    users: state.users
});

export default connect(
    mapStateToProps,
)(DailyAttendance);