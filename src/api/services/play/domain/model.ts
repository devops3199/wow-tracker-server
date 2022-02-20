import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Play {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  playerId!: number;

  @Column()
  beginTime!: Date;

  @Column()
  endTime!: Date;

  @Column()
  dungeonCount!: number;

  @Column()
  raidCount!: number;

  @Column()
  playTime!: Date;

  constructor(args: {
    playerId: number;
    beginTime: Date;
    endTime: Date;
    dungeonCount: number;
    raidCount: number;
    playTime: Date;
  }) {
    if (args) {
      this.playerId = args.playerId;
      this.beginTime = args.beginTime;
      this.endTime = args.endTime;
      this.dungeonCount = args.dungeonCount;
      this.raidCount = args.raidCount;
      this.playTime = args.playTime;
    }
  }
}
