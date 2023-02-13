const UserSelections = require('./userSelections');

// Example of user selections class being created:
let testSelections = new UserSelections(1,['Eli Tomac','Ken Roczen'],[1],['Anaheim, CA'],['Baseball'],['Hard-Pack'],[2],['Qualifying','Main Event'],['Avg Finish']);

test('the UserSelections object has desired properties', ()=>{
  expect(testSelections).toHaveProperty('user_id');
  expect(testSelections).toHaveProperty('riders');
  expect(testSelections).toHaveProperty('sessions');
  expect(testSelections).toHaveProperty('outputType');
  expect(testSelections).toHaveProperty('attributes');
  expect(testSelections).toHaveProperty('queryParameters');
  expect(testSelections).toHaveProperty('output');
  expect(testSelections).toHaveProperty('queryTable');
})

test('the testSelections.user_id object as correct attributes', ()=>{
  expect(testSelections.user_id).toEqual(1)
});

test('the testSelections.riders object as correct attributes', ()=>{
  expect(testSelections.riders).toEqual(['Eli Tomac', 'Ken Roczen'])
});

test('the testSelections.sessions object as correct attributes', ()=>{
  expect(testSelections.sessions).toEqual(['Qualifying','Main Event'])
});

test('the testSelections.outputType object as correct attributes', ()=>{
  expect(testSelections.outputType).toEqual(['Avg Finish'])
});

test('the testSelections.attributes object as correct attributes', ()=>{
  expect(testSelections.attributes).toEqual([
    {
      "attribute": "Round",
      "category": "Series",
      "value": 1,
      },
    {
      "attribute": "Location",
      "category": "Venue",
      "value": "Anaheim, CA",
      },
    {
      "attribute": "Venue_Type",
      "category": "Venue",
      "value": "Baseball",
      },
    {
      "attribute": "Soil_Type",
      "category": "Track",
      "value": "Hard-Pack",
      },
    {
      "attribute": "Whoops",
      "category": "Track",
      "value": 2,
      },
    ])
});

test('the testSelections.queryParameters object as correct attributes', ()=>{
  expect(testSelections.queryParameters).toEqual([
    {
    "Attribute_Type": "Round",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Qualifying",
    "Value": 1,
    },
    {
    "Attribute_Type": "Location",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Qualifying",
    "Value": "Anaheim, CA",
    },
    {
    "Attribute_Type": "Venue_Type",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Qualifying",
    "Value": "Baseball",
    },
    {
    "Attribute_Type": "Soil_Type",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Qualifying",
    "Value": "Hard-Pack",
    },
    {
    "Attribute_Type": "Whoops",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Qualifying",
    "Value": 2,
    },
    {
    "Attribute_Type": "Round",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Main Event",
    "Value": 1,
    },
    {
    "Attribute_Type": "Location",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Main Event",
    "Value": "Anaheim, CA",
    },
    {
    "Attribute_Type": "Venue_Type",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Main Event",
    "Value": "Baseball",
    },
    {
    "Attribute_Type": "Soil_Type",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Main Event",
    "Value": "Hard-Pack",
    },
    {
    "Attribute_Type": "Whoops",
    "Rider_Name": "Eli Tomac",
    "Session_Type": "Main Event",
    "Value": 2,
    },
    {
    "Attribute_Type": "Round",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Qualifying",
    "Value": 1,
    },
    {
    "Attribute_Type": "Location",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Qualifying",
    "Value": "Anaheim, CA",
    },
    {
    "Attribute_Type": "Venue_Type",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Qualifying",
    "Value": "Baseball",
    },
    {
    "Attribute_Type": "Soil_Type",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Qualifying",
    "Value": "Hard-Pack",
    },
    {
    "Attribute_Type": "Whoops",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Qualifying",
    "Value": 2,
    },
    {
    "Attribute_Type": "Round",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Main Event",
    "Value": 1,
    },
    {
    "Attribute_Type": "Location",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Main Event",
    "Value": "Anaheim, CA",
    },
    {
    "Attribute_Type": "Venue_Type",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Main Event",
    "Value": "Baseball",
    },
    {
    "Attribute_Type": "Soil_Type",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Main Event",
    "Value": "Hard-Pack",
    },
    {
    "Attribute_Type": "Whoops",
    "Rider_Name": "Ken Roczen",
    "Session_Type": "Main Event",
    "Value": 2,
    },
  ])
});

test('the testSelections.queryTable object as correct attributes', ()=>{
  expect(testSelections.queryTable).toEqual([])
});
