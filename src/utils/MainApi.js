import { BASE_URL } from './constants';
import { handleResponse } from './utils';

class MainApi {
  constructor({ hostUrl, headers }) {
    this._baseUrl = hostUrl;
    this._headers = headers;
  }

  async _handleQuery({ relativeLink, method, body }) {
    const options = {
      method,
      headers: this._headers,
      credentials: 'include',
      body,
    };

    const response = await fetch(`${this._baseUrl}${relativeLink}`, options);

    return handleResponse(response);
  }

  getHead(relativeLink) {
    return this._handleQuery({
      relativeLink,
      method: 'HEAD',
    });
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

  getUserInfo() {
    return this.getData('users/me');
  }

  updateUser(data) {
    return this.patchData('users/me', data);
  }

  getSavedMovies() {
    return this.getData('movies');
  }

  saveMovie(data) {
    return this.postData('movies', data);
  }

  deleteMovie(movieId) {
    return this.deleteData(`movies/${movieId}`);
  }
}

const mainApi = new MainApi({
  hostUrl: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

export default mainApi;
