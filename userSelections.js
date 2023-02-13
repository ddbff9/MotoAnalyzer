const Database =require('./database');
const QueryOutput = require('./queryOutput')

// Create new database object with connection parameters:
let db = new Database( 'localhost',3306,'root','password','MotoAnalytics');
class UserSelections{
  constructor(user_id, rider_list, round_list, location_list, venue_type_list, soil_type_list, whoop_section_list, session_type_list, result_type){
    this.user_id = user_id;
    this.riders = rider_list,
    this.sessions = session_type_list;
    this.outputType = result_type;
    this.attributes= [];
    this.queryParameters = []
    this.output = [];
    this.queryTable = [];
    

    // Set Category, Attribute, and Value for selections that the user chose:
    this.setDataAttributes('Series','Round',round_list);
    this.setDataAttributes('Venue','Location',location_list);
    this.setDataAttributes('Venue','Venue_Type',venue_type_list);
    this.setDataAttributes('Track','Soil_Type',soil_type_list);
    this.setDataAttributes('Track','Whoops',whoop_section_list);
    this.getQueryParameters();
  }
  
  setDataAttributes(category, attribute, values){
    for (let i=0; i < values.length; i++){
      let selection = {
        category : category,
        attribute : attribute,
        value : values[i]
      }
      this.attributes.push(selection)
    }
  };

  saveQuery(){
    console.log(`User ${this.user_id} saved the query selections!`)
  };

  getUniqueKeys(list){
    let uniqueKeys = []
    for (let i=0; i<list.length;i++){
      let keys = Object.keys(list[i])
      for (let j=0; j<keys.length;j++){
        if (!uniqueKeys.includes(keys[j])){
          uniqueKeys.push(keys[j])
        }
      }
    }
    return uniqueKeys
  };

  viewQuery = async () => {
    await this.buildQuery();
    let results = this.output;
    const uniqueRiders = [...new Set(results.map(results => results.Rider))];
    const uniqueSessions = [...new Set(results.map(results => results.Session))];
    
    let uniqueKeys = this.getUniqueKeys(results);

    for (let i=0; i<uniqueRiders.length;i++){
      
      for (let k=0; k<uniqueSessions.length;k++){
        let temp_object = {};
        temp_object.Rider = uniqueRiders[i];
        temp_object.Session = uniqueSessions[k];
      
        for (let j=0; j<results.length;j++){

          for (let l = 0; l < uniqueKeys.length; l++){
            let temp_attr = uniqueKeys[l]
            if(results[j].Rider == uniqueRiders[i] && results[j].Session == uniqueSessions[k] && !(temp_attr in temp_object) && !(results[j][temp_attr] == undefined)){
              temp_object[temp_attr] = results[j][[temp_attr]];
            }
          }
        }
        this.queryTable.push(temp_object)
      }
    }
    console.table(this.queryTable);
  };

  buildQuery = async () => {
    for(let i=0; i < this.queryParameters.length; i++){
      let rider = this.queryParameters[i].Rider_Name;
      let session = this.queryParameters[i].Session_Type;
      let attr_type = this.queryParameters[i].Attribute_Type;
      let attr_value = this.queryParameters[i].Value;

      if (this.outputType == 'Avg Finish'){
        let result = await db.getAvgFinish(rider,session,attr_type,attr_value);
        if (attr_type=='Round'){
          attr_type = `${attr_type} ${attr_value}`
        }

        if (attr_type=='Venue_Type' || attr_type=='Location'){
          attr_type = `${attr_value}`
        }

        if (attr_type=='Soil_Type'){
          attr_type = `${attr_value} Soil`
        }

        if (attr_type=='Whoops'){
          attr_type = `${attr_value} Set(s) of Whoops`
        }

        this.output.push({
          Rider : rider,
          Session : session,
          [attr_type] : result
          })
        }
      }
    };

  getQueryParameters(){
    for (let i=0; i < this.riders.length; i++){
      for (let j=0; j< this.sessions.length; j++){
        for(let k=0; k< this.attributes.length; k++){
          let parameters = {
            Rider_Name : this.riders[i],
            Session_Type : this.sessions[j],
            Attribute_Type: this.attributes[k].attribute,
            Value : this.attributes[k].value
            }
          this.queryParameters.push(parameters);
        }
      }
    }
  }
};

module.exports = UserSelections;