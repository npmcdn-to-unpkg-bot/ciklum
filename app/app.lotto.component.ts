
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Lotto, LottoInfo, LottoDate, LottoOdd} from './lotto';
import { LottoService } from './app.lotto.service';

@Component({
  selector: 'lotto',
  templateUrl: 'app/app.lotto.component.html',
  styleUrls: ['resources/css/lotto.css'],
  providers: [LottoService]
})
export class AppLottoComponent implements OnInit {
  title = 'Lottery';
  lotto: Lotto;
  error: any;

  constructor(private service: LottoService) { }

  ngOnInit() {
    var selfObject:AppLottoComponent=this;
    //this.lotto=this.service.getLastLottoResults();
    this.service.getLastLottoResults()
    //.then(data => this.lotto = data)
    //.catch(error => this.error = error);
    .then(function(data:any) {
      selfObject.lotto = data;
    })
    .catch(function(error:any) {
      selfObject.error = error;
    });
  }

  getOddByIndex(lotto: LottoInfo, index:number) {
    var key:string='rank'+index;
    return lotto.odds[key];
  }

  getOddWinnerByIndex(lotto: LottoInfo, index:number) {
    var item:LottoOdd = this.getOddByIndex(lotto, index);
    return item == null ? 0 : item.winners;
  }

  getOddPrizeByIndex(lotto: LottoInfo, index:number) {
    var item:LottoOdd = this.getOddByIndex(lotto, index);
    return item == null ? 0 : item.prize;
  }

  getOddKeyIndex(value:string) {
    var ra:any = value==null ? null : /([a-zA-Z]+)([0-9]+)/g.exec(value);
    return ra==null || ra.length <3 ? null : parseInt(ra[2]);
  }

  getOddKeyToRoman(value:string) {
    return 'I';
  }

  oddsKeys(lotto: LottoInfo) : Array<string> {
    var array:any = null;
    console.log(lotto.odds);
    array=Object.keys(lotto.odds);
    array.sort((da: any, db: any) => {
      var a:number=this.getOddKeyIndex(da);
      var b:number=this.getOddKeyIndex(db);
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(array);
    return array;
  }
}


