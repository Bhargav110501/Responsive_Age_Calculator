const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayOut = document.getElementById("DD");
const monthOut = document.getElementById("MM");
const yearOut = document.getElementById("YY");

const form = document.querySelector("form");

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(month, year) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 1 && isLeapYear(year)) {
    return 29;
  }
  return days[month];
}

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;
  inputs.forEach((i) => {
    const parent = i.parentElement;
    if (!i.value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required.";
      validator = false;
    } else if (monthInput.value > 12) {
      monthInput.style.borderColor = "red";
      monthInput.parentElement.querySelector("small").innerText = "Must be a valid month.";
      validator = false;
    } else if (dayInput.value > daysInMonth(monthInput.value - 1, yearInput.value)) {
      dayInput.style.borderColor = "red";
      dayInput.parentElement.querySelector("small").innerText = "Must be a valid day.";
      validator = false;
    } else {
      i.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
      validator = true;
    }
  });

  // Check if the selected date is not in the future
  const selectedDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
  const currentDate = new Date();
  if (selectedDate > currentDate) {
    validator = false;
    yearInput.style.borderColor = "red";
    yearInput.parentElement.querySelector("small").innerText = "Selected date is in the future.";
  }

  return validator;
}

function handleSubmit(e) {
  e.preventDefault();
  if (validate()) {
    const date = new Date();
    let day = date.getDate();
    let month = 1 + date.getMonth();
    let year = date.getFullYear();

    if (dayInput.value > day) {
      day = day + daysInMonth(month - 1, year);
      month = month - 1;
    }
    if (monthInput.value > month) {
      month = month + 12;
      year = year - 1;
    }

    const d = day - dayInput.value;
    const m = month - monthInput.value;
    const y = year - yearInput.value;

    dayOut.innerHTML = d;
    monthOut.innerHTML = m;
    yearOut.innerHTML = y;
  }
}

form.addEventListener("submit", handleSubmit);
