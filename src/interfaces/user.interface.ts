export interface Token {
  access: string,
  token: string
}

export interface User {
  email: string,
  passsword: string,
  createdAt: Date,
  tokens: Token[]
}