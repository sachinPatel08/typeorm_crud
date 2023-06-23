const { User } = require('../entity/User')
const { Session } = require('../entity/Session')
const { getRepository } = require('typeorm');
import { getManager } from 'typeorm';
const jwt = require("jsonwebtoken");

interface Login {
    email:string;
    password:string;
}

interface userReg {
  firstName:string;
  lastName:string;
  age:number;
  email:string;
  mobileNumber:string;
  activationTOken:string;
  password:string;
  gender?:string;
}
 const getUser =  async (req,res)=>{
    try {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        return res.json(users);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        }
      }
}

const createUser = async ( req , res)=>{
    const {firstName , lastName , age , email , mobileNumber , activationTOken , password , gender} : userReg = req.body
    
    const userRepository = await getRepository(User)
    const extUser = await userRepository.findOne({where:{email: email}})
    
    if(extUser){
        return res.json({"message":"user already exists"});
    }

    if(firstName == null || lastName == null || email == null || mobileNumber == null || activationTOken == null || password == null ){
        return res.json({"error":"yes"})
    }
    try{
       const user = await userRepository.save({firstName , lastName , age , email , mobileNumber , activationTOken , gender , password})

       if(user){
        return res.json({"success": "user successfully created"})
       }
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }
}

const login = async (req, res , next) => {



    const userRepository = await getRepository(User)
    const sessionRepository = await getRepository(Session)
    let user
    if(req.body.password == null || req.body.email == null){
        return res.json({"error":"enter valid body.."})
    }
  try {
     
    if(req.body.password !== null && req.body.email !==null){
     user = await userRepository.findOne({where:{email: req.body.email , password: req.body.password}})

     if (user === null) {
        return next(
            res.status(404).json({
              message: "user not found.",
            })
          );
    }
    }else{
        return res.status(404).json({"message":"password not found"})
    }

    if( req.body.password === null && user.password != req.body.password){
        return next(
            res.status(401).json({
              message: "invalid User..",
            })
          );
    }

    let token = jwt.sign({ userId: user.id }, process.env.Token_Secret, {
        expiresIn: '5h',
      });
    
     const refToken = await sessionRepository.save({  token , user})
     
     res.status(200).json(refToken);

  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({ message: error.message });
    }
  }


}

const logout = async (req , res)=>{
   const sessionRepository = getRepository(Session)
   const token = req.headers.authorization.split(" ")[1] 
  console.log("token",token);
  
   if(token){
    try{
    //  await sessionRepository.createQueryBuilder('Session').delete().where("token= :token", {token : token})
    //  const logOut = getManager()
    //  await logOut.delete(Session , {token : token})
    await sessionRepository.delete({ token: token });
     return res.json({"message": "logout successfully"})
    }catch(e){
     if(e instanceof Error){
        return res.status(500).json({ message: e.message });
     }
    }
 
    }else{
        return res.json({ error:"token is required"})
    }
}

module.exports =  {getUser , createUser , login , logout}