import { Card, Row, Col, Image, Radio } from "antd"
import { useEffect, useState } from "react"
import { getRoomList } from "../../api/room"
import "./index.scss"
import { RadioChangeEvent } from "antd/lib";
import roomPic from "../../assets/roomPic.jpg"
import { PageSkeleton } from "../../components/skeleton";
import { SkeletonAvatar, SkeletonParagraph } from "../../components/skeleton";
interface RoomType {
    roomNumber: number;
    decorationType: "毛坯" | "精装";
    area: number;
    unitPrice: number;
    src:string
}
function Room() {
    const [open, setOpen] = useState<boolean>(false)
    const [room, setRoom] = useState<RoomType[]>([])
    const [src,setSrc]=useState<string>(roomPic);
    const [loading,setLoading]=useState<boolean>(false)
    const loadRoom = async (roomid: string) => {
        setLoading(true)
        const res = await getRoomList(roomid) as any;
        const rooms = res?.data?.rooms || [];
        setLoading(false)
        setRoom(rooms)
    }
    const handleChange=(e:RadioChangeEvent)=>{
        const roomid:string=e.target.value;
        loadRoom(roomid)

    }

    useEffect(() => {
        loadRoom("a1")
    }, [])


    const showImage=(src:string)=>{
        setSrc(src);
        setOpen(true)
    }

    if (loading) {
        return <div className="room">
            <Card className="mb">
                <Radio.Group defaultValue="a1" optionType="button" buttonStyle="solid">
                    <Radio.Button value="a1">A1幢写字楼</Radio.Button>
                    <Radio.Button value="a2">A2幢写字楼</Radio.Button>
                    <Radio.Button value="b1">B1幢写字楼</Radio.Button>
                    <Radio.Button value="b2">B2幢写字楼</Radio.Button>
                    <Radio.Button value="c1">C1幢写字楼</Radio.Button>
                    <Radio.Button value="c2">C2幢写字楼</Radio.Button>
                    <Radio.Button value="d1">天汇国际大厦A座</Radio.Button>
                    <Radio.Button value="d2">时代金融广场</Radio.Button>
                </Radio.Group>
            </Card>
            <Row gutter={16}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Col span={6} className="item" key={index}>
                        <Card title="房间号">
                            <SkeletonParagraph rows={4} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>;
    }

    return <div className="room">
        <Image
            width={200}
            style={{ display: 'none' }}
            preview={{
                open,
                src: src,
                onOpenChange: (value) => {
                    setOpen(value);
                },
            }}
        />
        <Card className="mb">
            <Radio.Group defaultValue="a1"  optionType="button"  buttonStyle="solid" onChange={handleChange}>
                <Radio.Button value="a1">A1幢写字楼</Radio.Button>
                <Radio.Button value="a2">A2幢写字楼</Radio.Button>
                <Radio.Button value="b1">B1幢写字楼</Radio.Button>
                <Radio.Button value="b2">B2幢写字楼</Radio.Button>
                <Radio.Button value="c1">C1幢写字楼</Radio.Button>
                <Radio.Button value="c2">C2幢写字楼</Radio.Button>
                <Radio.Button value="d1">天汇国际大厦A座</Radio.Button>
                <Radio.Button value="d2">时代金融广场</Radio.Button>
            </Radio.Group>
        </Card>
        <Row gutter={16}>
            {
                room.map((item, index) => {
                    return <Col span={6} className="item" key={item.roomNumber || index}>
                        <Card title="房间号" extra={<a onClick={() => showImage(item.src)}>户型图</a>}>
                            <h1>{item.roomNumber}</h1>
                            <div className="clearfix mt">
                                <p className="fl">装修情况：</p>
                                <p className="fr">{item.decorationType}</p>
                            </div>
                            <div className="clearfix mt">
                                <p className="fl">房间面积</p>
                                <p className="fr">{item.area}㎡</p>
                            </div>
                            <div className="clearfix mt">
                                <p className="fl">出租单价</p>
                                <p className="fr">{item.unitPrice}元/平/日</p>
                            </div>
                        </Card>
                    </Col>
                })
            }
        </Row>
    </div>
}

export default Room