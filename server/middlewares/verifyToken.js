import jwt from 'jsonwebtoken'
import CustomError from '../utilities/customError.js'

// const verifyToken = (req, res, next) => {
//    try{
//     console.log("from verify token start")
//     const accessToken=req.cookies.accessToken
//     console.log("from verify token",accessToken)
//     if(accessToken){
//         const isAccessTokenValidate=jwt.verify(accessToken,process.env.JWT_TOKEN)
//         if(isAccessTokenValidate){
//             console.log("from verify token ,access token is valid")
//             return next()
//         }
//     }
//     // const isAccessTokenValidate=jwt.verify(accessToken,process.env.JWT_TOKEN)
//     // if(isAccessTokenValidate){
//     //     console.log("from verify token ,access token is valid")
//     //     return next()
//     // }
//     if(!accessToken){
//         console.log("from verify token ,access token is not valid")
//         const refreshToken=req.cookies.refreshToken
//         console.log("from verify token",refreshToken)
//         const isRefreshTokenValidate=jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN)
//         if(!isRefreshTokenValidate||!refreshToken){
//             console.log("from verify token ,refresh token is not valid")
//             return next(new CustomError("Unauthorized for refresh token",401))
//         }
//         console.log("from verify token ,refresh token is valid")
//         const newAccessToken=jwt.sign({id:isRefreshTokenValidate.id},process.env.JWT_TOKEN,{expiresIn:"1d"})
//         res.cookie("accessToken",newAccessToken,{httpOnly:true,secure:true,sameSite:"none"})
//         return next()
//     }
//    }catch(err){
//        console.log("from verify token",err)
//        next(new CustomError("Unauthorized for access token",401))
//    }
// }

// export default verifyToken


const verifyToken=(req,res,next)=>{
    try{
        console.log("from verify token start")
        const accessToken=req.cookies.accessToken
        jwt.verify(accessToken,process.env.JWT_TOKEN,(err)=>{
            console.log("from verify token",err)
            if(err){
               const refreshToken=req.cookies.refreshToken
               jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN,(err)=>{
                   console.log("from verify token",err)
                   if(err){
                       return next(new CustomError("Unauthorized for refresh token",401))
                   }
                   const newAccessToken=jwt.sign({id:refreshToken.id},process.env.JWT_TOKEN,{expiresIn:"1d"})
                   res.cookie("accessToken",newAccessToken,{httpOnly:true,secure:true,sameSite:"none"})
                   return next()
               })
            }
            console.log("from verify token ,access token is valid")
            return next()
        })
    }catch(err){
        next(new CustomError("Unauthorized for access token",401))
    }
}

export default verifyToken