import { RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { useEffect, useState, Suspense } from "react";
import { generateRoutes, MenuType } from "./utils/generatesRoutes";
import { createBrowserRouter } from "react-router-dom";
import { getMenu } from "./api/users";
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from "./store/login/authSlice";
import PageSkeleton from "./components/skeleton";

interface MenuResponse {
  data: MenuType[];
}

function App() {
  const { token } = useSelector((state: { authSlice: { token: string | null } }) => state.authSlice);
  const [routerss, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getMenu() as MenuResponse;
        if (res.data && res.data.length) {
          dispatch(setMenu(res.data as any));
          const dynamicRoutes = generateRoutes(res.data);
          const myRoutes = [...routes];
          if (!myRoutes[0].children) {
            myRoutes[0].children = [];
          }
          myRoutes[0].children = dynamicRoutes;
          if (myRoutes[0].children.length > 0) {
            myRoutes[0].children[0].index = true;
          }
          setRouter(createBrowserRouter(myRoutes));
        } else {
          const fallbackRoutes = generateRoutes([]);
          const myRoutes = [...routes];
          if (!myRoutes[0].children) {
            myRoutes[0].children = [];
          }
          myRoutes[0].children = fallbackRoutes;
          setRouter(createBrowserRouter(myRoutes));
        }
      } catch (error) {
        console.error('Error loading menu:', error);
        const fallbackRoutes = generateRoutes([]);
        const myRoutes = [...routes];
        if (!myRoutes[0].children) {
          myRoutes[0].children = [];
        }
        myRoutes[0].children = fallbackRoutes;
        setRouter(createBrowserRouter(myRoutes));
      }
    }
    loadData();
  }, [token, dispatch]);

  if (routerss) {
    return (
      <div className="App">
        <Suspense fallback={<PageSkeleton type="dashboard" />}>
          <RouterProvider router={routerss} />
        </Suspense>
      </div>
    );
  } else {
    return <PageSkeleton type="dashboard" />;
  }
}

export default App;