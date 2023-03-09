
describe('createAmaID',()=>{
  const {createAmaId} = require('../utils/helper_functions');
  test('returns correct value for a supercross event',()=>{
    expect(createAmaId('SX','2023-03-04',1)).toBe('S2305');
  });

  test('returns correct value for a motocross event',()=>{
    expect(createAmaId('MX','2024-06-04',5)).toBe('M2425');
  });
});