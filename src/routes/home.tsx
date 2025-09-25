// Reactルーティング（画面遷移）を行うためのもの
import { Route, Routes } from 'react-router-dom'
// src/routes/user/baseファイルのUserBaseRouter関数を読み込み
import { MainBaseRouter } from 'src/routes/main/base'
import { NotFoundContainer } from '@/features/Error/NotFound/NotFoundContainer'

// export：外部から参照できるようにするためのもの
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/main/*' element={<MainBaseRouter />} />
        <Route path='*' element={<NotFoundContainer />} />{' '}
        {/* 定義したどのpathにもマッチしないURLが来たら、*（ワイルドカード）がマッチ */}
      </Routes>
    </>
  )
}
