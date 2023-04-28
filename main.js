const year = document.querySelector('.year')
const month = document.querySelector('.month')
const day = document.querySelector('.day')
const yearError = document.querySelector('.year-error')
const monthError = document.querySelector('.month-error')
const dayError = document.querySelector('.day-error')
const rYear = document.querySelector('.result-years')
const rMonth = document.querySelector('.result-months')
const rDay = document.querySelector('.result-days')
const label = document.querySelectorAll('.input-block label')
const inputField = document.querySelectorAll('.input-block input')

const btn = document.querySelector('.btn')

let now = new Date()
let actualDay = new Date().getDate()
let actualYear = new Date().getFullYear()
let errorsBool = false

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 0)
  return date.getDate()
}

function errors(day, month, year) {
  if (day > getDaysInMonth(year, month) && day < 32) {
    dayError.innerText = 'Must be a valid date'
    label[0].classList.add('error-color')
    day.classList.add('input-error-color')
    errorsBool = true
  } else {
    label[0].classList.remove('error-color')
  }
  if (day === '') {
    dayError.innerText = 'This field is required'
    label[0].classList.add('error-color')
    day.classList.add('input-error-color')
    errorsBool = true
  } else {
    label[0].classList.remove('error-color')
  }
  if (day > 31) {
    dayError.innerText = 'Must be a valid day'
    label[0].classList.add('error-color')
    day.classList.add('input-error-color')
    errorsBool = true
  } else {
    label[0].classList.remove('error-color')
  }
  if (month > 12) {
    monthError.innerText = 'Must be a valid month'
    label[1].classList.add('error-color')
    errorsBool = true
  } else {
    label[1].classList.remove('error-color')
  }
  if (month === '') {
    monthError.innerText = 'This field is required'
    label[1].classList.add('error-color')
    errorsBool = true
  } else {
    label[1].classList.remove('error-color')
  }
  if (year > actualYear) {
    yearError.innerText = 'Must be in the past'
    label[2].classList.add('error-color')
    errorsBool = true
  } else {
    label[2].classList.remove('error-color')
  }
  if (year === '') {
    yearError.innerText = 'This field is required'
    label[2].classList.add('error-color')
    errorsBool = true
  } else {
    label[2].classList.remove('error-color')
  }
}

function clearErrors() {
  dayError.innerText = ''
  monthError.innerText = ''
  yearError.innerText = ''
}

function clearData() {
  rYear.innerText = '--'
  rMonth.innerText = '--'
  rDay.innerText = '--'
}

btn.addEventListener('click', function () {
  clearData()
  clearErrors()
  errorsBool = false
  errors(day.value, month.value, year.value)
  let birthday = new Date(`${month.value} ${day.value}, ${year.value}`)
  let distance = now - birthday

  let days = Math.floor(distance / (1000 * 60 * 60 * 24))
  let months = Math.floor((days % 365) / 30)
  let years = Math.floor(days / 365)

  if (errorsBool) {
    return
  } else {
    if (day.value <= actualDay) {
      rYear.innerText = Math.trunc(years)
      rMonth.innerText = Math.trunc(months)
      rDay.innerText = Math.trunc(actualDay - day.value)
    } else {
      rYear.innerText = Math.trunc(years - 1)
      rMonth.innerText = 11
      rDay.innerText =
        getDaysInMonth(year.value, month.value) - (day.value - actualDay)
    }
  }
})
