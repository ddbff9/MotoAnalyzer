class QueryResults{
  constructor(rider_id, event_id, session_id, data_field, position){
    this.rider_id = rider_id;
    this.event_id = event_id;
    this.session_id = session_id;
    this.data_field = data_field;
    this.position = position;
  }

  buildQueryOutput(){
    let output = [this.rider_id, this.event_id, this.session_id, this.data_field, this.position]
    console.log(`This Row's output is: ${output}`)
  }
};

module.exports = QueryResults;