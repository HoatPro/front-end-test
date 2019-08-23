import React from "react";
import axios from "axios";
import {message, DatePicker, Select, Card, Table, Col, Row, Modal, Icon, Button,Input} from "antd";
import {IRBDetailWrapper} from "./IRBDetail.style";
import TableListPort from "./TableListPort"
import moment from "moment";

const dateFormat = 'DD/MM/YYYY';
const {Option} = Select;
const {Search}=Input
class IRBDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listTime: [],
            dataSelected: [],
            dataTable: [],
            dataDetail:[],
            visible: false,

        }
    }

    async componentDidMount(): void {
        let today = moment(new Date());
        const todaySelected = today._d.toISOString();
        const dateConvert = moment(todaySelected).format("YYYY-MM-DD");
        const options = {
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/get-all-time-in-day?date=${dateConvert}`
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            const dataObj = data.map((dt, index) => {
                return {
                    "index": index + 1,
                    dt
                }
            })
            message.success("GET data successfully");
            this.setState({
                listTime: dataObj
            })
        }


    }

    onChange = (dateString) => {
        const myDate = new Date(dateString._d);
        const dateSelected = myDate.toISOString();
        axios({
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/get-all-time-in-day?date=${dateSelected}`
        }).then(res => {
            if (res.status) {
                const dataObj = res.data.data.map((dt, index) => {
                    return {
                        "index": index + 1,
                        dt
                    }
                })
                message.success("GET data successfully");
                this.setState({
                    listTime: dataObj
                })
            }
        })

    }

    handleChange = (value) => {
        const {listTime} = this.state;
        const timeSelected = []
        listTime.map((dt, index) => {
            if (value == dt.index) {
                timeSelected.push(dt.dt)
            } else return null;
        });
        axios({
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/get-detail-info-irb?time=${timeSelected}`
        }).then(res => {
            if (res.status) {
                message.success('GET detail Group MP successfully!');
                const dataNew = res.data.data[0].data;
                const dataTable = [];
                dataNew.map((dt, index) => {
                    if (dt.bgpV4 != null && dt.bgpV6 != null) {
                        dataTable.push(
                            {
                                index: index,
                                dt
                            }
                        )
                    }
                })
                this.setState({
                    dataTable: dataTable
                })
            }
        })

    }

    //Deatail

    handleClick = (index) => {
        const {dataTable} = this.state;

        const dataDetail = [];
        dataTable.map(data => {
            if (data.index == index) {
                dataDetail.push(data)
            } else {
                return null
            }
        });
        this.setState({
            visible: true,
            dataDetail:dataDetail
        });

    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {listTime,dataDetail} = this.state;
        const children = [];
        listTime.map((list, index) => {
            children.push(<Option
                key={index + 1}>{moment(`${list.dt}`).utcOffset("+00:00").format("DD/MM/YYYY HH:mm:ss")}</Option>);
        });
        const {dataTable} = this.state;
        const columns = [
            {
                title: 'Irb',
                key: 'name',
                render: record => {
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
                    if (record.dt.bgpV4 === null) {
                        return null
                    }
                    return record.dt.bgpV4.export.replace("-Export", "")
                }
            },
            {
                title: 'BGP v6',
                key: 'bgpv6',
                render: record => {
                    if (record.dt.bgpV6 === null) {
                        return null
                    }
                    return record.dt.bgpV6.export.replace("-Export", "")
                }
            },
            {
                title: 'Traffic in',
                key: 'traffic-in',
                render: record => {
                    return <div> {record.dt.totalTrafficIn} Mb ({record.dt.percentTrafficIn.toFixed(2)}%){" "}</div>
                }
            },
            {
                title: 'Traffic out',
                key: 'traffic-out',
                render: record => {
                    return <div>{record.dt.totalTrafficOut} Mb ({record.dt.percentTrafficOut.toFixed(2)}%){" "}</div>
                }
            },
            {
                title: 'Action',
                key: 'action',
                render: record => {
                    return <Icon
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
                }
            }
        ]
        console.log(dataDetail);
        const dataConvert=dataDetail.map(data=>{

            return {
                name:data.dt.irbName,
                hostName:data.dt.hostName,
                region:data.dt.region,
                irbDetail:data.dt.irbDetail,
                type:data.dt.type,
                description:data.dt.description,
                totalTrafficIn:data.dt.totalTrafficIn,
                percentTrafficIn:data.dt.percentTrafficIn,
                totalTrafficOut:data.dt.totalTrafficOut,
                percentTrafficOut:data.dt.percentTrafficOut,

                ipv4:data.dt.bgpV4.ip,
                acceptedPrefixv4:data.dt.bgpV4.acceptedPrefix,
                hostNamev4:data.dt.bgpV4.hostName,
                asv4:data.dt.bgpV4.as,
                hostIpv4:data.dt.bgpV4.hostIp,
                groupv4:data.dt.bgpV4.group,
                advertisedPrefixv4:data.dt.bgpV4.advertisedPrefix,
                typev4:data.dt.bgpV4.type,
                importv4:data.dt.bgpV4.import,
                exportv4:data.dt.bgpV4.export,

                ipv6:data.dt.bgpV6.ip,
                acceptedPrefixv6:data.dt.bgpV6.acceptedPrefix,
                hostNamev6:data.dt.bgpV6.hostName,
                asv6:data.dt.bgpV6.as,
                hostIpv6:data.dt.bgpV6.hostIp,
                groupv6:data.dt.bgpV6.group,
                advertisedPrefixv6:data.dt.bgpV6.advertisedPrefix,
                typev6:data.dt.bgpV6.type,
                importv6:data.dt.bgpV6.import,
                exportv6:data.dt.bgpV6.export,

                listPortInfo:data.dt.listPortInfo


            }
        })
        console.log(dataConvert);

        return (
            <IRBDetailWrapper className="page-center">
                <Card style={{width: "100%"}}>
                    <Row className="irb-detail" style={{marginBottom: 20}}>
                        <Col style={{width: 200, marginRight: 25}} span={8}>
                            <h4> Search by name...</h4>
                            <Search placeholder="Search by name..."/>
                        </Col>
                        <Col style={{width: 200}} span={8}>
                            <h4>Choose log date</h4>
                            <DatePicker
                                onChange={this.onChange}
                                defaultValue={moment().subtract(0, 'days')}
                                format={dateFormat}
                            />
                        </Col>
                        <Col style={{width: 200}} span={8}>
                            <h4> Search by time</h4>
                            <Select
                                style={{width: '100%'}}
                                defaultValue={"all"}
                                onChange={this.handleChange}
                            >
                                {children}
                            </Select>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={dataTable}
                        bordered
                        rowKey={record => record.index}
                    />
                </Card>

                <Modal
                    width={1600}
                    title="IRB Detail"
                    visible={this.state.visible}
                    closable={false}
                    footer={[
                        <div>
                            <Button type="danger" onClick={this.handleCancel}>Close</Button>
                        </div>
                    ]}
                >
                    {dataConvert.map(data=>{
                        return(
                         <div>
                             <Card style={{marginBottom:10}}>
                                 <Row style={{marginBottom:10}}>
                                     <Col span={8} style={{marginRight:10,width:480}}>
                                         <h4>Irb Name</h4>
                                         <Input value={data.name}/>
                                     </Col>
                                     <Col span={8} style={{marginRight:10,width:480}}>
                                         <h4>Host Name</h4>
                                         <Input value={data.hostName}/>
                                     </Col>
                                     <Col span={8} style={{width:480}}>
                                         <h4>Region</h4>
                                         <Input value={data.region}/>
                                     </Col>
                                 </Row>
                                 <Row>
                                     <Col span={8} style={{marginRight:10,width:480}}>
                                         <h4>Irb Detail</h4>
                                         <Input value={data.irbDetail}/>
                                     </Col>
                                     <Col span={8} style={{marginRight:10,width:480}}>
                                         <h4>Type</h4>
                                         <Input value={data.type}/>
                                     </Col>
                                     <Col span={8} style={{width:480}}>
                                         <h4>Description</h4>
                                         <Input value={data.description}/>
                                     </Col>
                                 </Row>
                             </Card>
                             <Card style={{marginBottom:10}}>
                                 <Row>
                                     <Col span={12}>
                                         <Card title="Traffic In"  style={{ backgroundColor:"#FFFAF3"}}>
                                             {data.totalTrafficIn} Mb ({data.percentTrafficIn.toFixed(2)}%){" "}</Card>
                                     </Col>
                                     <Col span={12}>
                                         <Card title="Traffic Out" style={{backgroundColor:"#FCFFF5"}}>
                                             {data.totalTrafficOut} Mb ({data.percentTrafficOut.toFixed(2)}%){" "}</Card>
                                     </Col>
                                 </Row>
                             </Card>

                             <Card style={{marginBottom:10}}>
                                 <Row>
                                     <Col span={12}>
                                         <Card title="BGP V4">
                                             <Row style={{marginBottom:10}}>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Irb Name</h4>
                                                     <Input value={data.name}/>
                                                 </Col>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>IP</h4>
                                                     <Input value={data.ipv4}/>
                                                 </Col>
                                                 <Col span={8} style={{width:210}}>
                                                     <h4>Accepted Prefix</h4>
                                                     <Input value={data.acceptedPrefixv4}/>
                                                 </Col>
                                             </Row>
                                             <Row style={{marginBottom:10}}>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Host Name</h4>
                                                     <Input value={data.hostNamev4}/>
                                                 </Col>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>As</h4>
                                                     <Input value={data.asv4}/>
                                                 </Col>
                                                 <Col span={8} style={{width:210}}>
                                                     <h4>Host IP</h4>
                                                     <Input value={data.hostIpv4}/>
                                                 </Col>
                                             </Row>
                                             <Row style={{marginBottom:10}}>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Group</h4>
                                                     <Input value={data.groupv4}/>
                                                 </Col>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Advertised Prefix</h4>
                                                     <Input value={data.advertisedPrefixv4}/>
                                                 </Col>
                                                 <Col span={8} style={{width:210}}>
                                                     <h4>Type</h4>
                                                     <Input value={data.typev4}/>
                                                 </Col>
                                             </Row>
                                             <Row>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Import</h4>
                                                     <Input value={data.importv4}/>
                                                 </Col>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Export</h4>
                                                     <Input value={data.exportv4}/>
                                                 </Col>

                                             </Row>
                                         </Card>
                                     </Col>
                                     <Col span={12}>
                                         <Card title="BGP V6">
                                             <Row style={{marginBottom:10}}>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Irb Name</h4>
                                                     <Input value={data.name}/>
                                                 </Col>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>IP</h4>
                                                     <Input value={data.ipv6}/>
                                                 </Col>
                                                 <Col span={8} style={{width:210}}>
                                                     <h4>Accepted Prefix</h4>
                                                     <Input value={data.acceptedPrefixv6}/>
                                                 </Col>
                                             </Row>
                                             <Row style={{marginBottom:10}}>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Host Name</h4>
                                                     <Input value={data.hostNamev6}/>
                                                 </Col>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>As</h4>
                                                     <Input value={data.asv6}/>
                                                 </Col>
                                                 <Col span={8} style={{width:210}}>
                                                     <h4>Host IP</h4>
                                                     <Input value={data.hostIpv6}/>
                                                 </Col>
                                             </Row>
                                             <Row style={{marginBottom:10}}>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Group</h4>
                                                     <Input value={data.groupv6}/>
                                                 </Col>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Advertised Prefix</h4>
                                                     <Input value={data.advertisedPrefixv6}/>
                                                 </Col>
                                                 <Col span={8} style={{width:210}}>
                                                     <h4>Type</h4>
                                                     <Input value={data.typev6}/>
                                                 </Col>
                                             </Row>
                                             <Row>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Import</h4>
                                                     <Input value={data.importv6}/>
                                                 </Col>
                                                 <Col span={8} style={{marginRight:20,width:210}}>
                                                     <h4>Export</h4>
                                                     <Input value={data.exportv6}/>
                                                 </Col>

                                             </Row>
                                         </Card>
                                     </Col>
                                 </Row>
                             </Card>
                             <Card >
                                 <Card title="List Port Info">
                                     <TableListPort  dataListPort={data.listPortInfo}/>
                                 </Card>
                             </Card>
                         </div>
                        )
                    })}

                </Modal>
            </IRBDetailWrapper>
        );
    }
}

export default IRBDetail;
