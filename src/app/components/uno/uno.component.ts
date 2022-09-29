import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {

  constructor(private infoService: InfoService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.infoService.data$.next({name:'diego',password:'1234'})
  }
}