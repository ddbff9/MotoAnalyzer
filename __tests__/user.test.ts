const User = require('../class_definitions/user');


 describe('\nUser Class Object', ()=>{
   const testUser = new User(1,'Dan Bax', '316 Heather Mill Dr', 'Wentzville', 'MO', 63385, 'Dan.D.Bax@gmail.com', '(314) 406-5730');

  describe('is constructed correctly:', ()=>{

    test('has id property', ()=>{
      expect(testUser).toHaveProperty('id');
    });
 
    test('has name property', ()=>{
      expect(testUser).toHaveProperty('name');
    });
 
    test('has street property', ()=>{
      expect(testUser).toHaveProperty('street');
    });
 
    test('has city property', ()=>{
      expect(testUser).toHaveProperty('city');
    });
 
    test('has state property', ()=>{
      expect(testUser).toHaveProperty('state');
    });
    
    test('has zipcode property', ()=>{
      expect(testUser).toHaveProperty('zipcode');
    });
    
    test('has email property', ()=>{
      expect(testUser).toHaveProperty('email');
    });
    
    test('has phone property', ()=>{
      expect(testUser).toHaveProperty('phone');
    });
    
    test ('defines createQuery()', ()=> {
     expect(typeof testUser.createQuery).toBe("function");
    });
  
    test ('defines deleteQuery()', ()=> {
     expect(typeof testUser.deleteQuery).toBe("function");
    });
  
    test ('defines modifyQuery()', ()=> {
     expect(typeof testUser.modifyQuery).toBe("function");
    });
  
    test ('defines printUserInfo()', ()=> {
     expect(typeof testUser.printUserInfo).toBe("function");
    });
  });


  describe('has correct attributes:', ()=>{
    test('the testUser.id object has correct id', ()=>{
      expect(testUser.id).toEqual(1)
    });
    
    test('the testUser.name object has correct name', ()=>{
      expect(testUser.name).toEqual('Dan Bax')
    });
    
    test('the testUser.street object has correct street', ()=>{
      expect(testUser.street).toEqual('316 Heather Mill Dr')
    });
    
    test('the testUser.city object has correct city', ()=>{
      expect(testUser.city).toEqual('Wentzville')
    });
    
    test('the testUser.state object has correct state', ()=>{
      expect(testUser.state).toEqual('MO')
    });
    
    test('the testUser.zipcode object has correct zipcode', ()=>{
      expect(testUser.zipcode).toEqual(63385)
    });
    
    test('the testUser.email object has correct email', ()=>{
      expect(testUser.email).toEqual('Dan.D.Bax@gmail.com')
    });
    
    test('the testUser.phone object has correct phone', ()=>{
      expect(testUser.phone).toEqual('(314) 406-5730')
    });
  });
 });


