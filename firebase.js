
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCUTFom3eBrXEwqTmSscXxKVtbaNtNv8YM",
    authDomain: "planty-bb6f2.firebaseapp.com",
    databaseURL: "https://planty-bb6f2.firebaseio.com",
    projectId: "planty-bb6f2",
    storageBucket: "planty-bb6f2.appspot.com",
    messagingSenderId: "38856669442",
    appId: "1:38856669442:web:807f81a0e0a7e892122a1b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log(firebase);
  console.log("running")

  chrome.runtime.onMessage.addListener((msg, sender, resp) => {
      if(msg.commang == "fetch"){
          var doman = msg.data.domain;
          var enc_domain = btoa(domain);
          firebase.database().ref('/domain/' + enc_domain).once('value').then(function(snapshot){resp({type: "result", status: "success", data:snapshot.val(), request: msg});
          });

      }

    //we dont need to post
  }
  )

  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs){
            alert(tabs[0].url);
        }
        );