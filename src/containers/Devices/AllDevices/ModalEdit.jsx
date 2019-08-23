import React from "react";
import {Table, Card, Alert} from 'antd';


class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        }
    }

    render() {
        const dataEdit = this.props.dataEdit;
        console.log(this.props)

        return (
            <Card></Card>

        )
    }
}

export default ModalEdit