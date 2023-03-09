class User{

  constructor(id, name, street, city, state, zipcode, email, phone){
    this.id = id;
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.email = email;
    this.phone = phone;
  }

  createQuery(){
    console.log(`${this.name} created a query!`);
  }

  deleteQuery(){
    console.log(`${this.name} deleted a query!`);
  }

  modifyQuery(){
    console.log(`${this.name} modified a query!`);
  }

  printUserInfo(){
    console.table(this);
  }
}

module.exports = User;