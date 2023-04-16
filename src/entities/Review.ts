import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: "movieId" })
  movieId!: number;

  @Column()
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId!: number;

  @Column()
  rating!: number;

  @Column({ nullable: true })
  comment: string;
}
