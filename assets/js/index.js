$(function () {
  // Start -- GLOBAL STATICS VARIABLES

  var _CURRENT_STEP = parseInt(
    $("form[data-current-step]").data("current-step")
  );

  var $_PREV_BTN = $("#formNavigator").find("button:first-child");
  var $_NEXT_BTN = $("#formNavigator").find("button:last-child");

  var _SELECTED_PLAN = {};
  var _ADDONS = [];

  // End -- GLOBAL STATICS VARIABLES

  moveToStep(_CURRENT_STEP);

  $_PREV_BTN.on("click", function (e) {
    e.preventDefault();

    if (_CURRENT_STEP > 1) {
      _CURRENT_STEP -= 1;
      moveToStep(_CURRENT_STEP);
    }
  });

  $_NEXT_BTN.on("click", function (e) {
    e.preventDefault();

    if (_CURRENT_STEP < 5) {
      _CURRENT_STEP += 1;
      moveToStep(_CURRENT_STEP);
    }
  });

  $("div[data-plan]").each(function (i, link) {
    $(link).on("click", function (e) {
      e.preventDefault();
      $("div[data-plan]").removeClass("selected");
      $(link).toggleClass("selected");

      _SELECTED_PLAN = {
        planName: $(link).data("plan"),
        price: parseInt($(link).data("price")),
      };
      tooglePlanSelected();
    });
  });

  $('input[name="PlanPeriod"]').on("change", function (e) {
    e.preventDefault();
    $('span[id="period"]').html(this.checked ? "yr" : "mo");
  });

  $("#goToChangePlan").on("click", function (e) {
    e.preventDefault();
    _CURRENT_STEP = 2;
    moveToStep(_CURRENT_STEP);
  });

  $('input[id="adonItemChk"]').each(function (i, link) {
    $(link).on("click", function (e) {
      var addon = { item: $(this).data("item"), price: $(this).data("price") };
      if (this.checked) {
        _ADDONS.push(addon);
      } else {
        for (var i = _ADDONS.length - 1; i >= 0; --i) {
          if (_ADDONS[i].item == $(this).data("item")) {
            _ADDONS.splice(i, 1);
          }
        }
      }
      $(this).parents('div[class*="addon"]').toggleClass("selected");
      toggleAddonItem();
      togglePriceTotal();
    });
  });

  function togglePriceTotal() {
    var totalPrice = _SELECTED_PLAN.price;
    $.each(_ADDONS, function (i, item) {
      totalPrice += item.price;
    });

    $('div[id="summmary-total"]').html(
      "<p>Total " +
        "<span>(" +
        ($('input[name="PlanPeriod"]').is(":checked")
          ? "per year"
          : "per month") +
        ")</span></p>" +
        "<div>" +
        '<span id="plan-price">+$' +
        totalPrice +
        "/</span>" +
        '<span id="period">' +
        ($('input[name="PlanPeriod"]').is(":checked") ? "yr" : "mo") +
        "</span>" +
        "</div>"
    );
  }

  function toggleAddonItem() {
    $('div[id="addon-item"]').remove();
    $.each(_ADDONS, function (i, item) {
      $('div[id="form-summary"]').append(
        '<div id="addon-item" class="item">' +
          "<div>" +
          "<p>" +
          item.item +
          "</p>" +
          "</div>" +
          "<div>" +
          '<span id="item-price">+$' +
          item.price +
          "/</span>" +
          '<span id="period">' +
          ($('input[name="PlanPeriod"]').is(":checked") ? "yr" : "mo") +
          "</span>" +
          "</div>" +
          "</div>"
      );
    });
  }

  function tooglePlanSelected() {
    $('input[name="Plan"]').val(JSON.stringify(_SELECTED_PLAN));
    $("#selected-plan-name").html(_SELECTED_PLAN.planName);
    $("#plan-price").html("+$" + _SELECTED_PLAN.price + "/");
    toggleAddonItem();
    togglePriceTotal();
  }

  function moveToStep(currentStep) {
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
