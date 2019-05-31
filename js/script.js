$(function () {

  function getElementsParams(data) {
    let td = $('td');
    td.each(function () {
      let td2 = $(this);
      let attrId = td2.attr('id');
      
      if (attrId === 'flag') {
        let img = $('<img>').attr({
          src: data[attrId],
          alt: data.name,
          style: 'width: 150px'
        });

        td2.html(img);
      } else {
        td2.html(data[attrId]);
      }

    });
  }

  function getInfo(country) {
    let currentCountry = country[0];

    let countryStr = JSON.stringify(currentCountry);
    localStorage.setItem('country', countryStr);

    getElementsParams(currentCountry);
  }

  function init() {
    let country = JSON.parse(localStorage.getItem('country')) || [];

    getElementsParams(country);
  }

  $('.country-form').on('submit', function (event) {
    event.preventDefault();

    let countryName = $('#country-name').val();

    $.ajax({
      method: 'get',
      url: 'https://restcountries.eu/rest/v2/name/' + countryName,
      success: getInfo
    });
  });

  init();


  $.ajax({
    method: 'get',
    url: 'https://restcountries.eu/rest/v2/',
    success: function (response) {
    for (var i = 0; i < response.length; i++) {
      $('#showall').click(function () {
        getElementsParams( response[i] );
      });
    } 
    }
  });
})

