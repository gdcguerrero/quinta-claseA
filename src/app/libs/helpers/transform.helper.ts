import { Bebidas } from "../entity/bebidas.interface";

export default class transform {

  public static transform(drinks: any[]): Bebidas[] {
    let bebidas = drinks.map(drink => {
      let ingredients: string[] = [];
      Object.keys(drink).forEach(key => {
        if (key.includes('strIngredient') && drink[key]) {
          ingredients.push(drink[key])
        }
      })
      return {
        name: drink.strDrink,
        img: drink.strDrinkThumb,
        ingredients: ingredients
      }
    })
    return bebidas;
  }
}