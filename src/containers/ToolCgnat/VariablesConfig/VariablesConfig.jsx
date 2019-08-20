import React from "react";
import { Table,Icon, Card } from 'antd';
import {c} from "./VariablesConfig.style"
import axios from "axios";

class VariablesConfig extends React.Component {
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
            url: "https://netd.ast.fpt.net/netd-api/api/variables-config"
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
                key: 'variables_name',
                render:record=>{
                    return record.dataObj.variables_name
                }

            },

            {
                title: 'Description',
                key: 'variables_description',
                render:record=>{
                    return record.dataObj.variables_description
                }
            },
            {
                title: 'Value',
                key: 'variables_value',
                render:record=>{
                    return record.dataObj.variables_value
                }
            },
            {
                title: 'Note',
                key: 'Note',
                render:record=>{
                    return record.dataObj.Note
                }
            },
            {
                title: 'Actions',
                key:'actions',
                render:record=>{
                    return <div style={{width:28, height:28,backgroundColor:"#fbbd08",borderRadius:5}}>
                                <Icon style={{margin:6,color:"white"}} type="edit" />
                          </div>
                }

            },


        ];

        const { startValue, endValue, endOpen } = this.state;

        return (
            <VariablesConfigWrapper>
                <Card>
                    <h2>VariablesConfig</h2>
                </Card>

                <Card style={{marginTop:10}}>

                    <Table
                        id="table-detail"
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        // pagination={{ defaultPageSize: 20}}
                        rowKey={record => record.index}
                    />
                </Card>


            </VariablesConfigWrapper>

        )
    }
}

export default VariablesConfig;