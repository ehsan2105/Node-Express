
const User = require('../models/user.model')
const authUtil = require('../util/authentication')
const validation = require('../util/validation')
const sessionFlash = require('../util/session-flash')


function getSignup(req, res) {

    let sessionData = sessionFlash.getSessionData(req)
    if (!sessionData) {
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',

            street: '',
            postal: '',
            city: '',
        }
    }

    res.render('customer/auth/signup', { inputData: sessionData })
}
async function singup(req, res, next) {
    const enteredData = {
        email: req.body.email,
        confirmEmail: req.body['confirm-email'],
        password: req.body.password,

        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city,
    }

    if (!validation.userDetailsAreValid(
        req.body.email,
        req.body.password,
        req.body.street,
        req.body.postal,
        req.body.city,
    )
        ||
        !validation.emailIsCofirmed(req.body.email, req.body['confirm-email'])
    ) {
        sessionFlash.flashedDataToSession(req,
            { errorMessage: 'plase check your input', ...enteredData, }
            ,
            function () {

                res.redirect('/signup')

                console.log('1')
            })
        return
    }
    const user = new User(
        req.body.email,
        req.body.password,

        req.body.street,
        req.body.postal,
        req.body.city,
    )

    try {
        const existaAlready = await user.existaAlready()

        if (existaAlready) {
            sessionFlash.flashedDataToSession(req, { errorMessage: 'email use inter new one', ...enteredData }, function () {
                console.log('13')
                res.redirect('/signup')
            })
            return
        }
        await user.signup()
    }
    catch (error) {
        next(error)
        return

    }
    res.redirect('/login')
}
function getLogin(req, res) {
    let sessionData = sessionFlash.getSessionData(req)
    if (!sessionData) {
        sessionData = {
            email: '',
            password: '',
        }
    }
    res.render('customer/auth/login', { inputData: sessionData })
}

async function login(req, res, next) {
    const user = new User(req.body.email, req.body.password)
    let existingUser
    try {
        existingUser = await user.getUserWithSameEmail()
    }
    catch (error) {
        next(error)
        return
    }
    const sessionErrorData = {
        errorMessage: 'plz dubel check pass and email'
        , email: user.email,
        password: user.password
    }
    if (!existingUser) {
        sessionFlash.flashedDataToSession(req, sessionErrorData, function () {

            res.redirect('/login')
        })
        return
    }
    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password)
    if (!passwordIsCorrect) {
        sessionFlash.flashedDataToSession(req, sessionErrorData, function () {

            res.redirect('/login')
        })

        return
    }
    authUtil.createUserSession(req, existingUser, function () {
        res.redirect('/')
    })

}

function logout(req, res) {
    authUtil.destroyUserAuthSession(req)
    res.redirect('/login')
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    singup: singup,
    login: login,
    logout: logout
}
