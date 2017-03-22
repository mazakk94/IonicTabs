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

  $scope.allPermissions = [];

  $ionicPlatform.ready(function() {


    this.checkPermissions = function(){
        console.log("CHECK PERMISSIONS");
        cordova.plugins.diagnostic.getPermissionsAuthorizationStatus(onCheckPermissions, onCheckPermissionsError, $scope.allPermissions);
    }

    this.init = function(){
      for(var permission in cordova.plugins.diagnostic.runtimePermission){
        console.log("PERMISSION " + permission + ", status: " + permission.status);
        $scope.allPermissions.push(permission);
      }
      checkPermissions();
    };

    this.onCheckPermissions = function(statuses){
        for(var permission in statuses){

            var status = statuses[permission];
            console.log("STATUS: " + status);
        }
    }

    this.onCheckPermissionsError = function(error){
        showAlert("Error checking permissions", "An error occurred while checking permissions: "+error);
    }



    init();


    $scope.hasReadPermission = function() {
      window.imagePicker.hasReadPermission(
        function(result) {
          // if this is 'false' you probably want to call 'requestReadPermission' now
          alert(result);
          requestReadPermission();
        }
      )
    };


    // var successHandler = angular.bind(this, this.userDetailsSuccessHandler);
    // var errorHandler = angular.bind(this, this.userDetailsErrorHandler);
    // this.$http.get(url).then(successHandler, errorHandler);
    //
    // EditUserProfilePopupController.prototype.userDetailsSuccessHandler = function(response) {
    //   if (response) {
    //     this.$scope.user = response.data.response;
    //     this.$scope.userAvatarUrl = this.api.users + '/' + this.$scope.user.id + '/avatar-image';
    //   } else {
    //     this.alerts.showErrorAlert();
    //   }
    // };
    //
    // EditUserProfilePopupController.prototype.userDetailsErrorHandler = function(error) {
    //   this.alerts.showErrorAlert();
    // };


    this.requestReadPermission = function () {
      console.log("PRZED WEJŚCIEM DO requestRuntimePermission");

      var permissions = cordova.plugins.permissions;
      console.log(permissions);

      cordova.plugins.diagnostic.requestRuntimePermission(function(status){
        console.log("WEWNĄTRZ requestRuntimePermission");

        switch(status){
          case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
            console.log("Permission granted to use the camera");
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
            console.log("Permission to use the camera has not been requested yet");
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
            console.log("Permission denied to use the camera - ask again?");
            break;
          case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
            console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
            break;
        }
      }, function(error){
          console.error("The following error occurred: "+error);
      }, cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE);


    };


    $scope.getImage = function() {
      requestReadPermission();
      console.log("PRZED GET PICTURES");

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
