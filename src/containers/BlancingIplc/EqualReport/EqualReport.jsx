import React from "react";
import { Table ,message} from 'antd';

import axios from "axios";
import Search from "antd/lib/input/Search";


class EqualReport extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],

        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/get-equal-report-data"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            message.success("GET data successfull!")
            this.setState({
                dataTable:data
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
                dataIndex: '',
                key: 'ipNextHop',

            },
            {
                title: 'Equal-Speed (G)',
                dataIndex: 'speed',
                key: 'speed',

            },
            {
                title: 'Equal-Congest',
                key: 'nameNextHop',

            },
            {
                title: 'Equal-Free',
                key: 'nameNextHop',

            },
            {
                title: 'Equal-Device',
                dataIndex:"neighborName",
                key: 'nameNextHop',

            },

        ];


        return (
            <div>
                <div>
                    <h2>
                       Equal
                    </h2>
                    <h4>Search by name</h4>
                    <Search style={{width:300,marginTop:8,marginBottom:30}}/>
                </div>
                <div>
                    <Table
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered

                        // pagination={{ defaultPageSize: 20}}
                        // rowKey={record => record.index}
                    />
                </div>
            </div>

        )
    }
}

export default EqualReport;