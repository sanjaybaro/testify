const originalFetch = window.fetch;
const originalXhrOpen = XMLHttpRequest.prototype.open;

const interceptFetch = (callback) => {
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const clonedResponse = response.clone();

    const request = {
      url: args[0],
      method: args[1]?.method || "GET",
      headers: args[1]?.headers || {},
      payload: args[1]?.body || null,
      type: "fetch",
    };

    callback(request, clonedResponse);

    return response;
  };
};

const interceptXhr = (callback) => {
  XMLHttpRequest.prototype.open = function (
    method,
    url,
    async,
    user,
    password
  ) {
    this._url = url;
    this._method = method;
    this._headers = {};

    this.setRequestHeader = function (header, value) {
      this._headers[header] = value;
      XMLHttpRequest.prototype.setRequestHeader.call(this, header, value);
    };

    this.addEventListener("load", function () {
      const request = {
        url: this._url,
        method: this._method,
        headers: this._headers,
        payload: this._requestBody,
        type: "xhr",
      };

      callback(request, this);
    });

    originalXhrOpen.call(this, method, url, async, user, password);
  };

  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    this._requestBody = body;
    originalSend.call(this, body);
  };
};

export const monitorNetworkRequests = (callback) => {
  interceptFetch(callback);
  interceptXhr(callback);
};
