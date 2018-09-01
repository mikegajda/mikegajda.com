$(document).ready(function() {
  console.log('Document ready here')
  var gallery = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    spaceBetween: 10,
    zoom: false,
    centeredSlides: true,
    keyboard: true,
    onlyInViewport: true,
  })
})
