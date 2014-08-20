// add has sight to all players on ids that have lightning enabled.

on('chat:message', function (msg) {

    if (!(msg.selected && msg.selected.length > 0)) return;

    var token = getObj('graphic', msg.selected[0]._id);

    if (token.get('subtype') != 'token') return;
   
    if (msg.type == 'api' && msg.content.indexOf('!CreateSight') !== -1) { 
        createLight(msg.content, token, true, false);
    }  
    if (msg.type == 'api' && msg.content.indexOf('!CreateLight') !== -1) { 
        createLight(msg.content, token, false, true);
    }  
});
function createLight(p, token, sight, visible){
    var values = p.split(" ");
  if(sight === true){
    token.set("light_hassight", true);  
  }
  if(visible === true){
      token.set("light_otherplayers", true);  
  }
  if( is_int(values[1]))
    {
        token.set("light_radius", values[1]);
    }
    if(is_int(values[2]))
    {
        token.set("light_dimradius", values[2]);
    }else if(values[2]=="y"||values[2]=="Y"){
        token.set("light_otherplayers", true);
    }
    if(values[3]=="y"||values[3]=="Y"){
        token.set("light_otherplayers", true); 
    }
}

function is_int(value){ 
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  } else { 
      return false;
  } 
}
