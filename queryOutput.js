class QueryOutput{
  constructor(rider,session,attr,result_type,result){
    this.Rider_Name = rider,
    this.Session = session,
    this.Data_Field = attr,
    this.Result_Type = result_type,
    this.Result = result
  }
}

module.exports = QueryOutput;