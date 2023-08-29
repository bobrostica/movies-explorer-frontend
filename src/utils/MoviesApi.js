import { MOVIES_URL } from './constants';

class MoviesApi {
  constructor({ hostUrl, headers }) {
    this._baseUrl = hostUrl;
    this._headers = headers;
  }

  _handleQuery({ relativeLink, method, body }) {
    const options = {
      method,
      headers: this._headers,
    };

    if (body) options.body = body;

    return fetch(`${this._baseUrl}${relativeLink}`, options).then(
      (response) => {
        if (response.ok) return response.json();

        return Promise.reject(response.status);
      },
    );
  }

  getData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'GET',
    });
  }

  patchData(relativeLink, dataBody) {
    return this._handleQuery({
      relativeLink,
      method: 'PATCH',
      body: JSON.stringify(dataBody),
    });
  }

  postData(relativeLink, dataBody) {
    return this._handleQuery({
      relativeLink,
      method: 'POST',
      body: JSON.stringify(dataBody),
    });
  }

  deleteData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'DELETE',
    });
  }

  putData(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'PUT',
    });
  }

  getMovies() {
    return this.getData('/');
  }
}

const moviesApi = new MoviesApi({
  hostUrl: MOVIES_URL,
  headers: {
    'content-type': 'application/json',
  },
});

export default moviesApi;
