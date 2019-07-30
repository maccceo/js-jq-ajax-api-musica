// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz.
// In base a cosa scegliamo nella select vedremo i corrispondenti cd.

// Init template dei CD
var source   = document.getElementById("cd-template").innerHTML;
var template = Handlebars.compile(source);
var content, html;


$(document).ready(function() {
	// inizializzo la pagina coi CD del genere di defult
	CDviewer($(".selected").text());

	// funzione di cambio del genere musicale
	$(".genre-button").click(function (){
		changeGenre($(this));
	});
});




function CDviewer (genre) {
	// recupero dall'API i CD
	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: "GET",
		success: function (data) {
			var albums = data.response;

			// rimuovo gli album visti in precedenza
			$(".cd").remove();

			// controllo tutti gli album:
			for (var i = 0; i < albums.length; i++) {
				// se sono del genere richiesto...
				if (albums[i].genre == genre) {
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
				} // ...sennò niente!				
			}
		},
		error: function (richiesta,stato,errori) {
			alert("Qualcosa è andato storto :/ " + errori);
			console.log("richiesta: " + richiesta);
			console.log("stato: " + stato);
			console.log("errori: " + errori);
		}
	})

	// passo tutti gli album restituiti dall'API

}

function changeGenre (buttonPressed) {
	// feedback visivo che hai cambiato genere
	$(".genre-button").removeClass("selected");
	buttonPressed.addClass("selected");

	// salvo string della nuova classe scelta
	var genre = buttonPressed.text();

	// ri-interrogo l'API stampando solo gli album del genere giusto
	CDviewer(genre);
}