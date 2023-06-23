import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn , ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Post } from "./Post";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false})
    text : string
    
    @ManyToOne(()=> User,(user)=>user.comment,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: User
    
    @ManyToOne(()=> Post,(post)=>post.comment,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    post : Post

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

}
