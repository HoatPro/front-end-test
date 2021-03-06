import React from "react";
import {Table, Alert} from 'antd';


import moment from 'moment';


class TableFail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []

        }
    }

    componentWillReceiveProps=(nextProps)=>{

        const portList = [];
        const dataFail = nextProps.dataFail

        for (let device of dataFail) {
            for (let port of device.ports) {
                if (!port.requestOpsviewResult || !port.requestOpsviewResult.success) {
                    portList.push({...port, device: device});
                }
            }
        }
        const dataObj = portList.map((data, index) => {
            return {
                index: index + 1,
                data
            }
        })
        this.setState({
            dataTable: dataObj
        })
    }

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
                title: 'Times',
                key: 'time',
                render: record => {
                    const times = record.data.time
                    return moment(times).format("YYYY-MM-DD HH:mm:ss")
                }

            },
            {
                title: 'Name',
                key: 'name-device',
                render: record => {
                    return record.data.device.name
                }
            },
            {
                title: 'Ip',
                key: 'ip',
                render: record => {
                    return record.data.device.ip
                }
            },
            {
                title: 'Function',
                key: 'function',
                render: record => {
                    return record.data.device.function
                }
            },
            {
                title: 'Aera',
                key: 'aera',
                render: record => {
                    return record.data.device.area
                }
            },
            {
                title: 'Method',
                key: 'methods',
                render: record => {
                    return record.data.device.method
                }
            },
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record.data.name
                }
            },
            {
                title: 'IfIndex',
                key: 'ifIndex',
                render: record => {
                    return record.data.ifindex
                }
            },
            {
                title: 'Description',
                key: 'description',
                render: record => {
                    return record.data.description
                }
            },
            {
                title: 'Task Id',
                key: 'task-id',
                render: record => {
                    return (
                        <div>{record.data.requestOpsviewResult ? record.data.requestOpsviewResult.taskId : null}</div>)
                }
            },

        ];
        const tableData = []
        if (dataTable.length > 0) {
            tableData.push(
                <Table
                    style={{fontWeight: 500}}
                    bordered
                    dataSource={dataTable}
                    columns={columns}
                    rowKey={record => record.index}/>

            )

        } else {
            tableData.push(
                <Alert message="There is no existed items!" type="warning" style={{fontWeight: 650}}/>
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