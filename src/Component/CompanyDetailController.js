import APICompany from '../Api/Company'

let CompanyDetailController = ($scope, $location, $routeParams) => {
  $scope.edit = function (id) {
    $location.path('/company/edit/' + id)
  }
  APICompany.show($routeParams.id).then(function (resp) {
    console.info('detail data', resp.data)
    $scope.company = resp.data
    $scope.$applyAsync()
  })
}

export default CompanyDetailController
