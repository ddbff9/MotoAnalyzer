const {printUserSelectionsQueryOutput} = require('../helpers/dataOutput');

class UserSelections{
  constructor(user_id, rider_list, round_list, location_list, venue_type_list, soil_type_list, whoop_section_list, session_type_list, result_type){
    this.user_id = user_id;
    this.riders = rider_list,
    this.sessions = session_type_list;
    this.outputType = result_type;
    this.attributes= [];    

    // Set Category, Attribute, and Value for selections that the user chose:
    this.setDataAttributes('Series','Round',round_list);
    this.setDataAttributes('Venue','Location',location_list);
    this.setDataAttributes('Venue','Venue_Type',venue_type_list);
    this.setDataAttributes('Track','Soil_Type',soil_type_list);
    this.setDataAttributes('Track','Whoops',whoop_section_list);
    // this.getQueryParameters();
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

  viewQuery(){
    printUserSelectionsQueryOutput(this)
  }

};

module.exports = UserSelections;