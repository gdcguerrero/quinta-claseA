import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public pokemon$!: Observable<any>

  constructor(public pokemonS: RequestService) {
    this.pokemon$ = pokemonS.getPokemon()
  }

  ngOnInit(): void {
  }

}
