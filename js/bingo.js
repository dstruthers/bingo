$(function () {
    if (location.hash && !isNaN(parseInt(location.hash.substring(1)))) {
        setSeed(parseInt(location.hash.substring(1)));
    }
    else {
        randomSeed();
    }
    generateCard();
    $('#menu-new').click(newCard);
});

function generateCard () {
    $('#card').html('');

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
    $('#card').append($table);
    $.getJSON('vocab.json', function (data) {
        shuffle(data);
        for (var x = 0; x < headers.length; x++) {
            for (var y = 0; y < headers.length; y++) {
                var term = x === 2 && y === 2 ? 'Freedom' : data.shift();
                $('#tile_' + x + '_' + y).html(term);
            }
        }
    });
    $('#card td').click(function () {
        $(this).toggleClass('selected');
    });
}

function newCard () {
    randomSeed();
    generateCard();
}

function randomSeed () {
    Math.seedrandom(Date.now() % 65537);
    setSeed(Math.floor(Math.random() * 1000000));
}

function setSeed (seed) {
    Math.seedrandom(seed);
    location.hash = seed;
}

function shuffle (a) {
    for (var i = 0; i < a.length; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
}