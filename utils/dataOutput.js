// Take provided userSelections and build a list of objects
// that can be queried in the database.
getQueryParameters = (userSelections) => {
  // Initialize empty list to store output into
  let queryParameters = [];

  // Loop over each rider selected:
  for (const rider of userSelections.riders) {
    // For each rider selected, loop over each session selected:
    for (const session of userSelections.sessions) {
      // For each session selected, loop over each attribute selected:
      for (const attribute of userSelections.attributes) {
        // Create an object for each parameter selected:
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

// Returns a list of positions for races that contain the passed
// rider, sessino, attr_type, and attr.
// Example: Eli Tomac, Main Event, Whoops, 1
getResults = async (rider, session, attr_type, attr) => {
  const {queryResults} = require('./databaseFunctions');

  let results = await queryResults(rider, session, attr_type, attr);

  let results_output = [];
  results.forEach((result) => {
    results_output.push(result['Position']);
  });
  return results_output;
};



// Takes a list of integers, and returns the average:
getAveragePosition = (results) => {
  let numerator = 0;
  let denominator = results.length;

  results.forEach((result) => {
    numerator += result;
  });

  let averagePosition = numerator / denominator;

  averagePosition = Math.round((averagePosition + Number.EPSILON) * 10) / 10;

  return averagePosition;
};

// Takes a list of integers, and returns the lowest value:
getMinPosition = (results) => {
  let minFinish = 1000;

  results.forEach((result) => {
    if(result < minFinish){
      minFinish = result
    }
  });

  return minFinish;
};

// Takes a list of integers, and returns the highest value:
getMaxPosition = (results) => {
  let maxFinish = 0;

  results.forEach((result) => {
    if(result > maxFinish){
      maxFinish = result
    }
  });
  return maxFinish;
};

// Creates column names for attributes that are represented in the
// database as values:
createColumnHeader = (attribute, value) => {
  if (attribute == 'Round') {
    return `${attribute} ${value}`;
  } else if (attribute == 'Soil_Type') {
    return `${value} Soil`;
  } else if (attribute == 'Whoops') {
    return `${value} Set(s) of Whoops`;
  } else if (attribute == 'Sand') {
    return `${value} Set(s) of Sand`;
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

// Queries the database for the supplied userSelections:
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
    } else if (userSelections.outputType == 'Best Finish') {
      let result = getMinPosition(
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
    } else if (userSelections.outputType == 'Worst Finish') {
      let result = getMaxPosition(
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
  };

  return queries;
};

// Take a list of Objects, and return a list of unique rider names:
getUniqueRiders = (results) => {
  return [...new Set(results.map((results) => results.Rider))];
};

// Takes a list of Objects and returns a list of unique session names:
getUniqueSessions = (results) => {
  return [...new Set(results.map((results) => results.Session))];
};

// Returns a list of all the unique keys in a list of objects:
getUniqueAttributes = (results) => {
  let uniqueAttributes = [];

  for (const result of results) {
    // create list of keys from the results array
    let attributes = Object.keys(result);

    // Loop over each key and add it to the uniqueAttributes list
    // if the list doesn't already contain it.
    for (const attribute of attributes) {
      if (!uniqueAttributes.includes(attribute)) {
        uniqueAttributes.push(attribute);
      }
    }
  }
  return uniqueAttributes;
};

// Take various inputs and return a list containing the query output:
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

module.exports = {
  getQueryParameters,
  getQueryResults,
  getUserSelectionsQueryOutput,
  getAveragePosition,
  getResults,
  getUniqueAttributes,
  getUniqueRiders,
  getUniqueSessions,
  createColumnHeader,
  getMinPosition,
  getMaxPosition,
};
