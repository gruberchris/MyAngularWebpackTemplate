import "bootstrap/dist/css/bootstrap.css";

import angular from "angular";
import uirouter from "angular-ui-router";
import toastr from "angular-toastr";

import { routerConfig } from "./app.router";
import { HomeController } from "./home/home";

angular.module("myangularwebpacktemplate", [
  "ui.bootstrap",
  uirouter,
  toastr
])
.config(routerConfig)
.controller("HomeController", HomeController);
