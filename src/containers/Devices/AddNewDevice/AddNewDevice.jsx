import React from "react";
import {Card, Button, Table, message, Icon, DatePicker, Select, Alert, Tabs, Modal} from 'antd'
import axios from "axios";
import {AddNewDeviceWrapper} from "./AddNewDevie.style"
import Search from "antd/lib/input/Search";
import TableFail from "../AddNewDevice/TableFail";
import moment from "moment";
import TableDetail from "../AddNewDevice/TableDetail";
const dateFormat = 'DD-MM-YYYY';
const {TabPane}=Tabs;
class AddNewDevice extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            totalPortCnt:null,
            totalSuccessPortCnt:null,
            totalSuccessPortPercent:null,
            dataGet:[],
            dataLogs:[],
            visible:false,
        }
    }

    async componentDidMount() {
        let today     = moment(new Date());
        const todaySelected=today._d.toISOString();
        const options = {
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/add-device-to-opsview-logs?date=${todaySelected}`
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET logs successfull!");
            const totalPortCnt = data.reduce((sum, e) => (sum + e.ports.length), 0);
            const totalSuccessPortCnt = data.reduce((sum, e) => (sum + e.ports.reduce((s, port) => (s + port.existInOps), 0)), 0);
            const totalSuccessPortPercent = Math.round(totalSuccessPortCnt / totalPortCnt * 100 * 100) / 100;
            const dataObj=data.map((data,index)=>{
                let successPortCnt = data.ports.reduce((sum, data) => (sum + data.existInOps), 0);
                let successPercent = (data.ports.length!=0?(Math.round(successPortCnt / data.ports.length * 100 * 100) / 100):100);
                return {
                    index:index+1,
                    data,
                    successPortCnt,
                    successPercent,
                    length:data.ports.length
                }
            })
            this.setState({
                dataTable: dataObj,
                totalPortCnt:totalPortCnt,
                totalSuccessPortCnt:totalSuccessPortCnt,
                totalSuccessPortPercent:totalSuccessPortPercent,
                dataGet:data

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

    handleClick=(index)=>{
        const {dataTable}=this.state;
        const dataLogs=[];
        dataTable.filter(data=>{
            if(data.index==index){
                dataLogs.push(data)
            }
        })
        this.setState({
            visiable:true,
            dataLogs:dataLogs
        })
    }
    setVisible=(visiable)=>{
        this.setState({
            visiable:visiable
        })
    }
    render() {
        const{dataTable,totalPortCnt,totalSuccessPortCnt,totalSuccessPortPercent,dataGet,dataLogs}=this.state;
        const successPercentCheck=[]
        dataGet.map((data,index)=>{
            let successPortCnt = data.ports.reduce((sum, data) => (sum + data.existInOps), 0);
            let successPercent = (data.ports.length!=0?(Math.round(successPortCnt / data.ports.length * 100 * 100) / 100):100);
            successPercentCheck.push(successPercent)
        })
        const columns = [
            {
                title: '#',
                key: 'index',
                render:record=>{
                    return record.index
                }
            },
            {
                title: 'Time',
                key: 'time',
                render:record=>{
                    const times=record.data.time
                    return moment(times).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                title: 'Name',
                key: 'name',
                render:record=>{
                    return record.data.name
                }
            },
            {
                title: 'Ip',
                key: 'deactive-time',
                render:record=>{
                    return record.data.ip
                }
            },
            {
                title: 'Function',
                key: 'function',
                render:record=>{
                    return record.data.function
                }
            },
            {
                title: 'Method',
                key: 'method',
                render:record=>{
                    return record.data.method
                }
            },
            {
                title: 'Stat',
                key: 'stat',
                render: record => {
                    if (record.successPercent == 0) {
                        return <div
                            style={{color: "red"}}>{record.successPortCnt + '/' + record.length + '(' + record.successPercent + '%)'}</div>
                    }
                    return <div
                        style={{color: "green"}}>{record.successPortCnt + '/' + record.length + '(' + record.successPercent + '%)'}</div>


                }
            },
            {
                title: 'Action',
                key: 'action',
                render:record=>{
                    return(<div >
                        <Icon
                            type="eye"
                            style={{ width:26, height:26,backgroundColor:"#00b5ad",padding:5,color:"white",fontWeight:700,borderRadius:5,alignItems:"center"}}
                            onClick={()=>this.handleClick(record.index)}
                        />
                        <Modal
                            width={1200}
                            closable={false}
                            title={`Ports of device ${record.data.name} | ${record.data.ip}`}
                            centered
                            visible={this.state.visiable}
                            footer={[
                                <Button key={1} type="danger" onClick={() => this.setVisible(false)}>Close</Button>
                            ]}
                        >
                            <TableDetail  data={dataLogs} />
                        </Modal>
                    </div>)
                }
            },

        ]

        return (
            <AddNewDeviceWrapper>
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

                    <Tabs  type="card">
                        <TabPane tab="Overview" key="1">
                            <Alert style={{fontWeight:650,textAlign:"center",color:"#0e566c"}} message={`${totalSuccessPortCnt}/${totalPortCnt}(${totalSuccessPortPercent}%)`} type="info" />
                            <Table
                                style={{fontWeight:500,marginTop:10}}
                                columns={columns}
                                dataSource={dataTable}
                                bordered
                                rowKey={record=>record.index}
                            />

                        </TabPane>
                        <TabPane tab="Fail list" key="2">
                            <TableFail  dataGet={dataGet} successPercentCheck={successPercentCheck}/>
                        </TabPane>

                    </Tabs>
                </Card>
            </AddNewDeviceWrapper>
        );
    }
}

export default AddNewDevice;


