let movies = [];
let favouriteData = [];
let favouriteMovies = [];
let fmovies = [];
function displayMovies() {
	let li = '';
	if (typeof movies != undefined) {
		movies.map(movie => {
			li = li + ('<li class=\'card-title\'>' + movie.title + '</li>');
			li = li + ('<p class=\'card-text\'>' + movie.id + '</p>');
			// eslint-disable-next-line max-len
			li = li + '<button class=\'btn btn-primary\' onclick="addFavourite(\'' + movie.id + '\')">Add to Favourites</button>';
		});
		document.getElementById('moviesList').innerHTML = li;
	}
}

function displayFavouriteMovies() {
	// eslint-disable-next-line no-console
	let favourite = favouriteMovies;
	let li = '';
	if (typeof favouriteMovies != undefined) {
		favouriteMovies.map(fm => {
			li = li + ('<li class=\'card-title\'>' + fm.title + '</li>');
		});
		document.getElementById('favouritesList').innerHTML = li;
	}
}

function getMovies() {
	return fetch('http://localhost:3000/movies',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			return Promise.resolve(res.json()
			)
		}
		).then((data) => {
			// eslint-disable-next-line no-console
			movies = data;
			displayMovies();
			return Promise.resolve(data);
		}).catch(err => {
			// eslint-disable-next-line no-alert
			alert('While fetching movies---', err);
			return Promise.reject(err);
		});
}

function getFavourites() {
	return fetch('http://localhost:3000/favourites',
		{
			headers:
			{
				'Content-Type': 'application/json'
			},
			method: 'GET'
		}).then(res => {
			return Promise.resolve(res.json())
		}).then(res => {
			favouriteMovies = res;
			displayFavouriteMovies();
			return Promise.resolve(favouriteMovies);
		}).catch(err => {
			// eslint-disable-next-line no-alert
			return Promise.reject(err);
		});
}
function addFavourite(_id) {
	let id = Number(_id);
	let favouriteData = movies.filter(movie => movie.id === id);
	if (typeof favouriteData != 'undefined') {
		if (document.getElementById("favouritesList").innerHTML.includes(favouriteData[0].title)) {
			alert("Movie is already added to favourites");
			throw new Error("Movie is already added to favourites");
		}
		favouriteMovies.push(favouriteData[0]);
		return fetch('http://localhost:3000/favourites', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(favouriteData[0])
		})
			// eslint-disable-next-line consistent-return
			.then((res) => {
				if (res.ok) {
					// res.json();
					return Promise.resolve(res.json());
				}
			}).then(res => {
				displayFavouriteMovies();
				return Promise.resolve(favouriteMovies);
			})
			.catch(err => {
				// eslint-disable-next-line no-alert
				alert('err while adding into favourites', err);
				return Promise.reject(null);
			});
	}
	else {
		return Promise.reject("err");
	}
}


module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


