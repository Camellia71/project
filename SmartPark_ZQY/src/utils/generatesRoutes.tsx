import React, { Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { componentMap } from "../router/routerMap";
import PageSkeleton from "../components/skeleton";

// 菜单类型定义
export interface MenuType {
  icon: string;
  key: string;
  label: string;
  children?: MenuType[];
}

// 页面类型到骨架屏类型的映射
const getSkeletonType = (path: string): 'form' | 'list' | 'detail' | 'dashboard' => {
  if (path.includes('add') || path.includes('edit') || path.includes('form')) {
    return 'form';
  }
  if (path.includes('detail') || path.includes('info')) {
    return 'detail';
  }
  if (path.includes('dashboard') || path.includes('overview')) {
    return 'dashboard';
  }
  return 'list';
};

/**
 * 用 RequireAuth + Suspense 包裹一个懒加载组件
 */
function wrapComponent(Component: React.ComponentType, allowed = true, redirectTo = "/login", skeletonType: 'form' | 'list' | 'detail' | 'dashboard' = 'list'): React.ReactNode {
  return React.createElement(
    RequireAuth,
    { allowed, redirectTo, children: undefined },
    React.createElement(
      Suspense,
      { fallback: React.createElement(PageSkeleton, { type: skeletonType }) },
      React.createElement(Component)
    )
  );
}

/**
 * 从菜单数据生成路由配置
 */
export function generateRoutes(menu: MenuType[]): RouteObject[] {
  return menu.map((item: MenuType) => {
    const hasChildren = item.children && item.children.length > 0;
    const Component = componentMap[item.key];
    const skeletonType = getSkeletonType(item.key);

    const routerObj: RouteObject = {
      path: item.key,
      element: hasChildren
        ? undefined
        : Component
          ? wrapComponent(Component, true, "/login", skeletonType)
          : null,
    };

    if (hasChildren) {
      const children = generateRoutes(item.children!);
      routerObj.children = children;
      if (children.length > 0 && children[0].path) {
        routerObj.children!.unshift({
          index: true,
          element: <Navigate to={children[0].path} replace />,
        });
      }
    }

    return routerObj;
  });
}

/**
 * 生成扁平化路由（兜底用）
 */
export function generateFlatRoutes(menu: MenuType[]): RouteObject[] {
  const flatRoutes: RouteObject[] = [];

  function flattenMenu(items: MenuType[]) {
    items.forEach(item => {
      const Component = componentMap[item.key];
      const skeletonType = getSkeletonType(item.key);
      if (!item.children || item.children.length === 0) {
        flatRoutes.push({
          path: item.key,
          element: Component ? wrapComponent(Component, true, "/login", skeletonType) : null,
        });
      } else {
        flattenMenu(item.children!);
      }
    });
  }

  flattenMenu(menu);
  return flatRoutes;
}