import React from "react";
import { Modal, Button,Icon ,Input} from 'antd';

class ModalEdit extends React.Component {
 constructor(props){
     super(props);
     this.state={
         visibleEdit:false,
         nameSelected:""
     }
 }

componentWillReceiveProps=(nextProps)=> {
    const visibleEdit=nextProps.visiableEdit;
    const nameSelected=nextProps.nameSelected;
    this.setState({
        visibleEdit:visibleEdit,
        nameSelected:nameSelected
    })
}

    handleOk = e => {
        console.log(e);
        this.setState({
            visibleEdit: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visibleEdit: false,
        });
    };
    handleChange=()=>{
        console.log("a")
    }

    render() {
        return (
            <div>
                <Modal
                    title="Create or Edit Area"
                    visible={this.state.visibleEdit}
                    closable={false}
                    centered
                    footer={[
                        <div>
                            <Button key={1} style={{backgroundColor:"#16ab39",color:"white"}} onClick={this.handleOk}><Icon type="check"></Icon>Save</Button>
                            <Button key={2} type="danger" onClick={this.handleCancel}>Close</Button>
                        </div>
                    ]}
                >
                    <Input addonBefore="Name" defaultValue={this.state.nameSelected} onChange={this.handleChange}/>
                </Modal>
            </div>
        );
    }
}
export  default ModalEdit