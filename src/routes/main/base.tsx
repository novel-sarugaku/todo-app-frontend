import { Route, Routes } from 'react-router-dom'
import { MainRootContainer } from '@/features/Main/Root/MainRootContainer'

export const MainBaseRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainRootContainer />} />
      </Routes>
    </>
  )
}
