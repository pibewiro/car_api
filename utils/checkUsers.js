const User = require('../src/models/user')
const checkUsers = async (email, username) => {

  let errors = {};
  try {
    const userEmail = await User.findOne({
      email,
    })

    const userName = await User.findOne({
      username,
    })

    if (userEmail) {
      errors.email = 'Email Already Exists'
    }

    if (userName) {
      errors.username = 'Username Already Exists'
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors
      };
    }
  } catch (err) {
    console.log(err)
  }

}

module.exports = checkUsers;