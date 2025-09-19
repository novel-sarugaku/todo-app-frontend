import type { Kind } from '@/models/constants/kind'

// Kindを日本語ラベル(収入/支出)に変換する関数
export const kindToJa = (kind: Kind) => (kind === 'income' ? '収入' : '支出')
