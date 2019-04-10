let $buttons = $("#buttonWrapper>button");
let $images = $("#images");
let $img = $("#images").children("img");
let current = 0;

//1.制作假的img
makeFakeSlides();

//2.初始化图片位置
$images.css({ transform: "translateX(-168px)" });

//4.切换
bindEvents();

//5.设置上一张、下一张
$(next).on('click',function (){
  goToSlide(current+1)
})
$(previous).on('click',function (){
  goToSlide(current-1)
})

//6.设置闹钟，自动轮播
let setTimer = setInterval(function (){
  goToSlide(current+1)
},2000)
$('#window').on('mouseenter',function (){
  window.clearInterval(setTimer)
})
$('#window').on('mouseleave',function (){
  setTimer = setInterval(function (){
    goToSlide(current+1)
  },2000)
})


function makeFakeSlides() {
  let $firstCopy = $img.eq(0).clone(true);
  let $lastCopy = $img.eq($img.length - 1).clone(true);
  $images.append($firstCopy);
  $images.prepend($lastCopy);
}


function goToSlide($index){
  //此处有bug，以下代码并没有解决切换的问题
  if($index>$buttons.length-1){
    var $index = 0
  }else if($index < 0){
    var $index  = $buttons.length-1
  }
  console.log(current,$index)
  if(current === $buttons.length-1 && $index === 0){
    //从最后一张到第一张
    console.log('从最后一张到第一张')
    $images
      .css({ transform: `translateX(${-168*($buttons.length+1)}px)` })
      .one("transitionend", function() {
        $images.hide().offset();
        $images.css({ transform: "translateX(-168px)" }).show();
      });
  }else if(current === 0 && $index === $buttons.length-1){
    //从第一张到最后一张
    console.log('从第一张到最后一张')
    $images
    .css({ transform: 'translateX(-168px)' })
    .one("transitionend", function() {
      $images.hide().offset();
      $images.css({ transform: `translateX(${-168*($index+1)}px)` }).show();
    });
  }else{
    console.log('正常')
    $images.css({ transform: `translateX(${-($index+1)*168}px)`});
  }
  current = $index
}


function bindEvents(){
  $('#buttonWrapper').on('click','button',function (e){
    let $button = $(e.currentTarget)
    let $index = $button.index()
    goToSlide($index)
  })

  /*
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
  */
}



