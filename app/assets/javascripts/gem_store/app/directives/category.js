(function () {
  var app = angular.module('CategoryDirectives', []);

  app.directive('category', function () {
    return {
      restrict: 'A',
      templateUrl: 'category.html'
    };
  });
})();
