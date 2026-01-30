function hideAll() {
  $("#startScreen").hide();
  $("#chooseScreen").hide();
  $("#chooseMap").hide();
  $("#gameIndex").hide();
}
$(document).ready(function () {
  // ! change to startscreen
  // $("#gameIndex").show();
  $("#startScreen").show();
  $("#nitroslavLogo").css({ visibility: "visible", opacity: "1" }).delay(1000);
  $("#startBtn").css("visibility", "visible").fadeTo(700, 1);

  // .delay(3000) dont forget to add to the start btn
  $("#startBtn").click(function () {
    hideAll();
    $("#chooseScreen").show();
  });

  $("#continueBtn").click(function () {
    hideAll();
    $("#chooseMap").show();
  });

  $("#backBtn").click(function () {
    hideAll();
    $("#chooseScreen").show();
  });

  $("#continueBtn2").click(function () {
    hideAll();
    $("#gameIndex").show();
    initGame();
  });
  // script for menu
  $("#quit").click(function () {
    hideAll();
    $("#chooseScreen").show();
  });
  $("#cancel").click(function () {
    $("#gameMenu").hide();
  });
});

function backgroundsVisibilty() {
  $("#startBG").hide();
  $("#chooseBG").hide();
}

$(document).ready(function () {
  $("#startBG").show();
  $("#startBtn").click(function () {
    backgroundsVisibilty();
    $("#chooseBG").show();
  });
});


