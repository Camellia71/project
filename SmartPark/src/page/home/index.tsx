import {Layout } from 'antd';
import { useState } from 'react';
import NavLeft from '../../components/navLeft';
import MyBreadcrumb from '../../components/breadCrumb';
import MyHeader from '../../components/Header';

const { Header, Content, Footer, Sider } = Layout;

function Home() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <NavLeft/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} >
          <MyHeader/>
        </Header>
         <Content style={{ margin: '0 16px' }}>
          <MyBreadcrumb/>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
  ;
}
export default Home;
