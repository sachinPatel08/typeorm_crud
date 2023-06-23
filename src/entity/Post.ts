import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn , ManyToMany, OneToMany  } from "typeorm"
import { User } from "./User"
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

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
