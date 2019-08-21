import React from 'react';
import {Button, message, Table} from "antd";
import axios from "axios";
import {Graph} from "react-d3-graph";


class TableMP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            dataName: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        const nameMp = nextProps.nameMp[0];
        axios({
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/get-detail-group-mp?groupMpName=${nameMp}`
        }).then(res => {

            if (res.status) {
                message.success('GET detail Group MP successfully!')
                this.setState({
                    dataTable: res.data
                })
            }
        })
    }


    render() {


        const columns = [
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record._source.name
                }
            },
            {
                title: 'Ip',
                key: 'ip',
                render: record => {
                    return record._source.ip
                }
            },
            {
                title: 'Check at',
                key: 'checkat',
                render: record => {
                    return record._source.time
                }
            },
            {
                title: 'Uplink',
                key: 'uplink',
                render: record => {
                    const uplinkNum = record._source.uplink / 1024
                    return <div>{Math.round(uplinkNum * 100) / 100} Gbps</div>
                }
            },
            {
                title: 'Downlink',
                key: 'downlink',
                render: record => {
                    const downlinkNum = record._source.downlink / 1024
                    return <div>{Math.round(downlinkNum * 100) / 100} Gbps</div>
                }

            },
            {
                title: 'Equal',
                key: 'equal',
                render: record => {
                    const equalNum = record._source.equal / 1024
                    return <div>{Math.round(equalNum * 100) / 100} Gbps</div>
                }
            },
            {
                title: 'B2B',
                key: 'b2b',
                render: record => {
                    const bbNum = record._source.bb / 1024
                    return <div>{Math.round(bbNum * 100) / 100} Gbps</div>
                }
            },
        ]
        // data Test
        const list = this.state.dataTable;
        console.log(list);
        const graph = []

        if (list && list.length > 0) {
            let listNodes = [];
            let listLinks = [];
            console.log(list[0]._source.groupName)
            let groupName = list[0]._source.groupName;
            for (let item of list) {
                let node = {
                    id: item._source.name,
                };
                if (listNodes.indexOf(node) == -1) {
                    listNodes.push(node);
                }
                for (let miniItem of item._source.list_smc_neighbor) {

                    let neighborSmcNode = {
                        id: miniItem,
                        color: 'red'
                    };
                    if (listNodes.indexOf(neighborSmcNode) == -1) {
                        listNodes.push(neighborSmcNode);
                    }
                    listLinks.push({
                        source: item._source.name,
                        target: miniItem
                    });
                }
                for (let miniItem of item._source.list_mp_neighbor) {
                    //check if neighbor in group or not
                    if (miniItem.indexOf(groupName) == -1) {
                        continue;
                    }
                    let neighborMpNode = {
                        id: miniItem
                    };
                    if (listNodes.indexOf(neighborMpNode) == -1) {
                        listNodes.push(neighborMpNode);
                    }
                    listLinks.push({
                        source: item._source.name,
                        target: miniItem
                    });
                }
            }
            const dataGraph = {
                nodes: listNodes,
                links: listLinks
            }
            const myConfig = {
                width: 1500,
                height: 500,
                nodeHighlightBehavior: true,
                node: {
                    color: 'lightgreen',
                    size: 120,
                    highlightStrokeColor: 'orange'
                },
                link: {
                    highlightColor: 'lightblue'
                }
            }
            graph.push(
                <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={dataGraph}
                    config={myConfig}
                />
            )
        }

        return (
            <div>
                {graph}
                <Table
                    columns={columns}
                    dataSource={this.state.dataTable}
                    bordered
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}

export default TableMP;