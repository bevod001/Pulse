// $(document).ready(function () {
//   $(".carousel__inner").slick({
//     speed: 1200,
//     // adaptiveHeight: true,
//     prevArrow:
//       '<button type="button" class="slick-prev"><img src="icons/prev.jpg"></button>',
//     nextArrow:
//       '<button type="button" class="slick-next"><img src="icons/next.jpg"></button>',
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           dots: true,
//           arrows: false,
//         },
//       },
//     ],
//   });
// });

//carousel

var slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  speed: 2000,
  responsive:[ {
    1000: { nav: true },
  }],
});

document.querySelector(".prev").onclick = function () {
  slider.goTo("prev");
};

document.querySelector(".next").onclick = function () {
  slider.goTo("next");
};

const mediaQuery = window.matchMedia("(max-width: 767px)");

function prevMediaQuery(mediaQuery) {
  const element = document.querySelector(".prev");
  if (mediaQuery.matches) {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

function nextMediaQuery(mediaQuery) {
  const element = document.querySelector(".next");
  if (mediaQuery.matches) {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}
nextMediaQuery(mediaQuery);
prevMediaQuery(mediaQuery);
mediaQuery.addListener(prevMediaQuery);
mediaQuery.addListener(nextMediaQuery);

//catalog

$(document).ready(function () {
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //modal

  // $("[data-modal=consultation]").on("click", function () {
  //   $(".overlay, #consultation").fadeIn("slow");
  // });

  // $(".modal__close").on("click", function () {
  //   $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
  // });

  // $(".button_mini").each(function (i) {
  //   $(this).on("click", function () {
  //     $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
  //     $(".overlay, #order").fadeIn("slow");
  //   });
  // });

  //validate

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Введите Ваше имя",
          minlength: jQuery.validator.format("Минимум {0} символа!"),
        },
        phone: "Введите Ваш номер телефона",
        email: {
          required: "Введите свою почту",
          email: "Неправильно введена почта",
        },
      },
    });
  }
  valideForms("#consultation-form");
  valideForms("#consultation form");
  valideForms("#order form");

  //mask
  $("input[name=phone]").mask("+375 (99) 999-99-99");

  //send email

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  //smooth scroll and pageup (прокрутка)
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  //Wow libraries
  new WOW().init();
});
