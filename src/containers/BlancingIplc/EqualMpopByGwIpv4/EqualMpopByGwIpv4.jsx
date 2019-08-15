import React from "react";
import {Table, message, Card} from 'antd';

import axios from "axios";
import Search from "antd/lib/input/Search";

class EqualMpopByGwIpv4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],

        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/get-equal-mpop-by-gw-data-ipv4"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET data successfull!");
            const dataObj=data.map((data,index)=>{
                return {
                    index:index,
                    data
                }
            })
            this.setState({
                dataTable: dataObj
            })
        }else {message.error("GET data Error!!!")}
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
                title: 'IP next-hop',
                key: 'ip-next-hop',
                render:record=>{
                    return(
                        <ul style={{listStyle:"none"}}>
                            {record.data.listIpv4.map((item,index)=>{
                                return(
                                    <li key={index}>
                                        { item.ipNextHop}
                                    </li>
                                )
                            })}

                        </ul>
                    )
                }
            },
            {
                title: 'MP/CGNAT',
                key: 'mp-cnat',
                render:record=>{
                    return(
                        <ul style={{listStyle:"none"}}>
                            {record.data.listIpv4.map((item,index)=>{
                                return(
                                    <li key={index}>
                                        { item.nameNextHop}
                                    </li>
                                )
                            })}

                        </ul>
                    )
                }

            },
            {
                title: 'Detail',
                key: 'detail',
                render:record=>{
                    return(
                        <ul style={{listStyle:"none"}}>
                            {record.data.listIpv4.map((item,index)=>{
                                return(
                                    <li key={index}>
                                        <b>Ipv6: </b> { item.ipv6} <b> - Traffic: </b> { item.traffic }<br/>
                                    </li>
                                )
                            })}

                        </ul>
                    )
                }

            },



            {
                title: 'MP/CGNAT-Rate(G)',
                key: 'mp-cgnat-rate',
                render:record=>{
                    let rate =Math.round(record.data.trafficKentik/1024, 2)
                    return rate
                }


            },
        ];
        const {dataTable}=this.state;
        return (
            <div>
                <Card style={{marginBottom:20}}>
                    <h2>
                        Equal MPOP by GW
                    </h2>
                    <h4>Search by name</h4>
                    <Search style={{width: 300, marginTop: 8, marginBottom: 30}} placeholder="Search by name..."/>
                </Card>
                <Card>
                    <Table
                        className="table-detail"
                        columns={columns}
                        dataSource={dataTable}
                        bordered
                        rowKey={record => record.index}
                    />
                </Card>
            </div>

        )
    }
}

export default EqualMpopByGwIpv4;