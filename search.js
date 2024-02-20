
var current_page = 1;
var records_per_page = 15;
var page;

function searchPhotos() {
	let clientId = "WLxLSi8FkWSFyjm657qYSOP5MehHonMESl0v41LyufA";
	let query = document.getElementById('search_image_text').value;
	let url = "https://api.unsplash.com/search/photos/?page=" + page + "&per_page=" + records_per_page + "&client_id=" + clientId + "&query=" + query;

	fetch(url)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			let resultsLength = Object.keys(data.results).length;

			if (resultsLength === 0) {
				document.getElementById('btn_next').style.display = 'none';
				document.getElementById('btn_prev').style.display = 'none';
				var result = document.getElementById("imageResult");
				let noResult = '<img src="Images/404.png" width="200px" height="200px" id="notFound">';
				result.innerHTML = noResult;
			}
			else {
				data.results.forEach(photo => {

					let authorName = convertToTitleCase(photo.user.first_name);
					let authorPhotoLikes = convertToFormatNumbers(photo.user.total_likes);
					let authorBio = convertBio(photo);
					let authorTotalPhotos = convertToFormatNumbers(photo.user.total_photos);
					let totalImgLike = convertToFormatNumbers(photo.likes);
					let createdDate = convertToFormatDate(photo.created_at);

					let result = `
					<div class="col d-flex justify-content-center col-main"> 	
						<div class="all-info">
								<img src="${photo.urls.regular}" id="img-thumbnail-new" onClick="enlargePhoto('${photo.urls.regular}', '${totalImgLike}','${createdDate}', '${authorName}', '${photo.user.profile_image.large}')"/>
								<div class="author-image-background">
									<img src="${photo.user.profile_image.large}" class="author-image"/>
								</div>
								<div class="row">
									<div class="col author-name">
										<h3>${authorName}</h3>
									</div>
									<div class="col author-likes">
										<img src= "Images/likes.png"></img>
										<h3 align="center" id="result">${authorPhotoLikes}</h3>
									</div>
									<div class="col author-photos">
										<img src= "Images/totalPhotos.png" width="17" height="17"></img>
										<h3 align="center">${authorTotalPhotos}</h3>
									</div>
								</div>
								
								<div class="col author-bio">
									<a>${authorBio}</a>
								</div>
						</div>
					</div>
				`;
					$("#result").append(result);
				});

				if (resultsLength < records_per_page) {
					document.getElementById('btn_next').disabled = true;
				}
			}
		})
	$("#result").empty();
}

function newContent(page) {
	$("#result").empty();
	let clientId = "WLxLSi8FkWSFyjm657qYSOP5MehHonMESl0v41LyufA";
	let query = document.getElementById('search_image_text').value;
	let url = "https://api.unsplash.com/search/photos/?page=" + page + "&per_page=" + records_per_page + "&client_id=" + clientId + "&query=" + query;

	fetch(url)
		.then(function (data) {

			return data.json();
		})
		.then(function (data) {
			let resultsLength = Object.keys(data.results).length;
			data.results.forEach(photo => {
				let authorName = convertToTitleCase(photo.user.first_name);
				let authorPhotoLikes = convertToFormatNumbers(photo.user.total_likes);
				let authorBio = convertBio(photo);
				let authorTotalPhotos = convertToFormatNumbers(photo.user.total_photos);
				let totalImgLike = convertToFormatNumbers(photo.likes);
				let createdDate = convertToFormatDate(photo.created_at);
				let result = `
				<div class="col d-flex justify-content-center col-main"> 	
					<div class="all-info">
							<img src="${photo.urls.regular}" id="img-thumbnail-new" onClick="enlargePhoto('${photo.urls.regular}', '${totalImgLike}','${createdDate}', '${authorName}', '${photo.user.profile_image.medium}')"/>
							<div class="author-image-background">
								<img src="${photo.user.profile_image.large}" class="author-image"/>
							</div>
							<div class="author-name">
								<h3>${authorName}</h3>
							</div>
							<div class="col author-likes">
								<img src= "Images/likes.png"></img>
								<h3 align="center" id="result">${authorPhotoLikes}</h3>
							</div>
							<div class="col author-photos">
								<img src= "Images/totalPhotos.png" width="17" height="17"></img>
								<h3 align="center">${authorTotalPhotos}</h3>
							</div>
							<div class="col author-bio">
								<a>${authorBio}</a>
							</div>
					</div>
				</div>
			`;
				$("#result").append(result);
			});
		})
	$("#result").empty();
}

