import bcrypt from 'bcryptjs';

const users = [
    {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: true
},
{
    name: 'Ruien',
    email: 'ruien@gmail.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: false
},
{
    name: 'Mooi Yan',
    email: 'mooiyan@gmail.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: false
}
]

export default users;