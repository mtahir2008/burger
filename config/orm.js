// Import MySQL connection.
const connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objectToSql(object) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in object) {
    var value = object[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(object, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
  // Read All
  selectAll: function (tableName, callback) {
    var queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  // Create One
  insertOne: function (tableName, cols, vals, callback) {
    var queryString = "INSERT INTO " + tableName;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },
  // An example of objectColVals would be { devoured: 'true' }
  updateOne: function (tableName, objectColVals, condition, callback) {
    var queryString = "UPDATE " + tableName;

    queryString += " SET ";
    queryString += objectToSql(objectColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },
  delete: function (tableName, condition, callback) {
    var queryString = "DELETE FROM " + tableName;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;