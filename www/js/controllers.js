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

app.controller('ImagesCtrl', function($scope, $state, $cordovaImagePicker, $ionicPlatform) {
  $scope.collection = {
    selectedImage : ''
  };

  $scope.allPermissions = [];
  $scope.isReadPermission = false;

  $ionicPlatform.ready(function() {

    $scope.requestReadPermission = function () {
      console.log("PRZED WEJŚCIEM DO requestRuntimePermission");

      cordova.plugins.diagnostic.requestRuntimePermission(function(status){
        switch(status){
          case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
            console.log("Permission granted to use the camera");
            $scope.isReadPermission = true;
            $state.go($state.current, {}, {reload: true});
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
            console.log("Permission to use the camera has not been requested yet");
            $scope.isReadPermission = false;
            $state.go($state.current, {}, {reload: true});
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
            console.log("Permission denied to use the camera - ask again?");
            $scope.isReadPermission = false;
            $state.go($state.current, {}, {reload: true});
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
            console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
            $scope.isReadPermission = false;
            $state.go($state.current, {}, {reload: true});
            break;
        }
      }, function(error){
          console.error("The following error occurred: "+error);
      }, cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE);

    };

    $scope.init = function(){
      $scope.requestReadPermission();
    };

    $scope.getImage = function() {

      var options = {
          maximumImagesCount: 1,
          width: 640,
          height: 480,
          quality: 100
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
            $scope.collection.selectedImage = results[i];
          }
      }, function(error) {
          console.log('Error: ' + JSON.stringify(error));
      });
    };

    $scope.fetchImage = function() {
      //tu bedzie pytanko czy galeria czy foto
      $scope.getImage();
    };

    $scope.init();

  });
});

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true,
    enableXcactus: false
  };
});
