import { getRepository } from "typeorm"
import { Comment } from "../entity/Comment"
import { Post } from "../entity/Post"
import { User } from "../entity/User"

const postComment = async (req, res) => {

 
    const { text , postId  } = req.body
    
    if(text==null || postId==null){
        return res.json({message:"invalid body"})
    }

    const userRepository = getRepository(User)
    const postRepository = getRepository(Post)
    

    try {

        const user = await userRepository.findOne({where:{id:req.headers.userId}})
        console.log(user);
        
        if(!user){
            return res.json({message:"user not found"})
        }
        const post = await postRepository.findOne({where:{id:postId}})
        console.log(post);
        
        if(!post){
            return res.json({message:"post not found"})
        }

        if(user && post){
            //if we have multiple value in body then use object instance
            const commentRepository = getRepository(Comment)
            const comment = await commentRepository.save({text:text , post:post , user:user})

          res.json(comment)
        }
        
    } catch (error) {
        if(error instanceof Error) {
            return res.status(404).json({message: error.message})
        }
    }
    
     
}

const getCommentByPost = async (req, res) : Promise<void> => {
   
   
    try {
        
        const commentRepository = getRepository(Comment).createQueryBuilder('comment').where('comment.postId = :postId',{postId:req.params.id})

        const users = await commentRepository.getMany();
    
        res.json(users)

    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({message: error.message})
        }
    }


}

module.exports = { postComment, getCommentByPost}

