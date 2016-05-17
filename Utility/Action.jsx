
var Action = (function () {

    var exports = {};


    //******************************************************************************
    //アクションファイルの追加
    //AddActionFile("C:\\TEST.atn" );
    function AddActionFile(filepath) {
        try {
            var idOpn = charIDToTypeID("Opn ");
            var desc1 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            desc1.putPath(idnull, new File(filepath));
            executeAction(idOpn, desc1, DialogModes.NO);
            return true;

        } catch (e) {
            return false;
        }
    }

    //******************************************************************************
    //アクションセットの削除
    function DeleteActionSet(ActionSetName) {
        try {
            var idDlt = charIDToTypeID("Dlt ");
            var desc1 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref1 = new ActionReference();
            var idASet = charIDToTypeID("ASet");
            ref1.putName(idASet, ActionSetName);
            desc1.putReference(idnull, ref1);
            executeAction(idDlt, desc1, DialogModes.NO);
            return true;

        } catch (e) {
            return false;
        }
    }

    //******************************************************************************
    //アクションファイルの削除
    function DeleteAction(ActionSetName, ActionName) {

        try {
            var idDlt = charIDToTypeID("Dlt ");
            var desc1 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref1 = new ActionReference();
            var idActn = charIDToTypeID("Actn");
            ref1.putName(idActn, ActionName);
            var idASet = charIDToTypeID("ASet");
            ref1.putName(idASet, ActionSetName);
            desc1.putReference(idnull, ref1);
            executeAction(idDlt, desc1, DialogModes.NO);
            return true;

        } catch (e) {
            return false;
        }
    }


    //******************************************************************************
    //アクションの有無
    //return bool
    function ExistsAction(ActionSetName, ActionName) {

        var AS = getActionSets();
        for (var i = 0; i < AS.length; i++) {
            if (ActionSetName == AS[i].name) {
                for (var j = 0; j < AS[i].actions.length; j++) {
                    if (ActionName == AS[i].actions[j])
                        return true;
                }
            }
        }
        return false;
    }


    //******************************************************************************
    /*
    var AS = getActionSets() ;
    for(var i=0 ; i < AS.length; i++)
    {

        $.writeln(AS[i].index + " : " +AS[i].name +"-------------" ) ;
        
        var targetActions = AS[i].actions ;  
        
        for(var j=0 ; j < targetActions.length; j++)
        {
            $.writeln( (j+1) + " / " + AS[i].count  + " : " + targetActions[j] ) ;             
        }   
    }
    */
    //アクションファイルの一覧取得
    //http://d.hatena.ne.jp/kamiseto/20100618/1276884205
    function getActionList() {

        cTID = function (s) { return app.charIDToTypeID(s); };

        var i = 1;
        var sets = [];

        while (true) {
            var ref = new ActionReference();
            ref.putIndex(cTID("ASet"), i);
            var desc;
            var lvl = $.level;
            $.level = 0;

            try {
                desc = executeActionGet(ref);
            } catch (e) {
                break; /////////////////////////////////////////////////
            } finally {
                $.level = lvl;
            }

            if (desc.hasKey(cTID("Nm  "))) {
                var set = {};
                set.index = i;
                set.name = desc.getString(cTID("Nm  "));
                set.toString = function () { return this.name; };
                set.count = desc.getInteger(cTID("NmbC"));
                set.actions = [];
                for (var j = 1; j <= set.count; j++) {
                    var ref = new ActionReference();
                    ref.putIndex(cTID('Actn'), j);
                    ref.putIndex(cTID('ASet'), set.index);
                    var adesc = executeActionGet(ref);
                    var actName = adesc.getString(cTID('Nm  '));
                    set.actions.push(actName);

                }
                sets.push(set);
            }
            i++;
        }
        return sets;

    };



    return exports;

})();    