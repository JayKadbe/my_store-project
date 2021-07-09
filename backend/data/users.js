import bcrypt from 'bcryptjs'

const users = [
     {
        name: 'Admin User',
        email: 'admin@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin: true
     },
     {
        name: 'John Wick',
        email: 'johnwick@example.com',
        password:bcrypt.hashSync('123456', 10),
     },
     {
        name: 'Elon Musk',
        email:'elonm@example.com',
        password:bcrypt.hashSync('123456', 10),
     },
]

export default users;