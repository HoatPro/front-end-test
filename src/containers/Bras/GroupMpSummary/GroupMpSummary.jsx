import React from "react";
import { GroupMpSummaryWrapper } from "./GroupMpSummary.style";

import {message, Table,Card, DatePicker, InputNumber,Select,Button,Input} from 'antd';
import Search from "antd/lib/input/Search";

import  axios from 'axios'
import analyzerConstants from "../../../../config"
const dateFormat = 'DD-MM-YYYY';
import moment from "moment";

const {TextArea}=Input

class GroupMpSummary extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            backgroundColor: '#88ff82',
            originalBackgroundColor:'#88ff82',
        }

    }
    async componentDidMount(){
        var date=moment()._d.toISOString();
        //data Group Mp
        const options = {
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/get-all-detail-group-mp?date=${date}&increasingPercent=5`
        };
        const {
            status,
            data: {data}
        } = await axios(options);

        //data Plan
       axios({
           method: "GET",
           url: `https://netd.ast.fpt.net/netd-api/api/plan-content?date=${date}`
       }).then(res=>{
          if(res.status&&status){
                   const dataPlan=res.data;
                   const listPlan=dataPlan.data.list;
                   const listValue=Object.values(listPlan);


                  message.success("GET group MP topo successfully!");

                  const dataObj=data.map((data,index)=>{
                      if(data.warningStatus === analyzerConstants.WARNING_STATUS.WARNING) {
                          return {
                              "index":index+1,
                              data,
                              backgroundColor : '#f49e42',
                              originalBackgroundColor : '#f49e42'
                          }
                      }
                      else if(data.warningStatus === analyzerConstants.WARNING_STATUS.CRITICAL){
                          return {
                              "index":index+1,
                              data,
                              backgroundColor : '#f47373',
                              originalBackgroundColor : '#f47373'
                          }
                      }
                      else if(data.originalWarningStatus === analyzerConstants.WARNING_STATUS.WARNING) {
                          return {
                              "index":index+1,
                              data,
                              backgroundColor : '#f47373',
                              originalBackgroundColor : '#f47373'
                          }
                      }
                      else if (data.originalWarningStatus === analyzerConstants.WARNING_STATUS.CRITICAL) {
                          return {
                              "index":index+1,
                              data,
                              backgroundColor : '#f47373',
                              originalBackgroundColor : '#f47373'
                          }
                      }else{
                          return {
                              "index":index+1,
                              data,
                              backgroundColor :'#88ff82',
                              originalBackgroundColor : '#88ff82'
                          }
                      }

                  });
                  const dataTable=[];
                   listValue.map((list,index)=>{
                        dataObj.filter(data=>{
                            if(data.index==index+1){

                                dataTable.push({
                                   action:list.action,
                                   assignment:list.assignment,
                                   deadline:list.deadline,
                                   data
                               })
                            }
                        })
                    })


                  this.setState({
                      dataTable:dataTable,

                  })
              }else{
                  message.error("GET data error!!!")
              }



       })

    }

    onChange=(dateString)=> {
        var myDate = new Date(dateString._d);
        // const dateSelected = this.formatDate(myDate);
        // axios({
        //     method: "GET",
        //     url: `https://netd.ast.fpt.net/netd-api/api/get-all-time-in-day?date=${dateSelected}`
        // }).then(res => {
        //     if (res.status) {
        //         const dataObj=res.data.data.map((dt,index)=>{
        //             return {
        //                 "index":index,dt
        //             }
        //         })
        //         message.success("GET data successfully");
        //         this.setState({
        //             listTime: dataObj
        //         })
        //     }
        // })

    }

    render() {
        const columns = [
            {
                title: 'Vùng',
                key:'region',
                render:record=>{
                    return(<div
                        style={{backgroundColor:`${record.data.backgroundColor}`}}
                    >
                        {record.data.data.a}</div>)
                }
            },
            {
                title: 'Group MP',
                key:'groupMp',
                render:record=>{
                    return (<div style={{backgroundColor:`${record.data.backgroundColor}`}}> {record.data.data.b}</div>)
                }
            },
            {
                title: 'MP',
                key:'mp',
                render:record=>{
                    return (<div style={{backgroundColor:`${record.data.originalBackgroundColor}`}}> {record.data.data.c}</div>)
                }
            },

            {
                title: 'Exixting CCU and BW',
                children: [
                    {
                        title: 'Max CCU',
                        dataIndex: 'maxCCU',
                        key: 'maxCCU',
                        children: [
                            {
                                title: 'IPv4',
                                key: 'ipv4CCU',
                                render: record => {
                                    return record.data.data.sumD
                                }
                            },
                            {
                                title: 'IPv6',
                                key: 'ipv6CCU',
                                render: record => {
                                    return record.data.data.sumE
                                }
                            },
                            {
                                title: 'NAT',
                                key: 'natCCU',
                                render: record => {
                                    return record.data.data.sumF
                                }
                            },
                        ]

                    },
                    {
                        title: 'Links to add (convert 10G links)',
                        children: [
                            {
                                title: 'Uplink',
                                key: 'uplink-10g-add',
                                render: record => {
                                    return record.data.data.sumG
                                }

                            },
                            {
                                title: 'Downlink',
                                key: 'downlink-10g-add',
                                render: record => {
                                    return record.data.data.sumH
                                }
                            },
                            {
                                title: 'Equal',
                                key: 'equal-10g-add',
                                render: record => {
                                    return record.data.data.i
                                }
                            },
                            {
                                title: 'B2B',
                                key: 'b2b-10g-add',
                                render: record => {
                                    return record.data.data.sumJ
                                }
                            },

                        ],
                    },
                ],
            },
                {
                title: 'Action',
                key:'action',
                    render:record => {
                    return <TextArea defaultValue={record.action}/>
                    }
                    },
                    {
                        title: 'Deadline',
                        key:'deadlines',
                        render:record => {
                            return <TextArea defaultValue={record.deadline} />
                        }
                    },
                    {
                        title: 'Assignment',
                        key:'assignment',
                       render:record => {
                           return <TextArea defaultValue={record.assignment}/>
                       }
                    },
                    {
                        title: 'Next 2 months',

                        key: 'next',
                        children:[
                            {
                                title: 'Uplink',
                                key: 'uplink',
                                render:record=>{
                                    return record.data.data.n
                                }
                            },
                            {
                                title: 'Downlink',
                                key: 'downlink',
                                render:record=>{
                                    return record.data.data.o
                                }
                            },
                            {
                                title: 'Equal',
                                key: 'equal',
                                render:record=>{
                                    return record.data.data.p
                                }
                            },
                            {
                                title: 'B2B',
                                key: 'B2B',
                                render:record=>{
                                    return record.data.data.p
                                }
                            },
                        ]

                    },

        ]

        return (
            <GroupMpSummaryWrapper>
                <Card style={{width:"100%",marginBottom:10}}>
                    <h2>Group MP Summary</h2>
                    <div style={{width:200, float:"left"}} >
                        <h4>Choose log date</h4>
                        <DatePicker
                            onChange={this.onChange}
                            format={dateFormat}
                        />
                    </div>
                    <div style={{width:200,float:"left"}}>
                        <h4>Increasing percent</h4>
                        <InputNumber style={{width:180}} min={1} defaultValue={5}/>
                    </div>
                    <div  style={{width:200, float:"left"}}>
                        <h4>Search by name</h4>
                        <Search style={{ width:180}} placeholder="search by name....."/>
                    </div>
                    <div style={{width:200,float:"left"}}>
                        <h4>Search by region</h4>
                        <Select
                            style={{width:180}}
                            defaultValue={"all"}
                            onChange={this.handleChange}
                        >
                        </Select>
                    </div>
                    <div  style={{width:200, float:"left"}}>
                        <h4>Export</h4>
                        <Button
                             style={{width:180}}
                            type="primary"> Export to excel file</Button>
                    </div>
                    <div>
                        <h4>Save</h4>
                        <Button style={{backgroundColor:"green",color:"white"}}> Save plan</Button>
                    </div>
                </Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered

                        rowKey={record=>record.data.index}
                    />
                </Card>

            </GroupMpSummaryWrapper>
        );
    }
}
export default GroupMpSummary;