function enlargePhoto(src, total, date, name, photo) {

	var enlarged = document.getElementById("enlargedImage");
	var enlargedImg = document.getElementById("img01");
	var captionText = document.getElementById("caption");
	var captionname = document.getElementById("author-name");
	var goToTopButton = document.getElementById("goToTopButton");

	enlarged.style.display = "block";
	enlargedImg.src = src;
	var dynamicWidth = enlargedImg.clientWidth;

	$("#author-name").width(dynamicWidth);
	$("#caption").width(dynamicWidth);

	var captionDetail = captionDetails(total, date);
	var author = captionName(name, photo);

	// Disable scrolling when gallery is hidden
	document.getElementById('main-body').style.overflow = 'hidden';
	goToTopButton.style.display = "none";

	// Get the <span> element that closes the enlarged
	var span = document.getElementsByClassName("close-new")[0];
	captionText.innerHTML = captionDetail;
	captionname.innerHTML = author;

	// When the user clicks on <span> (x), 
	span.onclick = function () {
		// close the enlarged
		enlarged.style.display = "none";
		// Enable scrolling when gallery is shown
		document.getElementById('main-body').style.overflow = 'auto';
		goToTopButton.style.display = "block";
	}
}

function prevPage() {
	if (current_page > 1) {
		current_page--;
		changePage(current_page);
		// Enable the "Next" button
		document.getElementById('btn_next').disabled = false;
		// Disable the "Previous" button if on the first page
		document.getElementById('btn_prev').disabled = current_page <= 1;
		goToTop();
	}
}

function nextPage() {
	let clientId = "WLxLSi8FkWSFyjm657qYSOP5MehHonMESl0v41LyufA";
	let query = document.getElementById('search_image_text').value;
	let url = "https://api.unsplash.com/search/photos/?page=2&per_page=" + records_per_page + "&client_id=" + clientId + "&query=" + query;

	fetch(url)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			let totalpages = data.total_pages;

			if (current_page < totalpages) {
				current_page++;
				changePage(current_page);

				// Disable the "Next" button if on the last page
				let temp = current_page;
				document.getElementById('btn_next').disabled = temp === totalpages;
				// Enable the "Previous" button
				document.getElementById('btn_prev').disabled = false;
				goToTop();
			}
		});
}

function changePage(page) {
	let clientId = "WLxLSi8FkWSFyjm657qYSOP5MehHonMESl0v41LyufA";
	let query = document.getElementById('search_image_text').value;
	let url = "https://api.unsplash.com/search/photos/?page=" + page + "&per_page=" + records_per_page + "&client_id=" + clientId + "&query=" + query;

	fetch(url)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			let totalpages = data.total_pages;
			var btn_next = document.getElementById("btn_next");
			var btn_prev = document.getElementById("btn_prev");
			var page_span = document.getElementById("page");

			if (page < 1) {
				page = 1;
			}
			else if (page > data.total_pages) {
				page = data.total_pages;
			}
			newContent(page);
		});
}

function convertToFormatNumbers(total) {
	return formatNumber(total, 0);
}

function convertToFormatDate(date) {
	return formatDate(date);
}

function captionDetails(totalImgLike, createdDate) {
	let likes = `<span class="imgLikes">
					<img src= "Images/likes.png" width="17" height="17"></img>
					<h3 align="center" id="result">${totalImgLike}</h3>
				</span>
				<span class="imgLikes">
					<img src= "Images/appointment.png" width="16" height="14"></img>
					<h3 align="center" id="result">${createdDate}</h3>
				</span>`
	return likes;
}

function captionName(name, photo) {
	let captionAuthor = `<span class="auImg">
							<img src="${photo}"></img>
							<h2 id="result">${name}</h2>
						</span>`
	return captionAuthor;
}

function convertToTitleCase(string) {
	string = string.split(" ")[0];
	string = string.substring(0, 15);
	return string.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

function convertBio(photo) {
	if (photo.user.bio === null || photo.user.bio === "") {
		if (photo.user.first_name === null)
			photo.user.first_name = "";
		if (photo.user.last_name === null)
			photo.user.last_name = "";
		return "Hello, I am " + photo.user.first_name + " " + photo.user.last_name;
	}
	return photo.user.bio;
}

function formatNumber(num, precision) {
	const map = [
		{ suffix: 'T', threshold: 1e12 },
		{ suffix: 'B', threshold: 1e9 },
		{ suffix: 'M', threshold: 1e6 },
		{ suffix: 'K', threshold: 1e3 },
		{ suffix: '', threshold: 1 },
	];

	const found = map.find((x) => Math.abs(num) >= x.threshold);
	if (found) {
		const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
		return formatted;
	}
	return num;
}

function formatDate(date) {
	const dateObject = new Date(date);
	const options = { year: 'numeric', month: 'short', day: '2-digit' };
	const formattedDate = dateObject.toLocaleDateString('en-US', options);
	return formattedDate;
}