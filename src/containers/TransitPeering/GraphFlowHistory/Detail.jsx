import React from "react";
import {DatePicker, Input, Card, Select, message} from 'antd';
import ReactEcharts from 'echarts-for-react';
import axios from "axios";

import moment from "moment";
import {getDataForGraph} from '../../../helper/autoBalancing-analyzer';

const {Option} = Select

class GraphDetail extends React.Component {
    constructor(props) {
        super(props);


    }

    getOption(dataDetailGraph, irbDetail, irbName, direction,) {
        const dataGraph = [];
        dataDetailGraph.data.map(data => {
            if (data.irbDetail === irbDetail) {
                dataGraph.push(data)
            }
        })

        let listDate = dataDetailGraph.date;
        let seriesData = [];
        let legendData = [];
        for (let item of dataGraph) {
            legendData.push(item.irbName);
            let _data = [];
            if (direction === "in") {
                _data = item.listPercentTrafficIn
            } else {
                _data = item.listPercentTrafficOut
            }
            seriesData.push({
                name: item.irbName,
                type: 'line',
                data: _data,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                }
            })
        }
        let option = {
            backgroundColor: '#21202D',
            legend: {
                data: legendData,
                inactiveColor: '#777',
                textStyle: {
                    color: '#fff'
                }
            },
            title: {
                text: this.props.irbDetail + " - " + this.props.direction.toUpperCase() + "PUT",
                left: 10,
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 2,
                        opacity: 1
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: listDate,
                axisLine: {lineStyle: {color: '#8392A5'}}
            },
            yAxis: {
                scale: true,
                axisLine: {lineStyle: {color: '#8392A5'}},
                splitLine: {show: false}
            },
            grid: {
                bottom: 80
            },
            dataZoom: [{
                textStyle: {
                    color: '#8392A5'
                },
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                dataBackground: {
                    areaStyle: {
                        color: '#8392A5'
                    },
                    lineStyle: {
                        opacity: 0.8,
                        color: '#8392A5'
                    }
                },
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }, {
                type: 'inside'
            }],
            animation: false,
            series: seriesData

        };

