
function add_double_quatation( s ){
    if( s.charAt( 0 ) != '"' ){
        s = '"' + s;
    }
    if( s.charAt( s.length - 1 ) != '"' ){
        s = s + '"';
    }
    return s;
}

function parse( parser_header, parser_element ){
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
    var header      = parser_header( header_line );

    while( !sr.EOS ){
        var element_line = sr.ReadText( adReadLine );
        var element      = parser_element( header, element_line );
        element.out( sw );
    }

    sr.Close();
    sw.SaveToFile( argument_out_path, adSaveCreateOverWrite );
    sw.Close();
}
