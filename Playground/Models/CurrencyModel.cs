using Playground.DTO;
using System;

namespace Playground.Models
{
    public class CurrencyModel
    {
        public string Info { get; set; }

        public ECBLatestDto Data { get; set; }

        public DateTime Date { get; set; }

        public CurrencyModel()
        {
        }
    }
}
