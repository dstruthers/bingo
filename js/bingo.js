$(function () {
    var $table = $('<table></table>'),
        $row = $('<tr></tr>'),
        headers = 'BINGO'.split('');
    
    for (var i in headers) {
        $row.append($('<th>' + headers[i] + '</th>'));
    }
    $table.append($row);
    for (var x = 0; x < headers.length; x++) {
        $row = $('<tr></tr>');
        for (var y = 0; y < headers.length; y++) {
            $row.append($('<td id="tile_' + x + '_' + y + '"></td>'));
        }
        $table.append($row);
    }
    $('#bingo').append($table);
    $.getJSON('vocab.json', function (data) {
        data.sort(randomSort);
        for (var x = 0; x < headers.length; x++) {
            for (var y = 0; y < headers.length; y++) {
                var term = x === 2 && y === 2 ? 'Freedom' : data.shift();
                $('#tile_' + x + '_' + y).html(term);
            }
        }
    });
    $('#bingo td').click(function () {
        $(this).toggleClass('selected');
    });
});

function randomSort () {
    return Math.random() < 0.5 ? -1 : 1;
}