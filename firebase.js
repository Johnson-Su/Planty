
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

  var high_carbon_array =[["beef",27],["butter",3.3],["canned tuna",6.1],["cheese",13.5],["chicken",6.9],["duck",5.4],["egg",4.8],["goat",64],["honey",1],["lamb",39.2],["mayonnaise",1.95],["milk",3.2],["olive oil",4.5],["pork",12.1],["salmon",11.9],["shrimp",12],["turkey",10.9],["yogurt",2.2]];
  var local_high_carbon_array =[];
  var carbon_array=[];

  function is_it_high_carbon(){ //returns 1 if it is there
    local_high_carbon_array =[];
    //finds the info
    firebase.database().ref('Recipe/0').on('value', function(snapshot) {
      var loopnum = snapshot.val();
      //console.log(loopnum);
      var j;
      for(j=2;j<=loopnum+1;j++){
        firebase.database().ref('Recipe/'+j).on('value', function(snapshot) {
          var ingredient_name = snapshot.val();
          //console.log(hmmm);
          var i;
          for(i=0;i<18;i++){
            if(ingredient_name.indexOf(high_carbon_array[i][0])!=-1){
              if(local_high_carbon_array.includes(high_carbon_array[i][0])!=true){
                local_high_carbon_array.push(high_carbon_array[i]);
              }
            }
          }
          return 0;
        });
      }
    });
  console.log(local_high_carbon_array);
  return 1;
  }

  function addDelay(){
    setTimeout( function(){
      var x;
      for (x=0;x<local_high_carbon_array.length;x++){
        console.log(x);
        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = local_high_carbon_array[x][0];
        cell2.innerHTML = local_high_carbon_array[x][1];
        cell1.className = 'red';
        cell2.className = 'red';
      }
    }, 1500);
  }

  function subtotalmaker(){
    setTimeout( function(){
    var i;
    var subtotal=0;
    for(i=0;i<local_high_carbon_array.length;i++){
      subtotal=subtotal+local_high_carbon_array[i][1];
      console.log(subtotal);
    }
    document.getElementById('subnum').innerHTML = subtotal.toFixed(1);
  }, 1500);
  }

  subtotalmaker();

  var result = [];
    function matchArray(){
      setTimeout( function(){
        for (var i=0;i<=local_high_carbon_array.length;i++){
          console.log(local_high_carbon_array[i][0]);
          firebase.database().ref('Ingredients/'+local_high_carbon_array[i][0]).on('value', function(snapshot) {
            console.log(snapshot.val());
            var object = snapshot.val();
            var child = Object.keys(object).map(function(key) {
              return [String(key), object[key]];
            });
            result.unshift(child);
            console.log(result);
            });
        }
      }, 3000);
    }

    function showarray(){
      setTimeout( function(){
        console.log(result);
      }, 5000);
    }

    function showalt(){
      setTimeout( function(){
        var x;
        //go through alternatives to certain thing
        for(x=0;x<result[num].length;x++){
          var table = document.getElementById("myTable");
          var row = table.insertRow(num);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = results[num][x][0];
          cell2.innerHTML = results[num][x][1];
          cell1.className = 'green';
          cell2.className = 'green';
        }
      }, 5000);
    }

    // function showalt(num){
    //   var x;
    //   //go through alternatives to certain thing
    //   for(x=0;x<result[num].length;x++){
    //     var table = document.getElementById("myTable");
    //     var row = table.insertRow(0);
    //     var cell1 = row.insertCell(0);
    //     var cell2 = row.insertCell(1);
    //     cell1.innerHTML = results[num][x][0];
    //     cell2.innerHTML = results[num][x][1];
    //   }
    // }

    window.addEventListener('load', (event) => {
      is_it_high_carbon();
      addDelay();
      matchArray();
      showarray();
    });


>>>>>>> 30f7817640646fa7fb6abb0392e1f851f2402102
