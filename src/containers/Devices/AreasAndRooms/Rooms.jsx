import React from 'react';
import {Table, message, Icon} from 'antd';
import axios from 'axios'

class TableRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],

        }
    }

    componentWillReceiveProps(nextProps) {
        const id = nextProps.idSelected;
        axios({
            method: 'GET',
            url: `https://netd.ast.fpt.net/netd-api/api/net-rooms?areaId=${id}`
        }).then(res => {
            if (res.status) {
                message.success("Get NET ROOM successfully!")
                const dataTable = res.data.data;
                const dataObj = dataTable.map((data, index) => {
                    return {
                        index: index + 1,
                        data
                    }
                })
                this.setState({
                    dataTable: dataObj
                })
            }
        })
    }

    render() {
        const {dataTable} = this.state;
        const columns = [
            {
                title: '#',
                key: 'index',
                render: record => {
                    return record.index
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
                title: 'Address',
                key: 'address',
                render: record => {
                    return record.data.address
                }
            },
            {
                title: 'Warehouse',
                key: 'warehouse',
                render: record => {
                    return record.data.wName
                }
            },
            {
                title: 'Action',
                key: 'action',
                render: record => {
                    return (
                        <div>
                            <Icon type="edit" style={{
                                width: 26,
                                height: 26,
                                backgroundColor: "#fbbd08",
                                padding: 5,
                                color: "white",
                                fontWeight: 700,
                                borderRadius: 5
                            }}/>&nbsp;
                            <Icon type="delete" style={{
                                width: 26,
                                height: 26,
                                backgroundColor: "#db2828",
                                padding: 5,
                                color: "white",
                                fontWeight: 700,
                                borderRadius: 5
                            }}/>
                        </div>
                    )
                }

            },
        ]
        return (
            <Table
                className="table-detail"
                columns={columns}
                dataSource={dataTable}
                bordered
                rowKey={record => record.index}
            />
        )
    }
}

export default TableRoom;