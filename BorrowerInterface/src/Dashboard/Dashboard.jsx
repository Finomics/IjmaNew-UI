import React, { useState, useEffect, useContext } from 'react';
import {
  MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined,
  LoginOutlined, FileOutlined, TeamOutlined, FormOutlined
  , UserAddOutlined, PieChartOutlined, UserOutlined, DingtalkOutlined,
  UsergroupAddOutlined, DesktopOutlined, AndroidOutlined, SnippetsOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import './Dashboard.css'
import 'antd/dist/antd.css'
import ijma from '../Images/Ijma.png'
import {
  WalletDashboard, Applications, TermSheetData,
  Goods, Murabaha, Promissory, TermSheet,
  VaultMurabaha, VaultPromissory, PurchesOrder,
  Proformas
} from '../Pages/index';
import { useNavigate } from "react-router-dom";
import StoreContext from '../ContextApi';



export default function Dashboard() {

  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const [trigger, setTrigger] = useState(0);
  const contextData = useContext(StoreContext);

  const navigate = useNavigate();



  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const logout = () => { navigate('/') }

  const items = [


    // {
    //   key: '1',
    //   icon: <TeamOutlined onClick={() => setTrigger(1)} />,
    //   label: <div onClick={() => setTrigger(1)}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Proforma' : ''}</span></div>,
    // },
    // {
    //   key: '2',
    //   icon: <PieChartOutlined onClick={() => setTrigger(2)} />,
    //   label: <div onClick={() => setTrigger(2)}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Dashboard' : ''}</span></div>,
    // },



    getItem('Active Wallet', 'sub2', <TeamOutlined />, [

      {
        key: '6b',
        icon: <UserOutlined onClick={() => setTrigger('6b')} />,
        label: <div onClick={() => setTrigger('6b')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Term Sheet' : ''}</span></div>,
      },
      {
        key: '5b',
        icon: <UserAddOutlined onClick={() => setTrigger('5b')} />,
        label: <div onClick={() => setTrigger('5b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Proforma' : ''}</span></div>,
      },
      {
        key: '4b',
        icon: <UserAddOutlined onClick={() => setTrigger('4b')} />,
        label: <div onClick={() => setTrigger('4b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Goods' : ''}</span></div>,
      },
      // {
      //   key: '3b',
      //   icon: <SnippetsOutlined onClick={() => setTrigger('3b')} />,
      //   label: <div onClick={() => setTrigger('3b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Promissory Notes' : ''}</span></div>,
      // },
      {
        key: '2b',
        icon: <DingtalkOutlined onClick={() => setTrigger('2b')} />,
        label: <div onClick={() => setTrigger('2b')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Murabaha' : ''}</span></div>,
      },

      // {
      //   key: '1b',
      //   icon: <AndroidOutlined onClick={() => setTrigger('1b')} />,
      //   label: <div onClick={() => setTrigger('1b')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Applications' : ''}</span></div>,
      // },




    ]),

    getItem('Vault', 'sub3', <TeamOutlined />, [

      {
        key: '5a',
        icon: <UserAddOutlined onClick={() => setTrigger('5a')} />,
        label: <div onClick={() => setTrigger('5a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Proformas' : ''}</span></div>,
      },
      {
        key: '1b',
        icon: <AndroidOutlined onClick={() => setTrigger('1b')} />,
        label: <div onClick={() => setTrigger('1b')}><span style={{ marginLeft: '5%' }}> {!collapsed ? 'Applications' : ''}</span></div>,
      },

      {
        key: '2a',
        icon: <LoginOutlined onClick={() => setTrigger('2a')} />,
        label: <div onClick={() => setTrigger('2a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Murabaha' : ''}</span></div>,
      },
      // {
      //   key: '3a',
      //   icon: <FileOutlined onClick={() => setTrigger('3a')} />,
      //   label: <div onClick={() => setTrigger('3a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Promissory' : ''}</span></div>,
      // },



      // {
      //   key: '4a',
      //   icon: <HomeOutlined onClick={() => setTrigger('4a')} />,
      //   label: <div onClick={() => setTrigger('4a')}> <span style={{ marginLeft: '5%' }}> {!collapsed ? 'Purchase Order' : ''}</span></div>,
      // },

    ]),
    {

      key: '',
      icon: <LoginOutlined onClick={() => logout()} />,
      label: <div onClick={() => logout()}><span style={{ marginLeft: '5%' }}> {!collapsed ? ' Log Out' : ''}</span></div>,
    },
  ];



  return (

    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} id="Sider">
        <div className="logo">
          <img src={ijma} height="75px" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']}
          mode="inline" items={items} id="SiderMenu" />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 5,

          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}

        >

          {


            trigger === 1 ? (
              <>
                <TermSheet />
              </>
            ) :
              trigger === 2 ? (
                <>
                  <WalletDashboard />
                </>
              )

                : trigger === '2a' ? (
                  <>
                    <VaultMurabaha />
                  </>
                )
                  : trigger === '3a' ? (
                    <>
                      <VaultPromissory />
                    </>
                  )
                    : trigger === '4a' ? (
                      <>
                        <PurchesOrder />
                      </>
                    ) : trigger === '5a' ? (
                      <>
                        <Proformas />
                      </>
                    )
                      : trigger === '1b' ? (
                        <>
                          <Applications />
                        </>
                      ) : trigger === '2b' ? (
                        <>
                          <Murabaha />
                        </>
                      ) : trigger === '3b' ? (
                        <>
                          <Promissory />
                        </>
                      ) : trigger === '4b' ? (
                        <>
                          <Goods />
                        </>
                      ) : trigger === '5b' ? (
                        <>
                          <Proformas />
                        </>
                      ) : trigger === '6b' ? (
                        <>
                          <TermSheetData />
                        </>
                      ) :
                        <></>

          }
        </Content>
      </Layout>

    </Layout>

  )
}
