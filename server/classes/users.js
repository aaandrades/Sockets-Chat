class Users {
  constructor() {
    this.people = [];
  }

  addPerson = (id, name, chat) => {
    let person = { id, name, chat };
    this.people.push(person);
    return this.people;
  };

  getPersonById = (id) => {
    const person = this.people.filter((person) => person.id === id)[0];
    return person;
  };

  getAllPeople = () => this.people;

  getPeopleByRoom = (room) => {
    let peopleInChat = this.people.filter((person)=>person.chat === room);
    return peopleInChat;
  };

  deletePersonById = (id) => {
    const deletedPerson = this.getPersonById(id);
    this.people = this.people.filter((person) => person.id !== id);
    return deletedPerson;
  };
}

module.exports = Users;
