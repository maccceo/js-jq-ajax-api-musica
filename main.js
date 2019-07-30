// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz.
// In base a cosa scegliamo nella select vedremo i corrispondenti cd.

// Init template dei CD
var source   = document.getElementById("cd-template").innerHTML;
var template = Handlebars.compile(source);
var content, html;


$(document).ready(function() {
	// inizializzo la pagina mostrando tutti i CD
	CDviewer("All");

	// funzione di cambio del genere musicale
	$(".genre-button").click(function (){
		changeGenre($(this));
	});
});




function CDviewer (genre) {
	console.log(genre);
	// recupero dall'API i CD
	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: "GET",
		success: function (data) {
			var albums = data.response;

			// rimuovo gli album mostrati in precedenza
			$(".cd").remove();

			// controllo tutti gli album dell'API:
			for (var i = 0; i < albums.length; i++) {

				// se sono del genere richiesto...
				if (albums[i].genre == genre || genre === "All") {
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
				} // ...sennò non lo visualizzo
			}
		},
		error: function (richiesta,stato,errori) {
			alert("Qualcosa è andato storto :/ " + errori);
			console.log("richiesta: " + richiesta);
			console.log("stato: " + stato);
			console.log("errori: " + errori);
		}
	})
}

function changeGenre (buttonPressed) {
	// CASO 1
	// l'utente ha ri-cliccato sullo stesso genere, vuole visualizzare tutti gli album
	if (buttonPressed.hasClass("selected")) {
		// feedback visivo dello spegnimento modalità genere
		$(".genre-button").removeClass("selected");
		// ri-interrogo l'API stampando tutti gli album 
		CDviewer("All");
	}

	// CASO 2
	// l'utente clicca su un altro genere, vuole cambiarlo
	else {
		// feedback visivo del cambio di genere
		$(".genre-button").removeClass("selected");
		buttonPressed.addClass("selected");
		// salvo string della nuova classe scelta
		var genre = buttonPressed.text();
		// ri-interrogo l'API stampando solo gli album del genere giusto
		CDviewer(genre);
	}
}