// Reactルーティング（画面遷移）を行うためのもの
import { Route, Routes } from 'react-router-dom'
// src/routes/user/baseファイルのUserBaseRouter関数を読み込み
import { UserBaseRouter } from 'src/routes/user/base'

// export：外部から参照できるようにするためのもの
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/user' element={<UserBaseRouter />} />
      </Routes>
    </>
  )
}
