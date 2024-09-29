import {Entity, ManyToOne,CreateDateColumn,PrimaryGeneratedColumn,Column} from 'typeorm';
@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    content:string;
    // @ManyToOne(()=>User , (user)=>user.posts)
    // user:User;
    @Column()
    likes: number;

    @CreateDateColumn()
    createdAt: Date;
}
