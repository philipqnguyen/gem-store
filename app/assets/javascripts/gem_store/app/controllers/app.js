(function () {
  // var app = angular.module('gemStore', ['store-directives']);

  app.controller('StoreController', ['$scope', '$http', function ($scope, $http) {

    $scope.product = {};
    $scope.errors = [];
    $scope.products = [];
    $scope.categories = [];
    $scope.categoryNames = [];

    // this.products = gems;
    $scope.index = function () {
      $http.get('/products')
        .success(function (data) {
          $scope.products = data.products;
        })
        .error(function(data, status) {
          $scope.errors.push(data);
        });
    };

    $scope.create = function (product) {
      // product.category_id = $scope.categoryNames.indexOf(product.category_id)

      for(var i = 0; i < $scope.categories.length; i++) {
        if(product.category_id === $scope.categories[i].name) {
          product.category_id = $scope.categories[i].id;
          break;
        }
      }

      $http.post('/products', {product: product})
        .success(function (data) {
          $scope.products.push(data.product);
          console.log($scope.products);
        })
        .error(function (data, status) {
          $scope.errors.push(data);
          console.log(data);
          console.log(status);
        });
    };

    $scope.update = function (product) {
      for(var i = 0; i < $scope.categories.length; i++) {
        if(product.category_id === $scope.categories[i].name) {
          product.category_id = $scope.categories[i].id;
          break;
        }
      }

      $http({
        method: 'PATCH',
        url: '/products/' + product.id,
        data: product
      })
        .success(function () {
          product.updating = false;
        })
        .error(function (data, status) {
          $scope.errors.push(data);
          console.log(data);
          console.log(status);
        });
    };

    $scope.destroy = function (product) {
      $http({
        method: 'DELETE',
        url: '/products/' + product.id,
      })
        .success(function () {
          $scope.products.splice($scope.products.indexOf(product), 1);
        })
        .errors(function () {
          $scope.errors.push(data);
          console.log(data);
          console.log(status);
        });
    };

    $scope.getCategories = function () {
      $http.get('/categories')
        .success(function (data) {
          $scope.categories = data.categories;
          for (var i = 0; i < data.categories.length; i++) {
            $scope.categoryNames.push(data.categories[i].name);
          };
        })
        .error(function (data, status) {
          $scope.errors.push(data);
          console.log(data);
          console.log(status);
        });
    };

    $scope.currentCategory = function (category) {
      $scope.products = category.products;
    };

    $scope.createCategory = function (category) {
      $http.post('/categories', {category: category})
        .success(function (data) {
          $scope.categories.push(data.category);
          console.log($scope.categories);
        })
        .error(function (data, status) {
          $scope.errors.push(data);
          console.log(data);
          console.log(status);
        });
    };

    $scope.updateCategory = function (category) {
      $http({
        method: "PATCH",
        url: '/categories/' + category.id,
        data: category
      })
        .success(function (data) {
          console.log(data);
        })
        .error(function (data, status) {
          console.log(data);
          console.log(status);
        });
    };

    $scope.destroyCategory = function (category) {
      $http({
        method: "DELETE",
        url: '/categories/' + category.id,
        data: category
      })
        .success(function (data) {
          $scope.categories.splice($scope.categories.indexOf(category), 1);
        })
        .error(function (data, status) {
          $scope.errors.push(data);
          console.log(data);
          console.log(status);
        });
    };
  }]);

  app.controller('ReviewController', ['$scope', '$http', function ($scope, $http) {
    $scope.review = {};
    $scope.addReview = function (product) {

      $scope.review.product_id = product.id

      $scope.create(product);

      $scope.review = {};
    };

    $scope.create = function (product) {
      $http.post('/reviews', {review: $scope.review})
        .success(function (data) {
          product.reviews.push(data.review)
        })
        .error(function(data, status) {
          $scope.errors.push(data);
          console.log(data);
          console.log(status);
        });
    };
  }]);

  // var gems = [{
  //   name: 'Azurite',
  //   description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
  //   shine: 8,
  //   price: 110.50,
  //   rarity: 7,
  //   color: '#CCC',
  //   faces: 14,
  //   images: [
  //     "images/gem-02.gif",
  //     "images/gem-05.gif",
  //     "images/gem-09.gif"
  //   ],
  //   reviews: [{
  //     stars: 5,
  //     body: "I love this gem!",
  //     author: "joe@example.org",
  //     createdOn: 1397490980837
  //   }, {
  //     stars: 1,
  //     body: "This gem sucks.",
  //     author: "tim@example.org",
  //     createdOn: 1397490980837
  //   }]
  // }, {
  //   name: 'Bloodstone',
  //   description: "Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides, however.",
  //   shine: 9,
  //   price: 22.90,
  //   rarity: 6,
  //   color: '#EEE',
  //   faces: 12,
  //   images: [
  //     "images/gem-01.gif",
  //     "images/gem-03.gif",
  //     "images/gem-04.gif",
  //   ],
  //   reviews: [{
  //     stars: 3,
  //     body: "I think this gem was just OK, could honestly use more shine, IMO.",
  //     author: "JimmyDean@example.org",
  //     createdOn: 1397490980837
  //   }, {
  //     stars: 4,
  //     body: "Any gem with 12 faces is for me!",
  //     author: "gemsRock@example.org",
  //     createdOn: 1397490980837
  //   }]
  // }, {
  //   name: 'Zircon',
  //   description: "Zircon is our most coveted and sought after gem. You will pay much to be the proud owner of this gorgeous and high shine gem.",
  //   shine: 70,
  //   price: 1100,
  //   rarity: 2,
  //   color: '#000',
  //   faces: 6,
  //   images: [
  //     "images/gem-06.gif",
  //     "images/gem-07.gif",
  //     "images/gem-08.gif"
  //   ],
  //   reviews: [{
  //     stars: 1,
  //     body: "This gem is WAY too expensive for its rarity value.",
  //     author: "turtleguyy@example.org",
  //     createdOn: 1397490980837
  //   }, {
  //     stars: 1,
  //     body: "BBW: High Shine != High Quality.",
  //     author: "LouisW407@example.org",
  //     createdOn: 1397490980837
  //   }, {
  //     stars: 1,
  //     body: "Don't waste your rubles!",
  //     author: "nat@example.org",
  //     createdOn: 1397490980837
  //   }]
  // }];
}());
