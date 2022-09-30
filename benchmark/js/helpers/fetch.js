const genId = () => Math.random().toString(36).substring(7);
export const systemCorrelationId = `1_1492561111_766_48_${genId()}_CHECKOUT-WIDGET`;
export const systemSessionId = `vme_qa_001${genId()}`;

export var fetchReq = function (options) {
    const {
        url,
        body,
        method,
        headers
    } = options;
    headers['X-CORRELATION-ID'] = systemCorrelationId;
    headers['dfpSessionId'] = systemSessionId;
    headers['X-THMID'] = systemSessionId;

    const contentType = headers['Content-Type'];
    let finalBody = {};

    if (contentType.includes('x-www-form-urlencoded')) {
        finalBody = serializeObject(body);
    } else {
        finalBody = JSON.stringify(body);
    }
    // console.log("Final Body data", body);
    return fetch(
            url,
            Object.assign({}, {
                body: finalBody,
                credentials: 'same-origin',
                headers: headers,
                method
            })
        )
        .then(res => handleJsonResponse(res))
        .then(data => data)
        .catch(error => {return error});
};

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function handleJsonResponse(res) {
    const headers = {};
    res.headers.forEach(function (v, k) {
        headers[k] = v;
    });
    // console.log('headers - ' + JSON.stringify(headers));
    return (
        res
        .json()
        .then(function (data) {
            console.log('data', data);
            return {
                data: data,
                headers: headers
            }
        })
        .catch(function () {
            return {
                headers: headers
            }
        }))
};


function serializeObject(obj) {
    if (!obj) {
        return '';
    }

    var s = [];

    Object.keys(obj).forEach(function (key) {
        if (obj[key] && obj[key].constructor === Array) {
            obj[key].forEach(function (value) {
                s.push(key + '=' + encodeURIComponent(value));
            });
        } else {
            s.push(key + '=' + encodeURIComponent(obj[key]));
        }
    });

    return s.join('&');
};
