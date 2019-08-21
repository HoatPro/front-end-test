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

    componentDidMount(): void {
        const dataTable = this.props.data;
        this.setState({
            dataTable: dataTable
        })
    }

    render() {
        const {dataTable} = this.state;
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
                            record.status ? <Icon type="check" style={{color: "green"}}/> :
                                <Icon type="close" style={{color: "red"}}/>
                        }
                    </div>)
                }
            },
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record.data.users[0].name
                }
            },
            {
                title: 'TTY',
                key: 'tty',
                render: record => {
                    return record.data.users[0].tty
                }
            },
            {
                title: 'Time',
                key: 'time',
                render: record => {
                    const times = record.data.time
                    return moment(times).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                title: 'Error',
                key: 'error',
                render: record => {
                    console.log(record)
                    return record.data.users[0]._error
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