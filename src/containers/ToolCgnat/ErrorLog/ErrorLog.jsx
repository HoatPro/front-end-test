import React from "react";
import { Table, DatePicker, Button,Card } from 'antd';
import {ErrorLogWrapper} from "./ErrorLog.style"
import axios from "axios";


class ErrorLog extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/error-logs-tool-cgnat"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            console.log(data);
            let dataObject=data.map((dataObj,index)=>{
                return{
                    "index":index+1,
                    dataObj
                }



            })
            this.setState({
                dataTable:dataObject
            })
        }
    }

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.onChange('startValue', value);
    };

    onEndChange = value => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Name',
                key: 'device_name',
                render:record=>{
                    return record.dataObj.device_name
                }

            },

            {
                title: 'Ip',
                key: 'device_ip',
                render:record=>{
                    return record.dataObj.device_ip
                }
            },
            {
                title: 'FPC Slot',
                key: 'fpc_slot',
                render:record=>{
                    return record.dataObj.fpc_slot
                }
            },
            {
                title: 'Pic Slot',
                key: 'pic_slot',
                render:record=>{
                    return record.dataObj.pic_slot
                }
            },
            {
                title: 'Card',
                key: 'card',
                render:record=>{
                    return record.dataObj.card
                }
            },
            {
                title: 'Log Message',
                key: 'log_message',
                render:record=>{
                    return record.dataObj.log_message
                }
            },
            {
                title: 'Timestamp',
                key:'time_stamp',
                render:record=>{
                    // const data=new Date(record.dataObj.time_stamp);
                    return record.dataObj.time_stamp;
                }

            },
        ];

        const { startValue, endValue, endOpen } = this.state;

        return (
         <ErrorLogWrapper>
             <Card  style={{ width: "100%",fontWeight:600, marginBottom:10 }}>
                 <div className="selection_date" style={{ marginBottom:20}}>
                     <h2 style={{fontWeight:"640"}}>Error Log</h2>
                     <div className="from_date" style={{ float:"left"}}>
                         <h4 style={{fontWeight:"560"}}>From</h4>
                         <DatePicker
                             style={{marginRight:20}}
                             disabledDate={this.disabledStartDate}
                             showTime
                             format="YYYY-MM-DD "
                             value={startValue}
                             placeholder="Start"
                             onChange={this.onStartChange}
                             onOpenChange={this.handleStartOpenChange}
                         />
                     </div>
                     <div className="to_date">
                         <h4 style={{fontWeight:"560"}}>To</h4>
                         <DatePicker
                             disabledDate={this.disabledEndDate}
                             showTime
                             format="YYYY-MM-DD "
                             value={endValue}
                             placeholder="End"
                             onChange={this.onEndChange}
                             open={endOpen}
                             onOpenChange={this.handleEndOpenChange}
                         />
                     </div>
                 </div>
             </Card>
                 <Card  style={{ width: "100%",marginBottom:20 }}>
                 <Table
                     style={{marginTop:20}}
                     id="table-detail"
                     className="table-detail"
                     columns={columns}
                     dataSource={this.state.dataTable}
                     bordered
                     // pagination={{ defaultPageSize: 20}}
                     rowKey={record => record.index}
                 />
                 </Card>
         </ErrorLogWrapper>

        )
    }
}

export default ErrorLog;