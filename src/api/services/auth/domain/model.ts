import { Entity, PrimaryColumn, Column } from 'typeorm';
import jwt from 'jsonwebtoken';

@Entity()
export class Auth {
  @PrimaryColumn()
  id!: string;

  @Column()
  userId!: number;

  @Column()
  createdAt!: Date;

  constructor(args: { id: string; userId: number; createdAt: Date }) {
    if (args) {
      this.id = args.id;
      this.userId = args.userId;
      this.createdAt = args.createdAt;
    }
  }

  generateToken() {
    return jwt.sign(
      {
        id: this.id,
        userId: this.userId,
        createdAt: this.createdAt,
      },
      'hunter',
    );
  }
}
