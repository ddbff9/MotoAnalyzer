const UserSelections = require('../class_definitions/userSelections');


function buildUserSelections(user){
  let userSelections = new UserSelections(user.id,                                              // User ID
                                             ['Eli Tomac','Cooper Webb', 'Ken Roczen', 'Chase Sexton','Adam Cianciarulo'],         // Rider_List
                                             [],                                               // Round_List
                                             [],                                   // Location_List
                                             ['Baseball','Football'],                                      // Venue_Type_List
                                             ['Hard-Pack','Soft/Rutted'],                                     // Soil_Type_List
                                             [],                                               // Whoop_Section_List
                                             ['Qualifying','Main Event'],                       // Session_Type_List
                                             'Avg Finish');                                   // Result_Type_List
                                             return userSelections

                                            //  ['Eli Tomac','Cooper Webb', 'Ken Roczen', 'Chase Sexton'],         // Rider_List
                                            //  [1],                                               // Round_List
                                            //  ['Anaheim, CA'],                                   // Location_List
                                            //  ['Baseball'],                                      // Venue_Type_List
                                            //  ['Hard-Pack'],                                     // Soil_Type_List
                                            //  [2],                                               // Whoop_Section_List
                                            //  ['Main Event','Qualifying'],                       // Session_Type_List
                                            //  'Avg Finish');   
}

module.exports = {buildUserSelections};