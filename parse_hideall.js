
// alertall
// ---------------------------------------------------------------------

function hideall_out( sw ){
    sw.WriteText( "hideall ",         adWriteChar );
    sw.WriteText( this.activity_name, adWriteChar );
    sw.WriteText( "",                 adWriteLine );
}

function hideall( activity_name ){
    var obj = {};
    obj.activity_name = activity_name;
    return obj;
}

function parse_hideall( line ){
    var ls = line.split( "," );
    var activity_name = add_double_quatation( ls[ 0 ] );
    return hideall( activity_name );
}

// ---------------------------------------------------------------------

parse( null, parse_hideall );
