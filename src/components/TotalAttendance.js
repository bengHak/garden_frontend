import React from 'react';

class TotalAttendance extends React.Component{
    render() {
        let rankList = [];
        return (
            <>
            <First></First>
            <Second></Second>
            <Third></Third>
            {
                rankList.map(row => {
                    return (
                        <RankRow
                        />
                    );
                })
            }
            </>
        )
    }
}

const First = () => {
    return (
        <div
            style={{width:'80%', padding: '20px'}}
        >
        </div>
    );
}

const Second = () => {
    return (
        <>
        </>
    );
};

const Third = () => {
    return (
        <>
        </>
    );
};

const RankRow = () => {

    return (
        <>
        </>
    );
};

export default TotalAttendance;