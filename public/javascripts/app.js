angular.module('post', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.posts = [];
    $scope.addPost = function() {
      var newPost = {imgUrl:$scope.formContent,upvotes:0};
      $scope.formContent='';
      $http.post('/posts', newPost).success(function(data){
        $scope.posts.push(data);
      });
    };
    $scope.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          post.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(post) {
	  $scope.upvote(post);
    };
    $scope.getAll = function() {
      return $http.get('/posts').success(function(data){
        angular.copy(data, $scope.posts);
      });
    };
    $scope.delete = function(post) {
      $http.delete('/posts/' + post._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
    $scope.getAll();

  }
]);
