
import React  from "react";
import { Table,Icon } from 'antd';

class TableDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            dataTable:[]
        }
    }
    componentWillReceiveProps=(nextProps)=> {
        const dataTable=nextProps.data;
        const portsList= dataTable.map((data,index)=>{
            return{
                ports:data.data.ports
            }
        })
        const dataPorts=portsList[0].ports.map((port,index)=>{
            return{
                index:index+1,
                port
            }
        })
        this.setState({
            dataTable:dataPorts
        })
    }
    componentDidMount(): void {
        console.log(this.props)
        const dataTable=this.props.data;
        const portsList= dataTable.map((data,index)=>{
            return{
                ports:data.data.ports
            }
        })
        const dataPorts=portsList[0].ports.map((port,index)=>{
            return{
                index:index+1,
                port
            }
        })
        this.setState({
            dataTable:dataPorts
        })
    }

    render(){
        const {dataTable}=this.state;
        const columns = [
            {
                title: 'Index',
                key: 'index',
                render:record=>{
                    return record.index
                }
            },
            {
                title: 'Name',
                key: 'name',
                render:record=>{
                    // return record.data.ports.name
                }
            },
            {
                title: 'IfIndex',
                key: 'ifindex',
                render:record=>{
                   return record.port.ifindex
                }
            },
            {
                title: 'Description',
                key: 'description',
                // render:record=>{
                //     return record.data.ports.description
                // }
            },
            {
                title: 'Remove type',
                key: 'remove',
                // render:record=>{
                //     return record.data.ports.description
                // }
            },
            {
                title: 'Monitored attrs',
                key: 'monitored-attrs',
                // render:record=>{
                //     return record.data.ports.description
                // }
            },
            {
                title: 'Task ids',
                key: 'task ids',
                render:record=> {
                   return record.port.requestOpsviewResult.taskId
                }

            },
            {
                title: 'Result',
                key: 'result',
                render:record=>{
                    const result=record.port.requestOpsviewResult
                    if(result.success===true){
                        return  <Icon type="check" style={{color:"green"}}/>
                    }else{
                        return    <Icon type="close" style={{color:"red"}}/>
                    }

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