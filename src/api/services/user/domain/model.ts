import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  createdAt!: Date;

  constructor(args: { email: string; name: string; password: string; createdAt: Date }) {
    if (args) {
      this.email = args.email;
      this.name = args.name;
      this.password = args.password;
      this.createdAt = args.createdAt;
    }
  }

  hashPassword(password: string) {
    if (typeof password !== 'string') throw new Error('Password Hash Error');
    this.password = password;
  }
}
