export const moneyFlowsQueryKeys = {
    // 一覧データを区別するためのキー
    all: ['moneyFlows'] as const,

    // 詳細データを区別するためのキー
    details: (id: number) => [...moneyFlowsQueryKeys.all, id] as const,
}
