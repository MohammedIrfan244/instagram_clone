import CustomError from "../utilities/customError.js";


const manageError=(err,req,res,next)=>{
    if(err instanceof CustomError){
        console.log("from manage error",err)
        return res.status(err.statusCode).json({message:err.message})
    }
    console.log("from manage error",err)
    return res.status(500).json({message:'Something went wrong'})
}

export default manageError