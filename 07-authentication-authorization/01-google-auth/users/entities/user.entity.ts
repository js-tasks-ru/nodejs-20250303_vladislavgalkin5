import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  displayName: string;

  @Column()
  avatar: string;

  @Column()
  password: string

  validatePassword(password){
    return bcrypt.compare(password, this.password)
  }
}
