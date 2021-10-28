class Users {
  constructor() {
    this.people = [];
  }

  addPerson = (id, name) => {
    let person = { id, name };
    this.people.push(person);
    return this.people;
  };

  getPersonById = (id) => {
    const person = this.people.filter((person) => person.id === id)[0];
    return person;
  };

  getAllPeople = () => this.people;

  getPeopleByRoom = (room) => {
    console.log(".....");
    console.log("pass");
    console.log(".....");
  };

  deletePersonById = (id) => {
    const deletedPerson = this.getPersonById(id);
    this.people = this.people.filter((person) => person.id !== id);
    return deletedPerson;
  };
}

module.exports = Users;
