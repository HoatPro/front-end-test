



import React from "react";
import { Table ,message} from 'antd';

import axios from "axios";
import Search from "antd/lib/input/Search";


class Ipv6ToMpop extends React.Component {
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
            url: "https://netd.ast.fpt.net/netd-api/api/get-ipv6-to-mpop-data"
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
            });
            message.success("GET data successfull!")
            this.setState({
                dataTable:dataObject
            })
        }
    }


    render() {
        const columns = [
            {
                title: 'Number',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Route IPv6Route IPv6',
                key: 'ipv6',
                render:record=>{
                    return record.dataObj.ipv6
                }
            },
            {
                title: 'IP next-hop',
                key: 'ipNextHop',
                render:record=>{
                    return record.dataObj.ipNextHop
                }
            },
            {
                title: 'MP/CGNAT',
                key: 'nameNextHop',
                render:record=>{
                    return record.dataObj.nameNextHop
                }
            }
        ];


        return (
                       <div>
                           <div>
                               <h2>
                                   Ipv6 to MPOP
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
                                   rowKey={record => record.index}
                               />
                           </div>
                       </div>

        )
    }
}

export default Ipv6ToMpop;