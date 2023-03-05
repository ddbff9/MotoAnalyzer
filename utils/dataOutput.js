const Sequelize = require('sequelize');
const Results_Filtered = require('../models/Results_Filtered');

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
    let results = await Results_Filtered.findAll({
      attributes: {
        exclude: ['id'],
      },
      where: Sequelize.and(
        { Rider_Name: rider },
        { Session_Type: session },
        { [attr_type]: attr }
      ),
    });
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

module.exports = { printUserSelectionsQueryOutput };