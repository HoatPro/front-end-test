import React from "react";
import { Table, Button, Icon ,Modal,Form,Input, message} from 'antd';
import axios from "axios";
import Search from "antd/lib/input/Search";
const CreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create or Edit NET device Function"
                    onCancel={onCancel}
                    onOk={onCreate }
                    okText="Save"
                    cancelText="Close"

                >
                    <Form layout="vertical">
                        <Form.Item label="Function Name">
                            {getFieldDecorator('functionName', {
                                rules: [{ required: false, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Note">
                            {getFieldDecorator('note')(<Input type="textarea" />)}
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
        render() {
            const { visible, onCancel, onEdit, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create or Edit NET device Function"
                    onCancel={onCancel}
                    onOk={onEdit }
                    okText="Save"
                    cancelText="Close"

                >
                    <Form layout="vertical">
                        <Form.Item label="Function Name">
                            {getFieldDecorator('functionName', {
                                rules: [{ required: false, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Note">
                            {getFieldDecorator('note')(<Input type="textarea" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);


class FunctionList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            visiable:false,
            visiableDelete:false,
            visiableEdit:false
        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/net-device-functions"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            console.log(data);
            message.success("GET NET device function successfully!")
             const dataObj=data.map((dt,index)=>{
                 return {
                     "index":index+1,
                     dt
                 }
             })
            this.setState({
                dataTable:dataObj
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
// Modal Delete
    showModalDelete = () => {
        this.setState({
            visiableDelete: true,
        });
    };

    handleOkDelte = e => {
        console.log(e);
        this.setState({
            visiableDelete: false,
        });
    };

    handleCancelDelete = e => {
        console.log(e);
        this.setState({
            visiableDelete: false,
        });
    };
// Modal handle Edit

    showModalEdit = (index) => {
        console.log(index);
        this.setState({ visibleEdit: true });
    };

    handleCancelEdit = () => {
        this.setState({ visibleEdit: false });
    };

    handleEdit = (index) => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visibleEdit: false });
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
                title: 'Name',
                // dataIndex:'netDeviceFunctionName',
                key: 'name',
                render:record=>{
                    return record.dt.netDeviceFunctionName
                }

            },

            {
                title: 'Note',
                // dataIndex:'note',
                key: 'note',
                render:record=>{
                    return record.dt.note
                }

            },
            {
                title: 'Actions',
                key: 'choice',
                render:record=>{
                   return (
                       <div>
                           <Icon type="form"  style={{marginRight:8,color:"olive"}} onClick={()=>this.showModalEdit(record.index)}/>
                           <EditForm
                               wrappedComponentRef={this.saveFormRef}
                               visible={this.state.visibleEdit}
                               onCancel={this.handleCancelEdit}
                               onEdit={this.handleEdit}
                           />
                           <Icon type="delete"  style={{color:"red"}} onClick={this.showModalDelete}/>
                           <Modal
                               title="Delete Function"
                               visible={this.state.visiableDelete}
                               onOk={this.handleOkDelte}
                               onCancel={this.handleCancelDelete}
                           >
                               <p>Are you sure you want to delete this Function?</p>
                           </Modal>

                       </div>
                   )
                }

            },
        ];

        return (
             <div>
                 <div style={{marginBottom:20}}>
                     <h2>Function List</h2>
                     <Button type="primary"  onClick={this.showModal}> + Create</Button>
                     <CreateForm
                         wrappedComponentRef={this.saveFormRef}
                         visible={this.state.visible}
                         onCancel={this.handleCancel}
                         onCreate={this.handleCreate}
                     />
                         <Search placeholder="Search Function" style={{float:"right", width:300}}></Search>
                 </div>
                 <Table
                     className="table-detail"
                     columns={columns}
                     dataSource={this.state.dataTable}
                     bordered
                     rowKey={record => record.netDeviceFunctionId}
                 />
             </div>

        )
    }
}

export default FunctionList;