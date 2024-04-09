const getId = require('../utils/getId');


/* 
This class provides an interface for managing Fellow data. 
Instances of this class can't do much really. They just store data.

The class itself provides static methods for CRUD actions on 
the collection of fellows.
*/
class Fellow {
  static #all = [];

  constructor(name) {
    this.id = getId();
    this.name = name;

    Fellow.#all.push(this);
  }

  static list() {
    return Fellow.#all;
  }

  static find(id) {
    return Fellow.#all.find((fellow) => fellow.id === id);
  }

  static editName(id, newName) {
    const fellow = Fellow.find(id);
    if (!fellow) return null;
    fellow.name = newName;
    return fellow;
  }

  static delete(id) {
    const fellowIndex = Fellow.#all.findIndex((fellow) => fellow.id === id);
    if (fellowIndex < 0) return null;

    Fellow.#all.splice(fellowIndex, 1);
    return true;
  }

  static deleteAll() {
    if (!Fellow.#all.length) return null;

    Fellow.#all.length = 0;
    return Fellow.#all;
  }
}

module.exports = Fellow;