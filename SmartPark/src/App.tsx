import { RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { useEffect, useState, Suspense } from "react";
import { generateRoutes } from "./utils/generatesRoutes";
import { Spin } from "antd";
import { createBrowserRouter } from "react-router-dom";
import { getMenu } from "./api/users";
import { useDispatch } from 'react-redux';
import { setMenu } from "./store/login/authSlice";
import { useSelector } from "react-redux";
function App() {
  console.log(import.meta.env.VITE_API_URL)
  const { token } = useSelector((state: { authSlice: { token: string | null } }) => state.authSlice);
  const [routerss, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadData() {
      const res = await getMenu();
      if (res.data.length) {
        dispatch(setMenu(res.data))
        const routers = generateRoutes(res.data)//动态创建的路由表
        const myRoutes = [...routes];
        myRoutes[0].children = routers;
        myRoutes[0].children[0].index = true;
        const router = createBrowserRouter(myRoutes)
        setRouter(router);
      }else{
        const router = createBrowserRouter(routes)
        setRouter(router);
      }
    }
    loadData()
  },[token, dispatch])
  if (routerss) {
    return (
      <div className="App">
        <Suspense fallback={<Spin></Spin>}>
          <RouterProvider router={routerss}></RouterProvider>
        </Suspense>
      </div>
    );
  } else {
    return <Spin></Spin>
  }


}

export default App;

