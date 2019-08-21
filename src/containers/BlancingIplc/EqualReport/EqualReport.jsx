import React from "react";
import {Table, message, Card} from 'antd';
import {EqualReportWrapper} from "./EqualReport.style"
import axios from "axios";
import Search from "antd/lib/input/Search";


class EqualReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],

        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/get-equal-report-data"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET data successfull!")
            this.setState({
                dataTable: data
            })
        }
    }

    render() {
        const columns = [
            {
                title: 'Ingress Device',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Equal-Interface',
                dataIndex: 'interfaceName',
                key: 'interfaceName',

            },
            {
                title: 'Equal-Rate(G)',
                key: 'ipNextHop',
                render: record => {
                    let rate = Math.round(record.trafficOut / 1024, 2)
                    return rate
                }

            },
            {
                title: 'Equal-Speed (G)',
                dataIndex: 'speed',
                key: 'speed',

            },
            {
                title: 'Equal-Congest',
                key: 'eqaul-congest',
                render: record => {
                    let rate = Math.round(record.trafficOut / 1024, 2)
                    return (0.8 * record.speed - rate).toFixed(2)
                }

            },
            {
                title: 'Equal-Free',
                key: 'equal-free',
                render: record => {
                    let rate = Math.round(record.trafficOut / 1024, 2)
                    return (0.75 * record.speed - rate).toFixed(2)
                }

            },
            {
                title: 'Equal-Device',
                dataIndex: "neighborName",
                key: 'equal-device',

            },

        ];


        return (
            <EqualReportWrapper>
                <Card style={{marginBottom: 10}}>
                    <h2>
                        Equal
                    </h2>
                    <h4>Search by name</h4>
                    <Search style={{width: 300, marginTop: 8, marginBottom: 30}} placeholder="Search by name..."/>
                </Card>
                <Card>
                    <Table
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        // rowKey={record => record.name}
                    />
                </Card>
            </EqualReportWrapper>

        )
    }
}

export default EqualReport;