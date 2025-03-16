const getAllUser = (req,res) => {
    res.send('Get all user');
}

const signUp = (req,res) => {
    res.send('Sign up');
}

const login = (req,res) => {
    res.send('Login');
}

const getUserProfile = (req,res) => {
    res.send('Get profile');
}

const updateUserProfile = (req,res) => {
    res.send('Update profile');
}


const deleteUserProfile = (req,res) => {
    res.send('Delete user');
}


module.exports = {
    getAllUser,
    signUp,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}