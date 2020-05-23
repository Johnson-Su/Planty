
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
        const my_url = tabs[0].url;
        console.log(my_url);

    const recipeScraper = require("recipe-scraper");

    // enter a supported recipe url as a parameter - returns a promise
    async function someAsyncFunc() {
      let recipe = await recipeScraper(my_url);
    }

    // using Promise chaining
    recipeScraper(my_url).then(recipe => {
      console.log(recipe.name);
      console.log(recipe.ingredients);
      allIngredients = recipe.ingredients;

    for(j = 0; j < allIngredients.length; j++){
        console.log(allIngredients[j]);
    }
      }).catch(error => {
        // do something with error
      });


  });


      firebase.database().ref('Recipe/1').on('value', function(snapshot) {
        document.getElementById('address').innerHTML = snapshot.val();
      });

      firebase.database().ref('Recipe/0').on('value', function(snapshot) {
        document.getElementById('countnum').innerHTML = snapshot.val();
      });

    //START OF HIGH CARBON
    var high_carbon_array =["beef","butter","canned tuna","cheese","chicken","duck","egg","goat","honey","lamb","mayonnaise","milk","olive oil","pork","salmon","shrimp","turkey","yogurt"];
    var high_carbon_outputs=[27,3.3,6.1,13.5,6.9,5.4,4.8,64,1,39.2,1.95,3.2,4.5,12.1,11.9,12,10.9,2.2];
    // returns array of high carbon ingredients
    var local_high_carbon_array =[];
    var local_high_carbon_outputs =[];

    function is_it_high_carbon(){ //returns 1 if it is there
      local_high_carbon_array =[];
      local_high_carbon_outputs =[];
      //finds the info
      firebase.database().ref('Recipe/0').on('value', function(snapshot) {
        var loopnum = snapshot.val();
        //console.log(loopnum);
        var j;
        for(j=2;j<=loopnum+1;j++){;
          firebase.database().ref('Recipe/'+j).on('value', function(snapshot) {
              var ingredient_name = snapshot.val();
              //console.log(hmmm);
              var i;
              for(i=0;i<18;i++){
                if(ingredient_name.indexOf(high_carbon_array[i])!=-1){
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
      console.log(local_high_carbon_array);
      console.log(local_high_carbon_outputs);
      return 1;
    }
    //END OF HIGH CARBON ARRAY


    window.addEventListener('load', (event) => {
      is_it_high_carbon();
      var x;
      for (x=0;x<high_carbon_array.length;x++){
        console.log(x);
        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = high_carbon_array[x];
        cell2.innerHTML = high_carbon_outputs[x];
      }
    });

    function subtotalmaker(){
      // Simulate a code delay
      setTimeout( function(){
        var i;
        var subtotal=0;
        for(i=0;i<local_high_carbon_outputs.length;i++){
          subtotal=subtotal+local_high_carbon_outputs[i];
          console.log(subtotal);
        }
        document.getElementById('subnum').innerHTML = subtotal.toFixed(1);
      }, 1500);
    }
    subtotalmaker();


>>>>>>> 30f7817640646fa7fb6abb0392e1f851f2402102
