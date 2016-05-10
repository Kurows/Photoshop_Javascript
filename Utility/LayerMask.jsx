var LayerMask = (function() {
    
    var exports = {};


    //******************************************************************************
    //マスクがあるかどうか確認用　
    //注意：マスクが選択状態になる
    exports.LayerMaskExists = function()
    {
        
        var EventSC = charIDToTypeID( "slct" );	
        var Desc = new ActionDescriptor();///
        
            var ID_Null = charIDToTypeID( "null" );
            
            var AR = new ActionReference();
                 var ARChnl01 = charIDToTypeID( "Chnl" );
                         var ARChnl02 = charIDToTypeID( "Chnl" );
                 var ARMsk = charIDToTypeID(  "Msk " );
                 AR.putEnumerated( ARChnl01, ARChnl02, ARMsk );
 
            Desc.putReference( ID_Null, AR );///
        
        try{	
            executeAction( EventSC, Desc, DialogModes.NO );
        }catch(e){
            return false ;
        }
            
        return true;
        
    }

    //マスクのリンク******************************************************************************
    exports.LinkLayerMask = function(Bool)
    {
        var id3 = charIDToTypeID( "setd" );
            var desc2 = new ActionDescriptor();
            var id4 = charIDToTypeID( "null" );
                var ref1 = new ActionReference();
                var id5 = charIDToTypeID( "Lyr " );
                var id6 = charIDToTypeID( "Ordn" );
                var id7 = charIDToTypeID( "Trgt" );
                ref1.putEnumerated( id5, id6, id7 );
            desc2.putReference( id4, ref1 );
            var id8 = charIDToTypeID( "T   " );
                var desc3 = new ActionDescriptor();
                var id9 = charIDToTypeID( "Usrs" );
                
                desc3.putBoolean( id9, Bool );
                
            var id10 = charIDToTypeID( "Lyr " );
            desc2.putObject( id8, id10, desc3 );
        executeAction( id3, desc2, DialogModes.NO );
    }
    
    //******************************************************************************
    //選択 RGB,MASKチャンネル  "RGB" or "MASK"
 
    exports.SelectLayerChannel = function( Chnl )
    {
        var myChnl = ( Chnl == "MASK")? "Msk ": "RGB "
        
        var EventSC = charIDToTypeID( "slct" );	
        var Desc = new ActionDescriptor();///     
            var ID_Null = charIDToTypeID( "null" );
            var AR = new ActionReference();
                 var ARChnl01 = charIDToTypeID( "Chnl" );
                    var ARChnl02 = charIDToTypeID( "Chnl" );
                         
                    var ARMsk = charIDToTypeID(myChnl);
                 
                 AR.putEnumerated( ARChnl01, ARChnl02, ARMsk );
 
            Desc.putReference( ID_Null, AR );///
        executeAction( EventSC, Desc, DialogModes.NO );
    }
    
    
    //******************************************************************************
    //ベクターマスクのリンク
    exports.LinkVectorMask  = function(Bool){
 
    var id37 = charIDToTypeID( "setd" );
        var desc6 = new ActionDescriptor();
        var id38 = charIDToTypeID( "null" );
            var ref2 = new ActionReference();
            var id39 = charIDToTypeID( "Lyr " );
            var id40 = charIDToTypeID( "Ordn" );
            var id41 = charIDToTypeID( "Trgt" );
            ref2.putEnumerated( id39, id40, id41 );
        desc6.putReference( id38, ref2 );
        var id42 = charIDToTypeID( "T   " );
            var desc7 = new ActionDescriptor();
            var id43 = stringIDToTypeID( "vectorMaskLinked" );
            
            desc7.putBoolean( id43, Bool );
            
        var id44 = charIDToTypeID( "Lyr " );
        desc6.putObject( id42, id44, desc7 );
        
        try{
            executeAction( id37, desc6, DialogModes.NO );
        }catch(e){
            return false ;
        }
 
        return true ;
        
    }
    
    //******************************************************************************
    exports.VectorMaskExists = function()
    {
        //ベクトルマスクがあるかどうか確認用　
        //Return  bool
        var id7 = charIDToTypeID( "slct" );
        var desc3 = new ActionDescriptor();
        var id8 = charIDToTypeID( "null" );
            var ref2 = new ActionReference();
            var id9 = charIDToTypeID( "Path" );
            var id10 = charIDToTypeID( "Path" );
            var id11 = stringIDToTypeID( "vectorMask" );
            ref2.putEnumerated( id9, id10, id11 );
            var id12 = charIDToTypeID( "Lyr " );
            var id13 = charIDToTypeID( "Ordn" );
            var id14 = charIDToTypeID( "Trgt" );
            ref2.putEnumerated( id12, id13, id14 );
        desc3.putReference( id8, ref2 );
        
        try{	
            executeAction( id7, desc3, DialogModes.NO );
        }catch(e){
            return false ;
        }
        
        return true;
        
    }
    
    
    //******************************************************************************
    //アクティブレイヤーのマスクの有効無効
    exports.EnabledLayerMask = function(Bool)
    {
        try{
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
                    var idUsrM = charIDToTypeID( "UsrM" );
                    desc4.putBoolean( idUsrM, Bool );
                var idLyr = charIDToTypeID( "Lyr " );
                desc3.putObject( idT, idLyr, desc4 );
            executeAction( idsetd, desc3, DialogModes.NO );
            return true ;
        }catch(e){
            return false ;
        }
    
    }
    
    
    //******************************************************************************
    //FromLayerNameからToLayerNameへマスクをコピーする
    //コピー先にレイヤーマスクがない状態で
    //TODO:マスク置き換え
    exports.CopyLayerMask = function(FromLayerName , ToLayerName)
    {
        
        var idMk = charIDToTypeID( "Mk  " );
            var desc2 = new ActionDescriptor();
            var idNw = charIDToTypeID( "Nw  " );
            var idChnl = charIDToTypeID( "Chnl" );
            desc2.putClass( idNw, idChnl );
            var idAt = charIDToTypeID( "At  " );
                var ref1 = new ActionReference();
                var idChnl = charIDToTypeID( "Chnl" );
                var idChnl = charIDToTypeID( "Chnl" );
                var idMsk = charIDToTypeID( "Msk " );
                ref1.putEnumerated( idChnl, idChnl, idMsk );
                var idLyr = charIDToTypeID( "Lyr " );
            
                ref1.putName( idLyr, ToLayerName );
                
            desc2.putReference( idAt, ref1 );
            var idUsng = charIDToTypeID( "Usng" );
                var ref2 = new ActionReference();
                var idChnl = charIDToTypeID( "Chnl" );
                var idChnl = charIDToTypeID( "Chnl" );
                var idMsk = charIDToTypeID( "Msk " );
                ref2.putEnumerated( idChnl, idChnl, idMsk );
                var idLyr = charIDToTypeID( "Lyr " );
                
                ref2.putName( idLyr, FromLayerName );
                
            desc2.putReference( idUsng, ref2 );
            var idDplc = charIDToTypeID( "Dplc" );
            desc2.putBoolean( idDplc, true );
                
        try{
           executeAction( idMk, desc2, DialogModes.NO );
           return true ;
        }catch(e){
            return false ;
        }
    
    }
    
    
    //******************************************************************************
    //レイヤマスクから選択範囲 
    exports.CreateSelectionFromLayerMask = function()   
    {
        try{
            //選択MASKチャンネル
            var EventSC = charIDToTypeID( "slct" );	
            var DescM = new ActionDescriptor();///
            
                var M_ID_Null = charIDToTypeID( "null" );
                
                var ARM = new ActionReference();
                     var ARMChnl01 = charIDToTypeID( "Chnl" );
                             var ARMChnl02 = charIDToTypeID( "Chnl" );
                     var ARMMsk = charIDToTypeID( "Msk " );
                     ARM.putEnumerated(ARMChnl01, ARMChnl02, ARMMsk );
 
                DescM.putReference( M_ID_Null, ARM );///
            
            
            executeAction( EventSC, DescM, DialogModes.NO );
            
            
            var EventLMS = charIDToTypeID( "setd" );
 
            var Desc = new ActionDescriptor();///
                
                var ID_Null = charIDToTypeID( "null" );
                
                var AR01 = new ActionReference();
                    var AR01Chnl = charIDToTypeID( "Chnl" );
                    var AR01Fsel = charIDToTypeID( "fsel" );
                    AR01.putProperty( AR01Chnl, AR01Fsel );
                    
                Desc.putReference( ID_Null, AR01 );
            
            
                var ID_T = charIDToTypeID( "T   " );
            
                var AR02 = new ActionReference();
                    var AR02Chnl = charIDToTypeID( "Chnl" );
                    var AR02Ordn = charIDToTypeID( "Ordn" );
                    var AR02Trgt = charIDToTypeID( "Trgt" );
                    AR02.putEnumerated( AR02Chnl, AR02Ordn, AR02Trgt );
                    
                Desc.putReference( ID_T, AR02 );
            
            executeAction( EventLMS, Desc, DialogModes.NO );
            
            return true;
        
        }catch(e){
            return false;
        }
    }
    
    
    //******************************************************************************
    //選択範囲がある状態で処理
    //アクティブなレイヤーのレイヤーマスク作成
    //アクティブなレイヤーのレイヤーマスクリンクを解除
    exports.CreateLayerMaskFromSelection = function(){
        try{
            var EventLMC = charIDToTypeID( "Mk  " );
            var Desc = new ActionDescriptor();
                var DescNw = charIDToTypeID( "Nw  " );
                var DescChnl = charIDToTypeID( "Chnl" );
                Desc.putClass( DescNw, DescChnl );
                var ID_AT = charIDToTypeID( "At  " );
                var AR = new ActionReference();
                    var ARChnl01 = charIDToTypeID( "Chnl" );
                    var ARChnl02 = charIDToTypeID( "Chnl" );
                    var ARMsk = charIDToTypeID( "Msk " );
                    AR.putEnumerated( ARChnl01, ARChnl02, ARMsk );
                Desc.putReference( ID_AT, AR );
                var DescUsng = charIDToTypeID( "Usng" );
                var DescUsrM = charIDToTypeID( "UsrM" );
                var DescRvlS = charIDToTypeID( "RvlS" );
            Desc.putEnumerated( DescUsng, DescUsrM, DescRvlS );
            executeAction( EventLMC, Desc, DialogModes.NO );
            return true;
        }catch(e){
            return false;
        }
    };    
    


    //******************************************************************************
    //レイヤーマスクのリンクを解除  
    exports.UnLinkLayerMask = function (){
        try{
            var idsetd = charIDToTypeID( "setd" );
                var desc5 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                    var ref3 = new ActionReference();
                    var idLyr = charIDToTypeID( "Lyr " );
                    var idOrdn = charIDToTypeID( "Ordn" );
                    var idTrgt = charIDToTypeID( "Trgt" );
                    ref3.putEnumerated( idLyr, idOrdn, idTrgt );
                desc5.putReference( idnull, ref3 );
                var idT = charIDToTypeID( "T   " );
                   var desc6 = new ActionDescriptor();
                   var idUsrs = charIDToTypeID( "Usrs" );
                   desc6.putBoolean( idUsrs, false );
                var idLyr = charIDToTypeID( "Lyr " );
                desc5.putObject( idT, idLyr, desc6 );
            executeAction( idsetd, desc5, DialogModes.NO );
            return true;
        } catch(e){
            return false;
        }
    }
    
    
    //******************************************************************************
    //アクティブなレイヤーの一つ下のレイヤーをクリッピングマスクにする
    exports.ClippingMaskActiveLayer = function(){
        var id3 = charIDToTypeID( "GrpL" );
            var desc2 = new ActionDescriptor();
            var id4 = charIDToTypeID( "null" );
                var ref1 = new ActionReference();
                var id5 = charIDToTypeID( "Lyr " );
                var id6 = charIDToTypeID( "Ordn" );
                var id7 = charIDToTypeID( "Trgt" );
                ref1.putEnumerated( id5, id6, id7 );
            desc2.putReference( id4, ref1 );
        executeAction( id3, desc2, DialogModes.NO );
    }
    
    
    
    
    return exports;
 
})();    