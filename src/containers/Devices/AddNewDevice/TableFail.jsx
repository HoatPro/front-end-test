import React from "react";
import {Table, Icon,Alert} from 'antd';
import moment from 'moment';

class TableFail  extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataTable:[],
            successPercentCheck:null

        }
    }
    componentDidMount(): void {

        const portList = [];
        const dataGet=this.props.dataGet;
        const successPercentCheck=this.props.successPercentCheck;
        for (let device of dataGet) {
            for (let port of device.ports) {
                if (!port.requestOpsviewResult || !port.requestOpsviewResult.success) {
                    portList.push({...port, device: device});
                }
            }
        }
        const dataObj=portList.map((data,index)=>{
            return {
                index:index+1,
                data
            }
        })
        this.setState({
            dataTable:dataObj,
            successPercentCheck:successPercentCheck
        })
    }

    render() {
        const {dataTable,successPercent}=this.state;
        const columns = [
            {
                title: 'Index',
                key: 'index',
                render:record=>{
                    return record.index
                }

            },
            {
                title: 'Times',
                key: 'time',
                render:record=>{
                    const times=record.data.time
                    return  moment(times).format("YYYY-MM-DD HH:mm:ss")
                }

            },
            {
                title: 'Device',
                key: 'device',
                render:record=>{
                    return record.data.device.groupName
                }
            },
            {
                title: 'Ip',
                key: 'ip',
                render:record=>{
                    return record.data.device.ip
                }
            },
            {
                title: 'Function',
                key: 'function',
                render:record=> {
                    return record.data.device.function
                }
            },
            {
                title: 'Aera',
                key: 'aera',
                render:record=> {
                    return record.data.device.area
                }
            },
            {
                title: 'Room',
                key: 'room',
                render:record=>{
                    return record.data.device.method
                }
            },
            {
                title: 'Rack',
                key: 'rack',
                render:record=>{
                    return record.data.device.rack
                }
            },
            {
                title: 'Name',
                key: 'name',
                render:record=>{
                    return record.data.device.name
                }
            },
            {
                title: 'IfIndex',
                key: 'ifIndex',
                render:record=>{
                    return record.data.ifindex
                }
            },
            {
                title: 'Description',
                key: 'description',
                render:record=>{
                    return record.data.description
                }
            },
            {
                title: 'Task Ids',
                key: 'task-id',
                render:record=>{
                    const taskList=record.data.requestOpsviewResult;
                    const z=[];
                    taskList.map(task=>{
                        z.push(<div>{
                            task.existed ?
                                <Icon type="check" style={{color:"green"}}/> :
                                <Icon type="close" style={{color:"red"}}/>
                        }
                            <b>{task.attributeLabel}:</b> {task.taskId}</div>)
                    });
                    return z
                }
            },

        ]
        const tableData=[]
        if(successPercent<100){
            tableData.push(
                <Table
                    style={{fontWeight:500}}
                    bordered
                    dataSource={dataTable}
                    columns={columns}
                    rowKey={record=>record.index}/>
            )

        }else{
            tableData.push(
                <Alert message="There is no existed items!" type="warning"  style={{fontWeight:650}}/>
            )
        }

        return (
            <div>
                {tableData}
            </div>

        );
    }
}
export default TableFail;