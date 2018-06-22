$(document).ready(function () {
	
	// Using Javascript DOM in certain places because of issues with jQuery 
	var searchIcon = document.querySelector("#searchIcon");
	var searchBar = document.querySelector("#searchBar");
	searchBar.value = '';

	searchIcon.addEventListener("click", function () {
		searchBar.value = '';
		$(".links").remove();
		$(".main").addClass("align-items-center h-100");
		$(".container-fluid").addClass("h-100");
		$("body").addClass("h-100");
		$("html").addClass("h-100");
		$(".search").removeClass("mb-4");
		$(".initial").removeClass("mt-4");
		$("#help").css("display", "block");
	});
	
	$("#searchBar").on("keypress", function (event) {
		if (event.key === "Enter") {
			$(".links").remove();
			var searchTerm = this.value;
			$.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&prop=extracts|info&exintro&explaintext&inprop=url&origin=*&gsrsearch=" + searchTerm, function (json) {
				var keys = Object.keys(json["query"]["pages"]);
				keys.forEach(function (key) {
					var title = json["query"]["pages"][key]["title"];
					var titleIntro = json["query"]["pages"][key]["extract"];
					var contentArray = titleIntro.match(/(.*\.)/);
					var content;
					if (contentArray === null) {
						content = titleIntro;
					} else {
						// Can't find a suitable regex, so uisng substr instead
						// to display 300 characters.
						content = contentArray[0].substr(0, 300) + ".....";
					}
					var link = json["query"]["pages"][key]["fullurl"];
					var html = '<a class="links" href=' + link + ' target="_blank"><div class="linkBlock">';
					html += "<div class='title'>" + title + "</div>" ;
					html += "<div class='content'>" +content + "</div>";
					html += "</div></a>";
					$(".contentCards").append(html);
					// $(".main").removeClass("align-items-center h-100");
					$(".container-fluid").removeClass("h-100");
					$(".search").addClass("mb-4");
					$(".initial").addClass("mt-4");
					$("body").removeClass("h-100");
					$("html").removeClass("h-100");
				});	
				$("#help").css("display", "none");
			});
		}
	});
});