const Database =require('./database');

// Create new database object with connection parameters:
let db = new Database( '108.167.133.28',3306,'motoanal_db_admin','H0ckey1!DB','motoanal_db');
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
    this.getQueryParameters();
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
    const queryOutput = await this.buildQueryOutput();
    await console.table(queryOutput)
   };
  
  // Query processing Functions:
  async buildQueryOutput() {
    const queryResults = await this.getQueryResults();
    const riders = this.getUniqueRiders(queryResults);
    const sessions = this.getUniqueSessions(queryResults)
    const attributes = this.getUniqueAttributes(queryResults);
    const queryOutput = [];

    for (const rider of riders){
      for (const session of sessions){
        let queryRow = {};
        queryRow.Rider = rider;
        queryRow.Session = session;

        for (const query of queryResults){  
          for (const attribute of attributes){
            if(query.Rider == rider && query.Session == session && !(attribute in queryRow) && !(query[attribute] == undefined)){
              queryRow[attribute] = query[[attribute]];
            }
          }
        }
        queryOutput.push(queryRow)
      }
    }
    return queryOutput;
  };

  getUniqueAttributes(results){
    let uniqueAttributes = [];

    for (const result of results){
      let attributes = Object.keys(result)
      for (const attribute of attributes){
        if (!uniqueAttributes.includes(attribute)){
          uniqueAttributes.push(attribute)
        }
      }
    }
    return uniqueAttributes;
  };

  getUniqueRiders(results) {
    return [...new Set(results.map(results => results.Rider))];
  };

  getUniqueSessions(results){
    return [...new Set(results.map(results => results.Session))];
  };

  createColumnHeader(attribute,value){
    if (attribute =='Round'){
      return `${attribute } ${value}`
    } else if (attribute =='Soil_Type'){
      return `${value} Soil`
    } else if (attribute =='Whoops'){
      return `${value} Set(s) of Whoops`
    } else {
      return `${value}`
    }
  }
  
  async getQueryResults(){
    let queries = [];
    const parameters = this.getQueryParameters();

    for (const parameter of parameters){

      if (this.outputType == 'Avg Finish'){

        let result = db.getAveragePosition(await db.getResults(parameter.Rider_Name, parameter.Session_Type, parameter.Attribute_Type, parameter.Value));
        let attribute = this.createColumnHeader(parameter.Attribute_Type,parameter.Value);

        queries.push({
          Rider : parameter.Rider_Name,
          Session : parameter.Session_Type,
          [attribute] : result
          })
        };
      };
      return queries
    };

  getQueryParameters(){
    let queryParameters = [];

    for (const rider of this.riders){
      for (const session of this.sessions){
        for (const attribute of this.attributes){
          let parameters = {
            Rider_Name : rider,
            Session_Type : session,
            Attribute_Type: attribute.attribute,
            Value : attribute.value
            }
          queryParameters.push(parameters);
        }
      }
    }
    return queryParameters;
  }
};

module.exports = UserSelections;