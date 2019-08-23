import React from "react";
import {Table, Icon} from 'antd';
import moment from "moment";

class TableDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        }
    }


    render() {

        const dataLogs=this.props.data;
        console.log(dataLogs)
        const newData = [];
        dataLogs.map(data => {
            newData.push(data.data.users);
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
                dataIndex: 'index',
            },
            {
                title: 'Status',
                key: 'status',
                render: record => {
                    return (<div>
                        {
                            record.z.status ? <Icon type="check" style={{color: "green"}}/> :
                                <Icon type="close" style={{color: "red"}}/>
                        }
                    </div>)
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
                title: 'TTY',
                key: 'tty',
                render: record => {
                    return record.z.tty
                }
            },
            {
                title: 'Time',
                key: 'time',
                render: record => {
                    const times = record.z.time
                    return moment(times).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                title: 'Error',
                key: 'error',
                render: record => {
                    return record.z._error
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