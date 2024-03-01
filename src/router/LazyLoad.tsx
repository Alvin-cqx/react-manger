// 路由懒加载

import { Suspense } from "react"

export const LazyLoad = (Component:React.LazyExoticComponent<() => JSX.Element>):React.ReactNode => {
  return <Suspense>
    <Component />
  </Suspense>
}