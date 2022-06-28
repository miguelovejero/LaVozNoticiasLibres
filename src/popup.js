var app = angular.module('RequestBlockerApp', []);

app.controller('PopupController', function($scope) {

    $scope.backgroundPage = chrome.extension.getBackgroundPage();
    $scope.patterns = $scope.backgroundPage.patterns.map(function(x, i) {
        return {
            index: i,
            pattern: x,
            isValid: true
        };
    });

    $scope.stop = function() {
        $scope.backgroundPage.stop()
        $scope.$apply(function() {
                $scope.error('Apagando el servicio . . .');
            });
    };
    

    $scope.start = function() {
        var patterns = $scope.patterns.map(function(x) {
            return {
                index: 1,
                pattern: "*://cdn.lavoz.com.ar/sites/default/files/libs/paywall/lavoz/pw.js?*",
                isValid: true
            };
        });

        $scope.backgroundPage.save(patterns, function() {
            $scope.$apply(function() {
                $scope.success('Iniciando el servicio . . .');
            });
        });
    };

    $scope.success = function(message, title) {
        $scope.modal(message, title || "Success", "text-info");
    }
    $scope.error = function(message, title) {
        $scope.modal(message, title || "Error", "text-danger");
    }
    $scope.modal = function(message, title, modalClass) {
        $scope.modalClass = modalClass;
        $scope.modalTitle = title;
        $scope.modalMessage = message;
        $('#modal').modal();
    }
});
