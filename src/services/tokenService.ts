import data from '../mocks/token.json'

export const checkToken = (token:string): boolean => {
    return token === data.token
}