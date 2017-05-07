var app = angular.module('starter.controllers', []);

app.controller('DashCtrl', function($scope, $state, Chats) {

  $scope.chats = Chats.all();
  $scope.collection = {
    selectedImage : '',
    images : []
  };
  $scope.showImage = true;

  $scope.nextImage = function(row, column) {
    if ($scope.collection.images[row][column+1] !== undefined) {
      console.log('NEXT IMAGE: [' + row + ', ' + (column+1) + ']' + $scope.collection.images[row][column+1]);
      return $scope.collection.images[row][column+1];

    } else if ($scope.collection.images[row][column+1] === undefined && $scope.collection.images[row+1] !== undefined && $scope.collection.images[row+1][0] !== undefined) {
      console.log('NEXT IMAGE: [' + (row+1) + ', ' + 0 + ']' + $scope.collection.images[row+1][0]);

      return $scope.collection.images[row+1][0];
    } else {
      return null;
    }
  };

  $scope.deleteImage = function(row, column) {
    $scope.collection.selectedImage = '';
    images = $scope.collection.images;

    console.log('Image delete WITAM, x, y: [' + row + ','  + column + ']');
    // console.log('IMAGE v 1: ' + images[row][column]);
    // console.log('NextIMAGE: ' + $scope.nextImage(row, column));


    var loopCol = column;
    for(var i = row; i < images.length; i++){
      for(var j = loopCol; j < images[i].length; j++){
        console.log('*********** ' + i + ', ' + j);
        var next = $scope.nextImage(i, j);
        if (next === null || next === undefined) {

          console.log('OSTATNI: ' + i + ',' + j + ': ' + images[i][j]);
          if (images[i][j] !== undefined){
            console.log('USUWAM BIEŻĄCY');
            images[i].splice(j, 1);
          }

        } else {
          console.log('PODMIANKA PRZY: ' + i + ',' + j);
          images[i][j] = next;
        }
      }
      loopCol = 0;
    }

    //var column = $scope.collection.images.indexOf(image);
    //$scope.collection.images.splice(column, 1)
    //$scope.showImage = false;
    $state.go($state.current, {}, {reload: true});
    console.log('Image deleted: ' + $scope.collection.selectedImage);

  };

  $scope.pushToImages = function(image) {
    console.log('pushToImages WITAM, image: ' + image);
    var length = $scope.collection.images.length;
    for(var i = 0; i < length; i++){
      var three = $scope.collection.images[i];
      if (three.length < 3){
        three.push(image);
        return;
      }
    }
    console.log('Przed dodaniem nowej trójki');
    $scope.collection.images[length] = [];
    $scope.collection.images[length].push(image); //if every three is full create new and push image to it
  };

  $scope.init = function(){
    var chats = Chats.all();
    for(var i = 0; i < chats.length; i++){
      $scope.pushToImages(chats[i].face);
    }
  };

  $scope.init();

});

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

// app.controller('ImagesCtrl', function($scope, $state, $ionicPlatform, $ionicPopup, $cordovaImagePicker, $cordovaCamera) {
app.controller('ImagesCtrl', function($scope, $state, $ionicPlatform) {
  $scope.collection = {
    selectedImage : '',
    images : []
  };

  $scope.allPermissions = [];
  $scope.isReadPermission = false;
  $scope.showImage = false;
  $scope.myWidth = window.screen.width * window.devicePixelRatio;
  $scope.myHeight = window.screen.height * window.devicePixelRatio;

  $ionicPlatform.ready(function() {

    $scope.prettyLogImages = function() {
      console.log('prettyLogImages WITAM');
      var length = $scope.collection.images.length;
      for(var i=0; i < length; i++){
        console.log('*******************' + i + ' ROW *******************');
        var three = $scope.collection.images[i];
        for(var j = 0; j < three.length; j++){
          console.log('*******************' + j + ' COLUMN *******************');
          console.log(three[j]);
        }
      }
      console.log('******************* KONIEC *******************');
    };

    $scope.pushToImages = function(image) {
      var length = $scope.collection.images.length;
      for(var i=0; i < length; i++){
        var three = $scope.collection.images[i];
        if (three.length < 3){
          three.push(image);
          return;
        }
      }
      $scope.collection.images[length] = [];
      $scope.collection.images[length].push(image); //if every three is full create new and push image to it
    };

    $scope.requestPermission = function (permission) {

      if (permission == "READ_EXTERNAL_STORAGE") {
        permissionConst = cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE;
      }

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
      //$scope.requestPermission("READ_EXTERNAL_STORAGE");
    };

    $scope.nextImage = function(row, column) {
      if ($scope.collection.images[row][column+1] !== undefined) {
        return $scope.collection.images[row][column+1];
      } else if ($scope.collection.images[row][column+1] === undefined && $scope.collection.images[row+1] !== undefined && $scope.collection.images[row+1][0] !== undefined) {
        return $scope.collection.images[row+1][0];
      } else {
        return null;
      }
    };

    $scope.deleteImage = function(row, column) {
      $scope.collection.selectedImage = '';
      images = $scope.collection.images;

      var loopCol = column;
      for(var i = row; i < images.length; i++){
        for(var j = loopCol; j < images[i].length; j++){
          var next = $scope.nextImage(i, j);
          if (next === null || next === undefined) {
            if (images[i][j] !== undefined){
              images[i].splice(j, 1);
            }
          } else {
            images[i][j] = next;
          }
        }
        loopCol = 0;
      }
      $state.go($state.current, {}, {reload: true});
    };

    $scope.getImage = function() {
      var options = {
          maximumImagesCount: 10,
          width: $scope.myWidth,
          height: $scope.myHeight,
          quality: 50
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          for (var i = 0; i < results.length; i++) {
            $scope.collection.selectedImage = results[i];
            $scope.pushToImages(results[i]);
            $scope.showImage = true;
          }
      }, function(error) {
          console.log('Get Image Error: ' + JSON.stringify(error));
      });

    };

    $scope.captureImage = function() {
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

          $cordovaCamera.getPicture(options)
            .then(function(imageData) {
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;
              $scope.collection.selectedImage = image.src;
              $scope.pushToImages(image.src);
              $scope.showImage = true;
          }, function(error) {
            console.log('Capture Image Error: ' + JSON.stringify(error));
          });
        }, false);
    }

    $scope.showFetchImagePopup = function() {
      $scope.imagePopupResponse = {};

      var myPopup = $ionicPopup.show({
        title: 'Get image from:',
        scope: $scope,
        buttons: [
          {
            text: 'Gallery',
            type: 'button-calm',
            onTap: function(e) {
              $scope.imagePopupResponse = "gallery";
            }
          },
          {
            text: 'Camera',
            type: 'button-positive',
            onTap: function(e) {
              $scope.imagePopupResponse = "camera";
            }
          }
        ]
      });

      myPopup.then(function(res) {
        $scope.fetchImage();
      });
     };

    $scope.fetchImage = function() {
      if ($scope.imagePopupResponse === "gallery"){
        $scope.getImage();
      } else if ($scope.imagePopupResponse === "camera") {
        $scope.captureImage();
      }
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
