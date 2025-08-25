import { Route, Routes } from 'react-router-dom'
import { UserRootContainer } from '@/features/User/Root/UserRootContainer'

export const UserBaseRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<UserRootContainer />} />
      </Routes>
    </>
  )
}
