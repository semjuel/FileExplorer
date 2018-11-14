import axios from 'axios';

class HTTPService {
  /**
   * Performing get request.
   *
   * @param url
   * @param config
   *
   * @returns {Promise.<TResult>}
   */

  get<T>(url, config?) {
    return axios
      .get(url, config)
      .then((res) => this.handleSuccess<T>(res))
      .catch(this.handleError);
  }

  /**
   * Performing post request.
   *
   * @param url
   * @param data
   * @param config
   *
   * @returns {Promise.<TResult>}
   */
  post<T>(url, data, config?) {
    return axios
      .post(url, data, config)
      .then((res) => this.handleSuccess<T>(res))
      .catch(this.handleError);
  }

  /**
   * Performing put request.
   *
   * @param url
   * @param data
   * @param config
   *
   * @returns {Promise.<TResult>}
   */
  put<T>(url, data, config?) {
    return axios
      .put(url, data, config)
      .then((res) => this.handleSuccess<T>(res))
      .catch(this.handleError);
  }

  /**
   * Performing patch request.
   *
   * @param url
   * @param data
   * @param config
   *
   * @returns {Promise.<TResult>}
   */
  patch<T>(url, data, config?) {
    return axios
      .patch(url, data, config)
      .then((res) => this.handleSuccess<T>(res))
      .catch(this.handleError);
  }

  /**
   * Performing delete request.
   *
   * @param url
   * @param config
   * @returns {Promise.<TResult>}
   */
  delete<T>(url, config?) {
    return axios
      .delete(url, config)
      .then((res) => this.handleSuccess<T>(res))
      .catch(this.handleError);
  }

  /**
   * Performing multiple concurrent requests.
   *
   * @param requests
   *
   * @returns {Promise.<TResult>}
   */
  all(requests) {
    return axios.all(requests);
  }

  /**
   * @param callback
   * @returns {(array: any[]) => any}
   */
  spread(callback) {
    return axios.spread(callback);
  }

  /**
   * Handle success.
   *
   * @param response
   */
  handleSuccess<T>(response): T {
    return response.data;
  }

  /**
   * Handle errors.
   *
   * @param error
   */
  handleError(error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw error.request;
    }

    return Promise.reject(error);
  }

  /**
   * Set base url.
   *
   * @param url
   */
  setBaseUrl(url) {
    axios.defaults.baseURL = url;
  }

  /**
   * get cancel token.
   *
   * @returns class cancelToken
   */
  cancel() {
    return axios.CancelToken;
  }

  /**
   * get isCancel.
   *
   * @returns boolean (is cancel)
   */
  isCancel(data) {
    return axios.isCancel(data);
  }

  interceptors() {
    return axios.interceptors;
  }

  defaults() {
    return axios.defaults;
  }
}

export default new HTTPService();
