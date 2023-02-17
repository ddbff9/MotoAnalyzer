const UserSelections = require('../classes/userSelections');
const User = require('../classes/user');

function buildUser(id, name, address,email,phone){
  let user = new User(id, name, address, email, phone);
  return user
};

user = buildUser(1,"Dan Bax","316 Heather Mill Dr.","Dan.D.Bax@gmail.com","(314) 406-5730");

function buildUserSelections(){
  let userSelections = new UserSelections(user.id,                                              // User ID
                                             ['Eli Tomac','Cooper Webb', 'Ken Roczen', 'Chase Sexton'],         // Rider_List
                                             [1],                                               // Round_List
                                             ['Anaheim, CA'],                                   // Location_List
                                             ['Baseball'],                                      // Venue_Type_List
                                             ['Hard-Pack'],                                     // Soil_Type_List
                                             [2],                                               // Whoop_Section_List
                                             ['Main Event','Qualifying'],                       // Session_Type_List
                                             'Avg Finish');                                   // Result_Type_List
                                             return userSelections
}

module.exports = buildUserSelections();