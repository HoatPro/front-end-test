import React from "react";
import { Table, message, Tag } from 'antd';
import axios from "axios";

class AllDevice extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[]
        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/net-devices"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
     if(status){
         message.success("GET NET devices successfull!");
        const newData= data.map((row,index) => {
                 if (!Array.isArray(row.ports)) {
                     return;
                 }
                 const normalPortCnt = row.ports.reduce((sum, port) => (sum + (port.description ? 1 : 0)), 0); //port has description
                 let standardPortCnt = 0; // port has L1#,L2#,... and bypass ##
                 let portToAddCnt = 0; // port had L1#,L2#,...
                 let monitoredPortCnt = 0; // port has existInOps

                 for (const port of row.ports) {
                     if (port.description && (port.description.startsWith('L1#') || port.description.startsWith('L2#') || port.description.startsWith('L2.5#') || port.description.startsWith('L3#'))) {
                         portToAddCnt++;
                         standardPortCnt++;
                         if (port.existInOps) {
                             monitoredPortCnt++;
                         }
                     } else if (port.description && port.description.startsWith('##')) {
                         standardPortCnt++;
                     }
                 }

                 const standardPortPercent = (normalPortCnt == 0 ? 100 : Math.round(standardPortCnt / normalPortCnt * 100 * 100) / 100);
                 const monitoredPortPercent = (portToAddCnt == 0 ? 100 : Math.round(monitoredPortCnt / portToAddCnt * 100 * 100) / 100);

                 row.normalPortCnt = normalPortCnt;
                 row.standardPortCnt = standardPortCnt;
                 row.monitoredPortCnt = monitoredPortCnt;
                 row.portToAddCnt = portToAddCnt;
                 row.standardPortPercent = standardPortPercent;
                 row.monitoredPortPercent = monitoredPortPercent;

                 return{
                     index:index,
                     row,
                     normalPortCnt:normalPortCnt,
                     standardPortCnt:standardPortCnt,
                     monitoredPortCnt:monitoredPortCnt,
                     portToAddCnt:portToAddCnt,
                     standardPortPercent:standardPortPercent,
                     monitoredPortPercent:monitoredPortPercent

                 }

             }
         );



         this.setState({
             dataTable:newData
         })

     }
    }
    render() {
        console.log(this.state.dataTable)
        const columns = [
            {
                title: 'Index',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Checking Time',
                key: 'check',
                render:record=>{
                   return record.row.time_check
                }
            },
            {
                title: 'Name',
                key: 'name',
                render:record=>{
                    return record.row.name
                }
            },
            {
                title: 'Ip',
                key: 'ip',
                render:record=>{
                    return record.row.ip
                }
            },
            {
                title: 'Function',
                key: 'function',
                render:record=>{
                    return record.row.function
                }
            },
            {
                title: 'Description',
                key: 'description',
                render:record=>{
                    return record.row.description
                }
            },
            {
                title: 'Type',
                key: 'manufacturer',
                render:record=>{
                    return record.row.manufacturer
                }
            },
            {
                title: 'Area',
                key: 'area',
                render:record=>{
                    return record.row.area
                }
            },
            {
                title: 'Room',
                key: 'room',
                render:record=>{
                    return record.row.room
                }
            },
            {
                title: 'Rack',
                key: 'rack',
                render:record=>{
                    return record.row.rack
                }
            },
            {
                title: 'Standard Stat',
                key: 'standar-stat',
                render:record=>{
                    if(record.standardPortPercent<100){
                        return (<div style={{color:"red"}}>{record.normalPortCnt}/{record.standardPortCnt}({record.standardPortPercent}%)</div>)
                    }
                    return(<div style={{color:"green"}}>{record.normalPortCnt}/{record.standardPortCnt}({record.standardPortPercent}%)</div>)
                }

            },
            {
                title: 'Monitored Stat',
                key: 'monitored-stat',
                render:record=>{
                    if(record.monitoredPortPercent<100){
                        return(<div style={{color:"red"}}>{record.monitoredPortCnt}/{record.portToAddCnt}({record.monitoredPortPercent}%)</div>)
                    }
                    return(<div style={{color:"green"}}>{record.monitoredPortCnt}/{record.portToAddCnt}({record.monitoredPortPercent}%)</div>)
                }


            },
            {
                title: 'Action',
                key: 'choice',

            },
        ];

        return (

            <Table
                className="table-detail"
                columns={columns}
                dataSource={this.state.dataTable}
                bordered
                rowKey={record => record.index}
            />
        )
    }
}

export default AllDevice;