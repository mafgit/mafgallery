let KEY = config.MY_KEY;
fetch(
  `https://pixabay.com/api/?key=${KEY}&q=background&image_type=photo&pretty=true`
)
  .then((res) => res.json())
  .then(function (data) {
    loadResult(data);
  });

function loadResult(data) {
  for (let i = 0; i < data.hits.length; i++) {
    $('#result').append(
      `<div class="img">
          <img src="${data.hits[i].largeImageURL}" onclick="toggleHide(this.src)"/>
  <div class="img-detail">
  <p><span class="likes"><i class="fa fa-heart"></i></span>${data.hits[i].likes}</p>
  <p><span class="views"><i class="fa fa-eye"></i></span>${data.hits[i].views}</p>
  </div>
  </div>`
    );
  }
}

$('#search-btn').click(function () {
  loadImages();
});

$(document).keyup(function (e) {
  if (e.which === 13) {
    loadImages();
  }
});

function loadImages() {
  $('#result').empty();
  var min_width = $('#min-width').val();
  var min_height = $('#min-height').val();
  var editors_choice = $('#editors-choice').val();
  var order = $('#order').val();
  var colors = $('#colors').val().split(' ');
  fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${$(
      '#search'
    ).val()}&image_type=photo&pretty=true&min_width=${min_width}&min_height=${min_height}&colors=${colors.join(
      ','
    )}&editors_choice=${editors_choice}&order=${order}&safesearch=true`
  )
    .then((res) => res.json())
    .then(function (data) {
      loadResult(data);
    });
}

function openImage() {
  window.open($('#opened-img img').attr('src'));
}

function toggleHide(src) {
  $('#opened-img img').attr('src', src);
  $('#opened-img, header, footer, #result').toggle();
}
