import React from "react";
import {Collapse, DatePicker, Select, Button, message,Card, Row, Col} from 'antd';
import ReactEcharts from "echarts-for-react";
import {TrafficChartWrapper} from "./TrafficChart.style"
import axios from "axios";
import moment from 'moment';
const { Panel } = Collapse;
const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';
class Chart extends React.Component {
    constructor(props) {
        super(props);

    }

    getOption = data => {
        const dateList = [];
        const usedList = [];
        const freeList = [];
        const percentList = [];
        const capacityList = [];
        for (let ele of data) {
            let used = Math.round(ele.used * 100) / 100;
            dateList.push(ele.date);
            usedList.push(used);
            let free = Math.round((ele.capacity - used) * 100) / 100;
            freeList.push(free);
            let percent = Math.round(((used * 100) / ele.capacity) * 100) / 100;
            percentList.push(percent/0.9);
            capacityList.push(ele.capacity);
        }

        const option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "line"
                }
            },
            legend: {
                data: ["Capacity", "Used", "Free", "Percent"]
            },
            grid: {
                height: "425px"
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: { show: true }
                }
            },
            xAxis: [
                {
                    type: "category",
                    data: dateList
                }
            ],
            dataZoom: {
                show: true,
                start: 0
            },
            yAxis: [
                {
                    type: "value",
                    boundaryGap: [0, 0.1],
                    name: "Gbps"
                },
                {
                    type: "value",
                    max: 100,
                    boundaryGap: [0, 0.1],
                    name: "%"
                }
            ],
            series: [
                {
                    name: "Capacity",
                    type: "line",
                    yAxisIndex: 0,

                    itemStyle: {
                        normal: {
                            lineStyle: {
                                opacity: 0
                            },
                            label: {
                                show: true,
                                color: "#000"
                            }
                        }
                    },
                    data: capacityList
                },
                {
                    name: "Used",
                    type: "bar",
                    stack: "sum",
                    barCategoryGap: "50%",
                    itemStyle: {
                        normal: {
                            color: "#5594fa",
                            barBorderColor: "#5594fa",
                            barBorderWidth: 2,
                            barBorderRadius: 0,
                            label: {
                                show: true,
                                position: "inside"
                            }
                        }
                    },
                    data: usedList
                },
                {
                    name: "Free",
                    type: "bar",
                    stack: "sum",
                    itemStyle: {
                        normal: {
                            color: "#dedede",
                            barBorderColor: "#5594fa",
                            barBorderWidth: 2,
                            barBorderRadius: 0
                        }
                    },
                    data: freeList
                },
                {
                    name: "Percent",
                    type: "line",
                    yAxisIndex: 1,

                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: "gray",
                                width: 4
                            }
                        }
                    },

                    data: percentList
                }
            ]
        };
        return option;
    };

    render() {
        const { data } = this.props;
        return (

                    <ReactEcharts
                        fluid
                        option={this.getOption(data)}
                        style={{ height: "525px" }}
                />
        )
    }
}



class TrafficChart  extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            startValue: null,
            endValue: null,
            endOpen: false,
            dataGeneral:[],
            dataPremium:[],
            valueType:["-1"],
            valueLocalLocation:["-1"],
            valueLocation:["-1"],
            valueProvider:["-1"],
            defaultActive:null

        }
    }



// Date Picker

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.onChange('startValue', value);
    };

    onEndChange = value => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };


