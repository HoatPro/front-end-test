
import React  from "react";
import { Table,Icon } from 'antd';


class TableDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            dataTable:[]
        }
    }
    componentDidMount(): void {
        const dataTable = this.props.data;
        this.setState({
            dataTable:dataTable
        })
    }
    render(){
        const {dataTable}=this.state;
        const columns = [
            {
                title: 'Index',
                dataIndex: 'index',
            },
            {
                title: 'Name',
                key: 'name',
                render:record=>{
                    return record.data.ports[0].name
                }
            },
            {
                title: 'IfIndex',
                key: 'ifindex',
                render:record=>{
                    return record.data.ports[0].ifindex
                }
            },
            {
                title: 'Description',
                key: 'description',
                render:record=>{
                    return record.data.ports[0].description
                }
            },
            {
                title: 'Task ids',
                key: 'task ids',
                render:record=> {
                    const taskList=record.data.ports[0].requestOpsviewResult;
                    const z=[];
                    taskList.map(task=>{
                        z.push(<div>{
                            task.existed ?
                                <Icon type="check" style={{color:"green"}}/> :
                                <Icon type="close" style={{color:"red"}}/>
                        } <b>{task.attributeLabel}:</b> {task.taskId}</div>)
                    });
                    return z
                }

            },
            {
                title: 'Result',
                key: 'result',
                render:record=>{
                    const result=record.data.ports[0].existInOps
                    return  <div> {
                        result ?  <Icon type="check" style={{color:"green"}}/> :
                            <Icon type="close" style={{color:"red"}}/>
                    }</div>
                }
            },
        ];

        return(
            <Table
                bordered
                columns={columns}
                dataSource={dataTable}
                pagination={false}
                rowKey={record=>record.index}
            />
        )
    }
}
export  default TableDetail