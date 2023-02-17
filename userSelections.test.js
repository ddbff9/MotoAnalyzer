const UserSelections = require('./userSelections');

// Example of user selections class being created:
let testSelections = new UserSelections(1,['Eli Tomac','Ken Roczen'],[1],['Anaheim, CA'],['Baseball'],['Hard-Pack'],[2],['Qualifying','Main Event'],['Avg Finish']);

test('the UserSelections object has desired properties', ()=>{
  expect(testSelections).toHaveProperty('user_id');
  expect(testSelections).toHaveProperty('riders');
  expect(testSelections).toHaveProperty('sessions');
  expect(testSelections).toHaveProperty('outputType');
  expect(testSelections).toHaveProperty('attributes');
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