import React from "react";
import {Table, Icon, Alert} from 'antd';
import moment from 'moment';

class TableFail extends React.Component {
    render() {
        const portList = [];
        const dataFail = this.props.dataFail;
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
                title: 'Device',
                key: 'device',
                render: record => {
                    return record.data.device.groupName
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
                title: 'Room',
                key: 'room',
                render: record => {
                    return record.data.device.method
                }
            },
            {
                title: 'Rack',
                key: 'rack',
                render: record => {
                    return record.data.device.rack
                }
            },
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record.data.device.name
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
                title: 'Task Ids',
                key: 'task-id',
                render: record => {
                    const row = record.data;
                    return <div>
                        {
                            (row.requestOpsviewResult) ?
                                row.requestOpsviewResult.map((e, idx) => (
                                    <div>
                                        <div>
                                            {
                                                e.existed ?
                                                    <Icon type="check" style={{color: "green"}}/> :
                                                    <Icon type="close" style={{color: "red"}}/>
                                            } <b>{e.attributeLabel}:</b> {e.taskId}
                                        </div>
                                    </div>
                                )) : null
                        }
                    </div>
                }
            },

        ]
        const tableData = [];
        if (dataObj.length > 0) {
            tableData.push(
                <Table
                    style={{fontWeight: 500}}
                    bordered
                    dataSource={dataObj}
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