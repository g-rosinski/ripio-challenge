import { BalanceAccount } from "./Balance"

export type User = {
    id: number,
    username: string,
    balance?: Partial<BalanceAccount>
}