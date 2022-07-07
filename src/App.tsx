import { useState, lazy, Suspense } from 'react'
import '@/styles/normalize.css'
import '@/styles/global.less'
const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源

function App() {
  const [show, setShow] = useState(false)
  const onclick = () => {
    setShow(true)
  }

  return (
    <>
      <button onClick={onclick}>展示</button>
      {show && (
        <Suspense fallback={null}>
          <LazyDemo />
        </Suspense>
      )}
    </>
  )
}

export default App
