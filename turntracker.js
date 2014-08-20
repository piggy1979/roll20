on("chat:message", function(msg) 
{
    if(msg.type == "api" && msg.content.indexOf("!clearInit") != -1)
    {
 
        var turnorder = [];
        Campaign().set("turnorder", JSON.stringify(turnorder));
    }
}
);

on("chat:message", function(msg) 
{
    if(msg.type == "api" && msg.content.indexOf("!startInit") != -1)
    {
 
        var turnorder;
        if(Campaign().get("turnorder") == "") turnorder = []; //NOTE: We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
        else turnorder = JSON.parse(Campaign().get("turnorder"));
        //log (turnorder);
        
        var turnOrderSorted = [];
        turnOrderSorted = sortJSON(turnorder,'pr', '321');
        
        //Add a new custom entry to the end of the turn order.
        turnOrderSorted.push( {   
            id : "-1",
            pr : "--",
            custom : "Round : 1"
        });
        
        var orderFinal = turnOrderSorted;
        state.currentTurnOrder = 0;
        Campaign().set("turnorder", JSON.stringify(orderFinal));
    }
}
);
state.currentTurnOrder = 0;
var theStatus = new Object;
theStatus = {
"red":"red",
 "blue":"blue",
 "green":"green",
 "brown":"brown",
 "purple":"purple",
 "pink":"pink",
 "yellow":"yellow",
 "dead":"dead",
 "poison":"skull",
 "sleep":"sleepy",
 "charm":"half-heart",
 "blue":"half-haze", 
 "hold":"interdiction",
 "slow":"snail",
 "smite":"lightning-helix", 
 "spanner":"spanner", 
 "bless":"chained-heart", 
 "fire":"chemical-bolt", 
 "disease":"death-zone", 
 "potion":"drink-me",
 "broken":"edge-crack",
 "invisible":"ninja-mask", 
 "stop":"stopwatch", 
 "grappled":"fishing-net", 
 "confused":"overdrive", 
 "str":"strong", 
 "con":"fist", 
 "dex":"padlock", 
 "wis":"three-leaves", 
 "haste":"fluffy-wing", 
 "knockedout":"pummeled", 
 "run":"tread", 
 "prone":"arrowed", 
 "chr":"aura", 
 "flat":"back-pain", 
 "int":"black-flag"
};

// set status events

on('chat:message', function (msg) {
    if (!(msg.selected && msg.selected.length > 0)) return;
    var token = getObj('graphic', msg.selected[0]._id);
    if (msg.type == 'api' && msg.content.indexOf('!setStatus') !== -1) { 
        var values = msg.content.split(" ");
        if( (theStatus[values[1]]) && (values[2]) < 10 ){
        token.set("status_"+theStatus[values[1]], values[2]);
        }else{
            //error
            sendChat(msg.who, "/direct <b>Error Creating Effect</b><br>Make sure you set up your input as <b>'effect X'</b> X being a number. <br> These are the allowed effects<br>"+Object.keys(theStatus));
        }
    }  
    
});

function checkEffects(){
    
var results = filterObjs(function(obj) {    
  if(obj.get("statusmarkers") && (obj.get("_pageid") == Campaign().get("playerpageid") ) ) return true;    
  else return false;
});

_.each(results, function(obj) { 
    var markers = obj.get("statusmarkers");
    if(!markers) return;
    mark = markers.split(",");

    _.each(mark, function(obj, x){
        count = obj.indexOf("@");
        if(count == -1) 
        {
            mark[x] = obj; 
            return;
        }
        if(count != -1){
            var n = obj.charAt(count+1);
            if(n=="n"||n=="N"||n=="-"||n=="0"){
                // returned NaN or negative so its over remove effect.
                mark[x] = "";
                return;
            }
            //if(n<1) return;
            var p = n-1;
            var newstring = obj.substring(0,count+1) + p;
            mark[x] = newstring;
            return;
        }  
    });
    mark = cleanArray(mark);
    var newmarkers = mark.join();
    log(newmarkers);
    obj.set("statusmarkers", newmarkers);
});

}

on("change:campaign:turnorder", function(obj, prev) {
    if (!Campaign().get("turnorder")) return;
    var turn_order = JSON.parse(Campaign().get("turnorder"));
    
    if (!turn_order.length) return;
    if (!turn_order[0].id == -1) return;
    if (typeof turn_order[0].custom == "string") {
        if ( (turn_order[0].custom.substring(0, 5) == "Round") || (turn_order[0].custom.substring(0, 4) == "____") ){
            var l = turn_order[0].custom.length;
            var p = turn_order[0].custom.indexOf(":");
           
            var name = turn_order[0].custom.substring(0,p);
            var round = turn_order[0].custom.substring(p+1,l); 
            round = (parseInt(round) + 1);
            turn_order[0].custom = name + ": " + round;
            Campaign().set({turnorder: JSON.stringify(turn_order)});
            state.currentTurnOrder = state.currentTurnOrder + 1;
            checkEffects();
            return;
        }
    }
});

function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}

function sortJSON(data, key, way) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}
