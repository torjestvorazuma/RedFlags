//Http request blueprint
export async function makeHttpRequestJSON(url = '', data = []) {
  const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie' : '_ym_uid=1625468494103224867; _ym_d=1625468494; _ym_isad=2; pb-compare-inn-list=""; _ym_visorc=b; JSESSIONID=7DB23A281F0665975BFD27C4F9043AAD'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        

        return await response.json(); // parses JSON response into native JavaScript objects
}

export async function makeHttpRequestURL(url = '', data = '') {
  const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie' : '_ym_uid=1625468494103224867; _ym_d=1625468494; _ym_isad=2; pb-compare-inn-list=""; _ym_visorc=b; JSESSIONID=7DB23A281F0665975BFD27C4F9043AAD'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: data // body data type must match "Content-Type" header
        });
        

        return await response.json(); // parses JSON response into native JavaScript objects
}
        