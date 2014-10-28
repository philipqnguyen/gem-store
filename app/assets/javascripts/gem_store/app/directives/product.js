(function() {
  // var app = angular.module('store-directives', []);

  gemStoreDirectives.directive('productGallery', function(){
    return {
      restrict: 'E',
      templateUrl: 'product-gallery.html',
      controller: function() {
        this.current = 0;
        this.setCurrent = function(imageNumber){
          this.current = imageNumber || 0;
        };
      },
      controllerAs: 'gallery'
    };
  });

  gemStoreDirectives.directive("productTabs", function() {
    return {
      restrict: "E",
      templateUrl: "product-tabs.html",
      controller: function() {
        this.tab = 1;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(setTab) {
          this.tab = setTab;
        };
      },
      controllerAs: 'tab'
    };
  });

  gemStoreDirectives.directive('productDescription', function () {
    return {
      restrict: 'E',
      templateUrl: 'product-description.html'
    };
  });

  gemStoreDirectives.directive("productSpecs", function () {
    return {
      restrict: "A",
      templateUrl: "product-specs.html"
    };
  });
})();
