import React from 'react';
import './TotalAttendance.css';
import axios from 'axios';

class TotalAttendance extends React.Component{
    state = {
        start_date: '2020-01-15',
        period: 21
    };

    getData = () => {
        axios.get('/attendance/gets').then((res) => {
            // console.log(res.data);
            this.setState({
                'data': res.data,
            });
        });
    };

    getDateString = (date) => {
        let month = ''+(date.getMonth()+1);
        let day = ''+date.getDate();

        if(month.length < 2)
            month = '0' + month;
        if(day.length < 2)
            day = '0' + day;
        return date.getFullYear()+'-'+month+'-'+day;
    };

    buildCalendar = () => {
        let table = [];
        let thead = [];

        let attendance_data = this.state.data;

        for(let i=0; i<attendance_data.length - 1; i++) {
            for(let j=0; j<attendance_data.length - 1; j++) {
                if(Object.keys(attendance_data[j]['attendances']).length < Object.keys(attendance_data[j+1]['attendances']).length ) {
                    let temp = attendance_data[j];
                    attendance_data[j] = attendance_data[j+1];
                    attendance_data[j+1] = temp;
                }
            }
        }

        thead.push(<th>No</th>);
        thead.push(<th>이름</th>);
        thead.push(<th>출석률</th>);
        // thead.push(<th>순위</th>);
        for(let i=0; i<this.state.period; i++) {
            if(i<9) {
                thead.push(<th>0{i+1}</th>);    
            }
            else {
                thead.push(<th>{i+1}</th>);
            }
        }
        table.push(<tr className="thead">{thead}</tr>)

        for(let i=0; i<attendance_data.length; i++){
            let row = [];
            let today = new Date();
            let startDateObject = new Date(this.state.start_date);
            let diff = Math.round(Math.abs(startDateObject - today) / 1000/ 60/ 60/ 24)+1;
            let attendance_cnt = Object.keys(attendance_data[i].attendances).length;
            let attendance_ratio;

            if('2020-01-14' in attendance_data[i].attendances) {
                // console.log('전날 커밋');
                attendance_cnt -= 1;
            }
            attendance_ratio = Math.round((attendance_cnt/diff)*100);

            row.push(<td>{i+1}</td>);
            row.push(<td>{attendance_data[i].user}</td>);
            row.push(<td>{attendance_ratio}%</td>);

            let date = this.state.start_date;
            let todaySting = this.getDateString(new Date());

            for(let j=0; j<this.state.period; j++) {
                if (date === todaySting){
                    if(attendance_data[i].attendances[date] !== undefined){
                        row.push(<td className="attend"></td>);
                    }
                    else {
                        row.push(<td className="absent"></td>);
                    }
                    for(let k=j+1; k<this.state.period; k++) {
                        row.push(<td className="none"></td>);
                    }
                    break;
                }
                if(attendance_data[i].attendances[date] !== undefined){
                    row.push(<td className="attend"></td>);
                }
                else {
                    row.push(<td className="absent"></td>);
                }
                let newDate = new Date(date);
                newDate.setDate(newDate.getDate()+1);
                date = this.getDateString(newDate);
            }
            
            table.push(<tr>{row}</tr>);
        }
        return table;
    };

    render() {
        this.getData();
        console.log(this.state);
        return (
            <div className="TotalAttendance">
                <br/>
                <h1>전체 출석부</h1>
                <h4>2차: 2020.01.15 ~ 2020.02.05</h4>
                <h3>한 시간에 한번씩 갱신됩니다!</h3>
                <table className="attendanceTable">
                   {
                       this.state.data ? this.buildCalendar() : null
                   }
                </table>
            </div>
        )
    }
}

export default TotalAttendance;

// const mapStateToProps = state => ({
//     users: state.users,
//     attendance: state.attendance,
// });

// export default connect(
//     mapStateToProps,
// )(TotalAttendance);