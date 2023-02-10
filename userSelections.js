class UserSelections{
  constructor(user_id, rider_list, round_list, location_list, venue_attrs_list, event_session_list, result_type_list){
    this.user_id = user_id;
    this.rider_list = rider_list;
    this.round_list = round_list;
    this.location_list = location_list;
    this.venue_attrs_list = venue_attrs_list;
    this.event_session_list = event_session_list;
    this.result_type_list = result_type_list;
  }

  saveQuery(){
    console.log(`User ${this.user_id} saved the query selections!`)
  }

  viewQuery(){
    console.log(`User ${this.user_id} viewed the query!`)
  }
};

module.exports = UserSelections;