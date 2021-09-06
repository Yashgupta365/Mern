import bcrypt from 'bcryptjs'

const users = [
        {
            name: 'Admin User',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456', 10),
            isAdmin: true
        },
        {
            name: 'Yash Gupta',
            email: 'yash@example.com',
            password: bcrypt.hashSync('123456', 10),
            isAdmin: false

        },
        {
            name: 'Manas',
            email: 'Manas@example.com',
            password: bcrypt.hashSync('123456', 10),
            isAdmin: false

        },

]
export default users