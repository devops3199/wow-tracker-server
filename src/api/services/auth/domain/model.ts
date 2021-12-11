import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryColumn()
  id!: number;

  @Column()
  createdAt!: Date;

  constructor(args: { id: number; createdAt: Date }) {
    if (args) {
      this.id = args.id;
      this.createdAt = args.createdAt;
    }
  }
}
