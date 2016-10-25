
// header
// ---------------------------------------------------------------------

function header
(
    index_type,
    index_name,
    index_param_1,
    index_param_2
)
{
    var obj = {};
    obj.index_type    = index_type;
    obj.index_name    = index_name;
    obj.index_param_1 = index_param_1;
    obj.index_param_2 = index_param_2;
    return obj;
}

function parse_header( line ){
    var ls = line.split( "," );
    var index_type    = null;
    var index_name    = null;
    var index_param_1 = null;
    var index_param_2 = null;
    for( var i = 0; i < ls.length; ++i ){
        switch( ls[ i ] ){
            case "type":    index_type = i;    break;
            case "name":    index_name = i;    break;
            case "param_1": index_param_1 = i; break;
            case "param_2": index_param_2 = i; break;
        }
    }
    return header
    (
        index_type,
        index_name,
        index_param_1,
        index_param_2
    );
}

// define
// ---------------------------------------------------------------------

function define_out( sw ){
    sw.WriteText( "define ",    adWriteChar );
    sw.WriteText( this.type,    adWriteChar );
    sw.WriteText( " ",          adWriteChar );
    sw.WriteText( this.name,    adWriteChar );
    sw.WriteText( " ",          adWriteChar );
    sw.WriteText( this.param_1, adWriteChar );

    if( this.param_2 ){
        sw.WriteText( " ",          adWriteChar );
        sw.WriteText( this.param_2, adWriteChar );
    }

    sw.WriteText( "", adWriteLine );
}

function define
(
    type,
    name,
    param_1,
    param_2
)
{
    var obj = {};
    obj.type    = time;
    obj.name    = name;
    obj.param_1 = param_1;
    obj.param_2 = param_2;
    return obj;
}

function parse_define( header, line ){
    var ls = line.split( "," );

    var type    =                       ls[ header.index_type ];
    var name    = add_double_quatation( ls[ header.index_name ] );

    switch( type ){
        case "alertsound":
        var param_1 = add_double_quatation( ls[ header.index_param_1 ] );
        break;
        case "speaker":
        var param_1 = ls[ header.index_param_1 ];
        var param_2 = ls[ header.index_param_2 ];
        break;
    }

    return define
    (
        type,
        name,
        param_1,
        param_2
    );
}

// ---------------------------------------------------------------------

parse( parse_header, parse_define );
