import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Bebidas } from '../../libs/entity/bebidas.interface';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss']
})
export class BebidasComponent implements OnInit {

  public bebidas: Bebidas[]=[];

  constructor(public requestService:RequestService) { }

  ngOnInit(): void {
    this.requestService.getObtener('margarita').subscribe({
      next: resp => {
        console.log(resp)
        this.bebidas= resp
      }
    })
  }

}
