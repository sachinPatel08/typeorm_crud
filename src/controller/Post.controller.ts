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

const getAllPost = async (req, res) =>{

  const postRepository = getRepository(Post)
  
  try {
    const data = await postRepository.find()

    return res.json(data)
  } catch (error) {
    if(error instanceof Error) {
      return res.status(404).json({ message: error.message });
    }
  }

}

const getPostWithComment = async (req, res) => {

  try {
    
    // const data = await getRepository(Post).createQueryBuilder("post").leftJoinAndSelect('post.comment','comment')
    const data = await getRepository(User).createQueryBuilder('user').leftJoinAndSelect('user.post','post').leftJoinAndSelect('post.comment', 'comment')
    const result = await data.getMany()
    console.log(result);
   
    return res.json(result)

  } catch (error) {
    if(error instanceof Error){
      return res.status(404).json({ message: error.message });
    }
  }

  

}

module.exports = {createPost , getAllPost , getPostWithComment}