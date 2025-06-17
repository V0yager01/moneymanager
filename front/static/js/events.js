import { page, create_page, update_page } from './state.js';
import { rerender, loadCategory, loadSubCategory, rerenderPostForm } from './render.js';
import { apiRequest } from './api.js';

export function registerEventListeners() {
    
    page.filter_form.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;
        const filters = {
            datefrom: form.date_from.value || undefined,
            dateto: form.date_to.value || undefined,
            status: form.status.value || undefined,
            type: form.type.value || undefined,
            category: form.category.value || undefined,
            subcategory: form.subcategory.value || undefined
        };

        const filtered = page.transfers.filter(transfer => {
            if (filters.datefrom && transfer.date < filters.datefrom) return false;
            if (filters.dateto && transfer.date > filters.dateto) return false;
            if (filters.status && transfer.status.id != filters.status) return false;
            if (filters.type && transfer.transfer_type.id != filters.type) return false;
            if (filters.category && transfer.category.id != filters.category) return false;
            if (filters.subcategory && transfer.subcategory.id != filters.subcategory) return false;
            return true;
        });

        rerender(filtered);
    });

    page.create_button.addEventListener('click', async () => {
        page.main_page.classList.add('d-none');
        page.create_page.classList.remove('d-none');
        await rerenderPostForm();
    });

    create_page.type_select.addEventListener('change', async (event) => {
        const type_id = event.target.value;
        if (type_id) {
            await loadCategory(create_page, type_id);
            create_page.subcategory_select.innerHTML = '<option value="" disabled selected>Выберите подкатегорию</option>';
            create_page.subcategory_select.disabled = true;
        }
    });

    create_page.category_select.addEventListener('change', async (event) => {
        const category_id = event.target.value;
        if (category_id) {
            await loadSubCategory(create_page, category_id);
        }
    });

    create_page.create_form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const data = {
            transfer_type_id: parseInt(form.transfer_type.value),
            category_id: parseInt(form.category.value),
            subcategory_id: parseInt(form.subcategory.value),
            status_id: parseInt(form.status.value),
            money_sum: parseInt(form.moneysum.value),
            comment: form.comment.value,
            date: form.date.value
        };
        await apiRequest('transfer/', 'post', data);
        location.reload();
    });

    update_page.type_select.addEventListener('change', async (event) => {
        const type_id = event.target.value;
        if (type_id) {
            await loadCategory(update_page, type_id);
            update_page.subcategory_select.innerHTML = '<option value="" disabled selected>Выберите подкатегорию</option>';
            update_page.subcategory_select.disabled = true;
        }
    });

    update_page.category_select.addEventListener('change', async (event) => {
        const category_id = event.target.value;
        if (category_id) {
            await loadSubCategory(update_page, category_id);
        }
    });

    create_page.back_button.addEventListener('click', () => {
        create_page.create_page.classList.add('d-none');
        page.main_page.classList.remove('d-none');
    });

    update_page.back_button.addEventListener('click', () => {
        page.update_page.classList.add('d-none');
        page.main_page.classList.remove('d-none');
    });

    update_page.delete_button.addEventListener('click', async () => {
      await apiRequest(`transfer/${page.transfer_selected.id}/`, 'delete');
      page.update_page.classList.add('d-none');
      page.main_page.classList.remove('d-none');
      location.reload();



    })
    update_page.update_form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const data = {
            transfer_type_id: parseInt(form.transfer_type.value),
            category_id: parseInt(form.category.value),
            subcategory_id: parseInt(form.subcategory.value),
            status_id: parseInt(form.status.value),
            money_sum: parseInt(form.moneysum.value),
            comment: form.comment.value,
            date: form.date.value
        };
        await apiRequest(`transfer/${page.transfer_selected.id}/`, 'put', data);
        location.reload();
    });

}