$(function () {
    const url = 'https://api.exchangeratesapi.io/';

    class Response
    {
        base: string;
        date: string;
        rates: object;
        constructor() { }
    }

    const currencyTable = document.getElementById("currencyTable");

    var regenerateTable = function (rates, name: string)
    {
        for (var property in rates) {
            var row = document.createElement("tr");
            createElementAndAdd(row, "td", name === "" ? property : name);
            createElementAndAdd(row, "td", rates[property]);
            currencyTable.appendChild(row);
        }
    }

    var clearTable = function () {
        var row = document.createElement("tr");
        createElementAndAdd(row, "th", "Currency");
        createElementAndAdd(row, "th", "Value");

        currencyTable.innerHTML = '';
        currencyTable.appendChild(row);
    }

    var createElementAndAdd = function (parent: HTMLTableRowElement, element: string, text: string) {
        var el = document.createElement(element);
        el.innerText = text;
        parent.appendChild(el);
    }

    $('#othersToPlnTs').click(function () {
        clearTable();
        ajaxCall("latest?base=USD&symbols=PLN", "USD");
        ajaxCall("latest?base=CHF&symbols=PLN", "CHF");
        ajaxCall("latest?base=EUR&symbols=PLN", "EUR");
    })

    $('#plnToOthersTs').click(function () {
        clearTable();
        ajaxCall("latest");
    })

    const ajaxCall = function (params: string, currency: string = "") {
        $.ajax({
            url: url + params,
            type: "GET",
            success: function (result: Response) {
                regenerateTable(result.rates, currency);
            },
            error: function (error) {
                console.log(`Error ${error}`)
            }
        })
    }

});
