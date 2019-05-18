const regexNum = new RegExp(/\d+(?:\.\d+)?(\/\d+)?/g);
const regexUnit = new RegExp(/[a-zA-Z]+/g);

const units = {
  gal: [
    'gallons',
    'l',
    v => {
      return v * 3.785;
    }
  ],
  l: [
    'liters',
    'gal',
    v => {
      return v / 3.785;
    }
  ],
  mi: [
    'miles',
    'km',
    v => {
      return v * 1.609;
    }
  ],
  km: [
    'kilometers',
    'mi',
    v => {
      return v / 1.609;
    }
  ],
  lbs: [
    'pounds',
    'kg',
    v => {
      return v / 2.2045;
    }
  ],
  kg: [
    'kilograms',
    'lbs',
    v => {
      return v * 2.2045;
    }
  ]
};

function ConvertHandler() {
  this.getNum = function(input) {
    //check if its a number or else return 1
    let value = input.match(regexNum);
    if (value === null) {
      return 1;
    }

    return value.length == 1 ? eval(value[0]) : 'Invalid value';
  };

  this.getUnit = function(input) {
    let unit = input.match(regexUnit);

    if (unit === null) {
      return 'Invalid Unit';
    }

    unit = unit[0];
    // check if unit are valid
    let validUnits = Object.keys(units);
    let validUnit = validUnits.includes(unit.toLowerCase());

    return validUnit ? unit : 'Invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    // gets original unit and return the full name of that unit from units array
    let originalUnit = this.getUnit(initUnit).toLowerCase();
    let convertUnit = units[originalUnit][1];
    return convertUnit;
  };

  this.spellOutUnit = function(input) {
    // Returns spelled original unit only without conversion
    let unit = this.getUnit(input).toLowerCase();

    return units[unit][0];
  };

  this.convert = function(initNum, initUnit) {
    let newUnit = this.getUnit(initUnit).toLowerCase();
    // Return numeric conversion of initial value
    let newValue = units[newUnit][2](initNum);
    return newValue;
  };

  // this.getString = function(initNum, initUnit, returnNum, returnUnit) {
  //   var result;

  //   return result;
  // };
}

module.exports = ConvertHandler;
