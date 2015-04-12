//datasource.js : locates section.dyn and fills it with it datasource attribute
//every $refresh seconds
//requires jQuery 2 

//page
//<section class="dyn" datasource="/api/sensor" refresh="5000">
//  <p>sensor A01 : <span class="dyn" field="A01">21.7</span></p>
//</section>
//
//json api format :
//{"A01" : 21.7
//,"A02" : 19.6} //unused here

var datasource_js = function(){

    var DATA_TAG    = "section";
    var DYN         = ".dyn";
    var DATASOURCE = "datasource";
    var REFRESH = "refresh";
    var FIELD   = "field";
    var DYN_SECTION = DATA_TAG + DYN;

    function populate_fields(fields, data){
        for( var prop in fields ){
            if ( typeof data[prop] === 'object'){
                populate_fields(fields[prop], data[prop]);
            }
            else {
                $(fields[prop]).text(data[prop]);
            }
        }
    }

    //for each dynamic section
    $(DYN_SECTION).each(function(index, el){

        var datasource = $(el).attr(DATASOURCE);
        var refresh = parseInt($(el).attr(REFRESH));
        var fields={};
        var fields_root = fields;
        
        var fields_found = $(el).find(DYN);
        
        //for each dynamic field
        for (var j=0; j<fields_found.length; ++j){
            var f = fields_found[j];
            //parse field names as key structure in json
            var f_name = $(f).attr(FIELD).split('.');
            
            //create fields structure identical to expected json
            for (var i=0; i < f_name.length-1; ++i){
                fields[f_name[i]]=(fields[f_name[i]]||{});
                fields = fields[f_name[i]];
            }

            fields[f_name[f_name.length-1]] = f;
            fields = fields_root;
        }

        //set callback for current section
        window.setInterval(function(){

            function fill_fields(data) {
               data.each( index, value ) 
            }

            //ajax request
            $.ajax(datasource)
                .done(function(data) {
                    populate_fields(fields, data);
                });
            //print result in different fields
        }, refresh);
    });

}

datasource_js();
