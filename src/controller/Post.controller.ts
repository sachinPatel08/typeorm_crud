const {Post} = require('../entity/Post')
const {User} = require('../entity/User')
import { getRepository } from "typeorm"

const createPost = async (req, res) => {
    const {title,description,userId} = req.body
  
  
   if(title == null){
    return res.json({"error":"error"})
   }

   const postRepository = await getRepository(Post)
   const userRepository = getRepository(User);
   let user;
   try {
    user = await userRepository.findOneOrFail({where:{id:req.headers.userId}});
    console.log((req.headers.userId));
    
  } catch (error) {
    res.status(404).send('User not found');
    return;
  }

   try {
    // const data = new Post()
    // data.title=title || "";
    // data.description=description || "";
    // data.user = user;

     const post = await postRepository.save({title, description , user})

     if(post){
        return res.json(post)
     }
   }catch(e){
    if(e instanceof Error){
        return res.status(500).json({ message: e.message });
    }
   }
}

module.exports = {createPost}