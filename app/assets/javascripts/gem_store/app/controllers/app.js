(function () {
  // var app = angular.module('gemStore', ['store-directives']);

  app.controller('StoreController', ['$scope', '$http', function ($scope, $http) {

    $scope.errors = [];
    $scope.products = []

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
  }]);

  app.controller('ReviewController', ['$scope', '$http', function ($scope, $http) {
    $scope.review = {};
    $scope.addReview = function (product) {
      // $scope.review.createdOn = Date.now();
      // product.reviews.push($scope.review);
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

    // $scope.create = function (note) {
    //   $http.post('/apiv1/notes', {note: note})
    //     .success(function (data) {
    //       $scope.notes.push(data); // Push created note to $scope.notes
    //     })
    //     .error(function(data, status) {
    //       $scope.errors.push(data);
    //       console.log(data);
    //       console.log(status);
    //     });
    // };

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
