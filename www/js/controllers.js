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

app.controller('ImagesCtrl', function($scope, $state, $ionicPlatform, $cordovaImagePicker, $cordovaCamera) {
  $scope.collection = {
    selectedImage : ''
  };

  $scope.allPermissions = [];
  $scope.isReadPermission = false;
  $scope.showImage = false;
  $scope.myWidth = window.screen.width * window.devicePixelRatio;;
  $scope.myHeight = window.screen.height * window.devicePixelRatio;;


  $ionicPlatform.ready(function() {


    $scope.requestPermission = function (permission) {
      console.log("PRZED WEJŚCIEM DO requestPermission: " + permission);

      if (permission == "READ_EXTERNAL_STORAGE") {
        permissionConst = cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE;
      // } else if (permission == "UPDATE_DEVICE_STATS") {
        // permissionConst = cordova.plugins.diagnostic.permission.UPDATE_DEVICE_STATS;
      }
      console.log("permissionConst: " + permissionConst);

      cordova.plugins.diagnostic.requestRuntimePermission(function(status){
        switch(status){
          case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
            console.log("Permission granted");
            $scope.isReadPermission = true;
            $state.go($state.current, {}, {reload: true});
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
            console.log("Permission has not been requested yet");
            $scope.isReadPermission = false;
            $state.go($state.current, {}, {reload: true});
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
            console.log("Permission denied - ask again?");
            $scope.isReadPermission = false;
            $state.go($state.current, {}, {reload: true});
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
            console.log("Permission permanently denied - guess we won't be using it then!");
            $scope.isReadPermission = false;
            $state.go($state.current, {}, {reload: true});
            break;
        }
      }, function(error){
          console.error("The following error occurred: "+error);
      }, permissionConst);
    };

    $scope.init = function(){
      $scope.requestPermission("READ_EXTERNAL_STORAGE");
      // $scope.requestPermission("UPDATE_DEVICE_STATS");
    };

    $scope.deleteImage = function() {
      $scope.collection.selectedImage = '';
      // $scope.collection.selectedImage.splice(0, 1);
      $scope.showImage = false;
      $state.go($state.current, {}, {reload: true});
      console.log('Image deleted: ' + $scope.collection.selectedImage);
    };

    $scope.getImage = function() {

      var options = {
          maximumImagesCount: 1,
          width: $scope.myWidth,
          height: $scope.myHeight,
          quality: 100
      };
      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          for (var i = 0; i < results.length; i++) {
            $scope.collection.selectedImage = results[i];
            console.log('Image URI: ' + $scope.collection.selectedImage);
            $scope.showImage = true;
          }
      }, function(error) {
          console.log('Get Image Error: ' + JSON.stringify(error));
      });
    };

    $scope.captureImage = function() {
      console.log('WITAM CAPTURE IMAGE');
      document.addEventListener("deviceready", function () {

          var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: $scope.myWidth,
            targetHeight: $scope.myHeight,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
          correctOrientation:true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log('IMAGE DATA: ' + imageData);

            var image = document.getElementById('myImage');
            console.log('IMAGE: ' + image);

            image.src = "data:image/jpeg;base64," + imageData;
            $scope.collection.selectedImage = image.src;
            console.log('IMAGE URI: ' + $scope.collection.selectedImage);
            $scope.showImage = true;

          }, function(error) {
            console.log('Capture Image Error: ' + JSON.stringify(error));
          });
          // 03-24 13:42:38.316: W/System.err(3078): java.lang.SecurityException: uid 10015 does not have android.permission.UPDATE_DEVICE_STATS.

        }, false);
        console.log('ŻEGNAM CAPTURE IMAGE');

    }

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
