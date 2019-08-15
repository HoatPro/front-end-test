import React from "react";
import { Table, DatePicker, InputNumber,Input ,Button, Card} from 'antd';
const InputGroup=Input.Group;
import axios from "axios";
import moment from "moment";

class Summary extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            startValue: null,
            endValue: null,
            endOpen: false,
            valueLess:75,
            valueMore:90
        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/error-logs-tool-cgnat"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            console.log(data);
            let dataObject=data.map((dataObj,index)=>{
                return{
                    "index":index+1,
                    dataObj
                }



            })
            this.setState({
                dataTable:dataObject
            })
        }
    }

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
   // onChange Number


    onChangeLess=(value)=>{
     console.log(value);
     this.setState({
         valueLess:value
     })
    }
    onChangeMore=(value)=>{
      this.setState({
          valueMore:value
      })
    }
    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Name',
                key: 'device_name',
                render:record=>{
                    return record.dataObj.device_name
                }

            },

            {
                title: 'Ip',
                key: 'device_ip',
                render:record=>{
                    return record.dataObj.device_ip
                }
            },
            {
                title: 'FPC Slot',
                key: 'fpc_slot',
                render:record=>{
                    return record.dataObj.fpc_slot
                }
            },
            {
                title: 'Pic Slot',
                key: 'pic_slot',
                render:record=>{
                    return record.dataObj.pic_slot
                }
            },
            {
                title: 'Card',
                key: 'card',
                render:record=>{
                    return record.dataObj.card
                }
            },
            {
                title: 'Log Message',
                key: 'log_message',
                render:record=>{
                    return record.dataObj.log_message
                }
            },
            {
                title: 'Timestamp',
                key:'time_stamp',
                render:record=>{
                    return record.dataObj.time_stamp
                }

            },
        ];

        const { startValue, endValue, endOpen } = this.state;

        return (
            <div>
                <Card className="selection_date" style={{ marginBottom:20}}>
                    <h2 style={{fontWeight:"640"}}>IRB</h2>
                    <div className="from_date" style={{ float:"left"}}>
                        <h4 style={{fontWeight:"560"}}>From</h4>
                        <DatePicker
                            style={{marginRight:20}}
                            disabledDate={this.disabledStartDate}
                            format="DD/MM/YYYY"
                            value={startValue}
                            placeholder="Start"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                        />
                    </div>
                    <div className="to_date">
                        <h4 style={{fontWeight:"560"}}>To</h4>
                        <DatePicker
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
                    <div className="input-number" style={{ marginTop:20}}>
                        <div> <h4 style={{color:"green"}}>OK(less than)</h4> <InputNumber min={0} max={98} defaultValue={75} onChange={this.onChangeLess} /></div>
                        <div>
                            <h4 style={{color:"orange"}}>WARNING (beetween)</h4>
                            <InputGroup compact>
                                <Input
                                    style={{ width: 50, textAlign: 'center' }}
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
                                    style={{ width: 50, textAlign: 'center', borderLeft: 0 }}
                                    value={this.state.valueMore}
                                />
                            </InputGroup>
                        </div>
                        <h4 style={{color:"red"}}>CRITICAL (more than)</h4> <InputNumber min={1} max={99} defaultValue={90} onChange={this.onChangeMore} />
                    </div>
                    <Button style={{backgroundColor:"green", color:"white", fontWeight:700, marginTop:10}}> Draw </Button>
                    <div className="table">

                        <Table
                            style={{marginTop:40}}
                            id="table-detail"
                            className="table-detail"
                            columns={columns}
                            dataSource={this.state.dataTable}
                            bordered
                            rowKey={record => record.index}
                        />
                    </div>
                </Card>

            </div>

        )
    }
}

export default Summary;