

const tryCatch=(func)=>async(req,res,next)=>{
    try {
        await func(req,res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default tryCatch