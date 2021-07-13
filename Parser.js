
    async function postData(url = '', data = {}) {
        const fetch = require("node-fetch");
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'cookie': 'wasm=c28265d6d51e64c76c4333a731c9b0bf; ASP.NET_SessionId=wq2bdjd20p15szbwnsn53ayq;'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.text(); // parses JSON response into native JavaScript objects
      }
      
      postData('https://kad.arbitr.ru/Kad/SearchInstances', { "Page":1,"Count":25,"Courts":[],"DateFrom":null,"DateTo":null,"Sides":[{"Name":"8602302853","Type":-1,"ExactMatch":false}],"Judges":[],"CaseNumbers":[],"WithVKSInstances":false })
        .then((data) => {
          console.log(data); // JSON data parsed by `response.json()` call
        });
