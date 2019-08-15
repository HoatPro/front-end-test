import React from "react";
import {Card,Button,Table,message,Switch,Icon,DatePicker, Select,Alert} from 'antd'
import axios from "axios";
import Search from "antd/lib/input/Search";

const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;
class AddNewDevice extends React.Component {
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

    formatDate=(date)=> {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');

    }

    onChange=(dateString)=> {
        var myDate = new Date(dateString._d);
        const dateSelected = this.formatDate(myDate);
        axios({
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/get-all-time-in-day?date=${dateSelected}`
        }).then(res => {
            if (res.status) {
                const dataObj=res.data.data.map((dt,index)=>{
                    return {
                        "index":index,dt
                    }
                })
                message.success("GET data successfully");
                this.setState({
                    listTime: dataObj
                })
            }
        })

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
                    <h2 style={{fontWeight:700}}>OPSVIEW</h2>
                    <h4> Add new device to opsview</h4>
                    <Button style={{backgroundColor:"#21ba45",color:"white", fontWeight:560, float:"left",width:250}}> + Add </Button>
                </Card>

                <Card  style={{ width: "100%" }}>
                    <h2>Logs</h2>
                   <div style={{width:1200, marginBottom:100}}>
                       <div style={{width:200, float:"left"}} >
                           <h4>Choose log date</h4>
                           <DatePicker
                               onChange={this.onChange}
                               format={dateFormat}
                           />
                       </div>
                           <div  style={{width:200, float:"left"}}>
                               <h4 > Search by name...</h4>
                               <Search style={{width:180}} placeholder="Search by name..."/>
                           </div>

                           <div style={{ width:200 ,float:"left"}}>
                               <h4> Search by time</h4>
                               <Select
                                   style={{ width:180 }}
                                   defaultValue={"all"}
                                   onChange={this.handleChange}
                               >

                               </Select>
                           </div>

                   </div>

                    <Alert style={{fontWeight:650,textAlign:"center"}} message="There is no existed items!" type="warning" />
                </Card>
            </div>
        );
    }
}

export default AddNewDevice;


