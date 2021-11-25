const bcrypt = require('bcrypt')

const normalToHashed = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 8)
    return hashedPassword

}

const checkHashedPassword = async (password) => {
    const bool = await bcrypt.compare(password, await normalToHashed(password))
    console.log(bool)
}

checkHashedPassword("1234")