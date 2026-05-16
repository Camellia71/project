import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';
import logo from "../../assets/logo.png"
import icons from './iconList';
import { useNavigate,useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import "./index.scss"
interface MenuItem{
    key:string;
    label:string;
    icon?:React.ReactNode;
    children?:MenuItem[]
}

interface MenuItemFromData{
    key:string;
    label:string;
    icon:string;
    children?:MenuItemFromData[]
}
function NavLeft() {
    const { menuList } = useSelector((state: { authSlice: { menuList: MenuItemFromData[] } }) => state.authSlice);
    const navigate=useNavigate()
    const[menuData,setMenuData]=useState<MenuItem[]>([]);
    const location=useLocation();

    useEffect(() => {
        function mapMenuItems(items: MenuItemFromData[]): MenuItem[] {
            return items.map((item:MenuItemFromData)=>{
                const mappedItem: MenuItem = {
                    key: item.key,
                    label: item.label,
                    icon: icons[item.icon as keyof typeof icons] as React.ReactNode,
                };
                if (item.children && item.children.length > 0) {
                    mappedItem.children = mapMenuItems(item.children);
                }
                return mappedItem;
            });
        }
        const mappedMenuItems:MenuItem[] = mapMenuItems(menuList);
        setMenuData(mappedMenuItems);
    }, [menuList]);

    function handleClick({key}:{key:string}){
        navigate(key)
    }

    return <div className='navleft'>
        <div className='logo'>
            <img src={logo} alt="" width={18}/>
            <h1>朋远智慧园区</h1>
        </div>

        <Menu
            defaultSelectedKeys={['/dashboard']}
            mode="inline"
            theme="dark"
            items={menuData as MenuProps['items']}
            onClick={handleClick}
            selectedKeys={[location.pathname]}
        />
    </div>
}
export default NavLeft