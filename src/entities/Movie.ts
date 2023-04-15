import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  movieName!: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  directorName!: string;

  @CreateDateColumn()
  releaseDate: Date;
}
