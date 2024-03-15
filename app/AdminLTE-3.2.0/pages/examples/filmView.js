
document.addEventListener('DOMContentLoaded', function () {

    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupEdit = document.getElementById('popupEdit');
    const overlayEdit = document.getElementById('overlayEdit');

    function showPopup() {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }

    function hidePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    function hidePopupEdit() {
        popupEdit.style.display = 'none';
        overlayEdit.style.display = 'none';
    }

    document.querySelector('.popup-trigger').addEventListener('click', showPopup);
    document.getElementById('overlay').addEventListener('click', hidePopup);
    document.getElementById('overlayEdit').addEventListener('click', hidePopupEdit);

    let currentPage = 1;
    const pageSize = 5;
    // fetch('/films?skip=0&take=1100')

    function goToPage(page) {
        if (page >= 1) {
            currentPage = page;
            fetchFilms(currentPage);
        }
    }

    // Mostrar Films GET
    function fetchFilms(page) {
        fetch(`/films?page=${page}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(films => {
                const table = document.getElementById('filmsTable').getElementsByTagName('tbody')[0];
                table.innerHTML = '';
                films.forEach(async film => {
                    const row = table.insertRow();
                    row.dataset.filmId = film.film_id;
                    row.insertCell(0).textContent = film.film_id;
                    row.insertCell(1).textContent = film.title;
                    row.insertCell(2).textContent = film.description;
                    row.insertCell(3).textContent = film.release_year;
                    row.insertCell(4).textContent = film.replacement_cost;
                    const crudCell = row.insertCell(5);

                    const crudButtonsContainer = document.createElement('div');

                    //Editar
                    const editFilm = document.createElement('button');
                    editFilm.textContent = '✏️';
                    editFilm.classList.add('popup-trigger-edit');
                    crudButtonsContainer.appendChild(editFilm);

                    //Eliminar
                    const deleteFilm = document.createElement('button');
                    deleteFilm.textContent = '🗑️';
                    deleteFilm.addEventListener('click', () => {
                        const filmId = row.dataset.filmId;
                        fetch(`/films/${filmId}`, { method: 'DELETE' })
                            .then(res => {
                                if (res.ok) {
                                    table.deleteRow(row.rowIndex);
                                } else {
                                    throw new Error('Error al eliminar el film');
                                }
                            })
                            .catch(error => console.error('Error al obtener y eliminar el film:', error));
                    });

                    if (film.rentalCount > 0) {
                        deleteFilm.classList.add('delete-film-red');
                    } else {
                        deleteFilm.classList.add('delete-film-green');
                    }

                    crudButtonsContainer.appendChild(deleteFilm);
                    crudCell.appendChild(crudButtonsContainer);
                });
            })
            .catch(error => console.error('Error fetching films:', error));
    }

    document.getElementById('btnFirstPage').addEventListener('click', () => goToPage(1));
    document.getElementById('btnPrevPage').addEventListener('click', () => goToPage(currentPage - 1));
    document.getElementById('btnNextPage').addEventListener('click', () => goToPage(currentPage + 1));
    
    fetchFilms(currentPage);
   
    // Crear Films POST
    document.getElementById('filmForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            release_year: document.getElementById('release_year').value,
            language_id: document.getElementById('language_id').value,
            rental_duration: document.getElementById('rental_duration').value,
            rental_rate: document.getElementById('rental_rate').value,
            length: document.getElementById('length').value,
            replacement_cost: document.getElementById('replacement_cost').value
        };
        console.log(formData);

        fetch('/films/crear', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    hidePopup();
                    window.location.reload();
                } else {
                    throw new Error('Error al agregar la película');
                }
            })
            .catch(error => console.error('Error al añadir la película:', error));
    });

    // Editar Films PUT
    document.getElementById('filmsTable').addEventListener('click', function (event) {
        if (event.target.classList.contains('popup-trigger-edit')) {
            showPopupEdit();
        }
    });

    let currentFilmId = '';

    function showPopupEdit() {
        popupEdit.style.display = 'block';
        overlayEdit.style.display = 'block';

        currentFilmId = event.target.closest('tr').dataset.filmId;

        fetch(`/films/${currentFilmId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles de la película');
                }
                return response.json();
            })
            .then(film => {
                document.getElementById('titleEdit').value = film.title;
                document.getElementById('descriptionEdit').value = film.description;
                document.getElementById('release_yearEdit').value = film.release_year;
                document.getElementById('language_idEdit').value = film.language_id;
                document.getElementById('rental_durationEdit').value = film.rental_duration;
                document.getElementById('rental_rateEdit').value = film.rental_rate;
                document.getElementById('lengthEdit').value = film.length;
                document.getElementById('replacement_costEdit').value = film.replacement_cost;
            })
            .catch(error => console.error('Error fetching film details:', error));
    }

    document.getElementById('filmFormEdit').addEventListener('submit', function (event) {
        event.preventDefault();

        const filmId = currentFilmId;
        console.log('filmId:', filmId);

        const formDataEdit = {
            title: document.getElementById('titleEdit').value,
            description: document.getElementById('descriptionEdit').value,
            release_year: document.getElementById('release_yearEdit').value,
            language_id: document.getElementById('language_idEdit').value,
            rental_duration: document.getElementById('rental_durationEdit').value,
            rental_rate: document.getElementById('rental_rateEdit').value,
            length: document.getElementById('lengthEdit').value,
            replacement_cost: document.getElementById('replacement_costEdit').value
        }

        fetch(`/films/${filmId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formDataEdit)
        })
            .then(res => {
                if (res.ok) {
                    hidePopupEdit();
                    window.location.reload();
                } else {
                    throw new Error('Error al editar la película');
                }
                console.log('Película actualizada con éxito');
            })
            .catch(error => console.error('Error updating film details:', error));
    })
});