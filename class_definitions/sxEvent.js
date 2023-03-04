class sxEvent {
  constructor(Id,Ama_id,Type,Name,Region,Venue_ID,Round_Number,Triple_Crown,Gate_Drop,Whoop_Section,Sand_Section,Soil_Id){
    this.Id = Id,
    this.Ama_id = Ama_id,
    this.Type = Type,
    this.Name = Name,
    this.Region = Region,
    this.Venue_ID = Venue_ID,
    this.Round_Number = Round_Number,
    this.Triple_Crown = Triple_Crown,
    this.Gate_Drop = Gate_Drop,
    this.Whoop_Section = Whoop_Section,
    this.Sand_Section = Sand_Section,
    this.Soil_Id = Soil_Id
  }
};

module.exports = sxEvent;