function scrollToCenter(elementID) {
    var positionOfPlayButton = $("#playButton").position().left;
    var widthOfPlayButton = $("#playButton").width();
    var positionOfDivHoldingPlayButton = $("#controlStrip").scrollLeft();
    var canvasWidth = $("#canvas-div").width();
    positionOfPlayButton = (-positionOfDivHoldingPlayButton) + (canvasWidth/2 - widthOfPlayButton/2);

    $("#controlStrip").animate({
        scrollLeft: positionOfPlayButton + positionOfDivHoldingPlayButton
    });
}

scrollToCenter("play-button");