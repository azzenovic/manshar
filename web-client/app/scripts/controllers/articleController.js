'use strict';

angular.module('webClientApp')
  .controller('ArticleCtrl', ['$scope', '$rootScope', '$location', '$filter', '$anchorScroll', 'article',
      function ($scope, $rootScope, $location, $filter, $anchorScroll, article) {

    $anchorScroll();

    // TODO: set proper values for page properties
    $rootScope.page.title = article.title;
    $rootScope.page.image = article.cover_url;
    $rootScope.page.publishedTime = article.created_at;

    var cleanBody = $filter('nohtml')(article.body);
    $rootScope.page.description = $filter('words')(cleanBody, 50);

    $scope.article = article;

    $scope.editArticle = function (articleId) {
      $location.path('/articles/' + articleId + '/edit');
    };

  }]);
