import angular from "angular";

console.log("it worked")

const mod = angular.module("Scratch", [])

mod.component("coolStuff", {
    controller: function CoolStuffController() {
    },
    template: `
        <b>It worked</b>
    `
})
