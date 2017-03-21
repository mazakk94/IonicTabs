var app = angular.module('starter.controllers', []);

app.controller('DashCtrl', function($scope) {});

app.controller('ChatsCtrl', function($scope, Chats) {
  /*

  With the new view caching in Ionic, Controllers are only called
  when they are recreated or on app start, instead of every page change.
  To listen for when this page is active (for example, to refresh data),
  listen for the $ionicView.enter event:

  $scope.$on('$ionicView.enter', function(e) {
  });

  */
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('ImagesCtrl', function($scope, $cordovaImagePicker, $ionicPlatform) {
  $scope.collection = {
    selectedImage : ''
  };

  $ionicPlatform.ready(function() {
    $scope.getImage = function() {
        var options = {
            maximumImagesCount: 1,
            width: 640,
            height: 480,
            quality: 100
        };

        // $cordovaImagePicker.getPictures(options)
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {

            for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              $scope.collection.selectedImage = results[i];
            }
        }, function(error) {
            console.log('Error: ' + JSON.stringify(error));    // In case of error
        });
    };

  });
});

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true,
    enableXcactus: false
  };
});
