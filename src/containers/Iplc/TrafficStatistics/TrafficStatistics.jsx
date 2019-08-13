import React from "react";
import {Collapse, DatePicker, Select, Button, message} from 'antd';
import axios from "axios";
import moment from 'moment';
const { Panel } = Collapse;
const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';
class TrafficStatistics extends React.Component {
constructor(props){
    super(props);
    this.state={
       timeList:[],
        dataTable:[],
        maxTrafficTime:""
    }
}
// Date Picker
    onChange = (value) => {
        const daySelected=moment(value._d).toISOString();
        axios({
            method: "GET",
            url:`https://netd.ast.fpt.net/netd-api/api/iplc-traffic-times?date=${daySelected}`
        }).then(res=>{
            if(res.status){
                message.success("GET data IPLC successfully!");
               const dataGet=res.data.data;
               this.setState({
                   timeList:dataGet.timeList,
                   maxTrafficTime:dataGet.maxTrafficTime
               })
            }
        })

    }
    formatDate=(date)=> {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();


        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');

    }

    render() {
        const {timeList,maxTrafficTime}=this.state;
        const maxDate=moment(maxTrafficTime).format("YYYY-MM-DD h:mm:ss");
        const dataTime=[]
        if(maxDate.length===0){
            dataTime.push("")
        }
        dataTime.push(maxDate)
        const selected=[];
        timeList.map((time,index)=>{
            selected.push( <Option value={time} key={index}>{time}</Option>)
        })
        return (
            <div>
            <div>
                <Collapse defaultActiveKey={['1']}  >
                    <h2 >IPLC Traffic</h2>
                        <div className="from_date" style={{ float:"left"}}>
                            <h4 style={{fontWeight:"560"}}>Choose Date</h4>
                            <DatePicker
                                style={{marginRight:20}}
                                format={dateFormat}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="to_date">
                            <h4 style={{fontWeight:"560"}}>Choose TIme</h4>
                            <Select defaultValue={dataTime} style={{ width: 200 }} >
                                {selected}
                            </Select>
                        </div>
                    <Panel header="Overview" key="filter" style={{fontWeight:600}}>

                    </Panel>
                    <Panel header="Port List" key="filter" style={{fontWeight:600}}>

                    </Panel>
                </Collapse>

            </div>
            </div>
        );
    }
}

export default TrafficStatistics;