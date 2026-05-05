import { Carousel, Card, Row, Col,Statistic } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import pic1 from "../../assets/1.jpg"
import pic2 from "../../assets/2.jpg"
import pic3 from "../../assets/3.jpg"
import { Avatar } from 'antd';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];
function Merchants() {
    return <div>
        <Card>
            <div style={{ width: "1200px", margin: "auto" }}>
                <Carousel autoplay arrows>
                    <div key="pic1">
                        <img src={pic1} alt="carousel-1" />
                    </div>
                    <div key="pic2">
                        <img src={pic2} alt="carousel-2" />
                    </div>
                    <div key="pic3">
                        <img src={pic3} alt="carousel-3" />
                    </div>
                </Carousel>
            </div>
        </Card>

            <Row gutter={16} className="mt">
                <Col span={12}>
                    <Card>
                        <div>
                            {data.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: index < data.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                                    <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                                    <div style={{ marginLeft: 12 }}>
                                        <div style={{ fontWeight: 500 }}>{item.title}</div>
                                        <div style={{ color: '#888', fontSize: 12 }}>Ant Design, a design language for background applications, is refined by Ant UED Team</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                </Col>
                <Col span={12}>
                <Card>
                    <Statistic
                        title="新签客户"
                        value={11.28}
                        precision={2}
                        styles={{ content: { color: '#3f8600' } }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                    <Statistic
                        title="续签客户"
                        value={9.3}
                        precision={2}
                        styles={{ content: { color: '#cf1322' } }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                    <Statistic
                        title="退租客户"
                        value={5.16}
                        precision={2}
                        styles={{ content: { color: '#3f8600' } }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                    <Statistic
                        title="意向客户"
                        value={13.3}
                        precision={2}
                        styles={{ content: { color: '#cf1322' } }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                </Card>
                </Col>
            </Row>

    </div>
}

export default Merchants