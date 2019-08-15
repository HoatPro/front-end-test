import React from "react";
import axios from "axios";
import {message, DatePicker, Select, Card, Table, Form, Modal, Input} from "antd";
import Search from "antd/lib/input/Search";


const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;
class IRBDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            listTime:[],
            dataSelected:[],
            dataTable:[]
        }
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

 handleChange=(value)=> {
   const {listTime}=this.state;
   const timeSelected=[]
   listTime.map((dt,index)=>{
       if(value==dt.index){
           timeSelected.push(dt.dt)
       }else return  null;
   });
     axios({
         method: "GET",
         url: `https://netd.ast.fpt.net/netd-api/api/get-detail-info-irb?time=${timeSelected}`
     }).then(res=>{
         if(res.status){
             message.success('GET detail Group MP successfully!');
           const dataNew=res.data.data[0].data;
           const dataTable=[];
            dataNew.map((dt,index)=>{
                 if(dt.bgpV4!=null&&dt.bgpV6!=null) {
                     dataTable.push(
                         {
                             index:index,
                             dt
                         }
                     )
                 }
             })
             this.setState({
                 dataTable:dataTable
             })
         }
     })

}

render() {

    const children = [];
    this.state.listTime.map((list,index)=>{
        children.push(<Option key={index}>{list.dt.toString()}</Option>);
    });
    const {dataTable}=this.state;
    const columns = [
        {
            title: 'Irb',
            key: 'name',
            render:record=>{
                 return record.dt.irbName
            }
        },
        {
            title: 'Name',
            key: 'ip',
            render: record => {
                return record.dt.irbDetail
            }
        },
        {
            title: 'Gateway',
            key: 'gateway',
            render: record => {
                return record.dt.hostName
            }

        },
        {
            title: 'BGP v4',
            key: 'bgpv4',
            render: record => {
                if(record.dt.bgpV4===null){
                    return null
                }
                return record.dt.bgpV4.export.replace("-Export", "")
            }
        },
        {
            title: 'BGP v6',
            key: 'bgpv6',
            render: record => {
                if(record.dt.bgpV6===null){
                    return null
                }
                return record.dt.bgpV6.export.replace("-Export", "")
            }
        },
        {
            title: 'Traffic in',
            key: 'traffic-in',
            render:record=>{
                return <div>{record.dt.totalTrafficIn} Mb ({record.dt.percentTrafficIn}%)</div>
            }
        },
        {
            title: 'Traffic out',
            key: 'traffic-out',
            render:record=>{
                return <div>{record.dt.totalTrafficOut} Mb ({record.dt.percentTrafficOut}%)</div>
            }
        },
    ]
        return (
            <div className="page-center">
                <Card style={{width:"100%"}}>
                    <div className="irb-detail" style={{width:"100%",marginBottom:20}}>
                        <div style={{width:200, marginRight:60, float:"left"}} >
                            <h4 > Search by name...</h4>
                            <Search  placeholder="Search by name..."/>
                        </div>
                        <div style={{width:200, float:"left"}} >
                            <h4>Choose log date</h4>
                            <DatePicker
                                onChange={this.onChange}
                                format={dateFormat}
                            />
                        </div>
                        <div style={{width:200, float:"right", marginRight:800}}>
                            <h4> Search by time</h4>
                            <Select
                                style={{ width: '100%' }}
                                defaultValue={"all"}
                                onChange={this.handleChange}
                            >
                                {children}
                            </Select>
                        </div>
                    </div>
                </Card>
                     <Card >
                         <Table
                             columns={columns}
                             dataSource={dataTable}
                             bordered
                             rowKey={record=>record.index}
                         />
                     </Card>
            </div>
        );
    }
}
export default IRBDetail;
