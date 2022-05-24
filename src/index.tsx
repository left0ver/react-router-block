import { memo, useEffect } from 'react'
import {
  useLocation,
  useRoutes,
  Location,
  useNavigate,
  RouteObject,
} from 'react-router-dom'
export interface RouterLocation extends Omit<Location, 'pathname'> {
  path: string
}
export type From = RouterLocation | null
export type Next = (path?: string) => void
export type BeforeEnter =
  | ((to: RouterLocation, next: Next, from: From) => void)
  | ((to: RouterLocation, next: Next) => void)
interface RouterBlock {
  routes: RouteObject[]
  beforeEnter: BeforeEnter
}
// TODO:可以选择路由表或者直接使用routes
let from: From = null
function RouterBlock({ routes, beforeEnter }: RouterBlock) {
  const navigate = useNavigate()
  const { pathname: path, ...rest } = useLocation()
  const next: Next = to => {
    if (typeof to === 'undefined') {
      return
    }
    if (typeof to === 'string') {
      to.startsWith('/') ? navigate(to) : navigate(`${path}/${to}`)
    }
  }
  useEffect(() => {
    beforeEnter({ ...rest, path }, next, from)
    return () => {
      // 给from赋上一次的值
      from = { ...rest, path }
    }
  })
  return useRoutes(routes)
}
export default memo(RouterBlock)
