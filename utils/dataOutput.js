const sequelize = require('../models');

printUserSelectionsQueryOutput = async (userSelections) => {
  await console.table(await getUserSelectionsQueryOutput(userSelections));
};

getUserSelectionsQueryOutput = async (userSelections) => {
  const queryResults = await getQueryResults(userSelections);
  const riders = getUniqueRiders(queryResults);
  const sessions = getUniqueSessions(queryResults);
  const attributes = getUniqueAttributes(queryResults);
  const queryOutput = [];

  for (const rider of riders) {
    for (const session of sessions) {
      let queryRow = {};
      queryRow.Rider = rider;
      queryRow.Session = session;

      for (const query of queryResults) {
        for (const attribute of attributes) {
          if (
            query.Rider == rider &&
            query.Session == session &&
            !(attribute in queryRow) &&
            !(query[attribute] == undefined)
          ) {
            queryRow[attribute] = query[[attribute]];
          }
        }
      }
      queryOutput.push(queryRow);
    }
  }
  return queryOutput;
};

getUniqueAttributes = (results) => {
  let uniqueAttributes = [];

  for (const result of results) {
    let attributes = Object.keys(result);
    for (const attribute of attributes) {
      if (!uniqueAttributes.includes(attribute)) {
        uniqueAttributes.push(attribute);
      }
    }
  }
  return uniqueAttributes;
};

getUniqueRiders = (results) => {
  return [...new Set(results.map((results) => results.Rider))];
};

getUniqueSessions = (results) => {
  return [...new Set(results.map((results) => results.Session))];
};

createColumnHeader = (attribute, value) => {
  if (attribute == 'Round') {
    return `${attribute} ${value}`;
  } else if (attribute == 'Soil_Type') {
    return `${value} Soil`;
  } else if (attribute == 'Whoops') {
    return `${value} Set(s) of Whoops`;
  } else if (attribute == 'Open_Air') {
    if (value == 0) {
      return `Covered Stadium`;
    } else {
      return 'Open-Air Stadium';
    }
  } else {
    return `${value}`;
  }
};

getQueryResults = async (userSelections) => {
  let queries = [];
  const parameters = getQueryParameters(userSelections);

  for (const parameter of parameters) {
    if (userSelections.outputType == 'Avg Finish') {
      let result = getAveragePosition(
        await getResults(
          parameter.Rider_Name,
          parameter.Session_Type,
          parameter.Attribute_Type,
          parameter.Value
        )
      );
      let attribute = createColumnHeader(
        parameter.Attribute_Type,
        parameter.Value
      );

      queries.push({
        Rider: parameter.Rider_Name,
        Session: parameter.Session_Type,
        [attribute]: result,
      });
    }
  }
  return queries;
};

getQueryParameters = (userSelections) => {
  let queryParameters = [];
  for (const rider of userSelections.riders) {
    for (const session of userSelections.sessions) {
      for (const attribute of userSelections.attributes) {
        let parameters = {
          Rider_Name: rider,
          Session_Type: session,
          Attribute_Type: attribute.attribute,
          Value: attribute.value,
        };
        queryParameters.push(parameters);
      }
    }
  }
  return queryParameters;
};

getResults = async (rider, session, attr_type, attr) => {
  try {
    let [results, metadata] = await sequelize.query(`
    SELECT * 
    FROM (

    SELECT Riders.name AS Rider_Name, 
        Events.id AS Event_Id, 
          Venues.open_air AS Open_Air, 
          Events.whoop_section AS Whoops, 
          Events.sand_section AS Sand, 
          Events.round_number AS Round, 
          CONCAT(Venues.city,', ', Venues.state)AS Location, 
          Venue_Types.type AS Venue_Types, 
          Event_Soils.type AS Soil_Type, 
          Event_Sessions.name AS Session_Type, 
          Event_Results.position AS Position 
          
          FROM Event_Results
          
          JOIN Events ON Events.id = Event_Results.event_id 
          JOIN Venues ON Venues.id = Events.venue_id  
          JOIN Venue_Types ON Venue_Types.id = Venues.type_id 
          JOIN Event_Soils ON Event_Soils.id = Events.soil_id 
          JOIN Event_Sessions ON Event_Sessions.id = Event_Results.session_id
          JOIN Riders ON Riders.id = Event_Results.rider_id
          
    ) AS Results
    WHERE Results.Rider_Name = '${rider}' AND Results.Session_Type = '${session}' AND ${attr_type} = '${attr}' ;`);
    return results;

  } catch (ex) {
    console.error(ex);
  }
};

getAveragePosition = (results) => {
  let numerator = 0;
  let denominator = results.length;

  for (const result of results) {
    numerator += result['Position'];
  }

  let averagePosition = numerator / denominator;
  // averagePosition = averagePosition.toFixed(2);
  averagePosition = Math.round((averagePosition + Number.EPSILON) * 10) / 10;

  return averagePosition;
};

module.exports = { getUserSelectionsQueryOutput };
