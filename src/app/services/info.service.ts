import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from "../libs/entity/user-data.interface";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  public data$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>({name:'',password:''});
  
  constructor() {
    
  }

}