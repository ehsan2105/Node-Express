function mt(valus) {
    return !valus || valus.trim() === ''
}
function emailAndPass(email,password){
    return email && email.trim().length>8 && password && password.trim().length >= 6
}
function userDetailsAreValid(email, password, street, postal, city) {
    return (
        emailAndPass(email,password)
        &&
        !mt(street) && !mt(postal) && !mt(city)
    )
}
function emailIsCofirmed(email,confirmEmail){
    return email === confirmEmail
}



module.exports = {userDetailsAreValid:userDetailsAreValid,
    emailIsCofirmed:emailIsCofirmed}