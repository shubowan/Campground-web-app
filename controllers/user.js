const User = require('../models/user')

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res) => {
    try{
        const {email, username, password} = req.body
        const user = new User({email, username})
        const registerUser = await User.register(user, password)
        req.login(registerUser,(error)=>{
            if(error){return next(error)}
            req.flash('success','Welcome!')
            res.redirect('/campgrounds')
        })
    }
    catch(e){
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.getLoginForm = (req,res) => {
    res.render('users/login')
}

module.exports.login = (req,res) => {
    const {username} = req.body
    req.flash('success',`Welcome back! ${username}`)
    res.redirect('campgrounds')

}

module.exports.logout = (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        req.flash('success', 'goodbye!')
        res.redirect('/campgrounds')
    })
}