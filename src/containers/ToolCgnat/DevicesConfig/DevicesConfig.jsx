import React from "react";
import {Card,Button,Table,message,Switch,Icon} from 'antd'
import axios from "axios";
class DevicesConfig extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            statusText:"Active"
        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/devices-tool-cgnat"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET Tool Cgnat decives successfull!");
            const dataObj=data.map((data,index)=>{
                return {
                    index:index+1,
                    data
                }
            })
            this.setState({
                dataTable: dataObj
            })
        }else {message.error("GET data Error!!!")}
    }

    onChange=(index)=>{
        console.log(index);
        const {dataTable}=this.state;

        dataTable.map(data=>{
            console.log(data);
            if(index==data.index){
              return
                {
                 statusNew:0,data
                }
            }else{
                this.setState({
                    statusText:"Active"
                })
            }
        })

        message.success("Change status successfully!")
    }
    render() {

        const{dataTable,statusText}=this.state;
         const columns = [
            {
                title: '#',
                key: 'index',
                render:record=>{
                    return record.index
                }
            },
            {
                title: 'Name',
                key: 'name',
                render:record=>{
                    return record.data.device_name
                }
            },
             {
                 title: 'Ip',
                 key: 'ip',
                 render:record=>{
                     return record.data.device_ip
                 }
             },
             {
                 title: 'Status',
                 key: 'status',
                 render:record=>{
                         return (
                             <div> <Switch defaultChecked onChange={()=>this.onChange(record.index)} /> {statusText}</div>
                         )
                 }
             },
             {
                 title: 'Deactive time',
                 key: 'deactive-time',
                 render:record=>{
                     return record.data.deactive_time
                 }
             },
             {
                 title: 'Action',
                 key: 'action',
                 render:record=>{
                   return(<div >
                       <Icon type="edit" style={{ width:26, height:26,backgroundColor:"#fbbd08",padding:5,color:"white",fontWeight:700,borderRadius:5}}/>&nbsp;
                       <Icon type="clock-circle"  style={{ width:26, height:26,backgroundColor:"#00b5ad",padding:5,color:"white",fontWeight:700,borderRadius:5}}/>&nbsp;
                       <Icon type="delete"  style={{ width:26, height:26,backgroundColor:"#db2828",padding:5,color:"white",fontWeight:700,borderRadius:5}}/>
                   </div>)
                 }
             },

            ]
        return (
            <div>
                    <Card  style={{ width: "100%",fontWeight:600, marginBottom:15 }}>
                        <h2>All Devices</h2>
                       <Button style={{backgroundColor:"#21ba45",color:"white", fontWeight:560, float:"left"}}> + Create device</Button>
                    </Card>

                    <Card  style={{ width: "100%" }}>
                        <Table
                            className="table-detail"
                            columns={columns}
                            dataSource={dataTable}
                            bordered
                            rowKey={record => record.index}
                        />
                    </Card>
            </div>
        );
    }
}

export default DevicesConfig;
