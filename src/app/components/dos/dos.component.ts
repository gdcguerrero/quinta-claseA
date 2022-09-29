import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss']
})
export class DosComponent implements OnInit {

  public name: string = '';
  public password: string = '';
  public detector$?: Observable<any>;

  constructor(public infoService: InfoService) {
    this.detector$ = infoService.data$.pipe(tap(resp => {
      console.log('pipe > ',resp);
    }))
  }

  ngOnInit(): void {
  }



}
