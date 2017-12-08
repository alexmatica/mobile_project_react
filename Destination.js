/**
 * Created by Alex on 11/9/2017.
 */

export class Destination{
  constructor (name, description, rating, photo){
    this.id = null;
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.photo = photo;
  }

  setId(newId){
    this.id = newId;
  }
}