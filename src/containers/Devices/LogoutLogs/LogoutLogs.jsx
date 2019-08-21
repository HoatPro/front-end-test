import React from "react";
import {Card, Tabs, Table, message, Icon, DatePicker, Select, Alert, Modal, Button} from 'antd';
import {LogoutLogsWrapper} from "./LogoutLogs.style"
import axios from "axios";
import Search from "antd/lib/input/Search";
import moment from "moment";

const dateFormat = 'DD/MM/YYYY';
import TableDetail from "./TableDetail";

const {TabPane} = Tabs;

class LogoutLogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            successCnt: null,
            successPercent: null,
            length: null,
            timeList: [],
            dataLogs: [],
            visible: false

        }
    }

    componentDidMount() {
        let today = moment(new Date());
        const date = today._d.toISOString();
        axios({
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/logout-juniper-device-logs?date=${date}`
        }).then(res => {
            if (res.status) {
                message.success("GET logs successfull!");
                const successCnt = res.data.reduce((sum, e) => (sum + e.status), 0);
                const successPercent = Math.round(successCnt / res.data.length * 100 * 100) / 100;
                const dataObj = res.data.map((data, index) => {
                    return {
                        index: index + 1,
                        data,
                        successCnt,
                        successPercent,

                    }
                })
                this.setState({
                    dataTable: dataObj,
                    successCnt: successCnt,
                    successPercent: successPercent,
                    length: res.data.length,
                    dataGet: res.data,
                    timeList: this.getTimeList(res.data)

                })
            } else {
                message.error("GET data Error!!!")
            }
        })


    }


    onChange = (dateString) => {
        const dateSelected = dateString.toISOString();
        axios({
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/logout-juniper-device-logs?date=${dateSelected}`
        }).then(res => {
            if (res.status) {
                message.success("GET logs successfull!");
                const successCnt = res.data.reduce((sum, e) => (sum + e.status), 0);
                const successPercent = Math.round(successCnt / res.data.length * 100 * 100) / 100;
                const dataObj = res.data.map((data, index) => {
                    return {
                        index: index + 1,
                        data,
                        successCnt,
                        successPercent,

                    }
                })
                this.setState({
                    dataTable: dataObj,
                    successCnt: successCnt,
                    successPercent: successPercent,
                    length: res.data.length,
                    dataGet: res.data

                })
            } else {
                message.error("GET data Error!!!")
            }
        })

    }


    ///

    getTimeList(listData) {
        const set = new Set();

        for (let item of listData) {
            set.add(item.time);
        }

        return [...set];
    }

    //

    handleClick = (index) => {
        const {dataTable} = this.state;
        const dataLogs = [];
        dataTable.filter(data => {
            if (data.index == index) {
                dataLogs.push(data)
            }
        })
        this.setState({
            visiable: true,
            dataLogs: dataLogs
        })
    }
    setVisible = (visiable) => {
        this.setState({
            visiable: visiable
        })
    }

    render() {
        const {length, dataTable, successCnt, successPercent, timeList, dataLogs} = this.state;
        const select = [];
        timeList.map((time, index) => {
            select.push(<Option key={index}>{time}</Option>)
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
                title: 'Status',
                key: 'status',
                render: record => {
                    return <div>  {
                        record.data.status ? <Icon type="check" style={{color: "green"}}/> :
                            <Icon type="close" style={{color: "red", fontWeight: 700}}/>
                    }</div>
                }
            },

            {
                title: 'Times',
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
                key: 'ip',
                render: record => {
                    return record.data.ip
                }
            },
            {
                title: 'Error',
                key: 'error',
                render: record => {
                    return record.data._error
                }
            },
            {
                title: 'Users',
                key: 'users',
                render: record => {
                    return <div>{Array.isArray(record.data.users) ? record.data.users.length : ''}</div>
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
                                borderRadius: 5
                            }}
                            onClick={() => this.handleClick(record.index)}
                        />
                        <Modal
                            width={800}
                            title="Users of device NOC-NET-HCM-CGNAT-04-118.69.185.252 | 118.69.185.252"
                            centered
                            visible={this.state.visiable}
                            footer={[
                                <Button key={1} type="danger" onClick={() => this.setVisible(false)}>Close</Button>
                            ]}
                        >
                            <TableDetail data={dataLogs}/>
                        </Modal>
                    </div>)
                }
            },

        ]
        return (
            <LogoutLogsWrapper>
                <Card style={{width: "100%", fontWeight: 600, marginBottom: 15}}>
                    <h2 style={{fontWeight: 700}}>Logs</h2>

                    <div style={{width: 1200, marginBottom: 100}}>
                        <div style={{width: 200, float: "left"}}>
                            <h4>Choose log date</h4>
                            <DatePicker
                                onChange={this.onChange}
                                defaultValue={moment(new Date())}
                                format={dateFormat}
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
                                onChange={this.handleChange}
                            >
                                {select}
                            </Select>
                        </div>

                    </div>
                </Card>
                <Card>
                    <Alert style={{fontWeight: 650, textAlign: "center"}}
                           message={`${successCnt}/${length}(${successPercent}%)`} type="info"/>
                    <Table
                        style={{fontWeight: 500, marginTop: 10}}
                        columns={columns}
                        dataSource={dataTable}
                        bordered
                        rowKey={record => record.index}
                    />

                </Card>
            </LogoutLogsWrapper>
        );
    }
}

export default LogoutLogs;


