export const moneyFlowsQueryKeys = {
  all: ['moneyFlows'] as const, // 全件取得用
  details: (id: number) => ['moneyFlows', id] as const, // 特定IDの詳細取得用
}
