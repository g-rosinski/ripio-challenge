import users from '../mocks/users.json'
import { User } from '../models/User'

export const fetchUsers = (): User[] => {
    return users
}

export const existUser = (username:string): boolean => {
    return users.some(u => u.username === username)
}

export const findUser = (username:string): User | undefined => {
    return users.find(u => u.username === username)
}