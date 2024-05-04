export interface PropsType {
    [key: string]: Array<number>
  }
  

export interface EntryParam {
    gameId: number
}

export interface HistoryParam {
    page: number
    limit: number
    gameId: number
}

export interface RecordParam {
    page: number
    limit: number
    gameId: number
}

export interface lotteryParam {
    betInterval: number
    issue: string,
    gameId: number
    areaBetList: PropsType
}