'use strict';

angular.module('webClientApp')
  .controller('MainCtrl', ['$scope', '$state','$rootScope', 'Article', 'User', 'articles', 'publishers',
      function ($scope, $state, $rootScope, Article, User, articles, publishers) {
    var currentState = $state.current.url;
    console.log('hello there', currentState);

    $scope.order = currentState.substring(0, currentState.length - 1);
    $scope.title = 'مَنْشَر';
    $scope.tagline = 'منصة النشر العربية';
    $scope.articles = articles;
    $scope.publishers = publishers;

    $scope.hasNext = articles ? true: false;

    // TODO(mkhatib): Refactor this to move it to its own directive for listing
    // articles with specific
    var page = 1;
    $scope.loadMoreArticles = function() {
      $scope.inProgress = 'load-more';
      Article.query({
        'order': $scope.order,
        'page': ++page
      }, function(articles) {
        if (!articles || !articles.length) {
          $scope.hasNext = false;
        }
        Array.prototype.push.apply($scope.articles, articles);
        $scope.inProgress = null;
      });
    };

    $scope.newArticle = function () {
      $state.go('app.articles.new');
    };

    $scope.showArticle = function (articleId) {
      $state.go('app.articles', {articleId: articleId});
    };

    $scope.showCategoriesPicker = function() {
      $rootScope.$emit('openTopicPicker', {pickOnlyCategory: true});
    };

    var categorySelectedUnbind = $rootScope.$on('categorySelected',
         function(event, data) {
    //   $location.path('/categories/' + data.category.id);
    });

    $scope.getCardColor = function(color) {
      return color || '#C0C0C0';
    };

    /**
     * Make sure to cleanup the binded events and intervals when the user
     * leaves to another controller.
     */
    var onDestroy = function () {
      categorySelectedUnbind();
    };
    $scope.$on('$destroy', onDestroy);


  }]);