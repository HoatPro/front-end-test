import React from "react";
import {Collapse, DatePicker, Select, Tabs, message,Alert,Table, Card} from 'antd';
import axios from "axios";
import moment from 'moment';
import Button from "antd/lib/button";
const { Panel } = Collapse;
const { Option } = Select;
const {TabPane}=Tabs;
const dateFormat = 'DD/MM/YYYY';
class TrafficStatistics extends React.Component {
constructor(props){
    super(props);
    this.state={
       timeList:[],
        dataTable:[],
        dataCheck:[],
        dataAll:[],
        maxTrafficTime:[],
        valueService:"All",
        valueType:"All",
        valueProvider:"All",
        valueLocation:"All",
        valueLocalLocation:"All"
    }
}
//API
    async componentDidMount(){
        const yesterday = moment().subtract(1, 'days');
        const dateDefault=moment(yesterday._d).toISOString()
        const options = {
            method: "GET",
            url:`https://netd.ast.fpt.net/netd-api/api/iplc-traffic-times?date=${dateDefault}`
        };
        const {
            status,
            data:{data}
        } = await axios(options);
        if(status){
            let dataObj=data.trafficData.map((data,index)=>{
                return{
                    "index":index+1,
                    data
                }
            });
            message.success("GET data IPLC traffic  successfull!")
            this.setState({
                timeList:data.timeList,
                maxTrafficTime:data.maxTrafficTime,
                dataTable:dataObj,
                dataAll:dataObj,
                dataCheck:data
            })
        }
    }

    onChange = (value) => {
        const daySelected=moment(value._d).toISOString();
        axios({
            method: "GET",
            url:`https://netd.ast.fpt.net/netd-api/api/iplc-traffic-times?date=${daySelected}`
        }).then(res=>{
            if(res.status){
                message.success("GET data IPLC successfully!");
               const dataGet=res.data.data;
               const dataObj=dataGet.trafficData.map((data,index)=>{
                   return {
                       index:index+1,
                       data
                   }
               });
               this.setState({
                   timeList:dataGet.timeList,
                   maxTrafficTime:dataGet.maxTrafficTime,
                   dataTable:dataObj,
                    dataAll:dataObj,
                   dataCheck:dataGet
               })
            }
        })

    }

//Choose Time
    onChangeTime=(value)=>{
        const dayNewSelecte= moment(value._d).toISOString();
        axios({
            method: "GET",
            url:`https://netd.ast.fpt.net/netd-api/api/iplc-traffic-times?date=${dayNewSelecte}`
        }).then(res=>{
            if(res.status){
                message.success("GET IPLC successfully!");
                const dataGet=res.data.data;
                const dataObj=dataGet.trafficData.map((data,index)=>{
                    return {
                        index:index+1,
                        data
                    }
                });
                this.setState({
                    timeList:dataGet.timeList,
                    maxTrafficTime:dataGet.maxTrafficTime,
                    dataTable:dataObj,
                    dataAll:dataObj,
                    dataCheck:dataGet
                })
            }
        })
    }

    ///

    formatDate=(date)=> {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();


        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');

    }
    //Selected
    handleChangeService=value=>{
    this.setState({
        valueService:value
    })
    }
    handleChangeType=value=>{
        this.setState({
            valueType:value
        })
    }
    handleChangeProvider=value=>{
        this.setState({
            valueProvider:value
        })
    }
    handleChangeLocation=value=>{
       this.setState({
           valueLocation:value
       })
    }
    handleChangeLocalLocation=value=>{
        this.setState({
            valueLocalLocation:value
        })
    }

