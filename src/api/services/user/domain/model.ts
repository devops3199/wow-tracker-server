import { Entity, Unique, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
@Unique(['id'])
export class User {
  @PrimaryColumn()
  id!: number;

  @PrimaryColumn()
  token!: string;

  @Column()
  battleTag!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(args: { id: number; token: string; battleTag: string }) {
    if (args) {
      this.id = args.id;
      this.token = args.token;
      this.battleTag = args.battleTag;
    }
  }
}
