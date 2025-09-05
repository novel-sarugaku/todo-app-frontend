// フォーマット整形用

// 日付フォーマットを整形する関数
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  // toLocaleDateString：その日付を人間が読む文字列に変えるメソッド。第一引数'ja-JP'は日本語出力の意味（例："2025/9/2"）。第二引数は書式の詳細設定
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric', // 年を数字 → 例：2025年
    month: 'long', // 月を含む文字列 → 例：9月
    day: 'numeric', // 日を数字 → 例：2日
  })
}

// 月次フォーマットを整形する関数
export const formatMonthly = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric', // 年を数字 → 例：2025年
    month: 'long', // 月を含む文字列 → 例：9月
  })
}

// 金額をカンマ区切りに整形する関数
export const formatPrice = (amount: number): string => {
  return amount.toLocaleString('ja-JP')
}
