import React from "react";
import {Table, Icon, Button, Form, Modal, Input, Select, Card} from 'antd';
import {LogConfigWrapper} from "./LogConfig.style"
import axios from "axios";

const {Option} = Select;
const { confirm } = Modal;
const CreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props){
            super(props);
            this.state={
                disableButton:true
            }
        }
        handleChange = (value) => {
            console.log(`selected ${value}`);
            this.setState({
                disableButton:false
            })
        }

        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create or Edit Log config"
                    closable={false}
                    footer={[
                        <div>
                            <Button icon="check" key={1} type="primary" onClick={onCreate}
                                    style={{backgroundColor: "#16ab39"}} disabled={this.state.disableButton}>Save</Button>
                            <Button key={2} type="danger" onClick={onCancel}>Close</Button>
                        </div>
                    ]}

                >
                    <Form layout="vertical">
                        <Form.Item>
                            {getFieldDecorator('functionName', {
                                rules: [{required: false, message: 'Please input the title of collection!'}],
                            })(<Input  onChange={this.handleChange} addonBefore="Message"/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('note')(<Input addonBefore="Times scan" type="number"/>)}
                        </Form.Item>
                        <Form.Item label="Type:" style={{fontWeight: 600}}>
                            <Select style={{width: 200}} defaultValue={"Kibana"}>
                                <Option value="Kibana">Kibana</Option>
                                <Option value="Opsview">Opsview</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);
const EditForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {


        handleChange = (value) => {
            console.log(`selected ${value}`);
        }
         jsUcfirst=(string) =>{
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        render() {
            const {visibleEdit, onCancel, onCreate, dataEdit} = this.props;
            console.log(dataEdit);
            if (dataEdit) {
                const nana = dataEdit.map((data, index) => {
                    return {
                        index: index + 1,
                        message: data.dataObj.log_message,
                        timescan: data.dataObj.times_scan,
                        type: this.jsUcfirst(data.dataObj.type),
                    }
                });


                return (
                    <Modal
                        visible={visibleEdit}
                        title="Create or Edit Log config"
                        closable={false}
                        footer={[
                            <div>
                                <Button icon="check" key={1} type="primary" onClick={onCreate}
                                        style={{backgroundColor: "#16ab39"}}>Save</Button>
                                <Button key={2} type="danger" onClick={onCancel}>Close</Button>
                            </div>
                        ]}
                    >
                        <Form layout="vertical">
                            {nana.map(data=>{
                                return (<div>
                                    <Form.Item>
                                      <Input addonBefore="Message" defaultValue={data.message}/>
                                    </Form.Item>
                                    <Form.Item label="Times scan">
                                        <Input type="number" addonBefore={`Times scan`} defaultValue={data.timescan}/>
                                    </Form.Item>
                                    <Form.Item label="Type:" style={{fontWeight: 600}} >
                                        <Select onChange={this.handleChange} style={{width: 200}} defaultValue={data.type}>
                                            <Option value="Kibana">Kibana</Option>
                                            <Option value="Opsview">Opsview</Option>
                                        </Select>
                                    </Form.Item>
                                </div>)
                            })}
                        </Form>
                    </Modal>
                )
            }else{
                return null
            }
        }
    }
);

class LogConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            dataGet: [],
            startValue: null,
            endValue: null,
            endOpen: false,
            visibleCreate: false,
        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/log-config-tool-cgnat"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            let dataObject = data.map((dataObj, index) => {
                return {
                    "index": index + 1,
                    dataObj
                }
            })
            this.setState({
                dataTable: dataObject,
                dataGet: dataObject
            })
        }
    }

// Create
    showModal = () => {
        this.setState({visibleCreate: true});
    };

    handleCancel = () => {
        this.setState({visibleCreate: false, visibleEdit:false});
    };

    handleCreate = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            this.setState({visibleCreate: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };
// Edit
    handleEdit = (value) => {
        console.log(value);
        const {dataGet} = this.state;
        const dataEdit = [];
        dataGet.map((data, idx) => {
            if (data.index == value) {
                dataEdit.push(data)
            }
        });

        this.setState({
            visibleEdit: true,
            dataEdit: dataEdit
        })
    }
// Delete
    handleDelete=value=>{
        confirm({
            title: 'Delete Log config',
            content: 'Are you want to delete this log?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Log Message',
                key: 'log_message',
                render: record => {
                    return record.dataObj.log_message
                }

            },

            {
                title: 'Times Scan',
                key: 'times_scan',
                render: record => {
                    return record.dataObj.times_scan
                }
            },
            {
                title: 'Actions',
                key: 'actions',
                render: record => {
                    return (<div>
                        <Icon type="edit" style={{
                            width: 26,
                            height: 26,
                            backgroundColor: "#fbbd08",
                            padding: 5,
                            color: "white",
                            fontWeight: 700,
                            borderRadius: 5
                        }}
                              onClick={() => this.handleEdit(record.index)}
                        />&nbsp;
                        <Icon type="delete" style={{
                            width: 26,
                            height: 26,
                            backgroundColor: "#db2828",
                            padding: 5,
                            color: "white",
                            fontWeight: 700,
                            borderRadius: 5
                        }}
                           onClick={()=>this.handleDelete(record.index)}
                        />
                    </div>)
                }

            },


        ];

        const {dataEdit} = this.state;
        return (
            <LogConfigWrapper>
                <Card style={{width: "100%", fontWeight: 600, marginBottom: 10}}>
                    <h2>Log Config</h2>
                    <Button style={{backgroundColor: "#21ba45", color: "white"}} onClick={this.showModal}> + Create
                        log</Button>
                    <CreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visibleCreate}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                    <EditForm
                        visibleEdit={this.state.visibleEdit}
                        onCancel={this.handleCancel}
                        dataEdit={dataEdit}
                    />
                </Card>

                <Card className="table">
                    <Table
                        style={{marginTop: 30}}
                        id="table-detail"
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        // pagination={{ defaultPageSize: 20}}
                        rowKey={record => record.index}
                    />
                </Card>


            </LogConfigWrapper>

        )
    }
}

export default LogConfig;