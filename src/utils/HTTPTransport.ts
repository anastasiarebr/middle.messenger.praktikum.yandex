enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface Options {
    headers?: Record<string, string>,
    method?: METHODS,
    data?: object,
    timeout?: number,
}

function queryStringify(data: Record<string, unknown[] | object>) {
  const keys = Object.keys(data);

  if (keys.length === 0) {
    return '';
  }

  const params = keys
    .reduce((acc, key) => {
      const prefix = `${key}=`;
      return [...acc, `${prefix}${data[key].toString()}`];
    }, [] as string[])
    .join('&');

  return `?${params}`;
}

export class HTTPTransport {
  get = (url: string, options: Options = {}) => this.request(url, { 
        ...options, method: METHODS.GET 
    }, options.timeout);

  post = (url: string, options: Options = {}) => this.request(url, { 
        ...options, method: METHODS.POST 
    }, options.timeout);

  put = (url: string, options: Options = {}) => this.request(url, { 
        ...options, method: METHODS.PUT 
    }, options.timeout);

  delete = (url: string, options: Options = {}) => this.request(url, { 
        ...options, method: METHODS.DELETE }, 
    options.timeout);

  request = (url: string, options: Options = {}, timeout = 5000, withCredentials = true) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data as Record<string, unknown[] | object>)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        const reqData = data instanceof FormData ? data : JSON.stringify(data)
        xhr.send(reqData as string | FormData);
      }
    });
  };
}