    //onSearch
    onSearch=()=>{
    const {dataCheck,valueService,valueType,valueProvider,valueLocation,valueLocalLocation,dataAll}=this.state;
        const dataSelected=[];
        dataCheck.trafficData.map(data=>{
            if(valueService==data.service){
                dataSelected.push(data)
            }
        })

        const dataObj=dataSelected.map((data,index)=>{
            return{
                index:index+1,
                data
            }
        });
        if(valueService=="All"){
            const length=dataAll.length;
            this.setState({
                dataTable:dataAll
            })
            message.success(`${length} items found`)
        }else if(valueService==''){
            message.error("Empty field delete!")
        }
         else{
            const length=dataObj.length;
            this.setState({
                dataTable:dataObj
            })
            message.success(`${length} items found`)
        }

    }

// Sum
//     sumByAttr=(list, attr)=> {
//
//         // console.log(list);
//
//         let sum = 0;
//         for (const item of list) {
//             sum += item[attr];
//         }
//         return sum;
//     }
    render() {
        const {timeList,dataTable,maxTrafficTime}=this.state;
        const maxDate=moment(maxTrafficTime).format("YYYY-MM-DD hh:mm:ss");
        console.log(maxDate)
        const selected=[];
        timeList.map((time,index)=>{
            const timeNew=moment(time).format("YYYY-MM-DD hh:mm:ss")
            selected.push( <Option value={timeNew} key={index}>{timeNew}</Option>)
        })
        //Message
        // const {filteredList} = this.state;
        // const trafficUsed = this.sumByAttr(filteredList, 'trafficIn');
        // const capacity = this.sumByAttr(filteredList, 'speed');
        // const usedPercent = capacity == 0 ? '-' : (trafficUsed / capacity * (100/0.9)).toFixed(2);
        // Table

        const columns = [
            {
                title: 'Index',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Service',
                key: 'service',
                render:record=>{
                    return record.data.service
                }
            },
            {
                title: 'Type',
                key: 'type',
                render:record=>{
                    return record.data.type
                }
            },
            {
                title: 'Cid',
                key: 'cid',
                render:record=>{
                    return record.data.cid
                }
            },
            {
                title: 'Provider',
                key: 'provider',
                render:record=>{
                    return record.data.provider
                }
            },
            {
                title: 'A_End',
                key: 'aend',
                render:record=>{
                    return record.data.localName
                }
            },
            {
                title: 'A_End Port',
                key: 'aendport',
                render:record=>{
                    return record.data.localInterface
                }
            },
            {
                title: 'A_End Location',
                key: 'aendlocation',
                render:record=>{
                    return record.data.localLocation
                }
            },
            {
                title: 'B_End',
                key: 'bend',
                render:record=>{
                    return record.data.neighborName
                }
            },
            {
                title: 'B_End Port',
                key: 'bendport',
                render:record=>{
                    return record.data.neighborInterface
                }
            },
            {
                title: 'B_End Location',
                key: 'bendlocation',
                render:record=>{
                    return record.data.neighborLocation
                }
            },
            {
                title: 'Traffic (Gbps)',
                key: 'traffic',
                render:record=>{
                    return record.data.trafficIn
                }
            },
            {
                title: 'Capacity (Gbps)',
                key: 'capacity',
                render:record=>{
                    return record.data.speed
                }
            },

        ];
        return (
            <div>
            <Card>
                <Collapse defaultActiveKey={['1']} >
                    <h2 style={{marginLeft:10, marginTop:10}}>IPLC Traffic</h2>
                        <div className="choose_date" style={{ float:"left", marginLeft:20}}>
                            <h4 style={{fontWeight:"560"}}>Choose Date</h4>
                            <DatePicker
                                defaultValue={moment().subtract(1, 'days')}
                                style={{marginRight:20}}
                                format={dateFormat}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="choose_time">
                            <h4 style={{fontWeight:"560"}}>Choose TIme</h4>
                            <Select
                                style={{ width: 200 }}
                                // defaultValue={maxDate}
                                onChange={this.onChangeTime}
                            >
                                {selected}
                            </Select>
                        </div>
                    <Panel header="Overview" key="1" style={{fontWeight:600}}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="All" key="all">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="General" key="general">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Premium" key="premium">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </Panel>
                    <Panel header="Port list" key="2" style={{fontWeight:600}}>
                        <div >
                            <h4 style={{fontWeight:"560"}}>Service</h4>
                            <Select
                                mode="multiple"
                                style={{ width: '30%' }}
                                defaultValue={['All']}
                                onChange={this.handleChangeService}
                                optionLabelProp="label"
                            >
                                <Option key="All" label="All">All </Option>
                                <Option key="Premium" label="Premium">Premium</Option>
                                <Option key="General" label="General">General</Option>
                            </Select>
                        </div>
                        <div >
                            <h4 style={{fontWeight:"560"}}>Type</h4>
                            <Select
                                mode="multiple"
                                style={{ width: '30%' }}
                                defaultValue={['All']}
                                onChange={this.handleChangeType}
                                optionLabelProp="label"
                            >
                                <Option key="All" label="All">All </Option>
                                <Option key="Landline" label="Landline">Landline</Option>
                                <Option key="submarine" label="submarine">submarine</Option>
                            </Select>
                        </div>
                        <div>
                            <h4 style={{fontWeight:"560"}}>Provider</h4>
                            <Select
                                mode="multiple"
                                style={{ width: '30%' }}
                                defaultValue={['All']}
                                onChange={this.handleChangeProvider}
                                optionLabelProp="label"
                            >
                                <Option key="All" label="All">All </Option>
                                <Option key="APG" label="APG">APG</Option>
                                <Option key="IA" label="IA">IA</Option>
                                <Option key="AAE-1" label="AAE-1">AAE-1</Option>
                                <Option key="AAG" label="AAG">AAG</Option>
                                <Option key="CMI" label="CMI">CMI</Option>
                                <Option key="CT" label="CT">CT</Option>
                                <Option key="CU" label="CU">CU</Option>
                            </Select>
                        </div>
                        <div>
                            <h4 style={{fontWeight:"560"}}>Location</h4>
                            <Select
                                mode="multiple"
                                style={{ width: '30%' }}
                                defaultValue={['All']}
                                onChange={this.handleChangeLocation}
                                optionLabelProp="label"
                            >
                                <Option key="All" label="All">All </Option>
                                <Option key="Singapore" label="Singapore">Singapore</Option>
                                <Option key="Hongkong" label="Hongkong">Hongkong</Option>
                                <Option key="Japan" label="Japan">Japan</Option>
                            </Select>
                        </div>
                        <div>
                            <h4 style={{fontWeight:"560"}}>Local location</h4>
                            <Select
                                mode="multiple"
                                style={{ width: '30%' }}
                                defaultValue={['All']}
                                onChange={this.handleChangeLocalLocation}
                                optionLabelProp="label"
                            >
                                <Option key="All" label="All">All </Option>
                                <Option key="Da Nang" label="Da Nang">Da Nang</Option>
                                <Option key="Ho Chi Minh" label="Ho Chi Minh">Ho Chi Minh</Option>
                                <Option key="Ha Noi" label="Ha Noi">Ha Noi</Option>
                            </Select>
                        </div>
                        <Button type="primary" style={{marginTop:10}} onClick={this.onSearch}> Search </Button>
                        <Alert
                            style={{marginTop:10,marginBottom:5}}
                            description="Info Description Info Description Info Description Info Description"
                            type="info"
                        />
                        <Table
                            style={{fontWeight:500}}
                            columns={columns}
                            dataSource={dataTable}
                            bordered
                            rowKey={record => record.index}
                        />
                    </Panel>
                </Collapse>

            </Card>
            </div>
        );
    }
}

export default TrafficStatistics;