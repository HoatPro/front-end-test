import React from "react";
import { Table ,message, Card} from 'antd';
import {IplcReportWrapper} from "./IplcReport.style"
import axios from "axios";
import Search from "antd/lib/input/Search";


class IplcReport extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],

        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/get-iplc-report-data"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            message.success("GET data successfull!")
            const dataObj=data.map((data,index)=>{
                return {
                    index:index,
                    data
                }
            })
            this.setState({
                dataTable:dataObj
            })
        }
    }

    render() {
        const columns = [
            {
                title: 'Ingress Device',
                key: 'name',
                render:record=>{
                    return record.data.name
                }
            },
            {
                title: 'IPLC-Interface',
                key: 'iplcinterface',
                render:record=>{
                    return record.data.interfaceName
                }

            },
            {
                title: 'IPLC-Rate(G)',
                key: 'iplcrate',
                render:record=>{
                    let rate = Math.round(record.data.trafficOut/1024, 2);
                    return rate
                }


            },
            {
                title: 'IPLC-Speed (G)',
                key: 'speed',
                render:record=>{
                    return record.data.speed
                }

            },
            {
                title: 'IPLC-Congest',
                key: 'ip-congest',
                render:record=>{
                    let rate = Math.round(record.data.trafficOut/1024, 2);
                    return (0.8*record.data.speed -rate).toFixed(2)
                }


            },
            {
                title: 'IPLC-Free',
                key: 'iplc-free',
                render:record=>{
                    let rate = Math.round(record.data.trafficOut/1024, 2);
                    return (0.75*record.data.speed -rate).toFixed(2)
                }


            },
            {
                title: 'IPLC-SMC',
                key: 'nameNextHop',
                render:record=>{
                    return record.data.neighborName
                }

            },

        ];


        return (
            <IplcReportWrapper>
                <Card style={{marginBottom:10}}>
                    <h2>
                        IPLC
                    </h2>
                    <h4>Search by name</h4>
                    <Search style={{width:300,marginTop:8,marginBottom:30}} placeholder="Search by name..."/>
                </Card>
                <Card>
                    <Table
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        rowKey={record => record.index}
                    />
                </Card>
            </IplcReportWrapper>

        )
    }
}

export default IplcReport;