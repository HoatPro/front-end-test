import React from "react";
import {Table, Icon} from 'antd';


class TableDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        }
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(this.props)
        const dataTable = nextProps.dataLogs;

        const newDataProps = []
        dataTable.map(data => {
            newDataProps.push(data.data.ports)
        })
        const dataObj = []
        newDataProps.map(data => {
            data.map((z, index) => {
                dataObj.push({
                    index: index + 1,
                    z
                })
            })
        });
        this.setState({
            dataTable: dataObj
        })
    }

    // componentDidMount(): void {
    //     const dataTable = this.props.dataLogs;
    //     const newData=[]
    //     dataTable.map(data=>{
    //         newData.push(data.data.ports)
    //     })
    //     const dataObj=[]
    //     newData.map(data=>{
    //         data.map((z,index)=>{
    //             dataObj.push({
    //                 index:index+1,
    //                 z
    //             })
    //         })
    //     });
    //     this.setState({
    //         dataTable:dataObj
    //     })
    // }

    render() {
        const {dataTable} = this.state;
        const columns = [
            {
                title: 'Index',
                key: 'index',
                render: record => {
                    return record.index
                }

            },
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record.z.name
                }
            },
            {
                title: 'IfIndex',
                key: 'ifindex',
                render: record => {
                    return record.z.ifindex
                }
            },
            {
                title: 'Description',
                key: 'description',
                render: record => {
                    return record.z.description
                }
            },
            {
                title: 'Task ids',
                key: 'task ids',
                render: record => {
                    const taskList = record.z.requestOpsviewResult;
                    const z = [];
                    taskList.map(task => {
                        z.push(<div>{
                            task.existed ?
                                <Icon type="check" style={{color: "green"}}/> :
                                <Icon type="close" style={{color: "red"}}/>
                        } <b>{task.attributeLabel}:</b> {task.taskId}</div>)
                    });
                    return z
                }

            },
            {
                title: 'Result',
                key: 'result',
                render: record => {
                    const result = record.z.existInOps
                    return <div> {
                        result ? <Icon type="check" style={{color: "green"}}/> :
                            <Icon type="close" style={{color: "red"}}/>
                    }</div>
                }
            },
        ];

        return (
            <Table
                bordered
                columns={columns}
                dataSource={dataTable}
                pagination={false}
                rowKey={record => record.index}
            />
        )
    }
}

export default TableDetail