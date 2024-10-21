import {Entity, ManyToOne,DeleteDateColumn,CreateDateColumn,PrimaryGeneratedColumn,Column} from 'typeorm';
@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({ type: 'text'})
    content:string;
    // @ManyToOne(()=>User , (user)=>user.posts)
    // user:User;
    @Column({ default: 0 })
    likes: number;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
  deletedAt: Date;
}
