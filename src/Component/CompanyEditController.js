import APICompany from '../Api/Company'
import datepicker from 'js-datepicker/datepicker.js'

import 'js-datepicker/datepicker.css'
// const st = require('js-datepicker/datepicker.css')
// console.log('st', st)

let CompanyEditController = ($scope, $routeParams) => {
  let dateField = document.querySelector('.m-date')
  const datepickerOptions = {
    position: 'bl',
    startDay: 1, // Calendar week starts on a Monday.
    startDate: new Date(),
    formatter: function (el, date) {
      // This will display the date as `1/1/2017`.
      // el.value = date.toDateString()
    }
  }

  $scope.saved = null
  $scope.company = {
    date_reg: null,
    active: 1
  }

  datepickerOptions.onSelect = function (instance) {
    if (instance.dateSelected instanceof Date) {
      $scope.company.date_reg = instance.dateSelected.getDate() + '.' + (instance.dateSelected.getMonth() < 9 ? '0' : '') + (instance.dateSelected.getMonth() + 1) + '.' + instance.dateSelected.getFullYear()
    } else {
      $scope.company.date_reg = ''
    }
    $scope.$applyAsync()
  }

  let dp = datepicker(dateField, datepickerOptions)
  $scope.$watch(function () {
    return $scope.company
  }, function ($newVal, $oldVal) {
    $scope.saved = false
  }, true)

  $scope.$watch(function () {
    return $scope.company.date_reg
  }, function ($newVal, $oldVal) {
    if (typeof $newVal !== 'undefined' && $newVal !== null) {
      let d = $newVal.split('.')
      dp.setDate(new Date(d[2], d[1] - 1, d[0]))
    }
  }, true)

  $scope.saveCompany = function (e) {
    console.info('save company ...', $scope.company)
    e.preventDefault()
    APICompany.save($routeParams.id, $scope.company).then(function () {
      console.info('save company ... success')
      $scope.saved = true
      $scope.$applyAsync()
    })
  }
  // load data
  APICompany.show($routeParams.id).then(function (resp) {
    console.info('edit data', resp.data)
    $scope.company = resp.data
    $scope.$applyAsync()
  })
}

export default CompanyEditController
