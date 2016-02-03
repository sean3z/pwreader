angular.module('starter.controllers', [])

.controller('MenuCtrl', function(Feed) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;
  vm._site = function(site) {
    Feed.site = site;
  };
})

.controller('SitesCtrl', function($scope, Feed) {
  var vm = this;
  vm.site = Feed.site;
  _fetch();

  $scope.$on('$ionicView.enter', function(e) {
    if (vm.site != Feed.site) {
      vm.site = Feed.site;
      vm.articles = [];
      _fetch();
    }
  });

  function _fetch() {
    // vm.articles = Feed.dummy;
    Feed.get().then(success, error);

    function success(data) {
      vm.articles = data.item;
    }

    function error() { 

    }
  }
})

.controller('ArticleCtrl', function($scope, Feed, $stateParams, $sce) {
  var vm = this;
  var id = parseInt($stateParams.article);

  vm.title = '';
  vm.content = '';
  Feed.get().then(success, error);

  function success(data) {
    vm.title = data.item[id].title;
    vm.content = $sce.trustAsHtml(data.item[id].description);
  }

  function error() {

  }
});
