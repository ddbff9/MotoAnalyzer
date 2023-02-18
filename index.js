// GUI is not built yet, so use pre-defined User Settings:
const User = require('./class_definitions/user');

const user = new User(2,"Dan Bax","316 Heather Mill Dr.","Dan.D.Bax@gmail.com","(314) 406-5730");

// TODO: In production create function to getUserSelections from event loop:
const {buildUserSelections} = require('./temp/testSelections');

// run viwQuery function to see output table with the user's selected data attributes:
const testViewQuery = async (user) => {
  let testSelections = await buildUserSelections(user);
  await testSelections.viewQuery();
}

testViewQuery(user);