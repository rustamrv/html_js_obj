const car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2020,
  avgSpeed: 80,
  fuelTank: 50,
  fuelConsumption: 8,
  drivers: [],
  displayInfo() {
    return `Авто: ${this.manufacturer} ${this.model}, 
         Рік: ${this.year}, Швидкість: ${
      this.avgSpeed
    } км/год, Витрата пального: ${this.fuelConsumption} л/100км.
         Водії: ${this.drivers.join(", ")}`;
  },
  addDriver(name) {
    if (!this.drivers.includes(name)) {
      this.drivers.push(name);
      return `${name} додано до списку водіїв.`;
    } else {
      return `${name} вже є в списку водіїв.`;
    }
  },
  calculateTrip(distance) {
    const time = distance / this.avgSpeed;
    const rest = Math.floor(time / 4);
    const fuelNeeded = (distance / 100) * this.fuelConsumption;
    return `Подорож на ${distance} км займе ${Math.ceil(
      time + rest
    )} годин, витрата пального: ${fuelNeeded.toFixed(2)} л.`;
  },
};

function displayCarInfo() {
  document.getElementById("output").innerText = car.displayInfo();
}

function addDriver() {
  const name = document.getElementById("driverName").value;
  if (name) {
    document.getElementById("output").innerText = car.addDriver(name);
  }
}

function calculateTrip() {
  const distance = parseFloat(document.getElementById("distance").value);
  if (distance > 0) {
    document.getElementById("output").innerText = car.calculateTrip(distance);
  } else {
    document.getElementById("output").innerText = "Введіть коректну відстань.";
  }
}

const time = {
  hours: 20,
  minutes: 59,
  seconds: 45,
  displayTime() {
    return `${this.hours.toString().padStart(2, "0")}:${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
  },
  addSeconds(seconds) {
    const totalSeconds = this.seconds + seconds;
    this.seconds = totalSeconds % 60;
    const minutesToAdd = Math.floor(totalSeconds / 60);
    this.addMinutes(minutesToAdd);
  },
  addMinutes(minutes) {
    const totalMinutes = this.minutes + minutes;
    this.minutes = totalMinutes % 60;
    const hoursToAdd = Math.floor(totalMinutes / 60);
    this.addHours(hoursToAdd);
  },
  addHours(hours) {
    this.hours = (this.hours + hours) % 24;
  },
};

function displayTime() {
  document.getElementById("timeOutput").innerText = time.displayTime();
}

function addTime(unit) {
  const inputId = `add${unit.charAt(0).toUpperCase() + unit.slice(1)}`;
  const value = parseInt(document.getElementById(inputId).value, 10);
  if (value > 0) {
    if (unit === "seconds") time.addSeconds(value);
    if (unit === "minutes") time.addMinutes(value);
    if (unit === "hours") time.addHours(value);
    displayTime();
  } else {
    document.getElementById("timeOutput").innerText =
      "Введіть коректне значення.";
  }
}

const fraction = {
  add(fraction1, fraction2) {
    const numerator =
      fraction1.numerator * fraction2.denominator +
      fraction2.numerator * fraction1.denominator;
    const denominator = fraction1.denominator * fraction2.denominator;
    return this.simplify({ numerator, denominator });
  },
  subtract(fraction1, fraction2) {
    const numerator =
      fraction1.numerator * fraction2.denominator -
      fraction2.numerator * fraction1.denominator;
    const denominator = fraction1.denominator * fraction2.denominator;
    return this.simplify({ numerator, denominator });
  },
  multiply(fraction1, fraction2) {
    const numerator = fraction1.numerator * fraction2.numerator;
    const denominator = fraction1.denominator * fraction2.denominator;
    return this.simplify({ numerator, denominator });
  },
  divide(fraction1, fraction2) {
    const numerator = fraction1.numerator * fraction2.denominator;
    const denominator = fraction1.denominator * fraction2.numerator;
    return this.simplify({ numerator, denominator });
  },
  simplify(fraction) {
    const gcd = this.getGCD(fraction.numerator, fraction.denominator);
    return {
      numerator: fraction.numerator / gcd,
      denominator: fraction.denominator / gcd,
    };
  },
  getGCD(a, b) {
    return b === 0 ? a : this.getGCD(b, a % b);
  },
};

function getFractionInput() {
  const numerator1 = parseInt(document.getElementById("numerator1").value, 10);
  const denominator1 = parseInt(
    document.getElementById("denominator1").value,
    10
  );
  const numerator2 = parseInt(document.getElementById("numerator2").value, 10);
  const denominator2 = parseInt(
    document.getElementById("denominator2").value,
    10
  );

  if (denominator1 === 0 || denominator2 === 0) {
    document.getElementById("fractionOutput").innerText =
      "Знаменник не може бути 0!";
    return null;
  }

  return [
    { numerator: numerator1, denominator: denominator1 },
    { numerator: numerator2, denominator: denominator2 },
  ];
}

function addFractions() {
  const fractions = getFractionInput();
  if (fractions) {
    const result = fraction.add(fractions[0], fractions[1]);
    displayResult(result);
  }
}

function subtractFractions() {
  const fractions = getFractionInput();
  if (fractions) {
    const result = fraction.subtract(fractions[0], fractions[1]);
    displayResult(result);
  }
}

function multiplyFractions() {
  const fractions = getFractionInput();
  if (fractions) {
    const result = fraction.multiply(fractions[0], fractions[1]);
    displayResult(result);
  }
}

function divideFractions() {
  const fractions = getFractionInput();
  if (fractions) {
    const result = fraction.divide(fractions[0], fractions[1]);
    displayResult(result);
  }
}

function simplifyFraction() {
  const numerator = parseInt(document.getElementById("numerator1").value, 10);
  const denominator = parseInt(
    document.getElementById("denominator1").value,
    10
  );

  if (denominator === 0) {
    document.getElementById("fractionOutput").innerText =
      "Знаменник не може бути 0!";
    return;
  }

  const result = fraction.simplify({ numerator, denominator });
  displayResult(result);
}

function displayResult(result) {
  document.getElementById(
    "fractionOutput"
  ).innerText = `Результат: ${result.numerator}/${result.denominator}`;
}
