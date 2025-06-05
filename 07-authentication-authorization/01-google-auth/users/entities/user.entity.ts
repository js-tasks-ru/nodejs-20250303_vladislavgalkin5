import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  displayName: string;

  @Column( {default: ''} )
  avatar: string;
}