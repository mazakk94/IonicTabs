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

app.controller('ImagesCtrl', function($scope, $cordovaImagePicker, $ionicPlatform, $cordovaContacts) {
  $scope.collection = {
        selectedImage : ''
    };
  // this.$cordovaImagePicker = $cordovaImagePicker;

    $ionicPlatform.ready(function() {

          $scope.getImageSaveContact = function() {
              var options = {
                  maximumImagesCount: 1,
                  width: 50,
                  height: 50,
                  quality: 100
              };

              // $cordovaImagePicker.getPictures(options)
              $cordovaImagePicker.getPictures(options)
                .then(function (results) {

                  for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);
                    $scope.collection.selectedImage = results[i];

                  /*
                    window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                          $scope.collection.selectedImage = base64;
                          // $scope.addContact();    // Save contact
                    });
                  */
                  }
              }, function(error) {
                  console.log('Error: ' + JSON.stringify(error));    // In case of error
              });
          };

      });
/*
  //
  // $scope.contact = {     // We will use it to save a contact
  //
  //         "displayName": "Gajotres",
  //         "name": {
  //             "givenName"  : "Dragannn",
  //             "familyName" : "Gaiccc",
  //             "formatted"  : "Dragannn Gaiccc"
  //         },
  //         "nickname": 'Gajotres',
  //         "phoneNumbers": [
  //             {
  //                 "value": "+385959052082",
  //                 "type": "mobile"
  //             },
  //             {
  //                 "value": "+385914600731",
  //                 "type": "phone"
  //             }
  //         ],
  //         "emails": [
  //             {
  //                 "value": "dragan.gaic@gmail.com",
  //                 "type": "home"
  //             }
  //         ],
  //         "addresses": [
  //             {
  //                 "type": "home",
  //                 "formatted": "Some Address",
  //                 "streetAddress": "Some Address",
  //                 "locality":"Zagreb",
  //                 "region":"Zagreb",
  //                 "postalCode":"10000",
  //                 "country":"Croatia"
  //             }
  //         ],
  //         "ims": null,
  //         "organizations": [
  //             {
  //                 "type": "Company",
  //                 "name": "Generali",
  //                 "department": "IT",
  //                 "title":"Senior Java Developer"
  //             }
  //         ],
  //         "birthday": Date("08/01/1980"),
  //         "note": "",
  //         "photos": [
  //             {
  //                 "type": "base64",
  //                 "value": $scope.collection.selectedImage
  //
  //             }
  //         ],
  //         "categories": null,
  //         "urls": null
  //     }
  //
  //     $scope.addContact = function() {
  //         $cordovaContacts.save($scope.contact).then(function(result) {
  //             console.log('Contact Saved!');
  //         }, function(err) {
  //             console.log('An error has occured while saving contact data!');
  //         });
  //     };
*/

});

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true,
    enableXcactus: false
  };
});
