module.exports = class Joke {
  constructor(id, {content, firstName, lastName, likes, dislikes}) {
    this.id = id;
    this.likes = likes;
    this.dislikes = dislikes;
    this.content = content;
  }
}
