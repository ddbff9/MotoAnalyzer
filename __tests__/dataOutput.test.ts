import sequelize from "../models";
import { queryResults } from "../utils/databaseFunctions";

describe('dataOutput',()=>{

  
  describe('test functions that query databse',()=>{
    describe('test with Avg Finish',()=>{
    const UserSelections = require('../class_definitions/userSelections');
    const testSelections = new UserSelections({user: 1,riders: ['Eli Tomac','Ken Roczen'],rounds: [1],locations:['Anaheim, CA'],venue_types: ['Baseball'],open_air: [1],soil: ['Hard-Pack'],whoops: [1], sand: [1],sessions: ['Qualifying','Main Event'],result_types: ['Avg Finish']});

      test('getResults returns correct results',async ()=>{
        const {getResults} = require('../utils/dataOutput');
  
        jest.doMock('../utils/databaseFunctions')
  
        expect(await getResults('Eli Tomac','Main Event','Whoops','1')).toEqual([1,2,3,4])
      });

      test('getQueryResults returns correct result',async ()=>{
        const {getQueryResults} = require('../utils/dataOutput');
        jest.doMock('../utils/databaseFunctions')
        expect(await getQueryResults(testSelections)).toEqual([
          {"Rider": "Eli Tomac", "Round 1": 2.5, "Session": "Qualifying"}, 
          {"Anaheim, CA": 2.5, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Baseball": 2.5, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Open-Air Stadium": 2.5, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Hard-Pack Soil": 2.5, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"1 Set(s) of Whoops": 2.5, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 2.5, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Rider": "Eli Tomac", "Round 1": 2.5, "Session": "Main Event"}, 
          {"Anaheim, CA": 2.5, "Rider": "Eli Tomac", "Session": "Main Event"}, 
          {"Baseball": 2.5, "Rider": "Eli Tomac", "Session": "Main Event"},
          {"Open-Air Stadium": 2.5,"Rider": "Eli Tomac","Session": "Main Event",},
          {"Hard-Pack Soil": 2.5,"Rider": "Eli Tomac","Session": "Main Event",},
          {"1 Set(s) of Whoops": 2.5,"Rider": "Eli Tomac","Session": "Main Event",},
          {"1 Set(s) of Sand": 2.5,"Rider": "Eli Tomac","Session": "Main Event",},
          {"Rider": "Ken Roczen","Round 1": 2.5,"Session": "Qualifying",},
          {"Anaheim, CA": 2.5,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Baseball": 2.5,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Open-Air Stadium": 2.5,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Hard-Pack Soil": 2.5,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"1 Set(s) of Whoops": 2.5,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"1 Set(s) of Sand": 2.5,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Rider": "Ken Roczen","Round 1": 2.5,"Session": "Main Event",},
          {"Anaheim, CA": 2.5,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Baseball": 2.5,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Open-Air Stadium": 2.5,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Hard-Pack Soil": 2.5,"Rider": "Ken Roczen","Session": "Main Event",},
          {"1 Set(s) of Whoops": 2.5,"Rider": "Ken Roczen","Session": "Main Event",},
          {"1 Set(s) of Sand": 2.5,"Rider": "Ken Roczen","Session": "Main Event",},
        ]);
      });

      test('getUserSelectionsQueryOutput to return correct result',async ()=>{
        const {getUserSelectionsQueryOutput} = require('../utils/dataOutput');
        expect(await getUserSelectionsQueryOutput(testSelections)).toEqual([
          {"1 Set(s) of Sand": 2.5, "1 Set(s) of Whoops": 2.5, "Anaheim, CA": 2.5, "Baseball": 2.5, "Hard-Pack Soil": 2.5, "Open-Air Stadium": 2.5, "Rider": "Eli Tomac", "Round 1": 2.5, "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 2.5, "1 Set(s) of Whoops": 2.5, "Anaheim, CA": 2.5, "Baseball": 2.5, "Hard-Pack Soil": 2.5, "Open-Air Stadium": 2.5, "Rider": "Eli Tomac", "Round 1": 2.5, "Session": "Main Event"}, 
          {"1 Set(s) of Sand": 2.5, "1 Set(s) of Whoops": 2.5, "Anaheim, CA": 2.5, "Baseball": 2.5, "Hard-Pack Soil": 2.5, "Open-Air Stadium": 2.5, "Rider": "Ken Roczen", "Round 1": 2.5, "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 2.5, "1 Set(s) of Whoops": 2.5, "Anaheim, CA": 2.5, "Baseball": 2.5, "Hard-Pack Soil": 2.5, "Open-Air Stadium": 2.5, "Rider": "Ken Roczen", "Round 1": 2.5, "Session": "Main Event"}]);
      });
    });

    describe('test with Best Finish',()=>{
    const UserSelections = require('../class_definitions/userSelections');
    const testSelections = new UserSelections({user: 1,riders: ['Eli Tomac','Ken Roczen'],rounds: [1],locations:['Anaheim, CA'],venue_types: ['Baseball'],open_air: [1],soil: ['Hard-Pack'],whoops: [1], sand: [1],sessions: ['Qualifying','Main Event'],result_types: ['Best Finish']});

      test('getResults returns correct results',async ()=>{
        const {getResults} = require('../utils/dataOutput');
  
        jest.doMock('../utils/databaseFunctions')
  
        expect(await getResults('Eli Tomac','Main Event','Whoops','1')).toEqual([1,2,3,4])
      });

      test('getQueryResults returns correct result',async ()=>{
        const {getQueryResults} = require('../utils/dataOutput');
        jest.doMock('../utils/databaseFunctions')
        expect(await getQueryResults(testSelections)).toEqual([
          {"Rider": "Eli Tomac", "Round 1": 1, "Session": "Qualifying"}, 
          {"Anaheim, CA": 1, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Baseball": 1, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Open-Air Stadium": 1, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Hard-Pack Soil": 1, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"1 Set(s) of Whoops": 1, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 1, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Rider": "Eli Tomac", "Round 1": 1, "Session": "Main Event"}, 
          {"Anaheim, CA": 1, "Rider": "Eli Tomac", "Session": "Main Event"}, 
          {"Baseball": 1, "Rider": "Eli Tomac", "Session": "Main Event"},
          {"Open-Air Stadium": 1,"Rider": "Eli Tomac","Session": "Main Event",},
          {"Hard-Pack Soil": 1,"Rider": "Eli Tomac","Session": "Main Event",},
          {"1 Set(s) of Whoops": 1,"Rider": "Eli Tomac","Session": "Main Event",},
          {"1 Set(s) of Sand": 1,"Rider": "Eli Tomac","Session": "Main Event",},
          {"Rider": "Ken Roczen","Round 1": 1,"Session": "Qualifying",},
          {"Anaheim, CA": 1,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Baseball": 1,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Open-Air Stadium": 1,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Hard-Pack Soil": 1,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"1 Set(s) of Whoops": 1,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"1 Set(s) of Sand": 1,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Rider": "Ken Roczen","Round 1": 1,"Session": "Main Event",},
          {"Anaheim, CA": 1,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Baseball": 1,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Open-Air Stadium": 1,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Hard-Pack Soil": 1,"Rider": "Ken Roczen","Session": "Main Event",},
          {"1 Set(s) of Whoops": 1,"Rider": "Ken Roczen","Session": "Main Event",},
          {"1 Set(s) of Sand": 1,"Rider": "Ken Roczen","Session": "Main Event",},
        ]);
      });

      test('getUserSelectionsQueryOutput to return correct result',async ()=>{
        const {getUserSelectionsQueryOutput} = require('../utils/dataOutput');
        expect(await getUserSelectionsQueryOutput(testSelections)).toEqual([
          {"1 Set(s) of Sand": 1, "1 Set(s) of Whoops": 1, "Anaheim, CA": 1, "Baseball": 1, "Hard-Pack Soil": 1, "Open-Air Stadium": 1, "Rider": "Eli Tomac", "Round 1": 1, "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 1, "1 Set(s) of Whoops": 1, "Anaheim, CA": 1, "Baseball": 1, "Hard-Pack Soil": 1, "Open-Air Stadium": 1, "Rider": "Eli Tomac", "Round 1": 1, "Session": "Main Event"}, 
          {"1 Set(s) of Sand": 1, "1 Set(s) of Whoops": 1, "Anaheim, CA": 1, "Baseball": 1, "Hard-Pack Soil": 1, "Open-Air Stadium": 1, "Rider": "Ken Roczen", "Round 1": 1, "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 1, "1 Set(s) of Whoops": 1, "Anaheim, CA": 1, "Baseball": 1, "Hard-Pack Soil": 1, "Open-Air Stadium": 1, "Rider": "Ken Roczen", "Round 1": 1, "Session": "Main Event"}]);
      });
    });

    describe('test with Worst Finish',()=>{
    const UserSelections = require('../class_definitions/userSelections');
    const testSelections = new UserSelections({user: 1,riders: ['Eli Tomac','Ken Roczen'],rounds: [1],locations:['Anaheim, CA'],venue_types: ['Baseball'],open_air: [1],soil: ['Hard-Pack'],whoops: [1], sand: [1],sessions: ['Qualifying','Main Event'],result_types: ['Worst Finish']});

      test('getResults returns correct results',async ()=>{
        const {getResults} = require('../utils/dataOutput');
  
        jest.doMock('../utils/databaseFunctions')
  
        expect(await getResults('Eli Tomac','Main Event','Whoops','1')).toEqual([1,2,3,4])
      });

      test('getQueryResults returns correct result',async ()=>{
        const {getQueryResults} = require('../utils/dataOutput');
        jest.doMock('../utils/databaseFunctions')
        expect(await getQueryResults(testSelections)).toEqual([
          {"Rider": "Eli Tomac", "Round 1": 4, "Session": "Qualifying"}, 
          {"Anaheim, CA": 4, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Baseball": 4, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Open-Air Stadium": 4, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Hard-Pack Soil": 4, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"1 Set(s) of Whoops": 4, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 4, "Rider": "Eli Tomac", "Session": "Qualifying"}, 
          {"Rider": "Eli Tomac", "Round 1": 4, "Session": "Main Event"}, 
          {"Anaheim, CA": 4, "Rider": "Eli Tomac", "Session": "Main Event"}, 
          {"Baseball": 4, "Rider": "Eli Tomac", "Session": "Main Event"},
          {"Open-Air Stadium": 4,"Rider": "Eli Tomac","Session": "Main Event",},
          {"Hard-Pack Soil": 4,"Rider": "Eli Tomac","Session": "Main Event",},
          {"1 Set(s) of Whoops": 4,"Rider": "Eli Tomac","Session": "Main Event",},
          {"1 Set(s) of Sand": 4,"Rider": "Eli Tomac","Session": "Main Event",},
          {"Rider": "Ken Roczen","Round 1": 4,"Session": "Qualifying",},
          {"Anaheim, CA": 4,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Baseball": 4,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Open-Air Stadium": 4,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Hard-Pack Soil": 4,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"1 Set(s) of Whoops": 4,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"1 Set(s) of Sand": 4,"Rider": "Ken Roczen","Session": "Qualifying",},
          {"Rider": "Ken Roczen","Round 1": 4,"Session": "Main Event",},
          {"Anaheim, CA": 4,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Baseball": 4,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Open-Air Stadium": 4,"Rider": "Ken Roczen","Session": "Main Event",},
          {"Hard-Pack Soil": 4,"Rider": "Ken Roczen","Session": "Main Event",},
          {"1 Set(s) of Whoops": 4,"Rider": "Ken Roczen","Session": "Main Event",},
          {"1 Set(s) of Sand": 4,"Rider": "Ken Roczen","Session": "Main Event",},
        ]);
      });

      test('getUserSelectionsQueryOutput to return correct result',async ()=>{
        const {getUserSelectionsQueryOutput} = require('../utils/dataOutput');
        expect(await getUserSelectionsQueryOutput(testSelections)).toEqual([
          {"1 Set(s) of Sand": 4, "1 Set(s) of Whoops": 4, "Anaheim, CA": 4, "Baseball": 4, "Hard-Pack Soil": 4, "Open-Air Stadium": 4, "Rider": "Eli Tomac", "Round 1": 4, "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 4, "1 Set(s) of Whoops": 4, "Anaheim, CA": 4, "Baseball": 4, "Hard-Pack Soil": 4, "Open-Air Stadium": 4, "Rider": "Eli Tomac", "Round 1": 4, "Session": "Main Event"}, 
          {"1 Set(s) of Sand": 4, "1 Set(s) of Whoops": 4, "Anaheim, CA": 4, "Baseball": 4, "Hard-Pack Soil": 4, "Open-Air Stadium": 4, "Rider": "Ken Roczen", "Round 1": 4, "Session": "Qualifying"}, 
          {"1 Set(s) of Sand": 4, "1 Set(s) of Whoops": 4, "Anaheim, CA": 4, "Baseball": 4, "Hard-Pack Soil": 4, "Open-Air Stadium": 4, "Rider": "Ken Roczen", "Round 1": 4, "Session": "Main Event"}]);
      });
    });
    
  })
  describe('test each function',()=>{
    const UserSelections = require('../class_definitions/userSelections');
    const testSelections = new UserSelections({user: 1,riders: ['Eli Tomac','Ken Roczen'],rounds: [1],locations:['Anaheim, CA'],venue_types: ['Baseball'],open_air: [1],soil: ['Hard-Pack'],whoops: [1], sand: [1],sessions: ['Qualifying','Main Event'],result_types: ['Avg Finish']});
    
    test('getQueryParameters returns correct results',()=>{
      const {getQueryParameters} = require('../utils/dataOutput');

      expect(getQueryParameters(testSelections)).toEqual([
        {"Attribute_Type": "Round", "Rider_Name": "Eli Tomac", "Session_Type": "Qualifying", "Value": 1}, {"Attribute_Type": "Location", "Rider_Name": "Eli Tomac", "Session_Type": "Qualifying", "Value": "Anaheim, CA"}, {"Attribute_Type": "Venue_Types", "Rider_Name": "Eli Tomac", "Session_Type": "Qualifying", "Value": "Baseball"}, {"Attribute_Type": "Open_Air", "Rider_Name": "Eli Tomac", "Session_Type": "Qualifying", "Value": 1}, {"Attribute_Type": "Soil_Type", "Rider_Name": "Eli Tomac", "Session_Type": "Qualifying", "Value": "Hard-Pack"}, {"Attribute_Type": "Whoops", "Rider_Name": "Eli Tomac", "Session_Type": "Qualifying", "Value": 1},
        {"Attribute_Type": "Sand", "Rider_Name": "Eli Tomac", "Session_Type": "Qualifying", "Value": 1},
        {"Attribute_Type": "Round", "Rider_Name": "Eli Tomac", "Session_Type": "Main Event", "Value": 1}, {"Attribute_Type": "Location", "Rider_Name": "Eli Tomac", "Session_Type": "Main Event", "Value": "Anaheim, CA"}, {"Attribute_Type": "Venue_Types", "Rider_Name": "Eli Tomac", "Session_Type": "Main Event", "Value": "Baseball"}, {"Attribute_Type": "Open_Air", "Rider_Name": "Eli Tomac", "Session_Type": "Main Event", "Value": 1},
        {"Attribute_Type": "Soil_Type", "Rider_Name": "Eli Tomac","Session_Type": "Main Event","Value": "Hard-Pack"}, {"Attribute_Type": "Whoops","Rider_Name": "Eli Tomac","Session_Type": "Main Event","Value": 1},
        {"Attribute_Type": "Sand", "Rider_Name": "Eli Tomac", "Session_Type": "Main Event", "Value": 1},
        {"Attribute_Type": "Round","Rider_Name": "Ken Roczen","Session_Type": "Qualifying","Value": 1}, 
        {"Attribute_Type": "Location","Rider_Name": "Ken Roczen","Session_Type": "Qualifying","Value": "Anaheim, CA"}, {"Attribute_Type": "Venue_Types","Rider_Name": "Ken Roczen","Session_Type": "Qualifying","Value": "Baseball"}, {"Attribute_Type": "Open_Air","Rider_Name": "Ken Roczen","Session_Type": "Qualifying","Value": 1}, {"Attribute_Type": "Soil_Type","Rider_Name": "Ken Roczen","Session_Type": "Qualifying","Value": "Hard-Pack"}, {"Attribute_Type": "Whoops","Rider_Name": "Ken Roczen","Session_Type": "Qualifying","Value": 1},
        {"Attribute_Type": "Sand","Rider_Name": "Ken Roczen","Session_Type": "Qualifying","Value": 1},  
        {"Attribute_Type": "Round","Rider_Name": "Ken Roczen","Session_Type": "Main Event","Value": 1}, 
        {"Attribute_Type": "Location","Rider_Name": "Ken Roczen","Session_Type": "Main Event","Value": "Anaheim, CA"}, {"Attribute_Type": "Venue_Types","Rider_Name": "Ken Roczen","Session_Type": "Main Event","Value": "Baseball"}, {"Attribute_Type": "Open_Air","Rider_Name": "Ken Roczen","Session_Type": "Main Event","Value": 1}, {"Attribute_Type": "Soil_Type","Rider_Name": "Ken Roczen","Session_Type": "Main Event","Value": "Hard-Pack"}, {"Attribute_Type": "Whoops","Rider_Name": "Ken Roczen","Session_Type": "Main Event","Value": 1},
        {"Attribute_Type": "Sand","Rider_Name": "Ken Roczen","Session_Type": "Main Event","Value": 1},
      ]);
    });
    
    

    test('getAveragePosition returns correct result',()=>{
      const {getAveragePosition} = require('../utils/dataOutput');
      expect(getAveragePosition([1,2,3])).toEqual(2);
    });

    test('getMinPosition returns correct result',()=>{
      const {getMinPosition} = require('../utils/dataOutput');
      expect(getMinPosition([22,2,19])).toEqual(2);
    });

    test('getMaxPosition returns correct result',()=>{
      const {getMaxPosition} = require('../utils/dataOutput');
      expect(getMaxPosition([22,2,19])).toEqual(22);
    });

    describe('createColumnHeader returns correct result for each type of attribute', ()=>{
      test('Round : 1 returns correct column header',async ()=>{
        const {createColumnHeader} = require('../utils/dataOutput');
        expect(await createColumnHeader("Round", 1)).toEqual("Round 1");
      });

      test('Soil_Type : Hard-Pack returns correct column header',async ()=>{
        const {createColumnHeader} = require('../utils/dataOutput');
        expect(await createColumnHeader("Soil_Type", "Hard-Pack")).toEqual("Hard-Pack Soil");
      });

      test('Whoops : 2 returns correct column header',async ()=>{
        const {createColumnHeader} = require('../utils/dataOutput');
        expect(await createColumnHeader("Whoops", 2)).toEqual("2 Set(s) of Whoops");
      });

      test('Sand : 1 returns correct column header',async ()=>{
        const {createColumnHeader} = require('../utils/dataOutput');
        expect(await createColumnHeader("Sand", 1)).toEqual("1 Set(s) of Sand");
      });

      test('Open_Air: 0 returns correct column header',async ()=>{
        const {createColumnHeader} = require('../utils/dataOutput');
        expect(await createColumnHeader("Open_Air", 0)).toEqual("Covered Stadium");
      });

      test('Open_Air: 1 returns correct column header',async ()=>{
        const {createColumnHeader} = require('../utils/dataOutput');
        expect(await createColumnHeader("Open_Air", 1)).toEqual("Open-Air Stadium");
      });
    });

    

    test('getUniqueRiders to return correct result',async ()=>{
      const {getUniqueRiders} = require('../utils/dataOutput');
      expect(await getUniqueRiders([
        {"Rider": "Dan Bax", "Session": "Main Event", "Whoops": 2},
        {"Rider": "Dan Bax", "Session": "Qualifying", "Sand": 1},
        {"Rider": "Eli Tomac", "Session": "Main Event", "St. Louis, MO": 1},
        {"Rider": "Eli Tomac", "Session": "Qualifying", "1 Set(s) of Whoops": 1},
        {"Rider": "Ken Roczen", "Session": "Qualifying", "1 Set(s) of Sand": 3},
        {"Rider": "Ken Roczen", "Session": "Main Event", "Hard-Pack Soil": 1},
      ])).toEqual(["Dan Bax", "Eli Tomac", "Ken Roczen"]);
    });

    test('getUniqueSessions to return correct result',async ()=>{
      const {getUniqueSessions} = require('../utils/dataOutput');
      expect(await getUniqueSessions([
        {"Rider": "Dan Bax", "Session": "Main Event", "Whoops": 2},
        {"Rider": "Dan Bax", "Session": "Qualifying", "Sand": 1},
        {"Rider": "Eli Tomac", "Session": "Main Event", "St. Louis, MO": 1},
        {"Rider": "Eli Tomac", "Session": "Qualifying", "1 Set(s) of Whoops": 1},
        {"Rider": "Ken Roczen", "Session": "Qualifying", "1 Set(s) of Sand": 3},
        {"Rider": "Ken Roczen", "Session": "Main Event", "Hard-Pack Soil": 1},
      ])).toEqual(["Main Event", "Qualifying"]);
    });

    test('getUniqueAttributes to return correct result',async ()=>{
      const {getUniqueAttributes} = require('../utils/dataOutput');
      expect(await getUniqueAttributes([
        {"Rider": "Dan Bax", "Session": "Main Event", "Whoops": 2},
        {"Rider": "Dan Bax", "Session": "Qualifying", "Sand": 1},
        {"Rider": "Eli Tomac", "Session": "Main Event", "St. Louis, MO": 1},
        {"Rider": "Eli Tomac", "Session": "Qualifying", "1 Set(s) of Whoops": 1},
        {"Rider": "Ken Roczen", "Session": "Qualifying", "1 Set(s) of Sand": 3},
        {"Rider": "Ken Roczen", "Session": "Main Event", "Hard-Pack Soil": 1},
      ])).toEqual(["Rider", "Session", "Whoops", "Sand","St. Louis, MO", "1 Set(s) of Whoops", "1 Set(s) of Sand", "Hard-Pack Soil"]);
    });

    
    

  });
});