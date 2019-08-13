import React from "react";
import {Table, message, Button, Modal, Form, Input} from 'antd';
import axios from "axios";
import Icon from "antd/lib/icon";
import TableRoom from "../Warehouse/Rooms";

const CreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create or Edit Area"
                    onCancel={onCancel}
                    onOk={onCreate }
                    okText="Save"
                    cancelText="Close"

                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: false, message: 'Please input the name aerea!' }],
                            })(<Input />)}
                        </Form.Item>

                    </Form>
                </Modal>
            );
        }
    },
);
class AreasAndRoom extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            visiable:false
        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/net-areas"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            message.success("GET NET Areas successfull!");
            console.log(data);
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

    //create areas


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
                title: 'Name',
                key: 'check',
                render:record=>{
                    return record.dt.name
                }
            },
            {
                title: 'Action',
                key: 'choice',
                render:record => {
                    return(
                        <div>
                            <Icon type="eye"  style={{margin:5, padding:1,width:16,height:16,background:"cadetblue",color:"white"}}/>
                            <Icon  type="form" style={{margin:5, padding:1,width:16,height:16,background:"orange",color:"white"}}></Icon>
                            <Icon type="delete" style={{margin:5, padding:1,width:16,height:16,background:"red",color:"white"}} ></Icon>
                        </div>
                    )
                }

            },
        ];

        return (
           <div>
              <div className="areas" style={{width:"50%",float:"left"}}>
                  <h1>Areas</h1>
                  <Button type="primary" style={{marginBottom:20}} onClick={this.showModal}> + Create </Button>
                  <CreateForm
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      onCreate={this.handleOk}
                  />
                  <Table
                      className="table-detail"
                      columns={columns}
                      dataSource={this.state.dataTable}
                      bordered
                      // pagination={this.state.pagination}
                      // loading={this.state.loading}
                      // onChange={this.handleTableChange}
                      rowKey={record => record.index}
                  />
              </div>
               <div className="Room" style={{width:"40%",marginLeft:50,float:"right"}} >
                 <h1>Rooms of </h1>
                   <Button type="primary" style={{marginBottom:20}} > + Create</Button>
                   <TableRoom />
               </div>
           </div>

        )
    }
}

export default AreasAndRoom;