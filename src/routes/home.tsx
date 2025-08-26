// Reactルーティング（画面遷移）を行うためのもの
import { Route, Routes } from 'react-router-dom'
// src/routes/user/baseファイルのUserBaseRouter関数を読み込み
import { MainBaseRouter } from 'src/routes/main/base'

// export：外部から参照できるようにするためのもの
export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/main/*' element={<MainBaseRouter />} />
            </Routes>
        </>
    )
}
