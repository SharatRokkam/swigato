import jwt from "jsonwebtoken";

export const auth = (req, res, next) =>{
    const token = req.headers.authoriztion?.spl(it("")[1];

    if(!token) return
    res.status(401).json({message : "No Token provided"})

    try{
       const decoded =  jwt.verify(token, process.env.JWT);
       req.user = decoded;
       next()
    }
    catch(error){
        return 
        res.status(401).json({messsage : "Invalid token"})
    }
}
