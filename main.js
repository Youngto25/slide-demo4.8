let $buttons = $("#buttonWrapper>button");
let $images = $("#images");
let $img = $("#images").children("img");
let current = 0;

makeFakeSlides();
$images.css({ transform: "translateX(-168px)" });
bindEvents();


function bindEvents(){
  $buttons.eq(0).on("click", function() {
    if (current == 3) {
      $images
        .css({ transform: "translateX(-840px)" })
        .one("transitionend", function() {
          $images.hide().offset();
          $images.css({ transform: "translateX(-168px)" }).show();
        });
    } else {
      $images.css({ transform: "translateX(-168px)" });
    }
    current = 0;
  });
  $buttons.eq(1).on("click", function() {
    $images.css({ transform: "translateX(-336px)" });
    current = 1;
  });
  $buttons.eq(2).on("click", function() {
    $images.css({ transform: "translateX(-504px)" });
    current = 2;
  });
  $buttons.eq(3).on("click", function() {
    if (current == 0) {
      $images
        .css({ transform: "translateX(0px)" })
        .one("transitionend", function() {
          $images.hide().offset();
          $images.css({ transform: "translateX(-672px)" }).show();
        });
    } else {
      $images.css({ transform: "translateX(-672px)" });
    }
    current = 3;
  });
}

function makeFakeSlides() {
    let $firstCopy = $img.eq(0).clone(true);
    let $lastCopy = $img.eq($img.length - 1).clone(true);
    $images.append($firstCopy);
    $images.prepend($lastCopy);
  }
