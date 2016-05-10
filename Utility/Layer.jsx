var Layer = (function() {
    
    var exports = {};

    /*
       　レイヤーカラーの変更
        "レッド","オレンジ","イエロー","グリーン","ブルー","バイオレット","グレイ",""
    */
    exports.ChangeLayerColor = function(ColorName) { 
        
        var ResultColor = "None";
        if( ColorName == "レッド"){
            ResultColor = "Rd  ";
        }else if( ColorName == "オレンジ"){
            ResultColor = "Orng";
        }else if( ColorName == "イエロー"){
            ResultColor = "Ylw ";
        }else if( ColorName == "グリーン"){    
            ResultColor = "Grn ";
        }else if( ColorName == "ブルー"){ 
            ResultColor = "Bl  ";
        }else if( ColorName == "バイオレット"){ 
            ResultColor = "Vlt ";
        }else if( ColorName == "グレイ"){
            ResultColor = "Gry ";
        }
        
        try{
            // =======================================================
            var idsetd = charIDToTypeID( "setd" );
                var desc3 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                    var ref2 = new ActionReference();
                    var idLyr = charIDToTypeID( "Lyr " );
                    var idOrdn = charIDToTypeID( "Ordn" );
                    var idTrgt = charIDToTypeID( "Trgt" );
                    ref2.putEnumerated( idLyr, idOrdn, idTrgt );
                desc3.putReference( idnull, ref2 );
                var idT = charIDToTypeID( "T   " );
                    var desc4 = new ActionDescriptor();
                    var idClr = charIDToTypeID( "Clr " );
                    var idClr = charIDToTypeID( "Clr " );
                    var idRd = charIDToTypeID( ResultColor );
                    desc4.putEnumerated( idClr, idClr, idRd );
                var idLyr = charIDToTypeID( "Lyr " );
                desc3.putObject( idT, idLyr, desc4 );
            executeAction( idsetd, desc3, DialogModes.NO );
        }catch(e){}
    }

    /*
        数値を指定して選択範囲の作成
        SetSelection(Top,Left,Bottom,Right,isAdd)
        isAdd:選択範囲の新規作成か追加か
    */
    exports.CreateSelection = function(Top,Left,Bottom,Right,isAdd) { 
     
        var idsetd = charIDToTypeID( (isAdd)?"AddT":"setd" );
            var desc3 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref1 = new ActionReference();
                var idChnl = charIDToTypeID( "Chnl" );
                var idfsel = charIDToTypeID( "fsel" );
                ref1.putProperty( idChnl, idfsel );
            desc3.putReference( idnull, ref1 );
            var idT = charIDToTypeID( "T   " );
                var desc4 = new ActionDescriptor();
                var idTop = charIDToTypeID( "Top " );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc4.putUnitDouble( idTop, idPxl, Top );
                var idLeft = charIDToTypeID( "Left" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc4.putUnitDouble( idLeft, idPxl, Left );
                var idBtom = charIDToTypeID( "Btom" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc4.putUnitDouble( idBtom, idPxl, Bottom );
                var idRght = charIDToTypeID( "Rght" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc4.putUnitDouble( idRght, idPxl, Right );
            var idRctn = charIDToTypeID( "Rctn" );
            desc3.putObject( idT, idRctn, desc4 );
        executeAction( idsetd, desc3, DialogModes.NO );
 
    }
    
    /*
        指定した色で塗りつぶす
        FillColor(myColor)
    */
    exports.FillColor = function(myColor) { 
        
        var OldColor = foregroundColor;  
        if(myColor) foregroundColor = myColor;    
              
        var idFl = charIDToTypeID( "Fl  " );
            var desc5 = new ActionDescriptor();
            var idUsng = charIDToTypeID( "Usng" );
            var idFlCn = charIDToTypeID( "FlCn" );
            var idFrgC = charIDToTypeID( "FrgC" );
            desc5.putEnumerated( idUsng, idFlCn, idFrgC );
            var idOpct = charIDToTypeID( "Opct" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc5.putUnitDouble( idOpct, idPrc, 100 );
            var idMd = charIDToTypeID( "Md  " );
            var idBlnM = charIDToTypeID( "BlnM" );
            var idNrml = charIDToTypeID( "Nrml" );
            desc5.putEnumerated( idMd, idBlnM, idNrml );
        executeAction( idFl, desc5, DialogModes.NO );
        
        foregroundColor = OldColor;
    }
    
    
    //******************************************************************************
    //ドキュメント間のレイヤーの移動
    //アクティブなドキュメントのアクティブなレイヤー、レイヤーセットを指定のドキュメントに移動
    //配置場所は左上から同一
    exports.MoveLayerDoctoDoc = function(ToDocName){
        try{
            var idDplc = charIDToTypeID( "Dplc" );
                var desc17 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                    var ref9 = new ActionReference();
                    var idLyr = charIDToTypeID( "Lyr " );
                    var idOrdn = charIDToTypeID( "Ordn" );
                    var idTrgt = charIDToTypeID( "Trgt" );
                    ref9.putEnumerated( idLyr, idOrdn, idTrgt );
                desc17.putReference( idnull, ref9 );
                var idT = charIDToTypeID( "T   " );
                    var ref10 = new ActionReference();
                    var idDcmn = charIDToTypeID( "Dcmn" );
                    ref10.putName( idDcmn, ToDocName );
                desc17.putReference( idT, ref10 );
                var idNm = charIDToTypeID( "Nm  " );
                desc17.putString( idNm, activeDocument.activeLayer.name  );
                var idVrsn = charIDToTypeID( "Vrsn" );
                desc17.putInteger( idVrsn, 5 );
            executeAction( idDplc, desc17, DialogModes.NO );
            return true;
        }catch(e){
            return false;            
        }
    }
    
    
    //******************************************************************************
    //埋め込み配置
    exports.Place_Embedded = function(Path){
        try{
            var idPlc = charIDToTypeID( "Plc " );
                var desc3 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                desc3.putPath( idnull, new File( Path ) );
                var idFTcs = charIDToTypeID( "FTcs" );
                var idQCSt = charIDToTypeID( "QCSt" );
                var idQcsa = charIDToTypeID( "Qcsa" );
                desc3.putEnumerated( idFTcs, idQCSt, idQcsa );
                var idOfst = charIDToTypeID( "Ofst" );
                    var desc4 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID( "Hrzn" );
                    var idRlt = charIDToTypeID( "#Rlt" );
                    desc4.putUnitDouble( idHrzn, idRlt, 0.000000 );
                    var idVrtc = charIDToTypeID( "Vrtc" );
                    var idRlt = charIDToTypeID( "#Rlt" );
                    desc4.putUnitDouble( idVrtc, idRlt, 0.000000 );
                var idOfst = charIDToTypeID( "Ofst" );
                desc3.putObject( idOfst, idOfst, desc4 );
            executeAction( idPlc, desc3, DialogModes.NO );
            return true;
        }catch(e){
            return false; 
        }
    }
    //******************************************************************************
    //リンク配置
    exports.Place_Linked = function(Path){
        try{
            var idPlc = charIDToTypeID( "Plc " );
                var desc3 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                desc3.putPath( idnull, new File( Path ) );
                var idLnkd = charIDToTypeID( "Lnkd" );
                desc3.putBoolean( idLnkd, true );
                var idFTcs = charIDToTypeID( "FTcs" );
                var idQCSt = charIDToTypeID( "QCSt" );
                var idQcsa = charIDToTypeID( "Qcsa" );
                desc3.putEnumerated( idFTcs, idQCSt, idQcsa );
                var idOfst = charIDToTypeID( "Ofst" );
                    var desc4 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID( "Hrzn" );
                    var idPxl = charIDToTypeID( "#Pxl" );
                    desc4.putUnitDouble( idHrzn, idPxl, 0.000000 );
                    var idVrtc = charIDToTypeID( "Vrtc" );
                    var idPxl = charIDToTypeID( "#Pxl" );
                    desc4.putUnitDouble( idVrtc, idPxl, 0.000000 );
                var idOfst = charIDToTypeID( "Ofst" );
                desc3.putObject( idOfst, idOfst, desc4 );
            executeAction( idPlc, desc3, DialogModes.NO );
            return true;
        }catch(e){
            return false; 
        }
    }
    
    //******************************************************************************
    exports.SearchLayer = function(actDoc, TargetLayerName){
        
        var Result = null;
        (function Finder(Doc){
    
            for(var i = 0 , LayLen = Doc.layers.length ; i < LayLen ; i++){
                
                if(Result != null)
                    return;
                
                var CurrentLayer = Doc.layers[i];
                
                if( CurrentLayer.typename == "ArtLayer" && CurrentLayer.name == TargetLayerName){
                    Result = CurrentLayer;
                }else if(Doc.layers[i].typename == "LayerSet" ){		
                    Finder(CurrentLayer);		
                }	
            }
        })(actDoc);    
    
        return Result;
    }
    
    
    return exports;
 
})();    