// Select
    handleChangeType=(value)=>{
       this.setState({
           valueType:value
       })
    }
    handleChangeLocalLocation=(value)=>{
        this.setState({
            valueLocalLocation:value
        })
    }
    handleChangeLocation=(value)=>{
       this.setState({
           valueLocation:value
       })
    }
    handleChangeProvider=(value)=>{
        this.setState({
            valueProvider:value
        })
    }

    //Search

    handleSearch=()=>{
        const startDate=this.state.startValue._d;
        const endDate=this.state.endValue._d;
        const{valueType,valueLocalLocation,valueLocation,valueProvider}=this.state;
        const fromDate=moment(startDate).toISOString();
        const toDate=moment(endDate).toISOString();
      axios({
          method: "GET",
          url: `https://netd.ast.fpt.net/netd-api/api/iplc-traffic-chart-data-on-range?fromDate=${fromDate}&toDate=${toDate}&provider[]=${valueProvider}&type[]=${valueType}&location[]=${valueLocation}&localLocation[]=${valueLocalLocation}`
      }).then(res=>{
          if(res.status){
              message.success("GET data Traffic Chart successfully!")
             const dataGet=res.data.data;
              this.setState({
                  dataGeneral:dataGet.general,
                  dataPremium:dataGet.premium,
                  defaultActive:1
              })
          }else{
              message.error("GET data error!!!")
          }
      })

    }
    formatDate=(date)=> {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');

    }

    render() {
      const {startValue,endValue,endOpen,dataGeneral,dataPremium,defaultActive}=this.state;
      const today=moment(new Date())._d.toISOString();
      const endDay=this.formatDate(today);
      console.log(defaultActive)
        return (
            <TrafficChartWrapper>
                <Card style={{border:"20",backgroundColor:"#f7f7f7", padding:15}}>
                    <h2>Traffic Chart</h2>
                    <Collapse defaultActiveKey={['1']}  >
                        <Panel header="Filter" key="1" style={{fontWeight:600}}>
                            <Row>
                                <Col span={8}>
                                    <div className="from_date" style={{ width:180,float:"left"}}>
                                        <h4 style={{fontWeight:"560"}}>From</h4>
                                        <DatePicker
                                            style={{marginRight:20}}
                                            disabledDate={this.disabledStartDate}
                                            format={dateFormat}
                                            value={startValue}
                                            placeholder="Start"
                                            onChange={this.onStartChange}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    </div>
                                    <div className="to_date"  style={{ width:180,float:"left"}}>
                                        <h4 style={{fontWeight:"560"}}>To</h4>
                                        <DatePicker

                                            disabledDate={this.disabledEndDate}
                                            format={dateFormat}
                                            value={endValue}
                                            onChange={this.onEndChange}
                                            open={endOpen}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div  >
                                        <h4 style={{fontWeight:"560"}}>Type</h4>
                                        <Select
                                            mode="multiple"
                                            style={{width:360}}
                                            onChange={this.handleChangeType}
                                            defaultValue={['All']}
                                            optionLabelProp="label"
                                        >
                                            <Option key="-1" label="All">All </Option>
                                            <Option key="Landline" label="Landline">Landline</Option>
                                            <Option key="submarine" label="submarine">submarine</Option>
                                        </Select>
                                    </div>
                                </Col>
                            <Col span={8}>
                                <div>
                                    <h4 style={{fontWeight:"560"}}>Local location</h4>
                                    <Select
                                        mode="multiple"
                                        style={{width:360}}
                                        defaultValue={['All']}
                                        onChange={this.handleChangeLocalLocation}
                                        optionLabelProp="label"
                                    >
                                        <Option key="-1" label="All">All </Option>
                                        <Option key="Da+Nang" label="Da Nang">Da Nang</Option>
                                        <Option key="Ho+Chi+Minh" label="Ho Chi Minh">Ho Chi Minh</Option>
                                        <Option key="Ha+Noi" label="Ha Noi">Ha Noi</Option>
                                    </Select>
                                </div>
                            </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div style={{marginTop:10}}>
                                    <h4 style={{fontWeight:"560"}}>
                                        Location</h4>
                                    <Select
                                        mode="multiple"
                                        style={{width:360}}
                                        defaultValue={['All']}
                                        onChange={this.handleChangeLocation}
                                        optionLabelProp="label"
                                    >
                                        <Option key="-1" label="All">All </Option>
                                        <Option key="Singapore" label="Singapore">Singapore</Option>
                                        <Option key="Hongkong" label="Hongkong">Hong Kong</Option>
                                        <Option key="Japan" label="Japan">Japan</Option>
                                    </Select>
                                </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <h4 style={{fontWeight:"560", marginTop:10}}>
                                            Provider</h4>
                                        <Select
                                            mode="multiple"
                                            style={{width:360}}
                                            defaultValue={['All']}
                                            onChange={this.handleChangeProvider}
                                            optionLabelProp="label"
                                        >
                                            <Option key="-1" label="All">All </Option>
                                            <Option key="APG" label="APG">APG</Option>
                                            <Option key="IA" label="IA">IA</Option>
                                            <Option key="AAE-1" label="AAE-1">AAE-1</Option>
                                            <Option key="AAG" label="AAG">AAG</Option>
                                            <Option key="CMI" label="CMI">CMI</Option>
                                            <Option key="CT" label="CT">CT</Option>
                                            <Option key="CU" label="CU">CU</Option>
                                        </Select>
                                    </div>
                                </Col>
                            <Col span={8} style={{marginTop:37}}>
                                <Button style={{width:180}} type="primary" onClick={this.handleSearch}>Search</Button>
                            </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </Card>
                <Card style={{border:"20",backgroundColor:"#f7f7f7",marginTop:20,padding:15}}>
                   <h2 >IPLC Traffic</h2>
                   <div>
                       <Collapse defaultActiveKey={[`${defaultActive}`]} >
                           <Panel header="General" key="1" style={{fontWeight:600}}>
                               <div  >
                                   <Chart  data={dataGeneral} service='General'/>
                               </div>
                           </Panel>
                       </Collapse>

                   </div>
                    <div>
                        <Collapse   >
                            <Panel header="Premium" key="premium" style={{fontWeight:600}}>
                                <div  >
                                    <Chart  data={dataPremium} service='Premium'/>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
               </Card>

            </TrafficChartWrapper>

        );
    }
}
export default TrafficChart;