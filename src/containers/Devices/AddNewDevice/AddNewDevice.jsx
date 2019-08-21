import React from "react";
import {Card, Button, Table, message, Icon, DatePicker, Select, Alert, Tabs, Modal} from 'antd'
import axios from "axios";
import {AddNewDeviceWrapper} from "./AddNewDevie.style"
import Search from "antd/lib/input/Search";
import TableFail from "../AddNewDevice/TableFail";
import moment from "moment";
import TableDetail from "../AddNewDevice/TableDetail";

const dateFormat = 'DD/MM/YYYY';
const {TabPane} = Tabs;
const {Option} = Select;

class AddNewDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            totalPortCnt: null,
            totalSuccessPortCnt: null,
            totalSuccessPortPercent: null,
            dataGet: [],
            dataDetail: [],
            dataLogs: [],
            visible: false,
            timeList: [],
            idSelected: null
        }
    }

    async componentDidMount() {
        let today = moment(new Date());
        const todaySelected = today._d.toISOString();
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
            const dataFail = [];
            const dataObj = data.map((data, index) => {
                let successPortCnt = data.ports.reduce((sum, data) => (sum + data.existInOps), 0);
                let successPercent = (data.ports.length != 0 ? (Math.round(successPortCnt / data.ports.length * 100 * 100) / 100) : 100);
                if (successPercent < 100) {
                    dataFail.push(data)
                }
                return {
                    index: index + 1,
                    data,
                    successPortCnt,
                    successPercent,
                    length: data.ports.length
                }
            })

            this.setState({
                dataTable: dataObj,
                dataDetail: dataObj,
                totalPortCnt: totalPortCnt,
                totalSuccessPortCnt: totalSuccessPortCnt,
                totalSuccessPortPercent: totalSuccessPortPercent,
                dataGet: data,
                dataFail: dataFail,
                timeList: this.getTimeList(data)

            })
        } else {
            message.error("GET data Error!!!")
        }
    }

    getTimeList(listData) {
        const set = new Set();

        for (let item of listData) {
            set.add(item.time);
        }

        return [...set];
    }

    onChangeDate = (dateString) => {
        var myDate = new Date(dateString._d);
        const dateSelected = myDate.toISOString();
        axios({
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/add-device-to-opsview-logs?date=${dateSelected}`
        }).then(res => {
            if (res.status) {
                message.success("GET logs successfull!");
                const data = res.data.data;
                const totalPortCnt = data.reduce((sum, e) => (sum + e.ports.length), 0);
                const totalSuccessPortCnt = data.reduce((sum, e) => (sum + e.ports.reduce((s, port) => (s + port.existInOps), 0)), 0);
                const totalSuccessPortPercent = Math.round(totalSuccessPortCnt / totalPortCnt * 100 * 100) / 100;
                const dataFail = [];
                const dataObj = data.map((data, index) => {
                    let successPortCnt = data.ports.reduce((sum, data) => (sum + data.existInOps), 0);
                    let successPercent = (data.ports.length != 0 ? (Math.round(successPortCnt / data.ports.length * 100 * 100) / 100) : 100);
                    if (successPercent < 100) {
                        dataFail.push(data)
                    }
                    return {
                        index: index + 1,
                        data,
                        successPortCnt,
                        successPercent,
                        length: data.ports.length
                    }
                })
                this.setState({
                    dataTable: dataObj,
                    totalPortCnt: totalPortCnt,
                    totalSuccessPortCnt: totalSuccessPortCnt,
                    totalSuccessPortPercent: totalSuccessPortPercent,
                    dataGet: res.data.data,
                    dataFail: dataFail,
                    timeList: this.getTimeList(res.data.data)

                })
            } else {
                message.error("GET data Error!!!")
            }
        })

    }

    handleClick = (index) => {
        const {dataGet} = this.state;

    }
    setVisible = (visiable) => {
        this.setState({
            visiable: visiable
        })
    }
    // Change time
    handleChangeTime = (date) => {
        const {dataGet} = this.state;
        const dataDetail = [];
        dataGet.map(data => {
            if (data.time == date) {
                dataDetail.push(data)
            }
        });
        const totalPortCnt = dataDetail.reduce((sum, e) => (sum + e.ports.length), 0);
        const totalSuccessPortCnt = dataDetail.reduce((sum, e) => (sum + e.ports.reduce((s, port) => (s + port.existInOps), 0)), 0);
        const totalSuccessPortPercent = Math.round(totalSuccessPortCnt / totalPortCnt * 100 * 100) / 100;
        const dataFail = [];
        const dataObj = dataDetail.map((data, index) => {
            let successPortCnt = data.ports.reduce((sum, data) => (sum + data.existInOps), 0);
            let successPercent = (data.ports.length != 0 ? (Math.round(successPortCnt / data.ports.length * 100 * 100) / 100) : 100);
            if (successPercent < 100) {
                dataFail.push(data)
            }
            return {
                index: index + 1,
                data,
                successPortCnt,
                successPercent,
                length: data.ports.length
            }
        })
        this.setState({
            dataTable: dataObj,
            totalPortCnt: totalPortCnt,
            totalSuccessPortCnt: totalSuccessPortCnt,
            totalSuccessPortPercent: totalSuccessPortPercent,
            dataFail: dataFail,
        })
    }

    render() {
        const {dataTable, totalPortCnt, totalSuccessPortCnt, totalSuccessPortPercent, dataFail, dataLogs, timeList} = this.state;
        const listTime = [];
        timeList.map((time, index) => {
            listTime.push(
                <Option key={time}>{moment(`${time}`).format("YYYY-MM-DD HH:mm:ss")}</Option>
            )
        })
        const columns = [
            {
                title: 'Index',
                key: 'index',
                render: record => {
                    return record.index
                }
            },
            {
                title: 'Time',
                key: 'time',
                render: record => {
                    const times = record.data.time
                    return moment(times).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record.data.name
                }
            },
            {
                title: 'Ip',
                key: 'deactive-time',
                render: record => {
                    return record.data.ip
                }
            },
            {
                title: 'Function',
                key: 'function',
                render: record => {
                    return record.data.function
                }
            },
            {
                title: 'Method',
                key: 'method',
                render: record => {
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
                render: record => {
                    return (<div>
                        <Icon
                            type="eye"
                            style={{
                                width: 26,
                                height: 26,
                                backgroundColor: "#00b5ad",
                                padding: 5,
                                color: "white",
                                fontWeight: 700,
                                borderRadius: 5,
                                alignItems: "center"
                            }}
                            onClick={() => this.handleClick(record.index)}
                        />

                    </div>)
                }
            },

        ]
        return (
            <AddNewDeviceWrapper>
                <Card style={{width: "100%", fontWeight: 600, marginBottom: 15}}>
                    <h2 style={{fontWeight: 700}}>OPSVIEW</h2>
                    <h4> Add new device to opsview</h4>
                    <Button style={{
                        backgroundColor: "#21ba45",
                        color: "white",
                        fontWeight: 560,
                        float: "left",
                        width: 250
                    }}> + Add </Button>
                </Card>

                <Card style={{width: "100%"}}>
                    <h2>Logs</h2>
                    <div style={{width: 1200, marginBottom: 100}}>
                        <div style={{width: 200, float: "left"}}>
                            <h4>Choose log date</h4>
                            <DatePicker
                                onChange={this.onChangeDate}
                                format={dateFormat}
                                defaultValue={moment().subtract(0, 'days')}
                            />
                        </div>
                        <div style={{width: 200, float: "left"}}>
                            <h4> Search by name...</h4>
                            <Search style={{width: 180}} placeholder="Search by name..."/>
                        </div>

                        <div style={{width: 200, float: "left"}}>
                            <h4> Search by time</h4>
                            <Select
                                style={{width: 180}}
                                defaultValue={"all"}
                                onChange={this.handleChangeTime}
                            >
                                {listTime}
                            </Select>
                        </div>

                    </div>

                    <Tabs type="card">
                        <TabPane tab="Overview" key="1">
                            <Alert style={{fontWeight: 650, textAlign: "center", color: "#0e566c"}}
                                   message={`${totalSuccessPortCnt}/${totalPortCnt}(${totalSuccessPortPercent}%)`}
                                   type="info"/>
                            <Table
                                style={{fontWeight: 500, marginTop: 10}}
                                columns={columns}
                                dataSource={dataTable}
                                bordered
                                rowKey={record => record.index}
                            />

                        </TabPane>
                        <TabPane tab="Fail list" key="2">
                            <TableFail dataFail={dataFail}/>
                        </TabPane>

                    </Tabs>

                    <Modal
                        width={1200}
                        closable={false}
                        // title={`Ports of device ${record.data.name} | ${record.data.ip}`}
                        centered
                        visible={this.state.visiable}
                        footer={[
                            <Button key={1} type="danger" onClick={() => this.setVisible(false)}>Close</Button>
                        ]}
                    >
                        <TableDetail dataLogs={dataLogs}/>
                    </Modal>
                </Card>
            </AddNewDeviceWrapper>
        );
    }
}

export default AddNewDevice;


