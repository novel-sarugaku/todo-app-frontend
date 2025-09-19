// フォーマット整形用

// 日付フォーマットを整形する関数
export const formatDate = (targetDate: Date): string => {
  // toLocaleDateString：その日付を人間が読む文字列に変えるメソッド。第一引数'ja-JP'は日本語出力の意味（例："2025/9/2"）。第二引数は書式の詳細設定
  return targetDate.toLocaleDateString('ja-JP', {
    year: 'numeric', // 年を数字 → 例：2025年
    month: 'long', // 月を含む文字列 → 例：9月
    day: 'numeric', // 日を数字 → 例：2日
  })
}

// 月次フォーマットを整形する関数
export const formatMonthly = (targetDate: Date): string => {
  return targetDate.toLocaleDateString('ja-JP', {
    year: 'numeric', // 年を数字 → 例：2025年
    month: 'long', // 月を含む文字列 → 例：9月
  })
}

export const formatDateLocal = (targetDate: Date) => {
  const year = String(targetDate.getFullYear())
  const month = String(targetDate.getMonth() + 1).padStart(2, '0')
  const day = String(targetDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
