export class Play {
  date: string;
  begin: string;
  end: string;
  dungeon: number;
  raid: number;

  constructor(args: { date: string; begin: string; end: string; dungeon: number; raid: number }) {
    this.date = args.date;
    this.begin = args.begin;
    this.end = args.end;
    this.dungeon = args.dungeon;
    this.raid = args.raid;
  }
}
