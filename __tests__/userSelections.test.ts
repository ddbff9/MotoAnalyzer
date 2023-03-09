const UserSelections = require('../class_definitions/userSelections');

 describe('\nUserSelections Class Object', ()=>{
   const testSelections = new UserSelections(1,['Eli Tomac','Ken Roczen'],[1],['Anaheim, CA'],['Baseball'],[1],['Hard-Pack'],[2],['Qualifying','Main Event'],['Avg Finish']);
  describe('is constructed correctly:', ()=>{

    test('has user_id property', ()=>{
      expect(testSelections).toHaveProperty('user_id');
    });
 
    test('has riders property', ()=>{
      expect(testSelections).toHaveProperty('riders');
    });
 
    test('has sessions property', ()=>{
      expect(testSelections).toHaveProperty('sessions');
    });
 
    test('has outputType property', ()=>{
      expect(testSelections).toHaveProperty('outputType');
    });
 
    test('has attributes property', ()=>{
      expect(testSelections).toHaveProperty('attributes');
    });
    
    test ('defines setDataAttributes()', ()=> {
     expect(typeof testSelections.setDataAttributes).toBe("function");
    });
  
    test ('defines viewQuery()', ()=> {
     expect(typeof testSelections.viewQuery).toBe("function");
    });
  
    test ('defines saveQuery()', ()=> {
     expect(typeof testSelections.saveQuery).toBe("function");
    });
  });


  describe('has correct attributes:', ()=>{
    test('the testSelections.user_id object has correct attributes', ()=>{
      expect(testSelections.user_id).toEqual(1)
    });
    
    test('the testSelections.riders object has correct attributes', ()=>{
      expect(testSelections.riders).toEqual(['Eli Tomac', 'Ken Roczen'])
    });
    
    test('the testSelections.sessions object has correct attributes', ()=>{
      expect(testSelections.sessions).toEqual(['Qualifying','Main Event'])
    });
    
    test('the testSelections.outputType object has correct attributes', ()=>{
      expect(testSelections.outputType).toEqual(['Avg Finish'])
    });
    
    test('the testSelections.attributes object has correct attributes', ()=>{
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
          "attribute": "Venue_Types",
          "category": "Venue",
          "value": "Baseball",
          },
        {
            "attribute": "Open_Air",
            "category": "Venue",
            "value": 1,
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
  });
  
  describe('Test viewQuery Function',()=>{
    test('the viewQuery() outputes a table', async ()=>{
      let queryResults = await testSelections.viewQuery();
      expect(queryResults).toMatchObject([{"2 Set(s) of Whoops": 2.5, "Anaheim, CA": 3, "Baseball": 3, "Hard-Pack Soil": 3, "Open-Air Stadium": 3.2, "Rider": "Eli Tomac", "Round 1": 2, "Session": "Qualifying"}, {"2 Set(s) of Whoops": 1, "Anaheim, CA": 3.5, "Baseball": 2.7, "Hard-Pack Soil": 1, "Open-Air Stadium": 2.8, "Rider": "Eli Tomac", "Round 1": 1, "Session": "Main Event"}, {"2 Set(s) of Whoops": 8.5, "Anaheim, CA": 4, "Baseball": 6.7, "Hard-Pack Soil": 8, "Open-Air Stadium": 7.2, "Rider": "Ken Roczen", "Round 1": 5, "Session": "Qualifying"}, {"2 Set(s) of Whoops": 8, "Anaheim, CA": 4, "Baseball": 6.3, "Hard-Pack Soil": 5.7, "Open-Air Stadium": 5.4, "Rider": "Ken Roczen", "Round 1": 5, "Session": "Main Event"}])
    });
  })
 });

