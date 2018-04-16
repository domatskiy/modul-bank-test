import APICompany from '../Api/Company'

let CompanyListController = ($scope, $location, $routeParams) => {
  $scope.show = function (id) {
    $location.path('/company/' + id)
  }
  $scope.company = []
  APICompany.get().then(function (resp) {
    console.info('data', resp.data)
    if (resp.status === 200) {
      $scope.company = resp.data
      $scope.$applyAsync()
    }
  })
}

export default CompanyListController
