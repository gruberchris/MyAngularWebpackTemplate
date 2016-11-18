let routerConfig = ($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider.state("home", {
    url: "/",
    templateUrl: "home/home.html",
    controller: "HomeController",
    controllerAs: "home"
  });

  $urlRouterProvider.otherwise("/");
};

export { routerConfig };
