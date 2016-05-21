export class Lotto {
  last: LottoInfo;
}

export class LottoInfo {
	nr: number;
	currency: string;
	date: LottoDate;
	closingDate: string;
	lateClosingDate: string;
	numbers: Array<number>;
	euroNumbers:Array<number>;
	jackpot:number;
	marketingJackpot:number;
	odds:any;
}

export class LottoDate {
	full: string;
	day: number;
	month: number;
	year: number;
	dayOfWeek: string;
}

export class LottoOdd {
	winners:number;
	prize:number;
}