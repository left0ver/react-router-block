import React, { useEffect, memo } from 'react'
import {
  useLocation,
  useRoutes,
  Location,
  useNavigate,
  RouteObject,
} from 'react-router-dom'
export interface To extends Omit<Location, 'pathname'> {
  path: string
}
export type From = To | null
export type Next = (path?: string) => void
export type BeforeEnter =
  | ((to: To, next: Next, from: From) => void)
  | ((to: To, next: Next) => void)
interface RouterBlockProps {
  routes?: RouteObject[]
  beforeEnter: BeforeEnter
  children?: React.ReactNode
}

let from: From = null
function RouterBlock({ routes = [], beforeEnter, children }: RouterBlockProps) {
  if (children === undefined && routes.length === 0) {
    throw new Error('children 和 routes必须要有一个')
  }
  const navigate = useNavigate()
  const { pathname: path, ...rest } = useLocation()
  const renderElement = useRoutes(routes)
  const next: Next = to => {
    if (typeof to === 'undefined') return
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
  return <div> {children !== undefined ? children : renderElement}</div>
}
export default memo(RouterBlock)
