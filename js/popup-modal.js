// Get the modal
var modal = document.getElementById("myModal");
modal.style.display = "block";

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$('#howToCarousel').bind('slid.bs.carousel', function (e)
{
    var $this = $(this);

    $this.children('.carousel-control').show();

    if ($('.carousel-inner .item:last').hasClass('active'))
    {
        closeModal(7.5);
        $this.children('.right.carousel-control').hide();
    } else if ($('.carousel-inner .item:first').hasClass('active')) {
        $this.children('.left.carousel-control').hide();
    } else {
        redirect(10);
    }
});

$("#howToCarousel").carousel({interval: false});

function redirect(time)
{
    let newTime = time * 1000;
    window.setTimeout(function() {
        $("#howToCarousel").carousel("next");
    }, newTime);
}

function closeModal(time)
{
    let newTime = time * 1000;
    window.setTimeout(function() {
        modal.style.display = "none";
    }, newTime);
}

