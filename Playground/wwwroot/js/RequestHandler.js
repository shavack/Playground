$(document).ready(function ()
{
    const url = 'https://api.exchangeratesapi.io/latest';
    $('#fetchData').click(function ()
    {
        $.ajax({
                url: url,
                type: "GET",
            success: function (result) {
                regenerateTable(result);
                console.log(result.rates);
                console.log(result.base);
                console.log(result.date);
                },
            error: function (error) {
                    console.log(`Error ${error}`)
                }
             })
    })
    function printElt(element, index, array) {
        console.log("[" + index + "] jest " + element);
    }

    var regenerateTable = function (data) {
        console.log(data);
        data.rates.forEach(printElt)
    }
});