const Database =require('./database');

// Create new database object with connection parameters:
let db = new Database( '108.167.133.28',3306,'motoanal_db_admin','H0ckey1!DB','motoanal_db');

viewDataOutput = async (userSelections) => {
  const queryOutput = await buildQueryOutput(userSelections);
  await console.table(queryOutput);
  };

buildQueryOutput = async (userSelections) => {
  const queryResults = await getQueryResults(userSelections);
  const riders = getUniqueRiders(queryResults);
  const sessions = getUniqueSessions(queryResults)
  const attributes = getUniqueAttributes(queryResults);
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

getUniqueAttributes = (results) => {
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

getUniqueRiders = (results) => {
  return [...new Set(results.map(results => results.Rider))];
};

getUniqueSessions = (results) => {
  return [...new Set(results.map(results => results.Session))];
};

createColumnHeader = (attribute,value) => {
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

getQueryResults = async (userSelections) => {
  let queries = [];
  const parameters = getQueryParameters(userSelections);

  for (const parameter of parameters){

    if (userSelections.outputType == 'Avg Finish'){

      let result = db.getAveragePosition(await db.getResults(parameter.Rider_Name, parameter.Session_Type, parameter.Attribute_Type, parameter.Value));
      let attribute = createColumnHeader(parameter.Attribute_Type,parameter.Value);

      queries.push({
        Rider : parameter.Rider_Name,
        Session : parameter.Session_Type,
        [attribute] : result
        })
      };
    };
    return queries
  };

getQueryParameters = (userSelections) => {
  let queryParameters = [];
  for (const rider of userSelections.riders){
    for (const session of userSelections.sessions){
      for (const attribute of userSelections.attributes){
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


module.exports = {viewDataOutput};