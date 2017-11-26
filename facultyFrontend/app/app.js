window.faculty = angular.module('faculty', ['ngAnimate', 'ngRoute', 'ui.bootstrap',  'BotDetectCaptcha'])
.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
        .when('/', {
            controller: 'SignupCtrl',
            templateUrl: './app/templates/Signup.html'
        })
        .when('/verify', {
        	controller: 'SignupCtrl',
        	templateUrl: './app/templates/verify.html'
        })
        .when('/dashboard', {
        	controller: 'dashboardCtrl',
        	templateUrl: './app/templates/dashboard.html'
        })
        .when('/userFeedback', {
            controller: 'feedbackCtrl',
            templateUrl: './app/templates/userFeedback.html'
        })
        .when('/status', {
            controller: 'notGivenFeedbackCtrl',
            templateUrl: './app/templates/notGivenFeedback.html'
        })
        .when('/deanDashboard', {
            controller: 'deanCtrl',
            templateUrl: './app/templates/deanDashboard.html'
        })
        .when("/deanAnalysis", {
            controller: 'deanAnalysisCtrl',
            templateUrl: './app/templates/dean_analysis.html'
        })
        .when('/vcDashboard', {
            controller: 'vcCtrl',
            templateUrl: './app/templates/vcDashboard.html'
        })
        .when("/vcAnalysis", {
            controller: 'vcAnalysisCtrl',
            templateUrl: './app/templates/vc_analysis.html'
        })
        .when('/pvcDashboard', {
            controller: 'vcCtrl',
            templateUrl: './app/templates/pvcDashboard.html'
        })
        .when("/pvcAnalysis", {
            controller: 'pvcAnalysisCtrl',
            templateUrl: './app/templates/pvc_analysis.html'
        })

        .when('/thankYouPage', {
            templateUrl: './app/templates/thankYouPage.html'
        });
        
    }
]);


faculty.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

faculty.config(function(captchaSettingsProvider) {
  captchaSettingsProvider.setSettings({
    captchaEndpoint: '/bdc4-simple-api-angularjs-captcha-example/botdetectcaptcha'
  });
});

// bhai eakk min mila hai kuch let me try
//okay
//samajh rha hun..
//ab upload karten hain..
// bhai mei he kar deta hun
//but isse previous data erase to nhi hoga ? 