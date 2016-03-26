
(function(){
     

    var domain = "weather.livedoor.com";
    var port = 80;    
    var url = "http://" + domain + "/forecast/webservice/json/v1?city="
    var city = "270000";//東京:130010  大阪:270000
    var aday = 0 ; //0:今日 1:明日 2:明後日 
    
    var cn = new Socket(); 

    if(cn.open (domain + ":" + port , "UTF-8") ){ 
        
        cn.write ("GET " + url + city + " HTTP/1.0\n\n");      
        
        var res = cn.read(999999);      
        var body = GetBody(res);
        var Weather = eval("(" + body + ")");
        var forecast = Weather.forecasts[aday];
        //$.writeln(Weather.title);
        //$.writeln(forecast.dateLabel);
        //$.writeln(forecast.telop);
        //$.writeln(forecast.image.url);
        
        
        if(cn.open (domain + ":" + port , "binary") ){
            
            cn.write ("GET " +  forecast.image.url + " HTTP/1.0\n\n");      
         
            var d = GetBody(cn.read(999999));
            var f = CreateFile(new File(forecast.image.url).name , d); 
            if(f!=null){
                app.open(f);
                activeDocument.changeMode(ChangeMode.RGB);
                activeDocument.activeLayer.name = forecast.telop;
                activeDocument.artLayers.add().name = forecast.dateLabel;
                activeDocument.artLayers.add().name = Weather.title;
                
                
            }
        }

    }

    cn.close();
})();



function CreateFile(FileName , data){
    
    var f = new File( Folder.desktop + "/" + FileName);
    f.encoding  = "binary";
    if(f.open("w")){
        f.write(data);
        f.close();  
        return f;   
    }else{
        return null;
    }
 
}


function GetBody(text){

    var Lines = text.split("\n");

    for(var i = 0 ; i < Lines.length ; i++){
        
        if(Lines[i].length <= 1){
            Lines.splice(0, i+1);
            break;
        }
    }

    return Lines.join("\n");
}