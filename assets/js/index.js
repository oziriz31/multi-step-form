$(function () {
  // Start -- GLOBAL STATICS VARIABLES

  var _CURRENT_STEP = parseInt(
    $("form[data-current-step]").data("current-step")
  );

  var $_PREV_BTN = $("#formNavigator").find("button:first-child");
  var $_NEXT_BTN = $("#formNavigator").find("button:last-child");

  // End -- GLOBAL STATICS VARIABLES

  triggerStepperButtons(_CURRENT_STEP);

  $_PREV_BTN.on("click", function (e) {
    e.preventDefault();

    if (_CURRENT_STEP > 1) {
      _CURRENT_STEP -= 1;
      triggerStepperButtons(_CURRENT_STEP);
    }
  });

  $_NEXT_BTN.on("click", function (e) {
    e.preventDefault();

    if (_CURRENT_STEP < 5) {
      _CURRENT_STEP += 1;
      triggerStepperButtons(_CURRENT_STEP);
    }
  });

  function triggerStepperButtons(currentStep) {
    // Set the form data attribute on the DOM with _CURRENT_STEP value
    $("form[data-current-step]").attr("data-current-step", currentStep);

    // Start -- Add/Remove "step-active" class on the step number
    $("#stepNumber")
      .find("li[data-step-number")
      .find("div:first-child")
      .removeClass("step-active");

    if (_CURRENT_STEP < 5) {
      $("#stepNumber")
        .find('li[data-step-number="' + _CURRENT_STEP + '"]')
        .find("div:first-child")
        .toggleClass("step-active");
    } else {
      $("#stepNumber")
        .find('li[data-step-number="4"]')
        .find("div:first-child")
        .toggleClass("step-active");
    }
    // End -- Add/Remove "step-active" class on the step number

    // Start -- Hide/Show stepper buttons base on the _CURRENT_STEP value
    if (currentStep > 1) {
      $_PREV_BTN.show();
      $(".form-content > div:last-child").css(
        "justify-content",
        "space-between"
      );
    } else {
      $_PREV_BTN.hide();
      $(".form-content > div:last-child").css("justify-content", "flex-end");
    }

    if (currentStep < 5) {
      $(".form-content").css("justify-content", "space-between");
      $_NEXT_BTN.show();
    } else {
      $_NEXT_BTN.hide();
      $_PREV_BTN.hide();
      $(".form-content").css("justify-content", "center");
      $(".form-content > div:last-child").css("justify-content", "flex-start");
    }
    // End -- Hide/Show stepper buttons base on the _CURRENT_STEP value

    $("div[data-step]").hide();
    $('div[data-step="' + currentStep + '"]').show();
  }
});
