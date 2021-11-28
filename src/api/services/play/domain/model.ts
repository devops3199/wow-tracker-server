import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Play {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  playerId!: number;

  @Column()
  beginAt!: Date;

  @Column()
  endAt!: Date;

  @Column()
  dungeonCount!: number;

  @Column()
  raidCount!: number;

  @Column()
  playAt!: Date;

  constructor(args: {
    playerId: number;
    beginAt: Date;
    endAt: Date;
    dungeonCount: number;
    raidCount: number;
    playAt: Date;
  }) {
    if (args) {
      this.playerId = args.playerId;
      this.beginAt = args.beginAt;
      this.endAt = args.endAt;
      this.dungeonCount = args.dungeonCount;
      this.raidCount = args.raidCount;
      this.playAt = args.playAt;
    }
  }
}
