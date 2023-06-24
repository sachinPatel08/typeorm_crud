import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, Unique, OneToOne, JoinColumn } from "typeorm"
import { Post } from "./Post"
import { Session } from '../entity/Session'
import { Comment } from "./Comment"
@Entity('user')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({nullable:true})
    age: number

    @Column({nullable:false})
    email: string

    @Column({nullable:false})
    password: string

    @Column({nullable:false})
    mobileNumber: string

    @Column({nullable:true})
    activationTOken: string

    @Column({ default: false , nullable:true })
    status: boolean

    @Column({default:"male"})
    gender: string

    @OneToMany(() => Post, (post)=> post.user)
    post: Post[];

    @OneToOne(()=> Session, (session)=> session.user)
    session: Session

    @OneToMany(()=>Comment , (comment)=> comment.user)
    comment: Comment[];

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;


}
