// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SimpleRESTIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'backand', 'SimpleRESTIonic.controllers', 'SimpleRESTIonic.services'])

    .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
      // change here to your appName
    BackandProvider.setAppName('aglarbkn');
    BackandProvider.setSignUpToken('ef89a25c-188d-4401-b280-b389c41b04ac');
    BackandProvider.setAnonymousToken('0d815db8-7382-496d-a7d6-86a8eca51758');

      BackandProvider.runSocket(true);

      $stateProvider
      // setup an abstract state for the tabs directive
        .state('tab', {
          url: '/tabs',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })
        .state('tab.dashboard', {
          url: '/dashboard',
          views: {
            'tab-dashboard': {
              templateUrl: 'templates/tab-dashboard.html',
              controller: 'DashboardCtrl as vm'
            }
          }
        })
        .state('tab.login', {
          url: '/login',
          views: {
            'tab-login': {
              templateUrl: 'templates/tab-login.html',
              controller: 'LoginCtrl as vm'
            }
          }
        })
        .state('tab.signup', {
              url: '/signup',
              views: {
                'tab-signup': {
                  templateUrl: 'templates/tab-signup.html',
                  controller: 'SignUpCtrl as vm'
                }
              }
            }
        );

      $urlRouterProvider.otherwise('/tabs/login');
      $httpProvider.interceptors.push('APIInterceptor');
    })

    .run(function ($ionicPlatform, $rootScope, $state, LoginService) {

      $ionicPlatform.ready(function () {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }

      });

      function unauthorized() {
        console.log("user is unauthorized, sending to login");
        $state.go('tab.login');
      }

      function signout() {
        LoginService.signout();
      }

    });
