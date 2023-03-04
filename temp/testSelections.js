const UserSelections = require('../class_definitions/userSelections');


function buildUserSelections(user){
  let userSelections = new UserSelections(user.id,                                              // User ID
                                            ['Eli Tomac','Cooper Webb', 'Ken Roczen', 'Kevin Moranz'],         // Rider_List
                                            [],                                               // Round_List
                                            [],                                   // Location_List
                                            ['Baseball','Football'],                                      // Venue_Type_List
                                            [0,1],                                               // Venue_Open_Air
                                            ['Hard-Pack','Soft/Rutted'],                                     // Soil_Type_List
                                            [],                                               // Whoop_Section_List
                                            ['Qualifying','Main Event'],                       // Session_Type_List
                                             'Avg Finish');
                                            return userSelections
}

module.exports = {buildUserSelections};