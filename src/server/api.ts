import axios from "axios";
// ===================

const shortenUrl = (url: string, setData: (url: string) => void) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("url", url);

  // Fetch request to get the API key
  fetch("http://13.211.198.149/retrieve_api.php", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      const options = {
        method: "POST",
        url: "https://url-shortener-service.p.rapidapi.com/shorten",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": data.api_key, // Use the API key from the fetch response
          "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
        },
        data: encodedParams,
      };

      // Return the Axios request
      return axios
        .request(options)
        .then((response) => response.data)
        .then((data) => setData(data.result_url))
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((err) => {
      console.error(err);
    });
};

export default shortenUrl;
