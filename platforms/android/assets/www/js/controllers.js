var config =
{
    headers : {
        'Content-Type': 'application/json;charset=utf-8;'
        }
}

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('loginCtrl', function($scope, $http, $state) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.user="";
  var headers = {
    'Content-Type' : config.headers.Content-Type,
    'Device' : window.device.uuid
  };

  var Url = "http://apidespesas.azurewebsites.net/api/Acesso/VerificaLogin";

  $scope.signIn = function () {

     $http.post(Url,headers, $scope.user)
                .success(function (data, status, headers, config) {
      $state.go('tab.dash');
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });
              };
 });
