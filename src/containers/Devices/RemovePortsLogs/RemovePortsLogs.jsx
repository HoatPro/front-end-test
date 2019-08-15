import React from "react";
import {Card,Tabs,Table,message,Icon,DatePicker, Select,Alert} from 'antd'
import axios from "axios";
import Search from "antd/lib/input/Search";
import TableFail from "./TableFail"
import moment from "moment";
const dateFormat = 'DD-MM-YYYY';
const { TabPane } = Tabs;
class RemovePortsLogs extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            totalPortCnt:null,
            totalSuccessPortCnt:null,
            totalSuccessPortPercent:null,
            dataGet:[]

        }
    }
    async componentDidMount() {
        let today     = moment(new Date());
        const date=today._d.toISOString();
        const options = {
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/remove-ports-from-opsview-logs?date=${date}`
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET logs successfull!");
            const totalPortCnt = data.reduce((sum, e) => (sum + e.ports.length), 0);
            const totalSuccessPortCnt = data.reduce((sum, e) => (sum + e.ports.reduce((s, port) => {
                if (port.requestOpsviewResult != null && port.requestOpsviewResult.success) {
                    return s + 1;
                }
                return s;
            }, 0)), 0);



            const totalSuccessPortPercent = Math.round(totalSuccessPortCnt / totalPortCnt * 100 * 100) / 100;
            const dataObj=data.map((data,index)=>{
                let successPortCnt = data.ports.reduce((s, data) => {
                    if (data.requestOpsviewResult != null && data.requestOpsviewResult.success) {
                        return s + 1;
                    }
                    return s;
                }, 0);

                let successPercent = Math.round(successPortCnt / data.ports.length * 100 * 100) / 100;
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

    // formatDate=(date)=> {
    //     var d = new Date(date),
    //         month = '' + (d.getMonth() + 1),
    //         day = '' + d.getDate(),
    //         year = d.getFullYear();
    //
    //     if (month.length < 2) month = '0' + month;
    //     if (day.length < 2) day = '0' + day;
    //
    //     return [year, month, day].join('-');
    //
    // }
    //
    // onChange=(dateString)=> {
    //     var myDate = new Date(dateString._d);
    //     const dateSelected = this.formatDate(myDate);
    //     axios({
    //         method: "GET",
    //         url: `https://netd.ast.fpt.net/netd-api/api/get-all-time-in-day?date=${dateSelected}`
    //     }).then(res => {
    //         if (res.status) {
    //             const dataObj=res.data.data.map((dt,index)=>{
    //                 return {
    //                     "index":index,dt
    //                 }
    //             })
    //             message.success("GET data successfully");
    //             this.setState({
    //                 listTime: dataObj
    //             })
    //         }
    //     })
    //
    // }
   callback=()=>{
        console.log("a")
   }
    render() {
        const{dataGet,dataTable,totalPortCnt,totalSuccessPortCnt,totalSuccessPortPercent}=this.state;



        const columns = [
            {
                title: 'Index',
                key: 'index',
                render:record=>{
                    return record.index
                }
            },
            {
                title: 'Times',
                key: 'time',
                render:record=>{
                    const times=record.data.time
                    return  moment(times).format("YYYY-MM-DD HH:mm:ss")
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
                key: 'ip',
                render:record=>{
                    return record.data.ip
                }
            },
            {
                title: 'Function',
                key: 'function',
                render:record=> {
                    return record.data.function
                }
            },
            {
                title: 'Method',
                key: 'methods',
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
                        <Icon type="eye" style={{ width:26, height:26,backgroundColor:"#00b5ad",padding:5,color:"white",fontWeight:700,borderRadius:5}}/>
                    </div>)
                }
            },

        ]
        return (

            <div>
                <Card  style={{ width: "100%",fontWeight:600, marginBottom:15 }}>
                    <h2 style={{fontWeight:700}}>Logs</h2>

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
                            <Alert style={{fontWeight:650,textAlign:"center"}} message={`${totalSuccessPortCnt}/${totalPortCnt}(${totalSuccessPortPercent}%)`} type="info" />
                        <Table
                            style={{fontWeight:500,marginTop:10}}
                            columns={columns}
                            dataSource={dataTable}
                            bordered
                            rowKey={record=>record.index}
                        />

                        </TabPane>
                        <TabPane tab="Fail list" key="2">
                            <TableFail  dataGet={dataGet}/>
                        </TabPane>

                    </Tabs>
                </Card>
            </div>
        );
    }
}

export default RemovePortsLogs;


