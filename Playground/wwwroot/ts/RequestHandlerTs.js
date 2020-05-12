$(function () {
    var url = 'https://api.exchangeratesapi.io/';
    var Response = /** @class */ (function () {
        function Response() {
        }
        return Response;
    }());
    var currencyTable = document.getElementById("currencyTable");
    var regenerateTable = function (rates, name) {
        for (var property in rates) {
            var row = document.createElement("tr");
            createElementAndAdd(row, "td", name === "" ? property : name);
            createElementAndAdd(row, "td", rates[property]);
            currencyTable.appendChild(row);
        }
    };
    var clearTable = function () {
        var row = document.createElement("tr");
        createElementAndAdd(row, "th", "Currency");
        createElementAndAdd(row, "th", "Value");
        currencyTable.innerHTML = '';
        currencyTable.appendChild(row);
    };
    var createElementAndAdd = function (parent, element, text) {
        var el = document.createElement(element);
        el.innerText = text;
        parent.appendChild(el);
    };
    $('#othersToPlnTs').click(function () {
        clearTable();
        ajaxCall("latest?base=USD&symbols=PLN", "USD");
        ajaxCall("latest?base=CHF&symbols=PLN", "CHF");
        ajaxCall("latest?base=EUR&symbols=PLN", "EUR");
    });
    $('#plnToOthersTs').click(function () {
        clearTable();
        ajaxCall("latest");
    });
    var ajaxCall = function (params, currency) {
        if (currency === void 0) { currency = ""; }
        $.ajax({
            url: url + params,
            type: "GET",
            success: function (result) {
                regenerateTable(result.rates, currency);
            },
            error: function (error) {
                console.log("Error " + error);
            }
        });
    };
});
