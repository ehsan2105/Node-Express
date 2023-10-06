function handlerErrors(error,req,res,next){

    
    console.log(error)
    
    if(error.code === 404){

        return res.status(404).render('./base/404')
    }

    res.status(500).render('./base/500')
}

module.exports = handlerErrors