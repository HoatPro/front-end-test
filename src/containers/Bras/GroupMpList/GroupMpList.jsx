import React from "react";
import { GroupMpListWrapper } from "./GroupMpList.style";

import {message, Table,Card,Input,Row,Col,Button,Select} from 'antd';
const { Search } = Input;
const {Option}=Select;
import  axios from 'axios'

class GroupMpList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[]
        }

    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/get-all-detail-group-mp"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            message.success("GET group MP topo successfully!")
            const dataObj=data.map((dt,index)=>{
                return {
                    "index":index+1,
                    dt
                }
            });
            this.setState({
                dataTable:dataObj,

            })
        }else{
            message.error("GET data error!!!")
        }
    }
    handleSearch=(value)=>{
        console.log(value)
    }
     handleChange=(value)=> {
        const {dataTable}=this.state;
        const newDataTable=dataTable.map((data,index)=>{
            if(data.dt.a==value){
              return{
                  index:index+1,
                  data
              }
            }
        })

         this.setState({
             dataTable:newDataTable
         })

    }
    render() {

        const columns = [
            {
                title: 'Index',
                key:'index',
                render:record=>{
                   return record.index
                }
            },
            {
                title: 'Region',
                key:'region',
                render:record=>{
                    return record.dt.a
                }
            },
            {
                title: 'Group MP',
                key:'groupMp',
                render:record=>{
                    return record.dt.b
                }
            },
            {
                title: 'MP',
                key:'mp',
                render:record=>{
                    return record.dt.c
                }
            },

            {
                title: 'Exixting CCU and BW',
                children: [
                    {
                        title: 'Max CCU',
                        dataIndex: 'maxCCU',
                        key: 'maxCCU',
                        children:[
                            {
                                title: 'IPv4',
                                key: 'ipv4CCU',
                                render:record=>{
                                    return record.dt.sumD
                                }
                            },
                            {
                                title: 'IPv6',
                                key: 'ipv6CCU',
                                render:record=>{
                                    return record.dt.sumE
                                }
                            },
                            {
                                title: 'NAT',
                                key: 'natCCU',
                                render:record=>{
                                    return record.dt.sumF
                                }
                            },
                        ]

                    },
                    {
                        title: 'Max BW(Gb)',
                        children: [
                            {
                                title: 'Uplink',
                                key: 'uplinkMax',
                                render:record=>{
                                    return record.dt.sumG
                                }

                            },
                            {
                                title: 'Downlink',
                                key: 'downlinkMax',
                                render:record=>{
                                    return record.dt.sumH
                                }
                            },
                            {
                                title: 'Equal',
                                key: 'equalMax',
                                render:record=>{
                                    return record.dt.i
                                }
                            },
                            {
                                title: 'B2B',
                                key: 'b2bMax',
                                render:record=>{
                                    return record.dt.sumJ
                                }
                            },

                        ],
                    },
                ],
            },
            {
                title: 'Existing links',
                children: [
                    {
                        title: 'Uplink',
                        key: 'Uplink',
                        children:[
                            {
                                title: '10G',
                                key: '10g-uplink',
                                render:record=>{
                                    return record.dt.k
                                }
                            },
                            {
                                title: '40G',
                                key: '40g-uplink',
                                render:record=>{
                                    return record.dt.l
                                }
                            },
                            {
                                title: '100G',
                                key: '100g-uplink',
                                render:record=>{
                                    return record.dt.m
                                }
                            },
                        ]

                    },
                    {
                        title: 'Downlink',
                        dataIndex: 'downlink',
                        key: 'downlink',
                        children:[
                            {
                                title: '10G',
                                key: '10g-downlink',
                                render:record=>{
                                    return record.dt.n
                                }
                            },
                            {
                                title: '40G',
                                key: '40g-downlink',
                                render:record=>{
                                    return record.dt.o
                                }
                            },
                            {
                                title: '100G',
                                key: '100g-downlink',
                                render:record=>{
                                    return record.dt.p
                                }
                            },
                        ]

                    },
                    {
                        title: 'Equal',
                        dataIndex: 'equal',
                        key: 'equal',
                        children:[
                            {
                                title: '1G',
                                key: '1g-equal',
                                render:record=>{
                                    return record.dt.q
                                }
                            },
                            {
                                title: '10G',
                                key: '10g-equal',
                                render:record=>{
                                    return record.dt.r
                                }
                            },
                            {
                                title: '40G',
                                key: '40g-equal',
                                render:record=>{
                                    return record.dt.s
                                }
                            },
                            {
                                title: '100G',
                                key: '100g',
                                render:record=>{
                                    return record.dt.t
                                }
                            },
                        ]

                    },
                    {
                        title: 'B2B',
                        dataIndex: 'b2b',
                        key: 'b2b',
                        children:[
                            {
                                title: '10G',
                                key: '10g-b2b',
                                render:record=>{
                                    return record.dt.u
                                }
                            },
                            {
                                title: '40G',
                                key: '40g-b2b',
                                render:record=>{
                                    return record.dt.v
                                }
                            },
                            {
                                title: '100G',
                                key: '100g-b2b',
                                render:record=>{
                                    return record.dt.w
                                }
                            },
                        ]

                    },
                ],
            },
            {
                title: 'Required links (Convert 10G links)',
                children: [
                    {
                        title: 'Uplink',
                        key: 'Uplink-req',
                        render:record=>{
                            return record.dt.x
                        }
                    },
                    {
                        title: 'Downlink',
                        key: 'Downlink-req',
                        render:record=>{
                            return record.dt.y
                        }
                    },
                    {
                        title: 'Equal',
                        key: 'equal-req',
                        render:record=>{
                            return record.dt.z
                        }
                    },
                    {
                        title: 'B2B',
                        key: 'b2b-req',
                        render:record=>{
                            return record.dt.aa
                        }

                    },
                ],
            },
            {
                title: 'Links to add (convert 10G links)',
                children: [
                    {
                        title: 'Uplink',
                        key: 'uplink to add',
                        render:record=>{
                            return record.dt.ab
                        }
                    },
                    {
                        title: 'Downlink',
                        key: 'Downlink to add',
                        render:record=>{
                            return record.dt.ac
                        }
                    },
                    {
                        title: 'Equal',
                        key: 'equal to add',
                        render:record=>{
                            return record.dt.ad
                        }
                    },
                    {
                        title: 'B2B',
                        key: 'b2b to add',
                        render:record=>{
                            return record.dt.ae
                        }
                    },
                ],
            },


        ];

        return (
            <GroupMpListWrapper>
              <Card style={{marginBottom:10}}>
                  <h2>Group MP List</h2>
             <Row>
                 <Col span={8} style={{width:300, marginRight:10}}>
                     <h4>Search by name</h4>
                     <Search
                         style={{width:280}}
                         placeholder="Search by name..."
                         onSearch={value => this.handleSearch(value)}
                         style={{width:200}}
                         enterButton
                     />
                 </Col>
                 <Col span={8}  style={{ width:200,marginRight:50}} >
                     <h4>Search by Region</h4>
                     <Select
                         style={{ width:180}}
                         defaultValue="all"
                         onChange={value => this.handleChange(value)}>
                         <Option value="all">All</Option>
                         <Option value="1" key={1}>1</Option>
                         <Option value="2" key={2}>2</Option>
                         <Option value="3" key={3}>3 </Option>
                         <Option value="4" key={4}>4</Option>
                         <Option value="5" key={5}>5</Option>
                         <Option value="6" key={6}>6</Option>
                         <Option value="7" key={7}>7</Option>

                     </Select>
                  </Col>
                 <Col span={8}>
                     <h4> Export</h4>
                     <Button type="primary" style={{width:180}}> Export to excel file </Button>
                 </Col>
             </Row>
              </Card>
              <Card >
                  <Table
                      scroll={{x:true}}
                      columns={columns}
                      dataSource={this.state.dataTable}
                      bordered
                      size="middle"
                      rowKey={record=>record.index}
                  />
              </Card>

            </GroupMpListWrapper>
        );
    }
}
export default GroupMpList;


