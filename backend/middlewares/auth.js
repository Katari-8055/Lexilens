import jwt from 'jsonwebtoken';



const userAuth = async (req, res, next) => {

    const {token} = req.headers;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, No token provided" });
    }

    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
             req.user = tokenDecode.id;
        }else{
            return res.status(401).json({ message: "Unauthorized, Invalid token" });
        }

        next();
        
    } catch (error) {
        res.status(401).json({ message: error.message });
        
    }
}

export default userAuth;