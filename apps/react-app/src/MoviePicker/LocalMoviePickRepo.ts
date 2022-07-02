import { MoviePickRepo } from "./MoviePickRepo";

/**
 *
 */
export class LocalMoviePickRepo implements MoviePickRepo {
  /**
   *
   */
  async getByFirstLetter(firstLetter: string) {
    return localStorage.getItem(firstLetter.toUpperCase()) ?? null;
  }

  /**
   *
   */
  async getAll() {
    let result = [];

    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      result.push(localStorage.getItem(key!))
    }

    return result.join(',').split(',');
  }

  /**
   *
   */
  async put(title: string) {
      if(title.length) {
          localStorage.setItem([...title][0].toUpperCase(), title);
      }
  }
}
