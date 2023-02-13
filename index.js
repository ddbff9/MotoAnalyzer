const Database =require('./database');

// GUI is not built yet, so use pre-defined User Settings:
// TODO: In production create funciton to getUserSelections from event loop:
const userSelections = require('./testSelections')

// run viewQuery function to see output table with the user's selected data attributes:
userSelections.viewQuery()