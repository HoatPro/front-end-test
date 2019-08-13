import React from 'react';
import { withRouter } from 'react-router-dom';
import { HeaderWrapper } from './Layout.style';
import Search from "antd/lib/input/Search";

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <HeaderWrapper>
          <Search style={{width:300,marginLeft:60,marginTop:8}}/>
        <div className="avatar-header">
          <span>
            {email} 
          </span>
        </div>
      </HeaderWrapper>
    );
  }
}

export default withRouter(Header);
