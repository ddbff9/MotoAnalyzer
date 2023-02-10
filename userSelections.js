class UserSelections{
  constructor(user_id, rider_list, round_list, location_list, venue_type_list, soil_type_list, whoop_section_list, session_type_list, result_type_list){
    this.user_id = user_id;
    this.rider_list = rider_list;
    this.round_list = round_list;
    this.location_list = location_list;
    this.venue_type_list = venue_type_list;
    this.soil_type_list = soil_type_list;
    this.whoop_section_list = whoop_section_list;
    this.session_type_list = session_type_list;
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