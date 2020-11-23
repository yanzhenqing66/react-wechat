import ajax from './ajax'

export const reqRegister = payload => ajax('/register', payload, 'POST')

export const reqLogin = payload => ajax('/login', payload, 'POST')

export const reqUpdateUserInfo = payload => ajax('/userUpdate', payload, 'POST')

export const reqUser = () => ajax('user')