        return option;
    }

    onChartReadyCallback() {
        const divGraph = document.querySelectorAll('.echarts-for-react');
        for (let item of divGraph) {
            item.style.height = "700px";
        }
    }

    componentDidMount() {
        const listDateWrapper = document.getElementsByClassName('react-datepicker-wrapper');
        for (let item of listDateWrapper) {
            item.classList.add("fluid");
        }

        const listDatePicker = document.getElementsByClassName('react-datepicker__input-container');
        for (let item of listDatePicker) {
            item.classList.add("ui");
            item.classList.add("input");
        }

        const listDatePickerInput = document.querySelectorAll('.react-datepicker-wrapper .react-datepicker__input-container input');
        for (let item of listDatePickerInput) {
            item.style.width = "100%";
        }
    }

    render() {

        if (this.props.dataDetailGraph.length === 0) {
            return null;
        } else {
            let dataDetailGraph = this.props.dataDetailGraph;
            let irbName = this.props.irbName;
            let irbDetail = this.props.irbDetail;
            let direction = this.props.direction;
            return (
                <ReactEcharts fluid
                              option={this.getOption(dataDetailGraph, irbDetail, irbName, direction,)}
                              notMerge={true}
                              lazyUpdate={true}
                              onChartReady={this.onChartReadyCallback}
                    // onEvents={onEvents}
                />)

        }

    }

}

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            startValue: null,
            endValue: null,
            endOpen: false,
            type: "",
            name: "",
            direction: "in",
            irbName: [],
            valueDropDownName: [],
            dataIrbGraph: []

        }
    }

    //Date Time

    disabledStartDate = startValue => {
        const {endValue} = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const {startValue} = this.state;
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
            this.setState({endOpen: true});
        }
    };

    handleEndOpenChange = open => {
        this.setState({endOpen: open});
    };

    // Select
    handleChangeType = (value) => {
        this.setState({
            type: value
        })
    }

    handleChangeDirection = (value) => {
        this.setState({
            direction: value
        })
    }
    handleChangeName = (value) => {
        const {startValue, endValue} = this.state;
        if (startValue && endValue) {
            const startDate = startValue._d.toISOString();
            const dateStartConvert = moment(startDate).format("YYYY-MM-DD");
            const endDate = endValue._d.toISOString();
            const dateEndConvert = moment(endDate).format("YYYY-MM-DD");
            axios({
                method: "GET",
                url: `https://netd.ast.fpt.net/netd-api/api/get-log-detail-irb-for-graph?from=${dateStartConvert}&to=${dateEndConvert}`
            }).then(res => {
                if (res.data.status === 200) {
                    message.success("Get data successfully!!");
                    const dataDraw = res.data.data;
                    const irbName = [];
                    dataDraw.map((data) => {

                        data.data.map((data) => {
                            if (!data.irbName) {
                                return;
                            }
                            irbName.push(data.irbName)
                        })

                    })
                    let generalData = getDataForGraph(dataDraw, irbName);

                    this.setState({
                        irbName: irbName,
                        valueDropDownName: value,
                        dataIrbGraph: generalData
                    })

                }
            })
        } else if (res.data.status === 500) {
            message.info("Empty data!!")
        } else {
            message.error("Get data error!!!")
        }
    }

    render() {

        const {startValue, endValue, endOpen, valueDropDownName, type, irbName, direction, dataIrbGraph} = this.state;
        console.log(type);
        const selectType = [];
        if (!type) {
            selectType.push("")
        } else if (type === "Transit") {
            selectType.push(
                <Select
                    style={{width: 180}}
                    onChange={this.handleChangeName}
                    optionLabelProp="label"
                >

                    <Option key="SINGTEL" label="SINGTEL">SINGTEL</Option>
                    <Option key="PCCW" label="PCCW">PCCW</Option>
                    <Option key="NTT" label="NTT">NTT</Option>
                    <Option key="KT" label="KT">KT</Option>
                    <Option key="TELIA" label="TELIA">TELIA</Option>
                    <Option key="CW" label="CW">CW</Option>
                    <Option key="TATA" label="TATA">TATA</Option>
                    <Option key="CMI" label="CMI">CMI</Option>
                    <Option key="IIJ" label="IIJ">IIJ</Option>
                </Select>)
        } else {
            selectType.push(
                <Select
                    style={{width: 180}}
                    onChange={this.handleChangeName}
                    optionLabelProp="label"
                >

                    <Option key="MICROSOFT" label="MICROSOFT">MICROSOFT</Option>
                    <Option key="LIMELIGHT" label="LIMELIGHT">LIMELIGHT</Option>
                    <Option key="Zeblayer" label="Zeblayer">Zeblayer</Option>
                    <Option key="AKAMAI" label="AKAMAI">AKAMAI</Option>
                    <Option key="AMAZON" label="AMAZON">AMAZON</Option>
                    <Option key="LEVEL3" label="LEVEL3">LEVEL3</Option>
                    <Option key="EQUINIX" label="EQUINIX">EQUINIX</Option>
                    <Option key="VDMS" label="VDMS">VDMS</Option>
                    <Option key="TWITCH" label="TWITCH">TWITCH</Option>
                    <Option key="CloundBase" label="CloundBase">CloundBase</Option>
                    <Option key="AOFEI" label="AOFEI">AOFEI</Option>
                    <Option key="TENCENT" label="TENCENT">TENCENT</Option>
                    <Option key="HKIX" label="HKIX">HKIX</Option>
                    <Option key="GOOGLE" label="GOOGLE">GOOGLE</Option>
                    <Option key="FACEBOOK" label="FACEBOOK">FACEBOOK</Option>
                    <Option key="Apple" label="Apple">Apple</Option>
                    <Option key="APPLE" label="APPLE">APPLE</Option>
                    <Option key="Dailymotion" label="Dailymotion">Dailymotion</Option>
                    <Option key="JPNAP" label="JPNAP">JPNAP</Option>
                    <Option key="JPIX-peering-01" label="JPIX-peering-01">JPIX-peering-01</Option>
                    <Option key="BBIX-peering-02" label="BBIX-peering-02">BBIX-peering-02</Option>
                    <Option key="SGIX" label="SGIX">SGIX</Option>
                    <Option key="StackPath" label="StackPath">StackPath</Option>
                    <Option key="VALVE" label="VALVE">VALVE</Option>
                    <Option key="DIGITALOCEAN" label="DIGITALOCEAN">DIGITALOCEAN</Option>
                    <Option key="Zenlayer-02" label="Zenlayer-02">Zenlayer-02</Option>
                    <Option key="BBIX" label="BBIX">BBIX</Option>
                </Select>
            )
        }
        return (
            <div>
                <Card className="selection_date" style={{marginBottom: 20}}>
                    <h2 style={{fontWeight: "640"}}>IRB</h2>
                    <div className="from_date" style={{float: "left", width: 200}}>
                        <h4 style={{fontWeight: "560"}}>From</h4>
                        <DatePicker
                            style={{marginRight: 20, width: 180}}
                            disabledDate={this.disabledStartDate}
                            format="DD/MM/YYYY"
                            value={startValue}
                            placeholder="Start"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                        />
                    </div>
                    <div className="to_date" style={{float: "left", width: 200}}>
                        <h4 style={{fontWeight: "560"}}>To</h4>
                        <DatePicker
                            style={{marginRight: 20, width: 180}}
                            disabledDate={this.disabledEndDate}
                            format="DD/MM/YYYY"
                            value={endValue}
                            placeholder="End"
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                        />
                    </div>
                    <div className="select-type" style={{float: "left", marginRight: 10, width: 200}}>
                        <div>
                            <h4 style={{fontWeight: "560"}}> Type</h4>
                            <Select
                                style={{width: 180}}
                                onChange={this.handleChangeType}
                                optionLabelProp="label"
                            >
                                <Option key="Transit" label="Transit">Transit</Option>
                                <Option key="Peering" label="Peering">Peering</Option>

                            </Select>
                        </div>
                    </div>
                    <div className="select-type" style={{float: "left", marginRight: 10, width: 200}}>
                        <div>
                            <h4 style={{fontWeight: "560"}}> Name</h4>

                            {selectType}

                        </div>
                    </div>
                    <div className="select-type" style={{float: "left", marginRight: 10, width: 200}}>
                        <div>
                            <h4 style={{fontWeight: "560"}}> Direction</h4>
                            <Select
                                style={{width: 180}}
                                onChange={this.handleChangeDirection}
                                optionLabelProp="label"
                                defaultValue={["in"]}
                            >
                                <Option key="in" label="In">In</Option>
                                <Option key="out" label="Out">Out</Option>

                            </Select>
                        </div>
                    </div>
                </Card>
                <Card>
                    <GraphDetail
                        dataDetailGraph={dataIrbGraph}
                        irbDetail={valueDropDownName}
                        irbName={irbName}
                        direction={direction}>
                    </GraphDetail>
                </Card>
            </div>
        )
    }
}

export default Detail;