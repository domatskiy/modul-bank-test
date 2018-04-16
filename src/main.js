import angular from 'angular'
import AppComponent from './app.js'
import CompanyListController from './Component/CompanyListController'
import CompanyDetailController from './Component/CompanyDetailController'
import CompanyEditController from './Component/CompanyEditController'

// require('./app.less')

var app = angular.module('mbank', [require('angular-route')])

app.directive('app', AppComponent)
app.controller('CompanyList', CompanyListController)
app.controller('CompanyDetail', CompanyDetailController)
app.controller('CompanyEdit', CompanyEditController)

const CompanyListTemplate = require('./Component/CompanyList.html')
const CompanyDetailTemplate = require('./Component/CompanyDetail.html')
const CompanyEditTemplate = require('./Component/CompanyEdit.html')

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/company/edit/:id', {
    template: CompanyEditTemplate,
    controller: 'CompanyEdit'
  })
  .when('/company/:id', {
    template: CompanyDetailTemplate,
    controller: 'CompanyDetail'
  })
  .when('/', {
    template: CompanyListTemplate,
    controller: 'CompanyList'
  })
  .otherwise({ redirectTo: '/404' })
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  }).hashPrefix('!')
  // $locationProvider.html5Mode(true)
})
