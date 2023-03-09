describe('dataOutput',()=>{
  describe('test each function',()=>{
    
    test('getAveragePosition returns correct result',()=>{
      const {getAveragePosition} = require('../utils/dataOutput');
      expect(getAveragePosition([1,1,1])).toEqual(1);
    });
    
    test('getResults returns correct results',async ()=>{
      const {getResults} = require('../utils/dataOutput');
      expect(await getResults('Eli Tomac','Main Event','Whoops','1')).toEqual([1,6,1,5])
    });
  });
});