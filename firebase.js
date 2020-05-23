
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

  console.log("firebase");
  console.log("running");

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
        //alert(tabs[0].url);
  });



//START OF HIGH CARBON
var high_carbon_array =["beef","butter","canned tuna","cheese","chicken","duck","egg","goat","honey","lamb","mayonnaise","milk","olive oil","pork","salmon","shrimp","turkey","yogurt"];
var high_carbon_outputs=["27","3.3","6.1","13.5","6.9","5.4","4.8","64","1","39.2","1.95","3.2","4.5","12.1","11.9","12","10.9","2.2"];
// returns array of high carbon ingredients
var local_high_carbon_array =[];
var local_high_carbon_outputs =[];
function is_it_high_carbon(){ //returns 1 if it is there
  local_high_carbon_array =[];
  local_high_carbon_outputs =[];
  //finds the info
  firebase.database().ref('Homemade Chicken Soup/0').on('value', function(snapshot) {
    var loopnum = snapshot.val();
    //console.log(loopnum);
    var j;
    for(j=1;j<=loopnum;j++){;
      firebase.database().ref('Homemade Chicken Soup/'+j).on('value', function(snapshot) {
          var hmmm = snapshot.val();
          //console.log(hmmm);
          var i;
          for(i=0;i<18;i++){
            if(hmmm.indexOf(high_carbon_array[i])!=-1){
              if(local_high_carbon_array.includes(high_carbon_array[i])!=true){
                  local_high_carbon_array.push(high_carbon_array[i]);
                  local_high_carbon_outputs.push(high_carbon_outputs[i]);
              }
            }
          }
          return 0;
        });
    }
  });
  //console.log(local_high_carbon_array);
  //console.log(local_high_carbon_outputs);
  return 1;
}
//is_it_high_carbon();
//END OF HIGH CARBON

async function bruh(){
  let bruv = await is_it_high_carbon();
}

is_it_high_carbon().then(bruv => {
  console.log(local_high_carbon_array[0]);
}).catch(error=>{});

//turn firebase calls to functions
//let name = await func()
