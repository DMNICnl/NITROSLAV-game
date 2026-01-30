function hideAll() {
  $("#startScreen").hide();
  $("#chooseScreen").hide();
  $("#chooseMap").hide();
  $("#gameIndex").hide();
}

let pageIndex ;
$(document).ready(function () {
  // ! change to startscreen
  // $("#gameIndex").show();
  $("#startScreen").show();
  pageIndex = 1;
  $("#nitroslavLogo").css({ visibility: "visible", opacity: "1" }).delay(1000);
  $("#startBtn").css("visibility", "visible").fadeTo(700, 1);
console.log(`youre currently on  page: ${pageIndex}`);

  // .delay(3000) dont forget to add to the start btn
  $("#startBtn").click(function () {
    hideAll();
    $("#chooseScreen").show();
    pageIndex = 2;
console.log(`youre currently on  page: ${pageIndex}`);
  });

  $("#continueBtn").click(function () {
    hideAll();
    $("#chooseMap").show();
    pageIndex = 3;
    console.log(`youre currently on  page: ${pageIndex}`);
  });

  $("#backBtn").click(function () {
    hideAll();
    $("#chooseScreen").show();
    pageIndex = 2;
    console.log(`youre currently on  page: ${pageIndex}`);
    });

  $("#continueBtn2").click(function () {
    hideAll();
    $("#gameIndex").show();
    pageIndex = 4;
    console.log(`youre currently on  page: ${pageIndex}`);
    initGame();
  });
  // script for menu
  $("#quit").click(function () {
    hideAll();
    $("#chooseScreen").show();
        $("#gameMenu").hide();

    pageIndex = 2;
    console.log(`youre currently on  page: ${pageIndex}`);
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


