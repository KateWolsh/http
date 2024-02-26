const createRequest = async (options = {}, callback) => {
  const { method, params, body } = options;
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        callback(data);
      } catch (e) {
        console.error(e);
      }
    }
  });

  const url = new URL("http://localhost:7070/");
  url.searchParams.append("method", params.method);
  url.searchParams.append("id", params.id);
  xhr.open(method, url);

  xhr.send(JSON.stringify(body));
};

export default createRequest;
