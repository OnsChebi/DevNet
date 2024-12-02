import { Post } from "../posts/entities/post.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:String})
    content: string;

    @ManyToOne(()=>Post,(post)=>post.comment ,{onDelete:'CASCADE'})
    post: Post;

    @ManyToOne(()=>Comment,(Comment)=>Comment.children, {nullable:true, onDelete:'CASCADE'})
    parent: Comment;

    @OneToMany(()=>Comment,(Comment)=>Comment.parent)
    children:Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}