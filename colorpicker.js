// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length);
    }
    return null;
}

$(document).ready(function () {
    var colorPicker = $('#colorPicker');

    // Initialize color from cookie or data attribute
    var storedColor = getCookie('userColor');
    if (storedColor) {
        setColors(storedColor);
        colorPicker.val(storedColor);
    } else {
        $('[color="set"]').each(function () {
            $(this).css('color', $(this).data('color'));
        });
        $('[background-color="set"]').each(function () {
            $(this).css('background-color', $(this).data('color'));
        });
        $('[border-color="set"]').each(function () {
            var borderColor = $(this).data('color');
            $(this).css({
                'border-top-color': borderColor,
                'border-bottom-color': borderColor,
                'border-left-color': borderColor,
                'border-right-color': borderColor
            });
        });
    }

    // Input event for live color change as the color picker is used
    colorPicker.on('input', function () {
        var newColor = $(this).val();
        setColors(newColor);
        setCookie('userColor', newColor, 7);
    });

    function setColors(color) {
        $('[color="set"]').css('color', color);
        $('[background-color="set"]').css('background-color', color);
        $('[border-color="set"]').css({
            'border-top-color': color,
            'border-bottom-color': color,
            'border-left-color': color,
            'border-right-color': color
        });
    }
});
