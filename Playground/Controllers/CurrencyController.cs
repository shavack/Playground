using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Playground.DTO;
using Playground.Helpers;
using Playground.Models;

namespace Playground.Controllers
{
    public class CurrencyController : Controller
    {
        public ISomeApiClient _client { get; set; }
        public CurrencyController(ISomeApiClient client)
        {
            this._client = client;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var date = DateTime.Now;
            var response = await _client.GetSomethingAsync<ECBLatestDto>("latest?base=PLN&symbols=USD,GBP,CHF");
            var model = new CurrencyModel() { Data = response, Date = date, Info = "index" };
            return View(model);
        }

        public async Task<IActionResult> PlnToOthers()
        {
            var date = DateTime.Now;
            var usd = await _client.GetSomethingAsync<ECBLatestDto>("latest?base=USD&symbols=PLN");
            var gbp = await _client.GetSomethingAsync<ECBLatestDto>("latest?base=GBP&symbols=PLN");
            var chf = await _client.GetSomethingAsync<ECBLatestDto>("latest?base=CHF&symbols=PLN");
            var rates = new Rates() { USD = usd.Rates.PLN, GBP = gbp.Rates.PLN, CHF = chf.Rates.PLN };
            var model = new CurrencyModel() { Data = new ECBLatestDto() { Rates = rates, Base = "PLN" }, Date = date, Info = "index" };
            return View(model);
        }
    }
}