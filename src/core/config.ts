import { z } from 'zod'

// 環境変数の型とルールを定義
// VITE_BACKEND_URLはURL形式でなければならない (.url())
// 指定されなかったら"http://localhost:8000"を使う(.default(...))
const envSchema = z.object({
  VITE_BACKEND_URL: z.url().default('http://localhost:8000'),
})

// import.meta.env ＝ Viteが.envから読み込んだ環境変数を持っている
const env = envSchema.parse({
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL as string,
})

// .envに間違ったURL（例: "localhost:8000" ← http://がない）を書いても、Zodがエラーを出してくれる
export const config = {
  backendUrl: env.VITE_BACKEND_URL,
}
