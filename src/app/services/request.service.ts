import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, tap } from 'rxjs';
import { combineLatestAll, concatMap, map } from 'rxjs/operators';
import Transform from "../libs/helpers/transform.helper";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private toSearch$: Observable<any>[] = []

  constructor(private http: HttpClient) { }

  getObtener(name: string): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name).pipe(
      map(
        (resp: any) => {
          return Transform.transform(resp.drinks)
        })
    )
  }

  getPokemon() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/pikachu').pipe(
      concatMap(
        (resPokemon: any) => {
          return this.getSpecies(resPokemon.species.url, resPokemon)
        }),
      concatMap(
        (resSpecies: any) => {
          return this.getVarieties(resSpecies);
        }),
      tap(
        res => {
          console.log('tap2>', res);
        })
    )
  }

  getSpecies(url: string, origin: any): Observable<any> {
    return this.http.get(url).pipe(
      map(
        (resSpecies: any) => {
          (resSpecies.varieties as any[]).forEach(
            el => {
              this.toSearch$.push(this.http.get(el.pokemon.url))
            })
          return {
            ...resSpecies, ...origin
          }
        })
    )
  }

  getVarieties(origin: any): Observable<any> {
    return merge(this.toSearch$).pipe(
      combineLatestAll(),
      map(
        res => {
          let sprites = res.map(
            item => {
              return {
                name: item.name,
                img: item.sprites.front_default,
              }
            })
          // let allTrash = res.map(
          //   item => {
          //     return {
          //       abilities: item.abilities,
          //       baseExperience: item.base_experience,
          //       forms: item.forms,
          //       gameIndices: item.game_indices,
          //       height: item.height,
          //       heldItems: item.held_items,
          //       id: item.id,
          //       is_default: item.is_default,
          //       locationAreaEncounters: item.location_area_encounters,
          //       moves: item.moves,
          //       order: item.order,
          //       pastTypes: item.past_types,
          //       types: item.types,
          //       weight: item.weight
          //     }
          //   })
          // delete origin['sprites']  -- elimina una key de la respuesta
          return {
            //trash: allTrash,
            ...origin,
            sprite: sprites
          }
        })
    )
  }
}
