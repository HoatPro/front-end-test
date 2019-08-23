import React from "react";
import {Table} from "antd";
class TableListPort extends React.Component{
    render(){
        const dataListPort=this.props.dataListPort;
        const columns=[
            {
                title:'Name',
                key:'name',
                render:record=>{
                    return record.name
                }
            },
            {
                title:'Speed',
                key:'speed',
                render:record=>{
                    return record.speed
                }
            },
            {
                title:'Input',
                key:'input',
                render:record=>{
                    return record.input
                }
            },
            {
                title:'Output',
                key:'output',
                render:record=>{
                    return record.output
                }
            },

        ]
        console.log(dataListPort)
        return(
            <Table
            bordered
            dataSource={dataListPort}
            columns={columns}
            />


        )
    }
}
export  default  TableListPort