
enum loginStyle {
  accountType = 0
}
export interface loginParam {
  device: string
  loginStyle: loginStyle.accountType
  account: string
  password: string
  code?: string
}

export interface registerParam {
  device: string
  account: string
  password: string
  inviteCode?: string
}