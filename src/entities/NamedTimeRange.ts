import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";
import { ObjectType, Int, Field } from "type-graphql";

@Entity("named_time_ranges")
@ObjectType({
  description: "A named time range"
})
export class NamedTimeRange {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false, description: "The name of the time range" })
  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Field(type => Int, {
    nullable: false,
    description:
      "The duration(in milliseconds) that the pre-defined time range represents"
  })
  @Column({ nullable: false })
  duration: number;
}
