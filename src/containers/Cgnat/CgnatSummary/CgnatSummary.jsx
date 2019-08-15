import React from "react";
import {Card,Input,InputNumber,message,Table} from "antd";
import { CgnatSummaryWrapper } from "./CgnatSummary.style";
import axios from "axios";
import moment from 'moment';
const { TextArea } = Input;
const {Search}=Input;
class CgnatSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataTable:[]
        }
    }

    async componentDidMount(){
        const today  = moment();
       const time=moment(today._d).toISOString();
        const options = {
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/cgnat-traffic-statistics?date=${time}&increasingPercent=5`
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            let dataObject=data.map((dataObj,index)=>{
                return{
                    "index":index+1,
                    dataObj
                }
            });
            message.success("GET CGNAT Prefer  successfull!")
            this.setState({
                dataTable:dataObject
            })
        }
    }

    render() {
        const columns = [
            {
                title: 'Index',
                dataIndex: 'index',
                key: 'index',

            },
            {
                title: 'CGNAT',
                key: 'cgnat',
                width:200,
                render:record=>{
                    return record.dataObj.name
                }
            },
            {
                title: 'MPOP Prefer',
                key: 'mpop',
                render:record=>{
                    let mpopLength=record.dataObj.mpopPrefer.length;
                    return mpopLength
                }
            },
            {
                title: 'Subs',
                key: 'subs',
                render:record=>{
                    const subs=record.dataObj.natRatio.data;
                     return (subs.MegaYou.numberOfActiveUsers+subs.MegaYou1.numberOfActiveUsers+subs.SAVECUS.numberOfActiveUsers+subs.SAVECUS1.numberOfActiveUsers)
                }
            },
            {
                title: 'NAT checking time',
                key: 'natcheck',
                render:record=>{
                    const item=record.dataObj;
                    return  item.natRatio ? moment(item.natRatio.startedAt).format('DD/MM HH:mm:ss') +' -> ' + moment(item.natRatio.finishedAt).format('HH:mm:ss') : ''
                }
            },

            {
                title: 'NAT ratio',
                key: 'natratio',
                children:[
                    {
                        title: 'MegaYou',
                        key: 'megayou',
                        render:record=>{
                            const item=record.dataObj;
                            return item.natRatio ? Math.round(item.natRatio.data['MegaYou'].numberOfActiveUsers / item.natRatio.data['MegaYou'].numberOfPoolIps) : ''
                        }
                },
                    {
                        title: 'MegaYou1',
                        key: 'megayou1',
                        render:record=>{
                            const item=record.dataObj;
                            return item.natRatio ? Math.round(item.natRatio.data['MegaYou1'].numberOfActiveUsers / item.natRatio.data['MegaYou'].numberOfPoolIps) : ''
                        }
                    },
                    {
                        title: 'SAVECUS',
                        key: 'savecus',
                        render:record=>{
                            const item=record.dataObj;
                            return item.natRatio ? Math.round(item.natRatio.data['SAVECUS'].numberOfActiveUsers / item.natRatio.data['SAVECUS'].numberOfPoolIps) : ''
                        }
                    },
                    {
                        title: 'SAVECUS1',
                        key: 'savecus1',
                        render:record => {
                            const item=record.dataObj;
                            return item.natRatio ? Math.round(item.natRatio.data['SAVECUS1'].numberOfActiveUsers / item.natRatio.data['SAVECUS1'].numberOfPoolIps) : ''
                        }
                    },

                ]

            },
            {
                title: 'BW',
                key: 'bw',
                children:[
                    {
                        title: 'Uplink',
                        key: 'uplinkbw',
                        render:record=>{
                            const item=record.dataObj;
                            return item.trafficUplink
                        }
                    },
                    {
                        title: 'Mams',
                        key: 'mamsbw',
                        render:record => {
                            return record.dataObj.trafficMams
                        }
                    },
                ]

            },
            {
                title: 'Existing Link(10G links)',
                key: 'existinglink',
                children:[
                    {
                        title: 'Uplink',
                        key: 'uplinkexisting',
                        render:record=>{
                            return record.dataObj.uplink
                        }
                    },
                    {
                        title: 'Mams',
                        key: 'mamsexisting',
                        render:record=>{
                            return record.dataObj.mams
                        }
                    },
                ]

            },
            {
                title: 'Links to add (10G links)',
                key: 'linkstoadd',
                children:[
                    {
                        title: 'Uplink',
                        key: 'uplinktoadd',
                        render:record=>{
                            return record.dataObj.linksToAddUplink
                        }
                    },
                    {
                        title: 'Mams',
                        key: 'mamstoadd',
                        render:record=>{
                            return record.dataObj.linksToAddMams
                        }
                    },
                ]

            },
            {
                title: 'Action',
                key: 'action',
                render:record=>{
                    return(<TextArea/>)
                }

            },
            {
                title: 'Deadline',
                key: 'deadline',
                render:record=>{
                    return(<TextArea/>)
                }

            },
            {
                title: 'Assignment',
                key: 'assognment',
                render:record=>{
                    return(<TextArea/>)
                }

            },
            {
                title: 'Next 2 months',
                key: 'nextmonths',
                children:[
                    {
                        title: 'Uplink',
                        key: 'uplinknext',
                        render:record=>{
                            return record.dataObj.next2MonthsUplink
                        }
                    },
                    {
                        title: 'Mams',
                        key: 'mamsnext',
                        render:record=>{
                            return record.dataObj.next2MonthsMams
                        }
                    },
                ]

            },

        ];

        const {dataTable}=this.state;
        return (
            <CgnatSummaryWrapper>
                <Card title="CGNAT Summary"  style={{ width: 1640 ,fontWeight:700,marginBottom:10}}>
                    <h4> Search by name ...</h4>
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                    />
                    {/*<h4>Increasing percent</h4>*/}
                    {/*<InputNumber min={1} max={100} defaultValue={5} onChange={this.onChange} />*/}
                </Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        // pagination={{ defaultPageSize: 20}}
                        rowKey={record => record.index}
                    />

            </CgnatSummaryWrapper>
        );
    }
}

export default CgnatSummary;
