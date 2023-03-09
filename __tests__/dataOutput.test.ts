describe('dataOutput',()=>{
  describe('test each function',()=>{
    
    test('getAveragePosition returns correct result',()=>{
      const {getAveragePosition} = require('../utils/dataOutput');
      expect(getAveragePosition([{Rider_Name: 'Eli  Tomac', Position: 1},{Rider_Name: 'Eli  Tomac', Position: 1},{Rider_Name: 'Eli  Tomac', Position: 1}])).toEqual(1);
    });
    
    test('getResults returns correct results',async ()=>{
      const {getResults} = require('../utils/dataOutput');
      expect(await getResults('Eli Tomac','Main Event','Whoops','1')).toEqual([{"Event_Id": 3, "Location": "San Diego, CA", "Open_Air": 1, "Position": 1, "Rider_Name": "Eli Tomac", "Round": 3, "Sand": 0, "Session_Type": "Main Event", "Soil_Type": "Hard-Pack", "Venue_Types": "Football", "Whoops": 1}, {"Event_Id": 4, "Location": "Anaheim, CA", "Open_Air": 1, "Position": 6, "Rider_Name": "Eli Tomac", "Round": 4, "Sand": 1, "Session_Type": "Main Event", "Soil_Type": "Soft/Rutted", "Venue_Types": "Baseball", "Whoops": 1}, {"Event_Id": 5, "Location": "Houston, TX", "Open_Air": 0, "Position": 1, "Rider_Name": "Eli Tomac", "Round": 5, "Sand": 1, "Session_Type": "Main Event", "Soil_Type": "Hard-Pack", "Venue_Types": "Football", "Whoops": 1}, {"Event_Id": 6, "Location": "Tampa, FL", "Open_Air": 1, "Position": 5, "Rider_Name": "Eli Tomac", "Round": 6, "Sand": 1, "Session_Type": "Main Event", "Soil_Type": "Soft/Rutted", "Venue_Types": "Football", "Whoops": 1}])
    });

  });
});