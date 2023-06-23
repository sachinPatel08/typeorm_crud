import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
@Entity()
export class Session {

@PrimaryGeneratedColumn('uuid')
id : number

@Column()
token: string

@OneToOne(()=>User , (user)=>user.session,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
@JoinColumn()
user: User

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;

}
