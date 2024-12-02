import {Entity, ManyToOne,DeleteDateColumn,CreateDateColumn,PrimaryGeneratedColumn,Column, OneToMany} from 'typeorm';
import {User} from '../../user/user.entity';

import {Comment} from '../../comments/comment.entity';
@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({ type: 'text'})
    content:string;
    @ManyToOne(()=>User , (user)=>user.post)
    user:User;
    @Column({ default: 0 })
    likes: number;

    @OneToMany(()=>Comment,(comment)=>comment.post)
    comment:Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
  deletedAt: Date;
}
