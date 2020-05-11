using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Playground.Helpers
{
    public interface ISomeApiClient
    {
        Task<T> GetSomethingAsync<T>(string query);
    }

    public class APIClient : ISomeApiClient
    {
        public HttpClient _client { get; set; }

        private JsonSerializerOptions _serializerOptions { get; set; }

        public APIClient(HttpClient httpClient)
        {
            this._client = httpClient;
            this._serializerOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true,
            };
        }

        public async Task<T> GetSomethingAsync<T>(string query)
        {
            var response = await this._client.GetAsync($"{query}");

            if (response.IsSuccessStatusCode)
            {
                var result = await JsonSerializer.DeserializeAsync<T>(await response.Content.ReadAsStreamAsync(), this._serializerOptions);
                return result;
            }
            return default(T);
        }
    }
}