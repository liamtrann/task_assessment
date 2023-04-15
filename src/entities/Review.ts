import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  @OneToOne(() => Movie, (movie) => movie.id)
  movieId!: number;

  @Column()
  @OneToOne(() => User, (user) => user.id)
  userId!: number;

  @Column()
  rating!: number;

  @Column({ nullable: true })
  comment: string;
}
