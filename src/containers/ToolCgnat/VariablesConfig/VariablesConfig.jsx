import React from "react";
import {Table, Icon, Card, Modal, Button,Row,Col,Input,InputNumber} from 'antd';
import {VariablesConfigWrapper} from "./VariablesConfig.style"
import axios from "axios";
import {number} from "prop-types";
const { TextArea } = Input;

class VariablesConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            dataGet:[],
            visible:false,
            dataDetail:[],
            disableButton:true
        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/variables-config"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            console.log(data);
            let dataObject = data.map((data, index) => {
                return {
                    "index": index + 1,
                    data
                }
            })
            this.setState({
                dataTable: dataObject,
                dataGet:dataObject
            })
        }
    }
//
    handleClick=(index)=>{
        const {dataGet}=this.state;
        const dataDetail=[]
        dataGet.map((data,idx)=>{
            if(data.index==index){
                dataDetail.push(data)
            }
        })
        this.setState({
            visible:true,
            dataDetail:dataDetail
        })
    }
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }
    //change Number
    handleChangeNumber=(value)=>{
        console.log(value);
        this.setState({
            disableButton:false
        })
    }
    render() {
        const {dataDetail}=this.state;
       const nana= dataDetail.map((data,index)=>{
            return{
                index:index+1,
                name:data.data.variables_name.toUpperCase(),
                description:data.data.variables_description,
                value:data.data.variables_value,
                note:data.data.Note


            }
        });
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Name',
                key: 'variables_name',
                render: record => {
                    return record.data.variables_name
                }

            },

            {
                title: 'Description',
                key: 'variables_description',
                render: record => {
                    return record.data.variables_description
                }
            },
            {
                title: 'Value',
                key: 'variables_value',
                render: record => {
                    return record.data.variables_value
                }
            },
            {
                title: 'Note',
                key: 'Note',
                render: record => {
                    return record.data.Note
                }
            },
            {
                title: 'Actions',
                key: 'actions',
                render: record => {
                    return <div style={{width: 28, height: 28, backgroundColor: "#fbbd08", borderRadius: 5}}>
                        <Icon
                            style={{margin: 6, color: "white"}}
                            type="edit"
                            onClick={()=>this.handleClick(record.index)}
                        />
                    </div>
                }

            },


        ];


        return (
            <VariablesConfigWrapper>
                <Card>
                    <h2>VariablesConfig</h2>
                </Card>

                <Card style={{marginTop: 10}}>

                    <Table
                        id="table-detail"
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        rowKey={record => record.index}
                    />
                </Card>
                <Modal
                    width={800}
                    style={{height: 500}}
                    closable={false}
                    title={`Edit Variable config`}
                    centered
                    visible={this.state.visible}
                    footer={[
                       <div>
                           <Button key={1} type="primary" onClick={() => this.handleSave()} disabled={this.state.disableButton}>Save</Button>
                           <Button key={2} type="danger" onClick={() => this.handleCancel()}>Close</Button>
                       </div>
                    ]}
                >
                    {nana.map(item=>{
                        console.log(item)
                        return(
                            <div>
                                <Row>
                                    <Input addonBefore="Name" style={{marginBottom:10}} key={1} value={item.name} disabled/>
                                    <Input type="number" addonBefore="Value" style={{marginBottom:10}} defaultValue={item.value} onChange={()=>this.handleChangeNumber()}/>
                                    <Input addonBefore="Note"style={{marginBottom:10}} value={item.note} disabled/>
                                </Row>
                                <h4>Description</h4>
                                <TextArea rows={4}  value={item.description}/>
                            </div>
                        )
                    })}
                </Modal>


            </VariablesConfigWrapper>

        )
    }
}

export default VariablesConfig;