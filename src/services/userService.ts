import users from '../mocks/users.json'
import { User } from '../models/User'

export const getUsers = (loggedUsername:string): User[] => {
    return users.filter(u => u.username !== loggedUsername)
}

export const getUsersByMatch = (loggedUsername:string, query: string): User[] => {
    const users = getUsers(loggedUsername)
    return users.filter(u => u.username.match(new RegExp(query, 'i')))
}

export const existUser = (username:string): boolean => {
    return users.some(u => u.username === username)
}

export const getUserData = (loggedUsername:string): User | undefined => {
    return users.find(u => u.username === loggedUsername)
}