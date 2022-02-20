import { Entity, PrimaryColumn, CreateDateColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id!: number;

  @PrimaryColumn()
  token!: string;

  @Column()
  battleTag!: string;

  @CreateDateColumn()
  createdAt!: Date;

  constructor(args: { id: number; token: string; battleTag: string }) {
    if (args) {
      this.id = args.id;
      this.token = args.token;
      this.battleTag = args.battleTag;
    }
  }
}
