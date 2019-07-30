// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz.
// In base a cosa scegliamo nella select vedremo i corrispondenti cd.

// Init template dei CD
var source   = document.getElementById("cd-template").innerHTML;
var template = Handlebars.compile(source);
var content, html;


$(document).ready(function() {
	// popolo la pagina coi CD
	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: "GET",
		success: function (data) {
			CDviewer(data.response);
		},
		error: function (richiesta,stato,errori) {
			alert("Qualcosa è andato storto :/ "+errori);
			console.log("richiesta: " + richiesta);
			console.log("stato: " + stato);
			console.log("errori: " + errori);
		}
	})
});




function CDviewer (albums) {
	// passo tutti gli album restituiti dall'API
	for (var i = 0; i < albums.length; i++) {
		// prelevo i dati dell'album
		context = {
			img: albums[i].poster,
			title: albums[i].title,
			author: albums[i].author,
			year: albums[i].year
		};
		// li "complilo" nel template
		html = template(context);
		// visualizzo l'album nella pagina
		$(".cds-container").append(html);
	}
}