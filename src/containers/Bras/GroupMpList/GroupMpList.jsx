import React from "react";
import { GroupMpListWrapper } from "./GroupMpList.style";

import {Collapse, message, Table} from 'antd';
import Search from "antd/lib/input/Search";

import  axios from 'axios'

const {Panel}=Collapse;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};
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
                                key: 'ipv4',
                                render:record=>{
                                    return record.dt.sumD
                                }
                            },
                            {
                                title: 'IPv6',
                                key: 'ipv6',
                                render:record=>{
                                    return record.dt.sumE
                                }
                            },
                            {
                                title: 'NAT',
                                key: 'nat',
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
                                key: 'uplink',
                                render:record=>{
                                    return record.dt.sumG
                                }

                            },
                            {
                                title: 'Downlink',
                                key: 'downlink',
                                render:record=>{
                                    return record.dt.sumH
                                }
                            },
                            {
                                title: 'Equal',
                                key: 'equal',
                                render:record=>{
                                    return record.dt.i
                                }
                            },
                            {
                                title: 'B2B',
                                key: 'b2b',
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
                        dataIndex: 'Uplink',
                        key: 'Uplink',
                        children:[
                            {
                                title: '10G',
                                key: '10g',
                                render:record=>{
                                    return record.dt.k
                                }
                            },
                            {
                                title: '40G',
                                key: '40g',
                                render:record=>{
                                    return record.dt.l
                                }
                            },
                            {
                                title: '100G',
                                key: '100g',
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
                                key: '10g',
                                render:record=>{
                                    return record.dt.n
                                }
                            },
                            {
                                title: '40G',
                                key: '40g',
                                render:record=>{
                                    return record.dt.o
                                }
                            },
                            {
                                title: '100G',
                                key: '100g',
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
                                key: '1g',
                                render:record=>{
                                    return record.dt.q
                                }
                            },
                            {
                                title: '10G',
                                key: '10g',
                                render:record=>{
                                    return record.dt.r
                                }
                            },
                            {
                                title: '40G',
                                key: '40g',
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
                                key: '10g',
                                render:record=>{
                                    return record.dt.u
                                }
                            },
                            {
                                title: '40G',
                                key: '40g',
                                render:record=>{
                                    return record.dt.v
                                }
                            },
                            {
                                title: '100G',
                                key: '100g',
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
                        key: 'Uplink',
                        render:record=>{
                            return record.dt.x
                        }
                    },
                    {
                        title: 'Downlink',
                        key: 'Downlink',
                        render:record=>{
                            return record.dt.y
                        }
                    },
                    {
                        title: 'Equal',
                        key: 'equal',
                        render:record=>{
                            return record.dt.z
                        }
                    },
                    {
                        title: 'B2B',
                        key: 'b2b',
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
                        key: 'Downlink',
                        render:record=>{
                            return record.dt.ac
                        }
                    },
                    {
                        title: 'Equal',
                        key: 'equal',
                        render:record=>{
                            return record.dt.ad
                        }
                    },
                    {
                        title: 'B2B',
                        key: 'b2b',
                        render:record=>{
                            return record.dt.ae
                        }
                    },
                ],
            },


        ];

        return (
            <GroupMpListWrapper>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel
                        header="Search by name"
                        key="1"
                        style={customPanelStyle}
                        showArrow={false}>
                <h2>Group MP List</h2>
                <h4>Search by name</h4>
                <Search style={{ marginBottom:20,width:200}} placeholder="search by name....."/>
              <div>
                  <Table
                      columns={columns}
                      dataSource={this.state.dataTable}
                      bordered
                      size="middle"

                  />
              </div>
                    </Panel>
                </Collapse>
            </GroupMpListWrapper>
        );
    }
}
export default GroupMpList;


