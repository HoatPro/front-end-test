import React from "react";
import { Table, Card } from 'antd';
import axios from "axios";

class History extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/histories-tool-cgnat"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            console.log(data);
            let dataObject=data.map((dataObj,index)=>{
                return{
                    "index":index+1,
                    dataObj
                }
            })
            console.log(dataObject)
            this.setState({
                dataTable:dataObject
            })
        }
    }



    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Name',
                key: 'device_name',
                render:record=>{
                    return record.dataObj.device_name
                }

            },

            {
                title: 'Ip',
                key: 'device_ip',
                render:record=>{
                    return record.dataObj.device_ip
                }
            },
            {
                title: 'FPC Slot',
                key: 'fpc_slot',
                render:record=>{
                    return record.dataObj.fpc_slot
                }
            },
            {
                title: 'Pic Slot',
                key: 'pic_slot',
                render:record=>{
                    return record.dataObj.pic_slot
                }
            },
            {
                title: 'Card',
                key: 'card',
                render:record=>{
                    return record.dataObj.card
                }
            },
            {
                title: 'Status',
                key: 'status',
                render:record=>{
                    return record.dataObj.status
                }
            },
            {
                title: 'Message AOPT',
                key:'msg_aopt',
                render:record=>{
                    return record.dataObj.msg_aopt
                }

            },
            {
                title: 'Reason',
                key:'reason',
                render:record=>{
                    return record.dataObj.reason
                }

            },
            {
                title: 'Timestamp',
                key:'time_stamp',
                render:record=>{
                    return record.dataObj.time_stamp
                }

            },
            {
                title: 'Uptime Result',
                key:'uptime_result',
                render:record=>{
                    return record.dataObj.uptime_result
                }

            },
            {
                title: 'Pre Jsnap Result',
                key:'pre_jsnap_result',
                render:record=>{
                    return record.dataObj.pre_jsnap_result
                }

            },
            {
                title: 'Action Result',
                key:'action_result',
                render:record=>{
                    return record.dataObj.action_result
                }

            },
            {
                title: 'Post Jsnap Result',
                key:'post_jsnap_result',
                render:record=>{
                    return record.dataObj.post_jsnap_result
                }

            },
            {
                title: 'Compare Jsnap Result',
                key:'compare_jsnap_result',
                render:record=>{
                    return record.dataObj.compare_jsnap_result
                }

            },
            {
                title: 'Pic State',
                key:'pic_state',
                render:record=>{
                    return record.dataObj.pic_state
                }

            },


        ];

        const { startValue, endValue, endOpen } = this.state;

        return (
            <div>
                <Card  style={{fontWeight:600, marginBottom:15,width:1640 }}>
                    <h2>History</h2>
                </Card>

              <Card style={{width:1640}} >
                  <div >
                      <Table
                          columns={columns}
                          dataSource={this.state.dataTable}
                          bordered
                          // pagination={{ defaultPageSize: 20}}
                          rowKey={record => record.index}
                      />
                  </div>
            </Card>
            </div>




        )
    }
}

export default History;