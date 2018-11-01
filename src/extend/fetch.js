require('es6-promise').polyfill();
export default async (url = '', data, type = 'GET') => {
    if (window.fetch) {
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            cache: 'force-cache',
        }
        if (type == 'POST') {
            let datastr = '';
            Object.keys(data).forEach((key) => {
                datastr += key + '=' + data[key] + '&'
            });
            if (datastr != '') {
                datastr = datastr.substr(0, datastr.lastIndexOf('&'))
            }
            requestConfig.body = datastr
        }
        try {
            let response = await window.fetch(url, requestConfig);
            let responseData = response.json();
            return responseData;
        } catch (err) {
            console.error(err);
        }
    } else {
        return new Promise((resolve, reject) => {
            var requestObj;
            if (window.XMLHttpRequest || XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject();
            }
            let sendData = '';
            if (type == "POST") {
                let datastr = '';
                Object.keys(data).forEach((key) => {
                    datastr += key + '=' + data[key] + '&'
                });
                if (datastr != '') {
                    datastr = datastr.substr(0, datastr.lastIndexOf('&'))
                }
                sendData = datastr
            } else {
                sendData = data;
            }
            requestObj.open(type, url, true);
            requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            requestObj.send(sendData);
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response;
                        if (typeof obj != Object) {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } else {
                        reject(requestObj);
                    }
                }
            }
        });
    }
}
  