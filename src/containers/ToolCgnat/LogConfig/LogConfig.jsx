import React from "react";
import {Table, Icon, Button, Form, Modal, Input,Select} from 'antd';
import axios from "axios";
const { Option } = Select
const CreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        handleChange=(value)=> {
            console.log(`selected ${value}`);
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create or Edit Log config"
                    onCancel={onCancel}
                    onOk={onCreate }
                    okText="Save"
                    cancelText="Close"

                >
                    <Form layout="vertical">
                        <Form.Item label="Message">
                            {getFieldDecorator('functionName', {
                                rules: [{ required: false, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Times scan">
                            {getFieldDecorator('note')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="Type:">
                            <Select onChange={this.handleChange} style={{width:200}}>
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
const EditForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        handleChange=(value)=> {
            console.log(`selected ${value}`);
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create or Edit Log config"
                    onCancel={onCancel}
                    onOk={onCreate }
                    okText="Save"
                    cancelText="Close"

                >
                    <Form layout="vertical">
                        <Form.Item label="Message">
                            {getFieldDecorator('functionName', {
                                rules: [{ required: false, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Times scan">
                            {getFieldDecorator('note')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="Type:">
                            <Select onChange={this.handleChange} style={{width:200}}>
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
class LogConfig extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/log-config-tool-cgnat"
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
            console.log(dataObject)
            this.setState({
                dataTable:dataObject
            })
        }
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

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
                render:record=>{
                    return record.dataObj.log_message
                }

            },

            {
                title: 'Times Scan',
                key: 'times_scan',
                render:record=>{
                    return record.dataObj.times_scan
                }
            },
            {
                title: 'Actions',
                key:'actions',
                render:record=>{
                    return (<div>
                        <div style={{width:28, height:28,backgroundColor:"#fbbd08"}}>
                            <Icon style={{margin:6,color:"white"}} type="edit" />
                        </div>
                        <div style={{width:28, height:28,backgroundColor:"#db2828"}}>
                            <Icon style={{margin:6,color:"white"}} type="edit" />
                        </div>
                    </div>)
                }

            },


        ];



        return (
            <div>
                <div>
                    <h2>LogConfig</h2>
                    <Button style={{ backgroundColor:"#21ba45", color:"white"}} onClick={this.showModal}> + Create log</Button>
                    <CreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                </div>

                <div className="table" >
                    <Table
                        style={{marginTop:30}}
                        id="table-detail"
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        // pagination={{ defaultPageSize: 20}}
                        rowKey={record => record.index}
                    />
                </div>


            </div>

        )
    }
}

export default LogConfig;