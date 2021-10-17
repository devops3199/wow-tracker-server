import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  constructor(args: { email: string; name: string; password: string }) {
    this.email = args.email;
    this.name = args.name;
    this.password = args.password;
  }

  convertPasswordToHash(password: string) {
    this.password = password;
  }
}
