import { ObjectType, Field, ID, Root } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column()
  lastName?: string;

  @Field()
  @Column()
  email: string;

  @Field()
  name(@Root() user: User): String {
    return `${user.firstName} ${user.lastName}`;
  }

  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @VersionColumn()
  version: string;
}
