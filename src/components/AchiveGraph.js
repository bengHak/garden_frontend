import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {connect} from "react-redux";

class AchiveGraph extends React.Component {
    render(){
        
        return (
            <div
                style={{
                    backgroundColor: '#BBB',
                    padding: '20px'
                }}
            >
                <CustomGraph color="#99c0ff"/>
                <CustomGraph color="#fc857e"/>
                <CustomGraph color="#84db87"/>
            </div>
        )
    }
}

class CustomGraph extends React.Component{
    render(){
        const percentage = 66;
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
                        strokeLinecap: "butt",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                        })}
                >
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }}>
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
)(AchiveGraph);