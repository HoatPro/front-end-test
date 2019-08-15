import React from "react";
import {Table, message, Button, Modal, Form, Input, Card} from 'antd';
import axios from "axios";
import Icon from "antd/lib/icon";
import TableRoom from "./Rooms";
const {Search}=Input;
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
            visiable:false,
            idSelected:null,
            nameRoom:"",
            styleColor:"#9CE0AF"
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
    //Show data
    showAera=(id,name)=>{
        this.setState({
            idSelected:id,
            nameRoom:name,
            styleColor:"#16AB39"
        })
    }
    render() {
        const{idSelected,dataTable,nameRoom,styleColor}=this.state;
        console.log(idSelected)
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
                            <Icon
                                type="eye"
                                style={{ width:26, height:26,backgroundColor:"#fbbd08",padding:5,color:"white",fontWeight:700,borderRadius:5}}
                                onClick={()=>this.showAera(record.dt.id,record.dt.name)}
                            />&nbsp;
                            <Icon type="edit"  style={{ width:26, height:26,backgroundColor:"#00b5ad",padding:5,color:"white",fontWeight:700,borderRadius:5}}/>&nbsp;
                            <Icon type="delete"  style={{ width:26, height:26,backgroundColor:"#db2828",padding:5,color:"white",fontWeight:700,borderRadius:5}}/>
                        </div>
                    )
                }

            },
        ];

        return (
           <div>
              <Card className="areas" style={{width:"60%",float:"left"}}>
                  <h1>Areas</h1>
                  <Button style={{marginBottom:20,backgroundColor:"#16AB39",color:"white", fontWeight:600}} onClick={this.showModal}> + Create </Button>
                  <div style={{float:"right", marginBottom:20, marginTop:-30}}>
                      <h4>Search</h4>
                      <Search placeholder="Search Aera by name..."/>
                  </div>
                  <CreateForm
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      onCreate={this.handleOk}
                  />
                  <Table
                      className="table-detail"
                      columns={columns}
                      dataSource={dataTable}
                      bordered
                      // pagination={this.state.pagination}
                      // loading={this.state.loading}
                      // onChange={this.handleTableChange}
                      rowKey={record => record.index}
                  />
              </Card>
               <Card className="Room" style={{width:"37%",marginLeft:40,float:"right"}} >
                 <h1>Rooms of {nameRoom} </h1>
                   <Button style={{marginBottom:20,backgroundColor:`${styleColor}`,color:"white", fontWeight:600}} > + Create</Button>
                   <TableRoom idSelected={idSelected} dataTable={dataTable}/>
               </Card>
           </div>

        )
    }
}

export default AreasAndRoom;