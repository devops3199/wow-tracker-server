import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly email: string;

  @Column()
  private _name: string;

  @Column()
  private _password: string;

  constructor(args: { email: string; name: string; password: string }) {
    this.email = args.email;
    this._name = args.name;
    this._password = args.password;
  }

  get password() {
    return this._password;
  }

  set password(password: string) {
    if (typeof password !== 'string') throw new Error('Password Hash Error');
    this._password = password;
  }

  get name() {
    return this._name;
  }
}
