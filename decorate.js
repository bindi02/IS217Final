function Computer() {
    this.cost = function () {
        return 1000;
    };
    this.screen = function () {
        return 11;
    };
}

function screens(Computer) {
    var value = Computer.cost();
    laptop.cost = function () {
        return value + 200;

    }
}

function memory(Computer) {
    var value = Computer.cost();
    laptop.cost = function () {
        return value + 200;

    };
}

function Harddrive(Computer) {
    var value = Computer.cost();
    laptop.cost = function () {
        return value + 200;

    };
}
var Final = new Computer();
screens(Final);
Memory(Final);
Harddrive(Final);
console.log(Final.cost());
console.log(Final.screens());