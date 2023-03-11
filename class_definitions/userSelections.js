
class UserSelections{
  constructor({user = user_id, riders = rider_list, rounds = round_list, locations = location_list, venue_types = venue_type_list, open_air = venue_open_air, soil = soil_type_list, whoops =  whoop_section_list, sand = sand_section_list, sessions = session_type_list, result_types = result_type}){
    this.user_id = user;
    this.riders = riders,
    this.sessions = sessions;
    this.outputType = result_types;
    this.attributes= [];    
    
    // Set Category, Attribute, and Value for selections that the user chose:
    this.setDataAttributes('Series','Round',rounds);
    this.setDataAttributes('Venue','Location',locations);
    this.setDataAttributes('Venue','Venue_Types',venue_types);
    this.setDataAttributes('Venue','Open_Air', open_air);
    this.setDataAttributes('Track','Soil_Type',soil);
    this.setDataAttributes('Track','Whoops',whoops);
    this.setDataAttributes('Track','Sand',sand);
  }
  
  // Constructor function to create an object for each data attribute the user selected:
  setDataAttributes(category, attribute, values){
    for (const value of values){
      let selection = {
        category : category,
        attribute : attribute,
        value : value
      }
      this.attributes.push(selection)
    }
  };
  
  // TODO: Create a database table to save user queries in, then update this function to store the user selections to that table.
  saveQuery(){
    console.log(`User ${this.user_id} saved the query selections!`)
  };
  
  async viewQuery(){
    // const {printUserSelectionsQueryOutput} = require('../utils/dataOutput');
    const {getUserSelectionsQueryOutput} = require('../utils/dataOutput');

    const output = await getUserSelectionsQueryOutput(this);

    console.table(output);
    return output;
  }
  
};

module.exports = UserSelections;