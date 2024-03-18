
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

    function goToPage(page) {
        if (page >= 1) {
            currentPage = page;
            fetchCustomers(currentPage);
        }
    }

    // Mostrar Customers GET
    function fetchCustomers(page) {
        fetch(`/customers?page=${page}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(customers => {
                const table = document.getElementById('customersTable').getElementsByTagName('tbody')[0];
                customers.forEach(customer => {
                    const row = table.insertRow();
                    row.insertCell(0).textContent = customer.customer_id;
                    row.insertCell(1).textContent = customer.store_id;
                    row.insertCell(2).textContent = customer.first_name;
                    row.insertCell(3).textContent = customer.last_name;
                    row.insertCell(4).textContent = customer.email;
                    row.insertCell(5).textContent = customer.address_id;
                    const crudCell = row.insertCell(6);

                    const crudButtonsContainer = document.createElement('div');

                    //Editar
                    const editCustomer = document.createElement('button');
                    editCustomer.textContent = '✏️';
                    editCustomer.classList.add('popup-trigger-edit');
                    crudButtonsContainer.appendChild(editCustomer);

                    //Eliminar
                    const deletecustomer = document.createElement('button');
                    deletecustomer.textContent = '🗑️';
                    deletecustomer.addEventListener('click', () => {
                        const customerId = row.dataset.customerId;
                        fetch(`/customers/${customerId}`, { method: 'DELETE' })
                            .then(res => {
                                if (res.ok) {
                                    table.deleteRow(row.rowIndex);
                                } else {
                                    throw new Error('Error al eliminar el cliente');
                                }
                            })
                            .catch(error => console.error('Error al obtener y eliminar el cliente:', error));
                    });
                    crudButtonsContainer.appendChild(deletecustomer);
                    crudCell.appendChild(crudButtonsContainer);
                });
            })
            .catch(error => console.error('Error fetching customers:', error));
    }

    document.getElementById('btnFirstPage').addEventListener('click', () => goToPage(1));
    document.getElementById('btnPrevPage').addEventListener('click', () => goToPage(currentPage - 1));
    document.getElementById('btnNextPage').addEventListener('click', () => goToPage(currentPage + 1));

    fetchCustomers(currentPage);

    // Crear Customer POST
    document.getElementById('customerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            store_id: document.getElementById('store_id').value,
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            address_id: document.getElementById('address_id').value,
          };
        console.log(formData);

        fetch('/customers/crear', {
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
                    throw new Error('Error al agregar el cliente');
                }
            })
            .catch(error => console.error('Error al añadir el cliente:', error));
    });

    // Editar Customers PUT
    document.getElementById('customersTable').addEventListener('click', function (event) {
        if (event.target.classList.contains('popup-trigger-edit')) {
            showPopupEdit();
        }
    });

    let currentCustomerId = '';

    function showPopupEdit() {
        popupEdit.style.display = 'block';
        overlayEdit.style.display = 'block';

        currentCustomerId = event.target.closest('tr').dataset.customerId;

        fetch(`/customers/${currentCustomerId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del cliente');
                }
                return response.json();
            })
            .then(customer => {
                document.getElementById('store_id-Edit').value = customer.store_id;
                document.getElementById('first_name-Edit').value = customer.first_name;
                document.getElementById('last_name-Edit').value = customer.last_name;
                document.getElementById('email-Edit').value = customer.email;
                document.getElementById('address_id-Edit').value = customer.address_id;
            })
            .catch(error => console.error('Error fetching customer details:', error));
    }

    document.getElementById('customerFormEdit').addEventListener('submit', function (event) {
        event.preventDefault();

        const customerId = currentCustomerId;
        console.log('customerId:', customerId);

        const formDataEdit = {
            store_id: document.getElementById('store_id-Edit').value,
            first_name: document.getElementById('first_name-Edit').value,
            last_name: document.getElementById('last_name-Edit').value,
            email: document.getElementById('email-Edit').value,
            address_id: document.getElementById('address_id-Edit').value,
        }

        fetch(`/customers/${customerId}`, {
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
                    throw new Error('Error al editar el cliente');
                }
                console.log('Cliente actualizado con éxito');
            })
            .catch(error => console.error('Error updating customer details:', error));
    })
});