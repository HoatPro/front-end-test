import React from "react";
import {Table, Icon} from 'antd';
import {registerPostUpdate} from "echarts/src/echarts";

class TableDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        }
    }

    // componentWillReceiveProps = (nextProps) => {
    //     const dataTable = nextProps.data;
    //     const portsList = dataTable.map((data, index) => {
    //         return {
    //             ports: data.data.ports
    //         }
    //     })
    //     const dataPorts = portsList[0].ports.map((port, index) => {
    //         return {
    //             index: index + 1,
    //             port
    //         }
    //     })
    //     this.setState({
    //         dataTable: dataPorts
    //     })
    // }
    //
    // componentDidMount(): void {
    //     console.log(this.props)
    //     const dataTable = this.props.data;
    //     const portsList = dataTable.map((data, index) => {
    //         return {
    //             ports: data.data.ports
    //         }
    //     })
    //     const dataPorts = portsList[0].ports.map((port, index) => {
    //         return {
    //             index: index + 1,
    //             port
    //         }
    //     })
    //     this.setState({
    //         dataTable: dataPorts
    //     })
    // }

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
                render:record=>{
                    console.log(record)
                    return record.z.description
                }
            },
            {
                title: 'Remove type',
                key: 'remove',
                render:record=>{
                    return record.z.removeType
                }
            },
            {
                title: 'Monitored attrs',
                key: 'monitored-attrs',
                render:record=>{
                    const results= record.z
                    return(
                      <div>
                          {
                              results.monitoredAttrs ?
                                  results.monitoredAttrs.sort().map(attr => (
                                      <div>
                                          {attr}
                                      </div>
                                  ))
                                  : null
                          }
                      </div>
                    )
                }
            },
            {
                title: 'Task ids',
                key: 'task ids',
                render: record => {
                    const results=record.z;
                    return <div> {
                        results.requestOpsviewResult ? results.requestOpsviewResult.taskId : 'request not found'
                    }</div>
                }

            },
            {
                title: 'Result',
                key: 'result',
                render: record => {
                    const results = record.z;
                 return (<div>
                     {
                         results.requestOpsviewResult ?
                             (
                                 results.requestOpsviewResult.success ?
                                     <Icon type="check" style={{color:"green"}} /> :
                                     <Icon type="close"   style={{color:"red"}} />
                             ) : 'request not found'
                     }
                 </div>)

                }
            },
        ];

        return (
            <Table
                bordered
                columns={columns}
                dataSource={dataObj}
                pagination={false}
                resultsKey={record => record.index}
            />
        )
    }
}

export default TableDetail