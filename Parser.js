
    export async function postDataJSON(url = '', data = []) {
        //const fetch = require("node-fetch");
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'cookie': 'wasm=c28265d6d51e64c76c4333a731c9b0bf; ASP.NET_SessionId=wq2bdjd20p15szbwnsn53ayq;'
            
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.text(); // parses JSON response into native JavaScript objects
      }

      export async function postDataURL(url = '', data = []) {
        //const fetch = require("node-fetch");
        // Default options are marked with *
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
      
      /*postDataJSON('https://kad.arbitr.ru/Kad/SearchInstances', {"Page":1,"Count":25,"Courts":[],"DateFrom":null,"DateTo":null,"Sides":[{"Name":"8602302853","Type":-1,"ExactMatch":false}],"Judges":[],"CaseNumbers":[],"WithVKSInstances":false})
        .then((data) => {
          console.log(data); // JSON data parsed by `response.json()` call
      });*/
      
      /*postDataURL('https://pb.nalog.ru/company-proc.json', 'token=25A6D8703691BECA6F9403FF8D9D98EEBFCD761F2E6627F63ED5C61FE3970B76FB0AF46FC832099014A230FB8C49F1F9&method=get-request')
        .then((data) => {
          console.log(data); // JSON data parsed by `response.json()` call
      });*/

      
        //92E7F72F6E7B8EAAA5D6C11512187B52A76B60236FBB1D327911BD635E77F77BD0F7D3EA7BC92B76064F7DFF6869CB80026F87522C964CEBFA07F5DBFB692F8A
        