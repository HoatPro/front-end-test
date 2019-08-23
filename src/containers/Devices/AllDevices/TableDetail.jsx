import React from "react";
import {Table, Card, Alert} from 'antd';


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
        const table=[]
        dataModalGet.map(data => {
            if(!data.row.ports){
               table.push(<Alert message={"No data exits!"} style={{textAlign:"center", fontWeight:600}}/>)
            }else{
                newData.push(data.row.ports);
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
                        title: 'Monitored labels',
                        key: 'monitored',
                        render: record => {
                            const taskList = record.z;
                            return (
                                <div>
                                    {
                                        taskList.monitoredAttrs ?
                                            taskList.monitoredAttrs.sort().map(attr => (
                                                <a>
                                                    {attr}
                                                </a>
                                            ))
                                            : null
                                    }
                                </div>
                            )

                        }

                    },

                ];
                table.push(<Table
                    columns={columns}
                    dataSource={dataObj}
                    bordered
                />)

            }

        });

        return (
            <Card>{table}</Card>

        )
    }
}

export default TableDetail