import React from "react";
import {Table, Icon} from 'antd';


class TableDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        }
    }

    render() {
        const dataModalGet = this.props.dataModal;
        const newData = [];
        dataModalGet.map(data => {
            newData.push(data.data.ports);
        });
        const dataObj = [];
        newData.map(data => {
            data.map((z, index) => {
                dataObj.push({
                    index: index + 1,
                    z
                });
            });
        });
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
                    const taskList = record.z;
                    return (
                        (taskList.requestOpsviewResult) ?
                            taskList.requestOpsviewResult.map((e, idx) => (
                                <div>
                                    <div>
                                        {
                                            e.existed ?
                                                <Icon type="check"  style={{color:"green"}} /> :
                                                <Icon type="close" style={{color:"red"}}/>
                                        } <b>{e.attributeLabel}:</b> {e.taskId}
                                    </div>
                                </div>
                            )) : null
                    )

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
                dataSource={dataObj}
                pagination={false}
                rowKey={record => record.index}
            />
        )
    }
}

export default TableDetail