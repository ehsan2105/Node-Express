function protextRouter(req,res,next){
    // if (!res.locals.isAuth){
    //     return res.redirect('./401')
    // }

    if(req.path.startsWith('/admin')&& !res.locals.isAuth){
        return res.redirect('./403')
    }
    next()
}
module.exports = protextRouter