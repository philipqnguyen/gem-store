//=require_self
//=require_tree ./gem_store


var app = angular.module('GemStoreApp', ['StoreDirectives', 'CategoryDirectives']);
// var gemStoreDirectives = angular.module('store-directives', []);
app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  $httpProvider.defaults.headers.common.Accept = 'application/json';
}]);
