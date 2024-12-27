import jwt from 'jsonwebtoken'
import CustomError from '../utilities/customError.js'

const verifyToken = (req, res, next) => {
   try{
    const accessToken=req.cookies.accessToken
    const isAccessTokenValidate=jwt.verify(accessToken,process.env.JWT_TOKEN)
    if(isAccessTokenValidate){
        return next()
    }
    if(!isAccessTokenValidate||!accessToken){
        const refreshToken=req.cookies.refreshToken
        const isRefreshTokenValidate=jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN)
        if(!isRefreshTokenValidate||!refreshToken){
            return next(new CustomError("Unauthorized",401))
        }
        const newAccessToken=jwt.sign({id:isRefreshTokenValidate.id},process.env.JWT_TOKEN,{expiresIn:"1d"})
        res.cookie("accessToken",newAccessToken,{httpOnly:true,secure:true,sameSite:"none"})
        return next()
    }
   }catch(err){
       console.log("from verify token",err)
   }
}

export default verifyToken