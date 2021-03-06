import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleLeftBar } from '../../../Redux/action'
import {
    MenuUnfoldOutlined, MenuFoldOutlined, 
} from '@ant-design/icons';

 class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            showCompanyName: true,
        }
    }
    collapse =() => {
        this.props.toggleLeftBar()
    }
    render() {
        const {collapsed} = this.props;
        return (
            <div className="site-layout-background" >
                <div className="logo" >
                    {/* <img src="" alt="Logo" style={{ width: '50px', height: '40px', marginTop: '6px', marginLeft: '15px' }} /> */}
                    {this.state.showCompanyName ? <LogoValue /> : null}
                </div>

                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.collapse,
                })}

                <div class="logout-element">
                    <a id="logout" href="#" class="nav-link">
                        <span class="logout-content">
                            {/* <Link to="/LoginPage">Logout <LogoutOutlined /></Link> */}
                        </span>
                    </a>
                    <div className="welcome-message">
                        <text>Welcome Admin</text>
                    </div>
                </div>
            </div>
        )
    }
}
const LogoValue = () => (
    <div className="testlogo" >
      <text style={{ color: '#42dad6', fontSize: "20px" }}>ENERTEK</text>
      <text style={{ color: '#8a8d93', fontSize: "20px" }}>COMBUSTER</text>
    </div>
  )

  const mapStateToProps = state => ({
      collapsed:state.app.leftbarView,
      user: state.app.userParams
   })
   
   const mapDispatchToProps = {
    toggleLeftBar
   }
   
   const HeaderContainer = connect(
     mapStateToProps,
     mapDispatchToProps
   )(HeaderComponent)
   
   export default  HeaderContainer;