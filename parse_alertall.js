
// constant
// =====================================================================

// StreamTypeEnum
// http://msdn.microsoft.com/ja-jp/library/cc389884.aspx
// ---------------------------------------------------------------------

var adTypeBinary = 1;
var adTypeText   = 2;

// StreamReadEnum
// http://msdn.microsoft.com/ja-jp/library/cc389881.aspx
// ---------------------------------------------------------------------

var adReadLine = -2;

// StreamWriteEnum
// http://msdn.microsoft.com/ja-jp/library/cc389886.aspx
// ---------------------------------------------------------------------

var adWriteChar = 0;
var adWriteLine = 1;

// SaveOptionsEnum 
// http://msdn.microsoft.com/ja-jp/library/cc389870.aspx
// ---------------------------------------------------------------------

var adSaveCreateOverWrite = 2;

// ConnectModeEnum
// https://msdn.microsoft.com/ja-jp/library/cc389773.aspx
// ---------------------------------------------------------------------

var adModeWrite     = 2;
var adModeReadWrite = 3;

// function
// =====================================================================

function add_double_quatation( s ){
    if( s.charAt( 0 ) != '"' ){
        s = '"' + s;
    }
    if( s.charAt( s.length - 1 ) != '"' ){
        s = s + '"';
    }
    return s;
}

// header
// ---------------------------------------------------------------------

function header
(
    index_name,
    index_before,
    index_type,
    index_param_1,
    index_param_2
)
{
    var obj = {};
    obj.index_name    = index_name;
    obj.index_before  = index_before;
    obj.index_type    = index_type;
    obj.index_param_1 = index_param_1;
    obj.index_param_2 = index_param_2;
    return obj;
}

function parse_header( line ){
    var ls = line.split( "," );
    var index_name    = null;
    var index_before  = null;
    var index_type    = null;
    var index_param_1 = null;
    var index_param_2 = null;
    for( var i = 0; i < ls.length; ++i ){
        switch( ls[ i ] ){
            case "name":
            index_name = i;
            break;
            case "before":
            index_before = i;
            break;
            case "type":
            index_type = i;
            break;
            case "param_1":
            index_param_1 = i;
            break;
            case "param_2":
            index_param_2 = i;
            break;
        }
    }
    return header
    (
        index_name,
        index_before,
        index_type,
        index_param_1,
        index_param_2
    );
}

// alertall
// ---------------------------------------------------------------------

function alertall_out( sw ){
    sw.WriteText( "alertall ", adWriteChar );
    sw.WriteText( this.name,   adWriteChar );
    sw.WriteText( " before ",  adWriteChar );
    sw.WriteText( this.before, adWriteChar );
    sw.WriteText( " ",  adWriteChar );
    sw.WriteText( this.type, adWriteChar );
    sw.WriteText( " ",  adWriteChar );
    sw.WriteText( this.param_1, adWriteChar );

    if( this.param_2 ){
        sw.WriteText( " ",          adWriteChar );
        sw.WriteText( this.param_2, adWriteChar );
    }

    sw.WriteText( "", adWriteLine );
}

function alertall
(
    name,
    before,
    type,
    param_1,
    param_2
)
{
    var obj = {};
    obj.name     = name;
    obj.before   = before;
    obj.type     = type;
    obj.param_1  = param_1;
    obj.param_2  = param_2;
    obj.out      = alertall_out;
    return obj;
}

function parse_alertall( header, line ){
    var ls = line.split( "," );

    var name    = add_double_quatation( ls[ header.index_name    ] );
    var before  =                       ls[ header.index_before  ];
    var type    =                       ls[ header.index_type    ];
    var param_1 = add_double_quatation( ls[ header.index_param_1 ] );
    var param_2 = null;

    if( header.index_param_2 ){
        param_2 = add_double_quatation( ls[ header.index_param_2 ] );
    }

    return alertall
    (
        name,
        before,
        type,
        param_1,
        param_2
    );
}

// main
// ---------------------------------------------------------------------

function main(){
    if( WScript.Arguments.length != 3 ){
        WScript.Echo( "Arguments length must be 3." );
        return;
    }
    var argument_in_charset = WScript.Arguments( 0 );
    var argument_in_path    = WScript.Arguments( 1 );
    var argument_out_path   = WScript.Arguments( 2 );

    var sr     = new ActiveXObject( "ADODB.Stream" );
    sr.Charset = argument_in_charset;
    sr.Type    = adTypeText;
    sr.Mode    = adModeWrite;
    sr.Open();
    sr.LoadFromFile( argument_in_path );

    var sw     = new ActiveXObject( "ADODB.Stream" );
    sw.Charset = "utf-8";
    sw.Type    = adTypeText;
    sw.Mode    = adModeReadWrite;
    sw.Open();

    var header_line = sr.ReadText( adReadLine );
    var header      = parse_header( header_line );

    while( !sr.EOS ){
        var alertall_line = sr.ReadText( adReadLine );
        var alertall      = parse_alertall( header, alertall_line );
        alertall.out( sw );
    }

    sr.Close();
    sw.SaveToFile( argument_out_path, adSaveCreateOverWrite );
    sw.Close();
}

main();
