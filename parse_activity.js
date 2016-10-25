
// header
// ---------------------------------------------------------------------

function header
(
    index_time,
    index_name,
    index_duration,
    index_sync,
    index_window_1,
    index_window_2,
    index_jump
)
{
    var obj = {};
    obj.index_time     = index_time;
    obj.index_name     = index_name;
    obj.index_duration = index_duration;
    obj.index_sync     = index_sync;
    obj.index_window_1 = index_window_1;
    obj.index_window_2 = index_window_2;
    obj.index_jump     = index_jump;
    return obj;
}

function parse_header( line ){
    var ls = line.split( "," );
    var index_time     = null;
    var index_name     = null;
    var index_duration = null;
    var index_sync     = null;
    var index_window_1 = null;
    var index_window_2 = null;
    var index_jump     = null;
    for( var i = 0; i < ls.length; ++i ){
        switch( ls[ i ] ){
            case "time":
            index_time = i;
            break;
            case "name":
            index_name = i;
            break;
            case "duration":
            index_duration = i;
            break;
            case "sync":
            index_sync = i;
            break;
            case "window_1":
            index_window_1 = i;
            break;
            case "window_2":
            index_window_2 = i;
            break;
            case "jump":
            index_jump = i;
            break;
        }
    }
    return header
    (
        index_time,
        index_name,
        index_duration,
        index_sync,
        index_window_1,
        index_window_2,
        index_jump
    );
}

// activity
// ---------------------------------------------------------------------

function activity_out( sw ){
    sw.WriteText( this.time, adWriteChar );
    sw.WriteText( " ",       adWriteChar );
    sw.WriteText( this.name, adWriteChar );

    if( this.duration ){
        sw.WriteText( " duration ",  adWriteChar );
        sw.WriteText( this.duration, adWriteChar );
    }

    if( this.sync ){
        sw.WriteText( " sync ",      adWriteChar );
        sw.WriteText( this.sync,     adWriteChar );
        sw.WriteText( " window ",    adWriteChar );
        sw.WriteText( this.window_1, adWriteChar );
        if( this.window_2 ){
            sw.WriteText( ",",           adWriteChar );
            sw.WriteText( this.window_2, adWriteChar );
        }
    }

    if( this.jump ){
        sw.WriteText( " jump ",  adWriteChar );
        sw.WriteText( this.jump, adWriteChar );
    }

    sw.WriteText( "", adWriteLine );
}

function activity
(
    time,
    name,
    duration,
    sync,
    window_1,
    window_2,
    jump
)
{
    var obj = {};
    obj.time     = time;
    obj.name     = name;
    obj.duration = duration;
    obj.sync     = sync;
    obj.window_1 = window_1;
    obj.window_2 = window_2;
    obj.jump     = jump;
    obj.out      = activity_out;
    return obj;
}

function parse_activity( header, line ){
    var duration = null;
    var sync     = null;
    var window_1 = null;
    var window_2 = null;
    var jump     = null;

    var ls = line.split( "," );

    var time = ls[ header.index_time ];

    var name = add_double_quatation( ls[ header.index_name ] );

    if( header.index_duration ){
        duration = ls[ header.index_duration ];
    }
    if( header.index_sync ){
        sync = ls[ header.index_sync ];
    }
    if( header.index_window_1 ){
        window_1 = ls[ header.index_window_1 ];
    }
    if( header.index_window_2 ){
        window_2 = ls[ header.index_window_2 ];
    }
    if( header.index_jump ){
        jump = ls[ header.index_jump ];
    }

    return activity
    (
        time,
        name,
        duration,
        sync,
        window_1,
        window_2,
        jump
    );
}

// ---------------------------------------------------------------------

parse( parse_header, parse_activity );
