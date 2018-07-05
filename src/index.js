import angular from "angular";
import uirouter from "@uirouter/angularjs";

console.log("index.js loaded")

angular.module("Scratch", [uirouter])

    .config(function ($locationProvider, $transitionsProvider, $stateProvider) {

        console.log("config function called")

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false,
        })

        function logTransition(event, tran) {
            console.log(`${event}: ${tran.from().name || "(null)"} --> ${tran.to().name}`)
        }

        $transitionsProvider.onBefore({}, tr => logTransition("onBefore", tr))
        $transitionsProvider.onCreate({}, tr => logTransition("onCreate", tr))
        $transitionsProvider.onEnter({}, tr => logTransition("onEnter", tr))
        $transitionsProvider.onError({}, tr => logTransition("onError", tr))
        $transitionsProvider.onExit({}, tr => logTransition("onExit", tr))
        $transitionsProvider.onFinish({}, tr => logTransition("onFinish", tr))
        $transitionsProvider.onRetain({}, tr => logTransition("onRetain", tr))

        $stateProvider.state({
            name: "parent",
            url: "/",
            component: "parent",
        })

        $stateProvider.state({
            name: "parent.child",
            url: "/{id}",
            component: "child",
            resolve: {
                id: ($transition$) => $transition$.params().id,
            }
        })

    })

    .component("parent", {
        controller: function ParentController() {
        },
        template: `
            <div>
                <p>It worked</p>
                <ul>
                    <li><a ui-sref=".child({ id: 1 })">Child #1</a></li>
                    <li><a ui-sref=".child({ id: 2 })">Child #2</a></li>
                    <li><a ui-sref=".child({ id: 3 })">Child #3</a></li>
                </ul>
            </div>
            <ui-view></ui-view>
        `
    })

    .component("child", {
        controller: function ChildController() {
        },
        bindings: {
            id: '<',
        },
        template: `
            <div style="outline: solid 1px blue;">
                <p>This is child # {{ $ctrl.id }}</p>
                <p><a ui-sref="^">Go back</a></p>
            </div>
        `
    })
