/*----------------------------- AUTOCOMPLETE ---------------------------------*/

var marcas = [];

$.ajax({
  url: 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&sold_in_es=1',
  dataType: "jsonp",
  type: 'get',
  crossDomain: true,
  success: function(data) {
    var resultados = data.Makes.map(function(x) {
      marcas.unshift(x.make_id);
    });
  }
});

$("#marcaCoche").autocomplete({
  source: marcas,
  minLength: 2,
  max: 10
});


/*------------------------------ CHECKBOXRADIO -------------------------------*/

$("input[type='radio']").checkboxradio();


/*--------------------------------- DIALOG -----------------------------------*/

$(function() {
  $("#dialog").dialog({
    modal: true,
    autoOpen: false,
    resizable: false,
    height: "auto",
    show: {
      effect: "puff",
      duration: 500,
      easing: 'linear',
      queue: false
    },
    hide: {
      effect: "explode",
      pieces: 15,
      duration: 1000,
      easing: 'linear',
      queue: false
    },
    buttons: {
      "Aceptar": function() {
        $("#dialog").dialog({
          hide: {
            effect: "puff",
            duration: 1000
          }
        });
        $(this).dialog("close");
      },
    }
  });
  $("#aceptar").on("click", function() {
    $("#dialog").dialog("open");
  });
});


/*------------------------------- DATEPICKER ---------------------------------*/

(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["../widgets/datepicker"], factory);
  } else {
    factory(jQuery.datepicker);
  }
}(function(datepicker) {
  $.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    minDate: "0d",
    maxDate: "+2m",
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    yearSuffix: ''
  };
  datepicker.setDefaults(datepicker.regional.es);
  return datepicker.regional.es;
}));

$(function() {
  $.datepicker.setDefaults($.datepicker.regional["es"]);
  var dateFormat = "dd/mm/yy",
    from = $("#fechaFin,#fechaInicio")
    .datepicker({
      showButtonPanel: true,
      numberOfMonths: 2,
      dateFormat: dateFormat
    })
    .on("change", function() {
      to.datepicker("option", "minDate", getDate(this));
    }),
    to = $("#calfin").datepicker({
      changeMonth: true,
      numberOfMonths: 2,
      dateFormat: dateFormat
    })
    .on("change", function() {
      from.datepicker("option", "maxDate", getDate(this));
    });
  $("#fechaFin").datepicker();
  $("#fechaInicio").datepicker();
});
