import React from "react";
import {DatePicker, InputNumber, Input, Button, Card, message, Row, Col} from 'antd';

const InputGroup = Input.Group;
import axios from "axios";
import ReactEcharts from 'echarts-for-react';
import moment from "moment";

class GraphSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphOption: {
                legend: {},
                tooltip: {
                    trigger: 'axis',
                    showContent: false
                },
                dataset: {
                    source: []
                },
                xAxis: {type: 'category'},
                yAxis: {gridIndex: 0},
                grid: {top: '55%'},
                series: []
            }
        };
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

    getOption(dataSummaryGraph) {
        let source = [];

        let listTime = ["Time"];
        let listRed = ["Critical"];
        let listOrange = ["Warning"];
        let listGreen = ["OK"];
        let timeCheck = moment(dataSummaryGraph[0].time).format("YYYY-MM-DD");
        let countInDay = 0;

        let objRed = 0;
        let objGreen = 0;
        let objOrange = 0;

        for (let i = 0; i < dataSummaryGraph.length; i++) {
            let item = dataSummaryGraph[i];
            let time = moment(item.time).format("YYYY-MM-DD");
            //check same day
            if (moment(time).isSame(timeCheck)) {
                countInDay += 1;
                objRed += item.percentRedIn;
                objOrange += item.percentOrangeIn;
                objGreen += item.percentGreenIn;
            } else {
                listTime.push(timeCheck);
                listRed.push(objRed / countInDay);
                listOrange.push(objOrange / countInDay);
                listGreen.push(objGreen / countInDay);

                timeCheck = moment(item.time).format("YYYY-MM-DD");
                countInDay = 1;

                objRed = 0;
                objGreen = 0;
                objOrange = 0;

                objRed += item.percentRedIn;
                objOrange += item.percentOrangeIn;
                objGreen += item.percentGreenIn;
            }
        }
        //need push last day to array
        listTime.push(timeCheck);
        listRed.push(objRed / countInDay);
        listOrange.push(objOrange / countInDay);
        listGreen.push(objGreen / countInDay);

        source = [listTime, listGreen, listOrange, listRed];
        let option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            title: {
                text: this.props.type,

            },
            dataset: {
                source: source
            },
            color: ['green', 'orange', 'red', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            xAxis: {type: 'category'},
            yAxis: {gridIndex: 0},
            grid: {top: '55%'},
            series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    label: {
                        formatter: '{b}: {@' + listTime[1] + '} ({d}%)'
                    },
                    encode: {
                        itemName: 'Time',
                        value: listTime[1],
                        tooltip: listTime[1]
                    }
                }
            ]
        };
        return option;
    }

    updateAxisPointer(event, chart) {
        let xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            let dimension = xAxisInfo.value + 1;
            let option = {
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            };
            chart.setOption(option);
        }
    }

    onChartReadyCallback() {
        const divGraph = document.querySelectorAll('.echarts-for-react');
        for (let item of divGraph) {
            item.style.height = "700px";
        }
    }


    render() {
        let onEvents = {
            'updateAxisPointer': this.updateAxisPointer
        };
        if (this.props.dataSummaryGraph.length === 0) {
            return null;
        } else {
            return (
                <ReactEcharts fluid
                              option={this.getOption(this.props.dataSummaryGraph)}
                              notMerge={true}
                              lazyUpdate={true}
                    // theme={"dark"}
                              onChartReady={this.onChartReadyCallback}
                              onEvents={onEvents}/>
            );
        }

    }

}

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            startValue: null,
            endValue: null,
            endOpen: false,
            valueLess: 75,
            valueMore: 90,
            dataSummaryGraphPeering: [],
            dataSummaryGraphTransit: []
        }
    }


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
    // onChange Number


    onChangeLess = (value) => {
        this.setState({
            valueLess: value
        })
    }
    onChangeMore = (value) => {
        this.setState({
            valueMore: value
        })
    }
    // Ve bieu do
    handleDraw = () => {
        const {startValue, endValue, valueLess, valueMore} = this.state;
        if (startValue && endValue) {
            const startDate = startValue._d.toISOString();
            const dateStartConvert = moment(startDate).format("YYYY-MM-DD");
            const endDate = endValue._d.toISOString();
            const dateEndConvert = moment(endDate).format("YYYY-MM-DD");
            axios({
                method: "GET",
                url: `https://netd.ast.fpt.net/netd-api/api/get-log-summary-irb-for-graph?from=${dateStartConvert}&to=${dateEndConvert}&okSize=${valueLess}&criticalSize=${valueMore}`
            }).then(res => {
                console.log(typeof res.data.status)
                if (res.data.status === 200) {
                    message.success("Get data successfully!!");
                    const dataDraw = res.data.data;
                    const dataSummaryGraphPeering = [];
                    const dataSummaryGraphTransit = [];
                    dataDraw.map((data) => {
                        if (data.type == "peering") {
                            dataSummaryGraphPeering.push(data)
                        } else {
                            dataSummaryGraphTransit.push(data)
                        }
                    })
                    this.setState({
                        dataSummaryGraphPeering: dataSummaryGraphPeering,
                        dataSummaryGraphTransit: dataSummaryGraphTransit

                    })
                }
            })
        } else if (res.data.status === 500) {
            console.log("a")
            message.info("Empty data!!")
        } else {
            message.error("Get data error!!!")
        }
    }

    render() {
        const {startValue, endValue, endOpen, dataSummaryGraphPeering, dataSummaryGraphTransit} = this.state;
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
                            // defaultValue={moment().today()}
                            value={endValue}
                            placeholder="End"
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                        />
                    </div>
                    <div className="input-number" style={{float: "left", marginRight: 10, width: 200}}>
                        <h4 style={{color: "green"}}>OK(less than)</h4>
                        <InputNumber style={{width: 180}} min={0} max={98} defaultValue={75}
                                     onChange={this.onChangeLess}/>
                    </div>
                    <div className="input-number" style={{float: "left", marginRight: 10, width: 200}}>
                        <h4 style={{color: "orange"}}>WARNING (beetween)</h4>
                        <InputGroup compact>
                            <Input
                                style={{width: 75, textAlign: 'center'}}
                                value={this.state.valueLess}
                            />
                            <Input
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff',
                                }}
                                placeholder="-"
                                disabled
                            />
                            <Input
                                style={{width: 75, textAlign: 'center', borderLeft: 0}}
                                value={this.state.valueMore}
                            />
                        </InputGroup>
                    </div>
                    <div className="input-number" style={{float: "left", marginRight: 10, width: 200}}>
                        <h4 style={{color: "red"}}>CRITICAL (more than)</h4>
                        <InputNumber
                            style={{width: 180}}
                            min={1} max={99}
                            defaultValue={90}
                            onChange={this.onChangeMore}/></div>

                    <div>
                        <Button
                            style={{
                                backgroundColor: "green",
                                color: "white",
                                fontWeight: 700,
                                marginTop: 27,
                                width: 150
                            }}
                            onClick={this.handleDraw}
                        > Draw </Button>
                    </div>

                </Card>
                <div style={{marginTop: 20}}>
                    <Card width={8}>
                        <Row>
                            <Col span={12}><GraphSummary
                                dataSummaryGraph={dataSummaryGraphPeering}
                                type={"Peering summary"}/></Col>
                            <Col span={12}> <GraphSummary
                                dataSummaryGraph={dataSummaryGraphTransit}
                                type={"Transit summary"}/></Col>
                        </Row>

                    </Card>
                </div>

            </div>
        )
    }
}

export default Summary;