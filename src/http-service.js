const structureQueryParams = params => {
    let queryStrings = "?";
    const keys = Object.keys(params);
    keys.forEach((key, index) => {
      queryStrings += key + "=" + params[key];
      if (params[keys[index + 1]]) {
        queryStrings += "&";
      }
    });
    return queryStrings;
  };
  
  const getToken = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsIl9pZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsImZ1bGxOYW1lIjoiS2lyYW4gRGVibmF0aCIsImVtYWlsIjoidG90YW4wMDEwQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiQWRtaW4iLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYwMjM4Njg5OSwiZXhwIjoxNjA0OTc4ODk5fQ.P7HhkP0pwzGmEPSgS5ueekhJAcmaFU6bXB1-TwG6viU';
    
    return token;
  }
  
  export const makeGetRequest = async (
    url,
    attachToken = false,
    query = null
  ) => {
    let queryString = "";
    if (query) {
      queryString = structureQueryParams(query);
    }
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    if (attachToken) {
      try {
        const authToken = await getToken();
        if (authToken) {
          // console.log(authToken);
          headers["Authorization"] = "Bearer " + authToken;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return new Promise((resolve, reject) => {
      try {
        fetch(url + queryString, {
          method: "GET",
          headers: headers
        })
          .then(res => res.json())
          .then(jsonResponse => {
            if (jsonResponse.error === false) { // change this condition according to response structure
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          })
          .catch(e => {
            console.log("XHR GET Error: ", e);
            reject(e);
          });
      } catch (e) {
        console.log(e);
        reject();
      }
    });
  };