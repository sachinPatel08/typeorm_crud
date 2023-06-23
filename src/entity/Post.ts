import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn , ManyToMany, OneToMany  } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"
@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({nullable:false})
    title: string

    @Column()
    description: string
   
    @ManyToOne(()=> User , (user)=>user.post,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user : User

    @OneToMany(()=>Comment , (comment)=>comment.post)
    comment : Comment[]

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
