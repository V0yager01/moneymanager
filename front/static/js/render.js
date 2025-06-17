import { page, loaded_filters, create_page, update_page } from './state.js';
import { apiRequest, get_transfer_list, get_filter_list } from './api.js';


export async function loadType(page_block, selected_id = null) {
    const types = await apiRequest('type/');
    page_block.type_select.innerHTML = '<option value="" disabled selected>Выберите тип</option>';
    for (const type of types) {
        const opt = document.createElement('option');
        opt.value = type.id;
        opt.innerText = type.name;
        if (selected_id && parseInt(opt.value) === selected_id) {
            opt.selected = true;
        }
        page_block.type_select.appendChild(opt);
    }
}

export async function loadCategory(page_block, type_id, selected_id = null) {
    const categories = await apiRequest(`category/?search=${type_id}`);
    page_block.category_select.innerHTML = '<option value="" disabled selected>Выберите категорию</option>';
    for (const cat of categories) {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.innerText = cat.name;
        if (selected_id && parseInt(opt.value) === selected_id) {
            opt.selected = true;
        }
        page_block.category_select.appendChild(opt);
    }
    page_block.category_select.disabled = false;
}

export async function loadSubCategory(page_block, category_id, selected_id = null) {
    const subcategories = await apiRequest(`subcategory/?search=${category_id}`);
    page_block.subcategory_select.innerHTML = '<option value="" disabled selected>Выберите подкатегорию</option>';
    for (const subcat of subcategories) {
        const opt = document.createElement('option');
        opt.value = subcat.id;
        opt.innerText = subcat.name;
        if (selected_id && parseInt(opt.value) === selected_id) {
            opt.selected = true;
        }
        page_block.subcategory_select.appendChild(opt);
    }
    page_block.subcategory_select.disabled = false;
}

export async function loadStatus(page_block, selected_id = null) {
    const statuses = await apiRequest('status/');
    page_block.status_select.innerHTML = '<option value="" disabled selected>Выберите статус</option>';
    for (const stat of statuses) {
        const opt = document.createElement('option');
        opt.value = stat.id;
        opt.innerText = stat.name;
        if (selected_id && parseInt(opt.value) === selected_id) {
            opt.selected = true;
        }
        page_block.status_select.appendChild(opt);
    }
}


export async function rerenderPostForm() {
    await loadType(create_page);
    await loadStatus(create_page);
}


export async function rerenderUpdateForm() {
    const transfer = page.transfer_selected;
    await loadType(update_page, transfer.transfer_type.id);
    await loadCategory(update_page, transfer.transfer_type.id, transfer.category.id);
    await loadSubCategory(update_page, transfer.category.id, transfer.subcategory.id);
    await loadStatus(update_page, transfer.status.id);

    update_page.money_sum.value = transfer.money_sum;
    update_page.date.value = transfer.date;
    update_page.comment.value = transfer.comment;
}


export async function rerender(transfer_list = null) { 
    if (!transfer_list) {
        page.transfers = await get_transfer_list();
        transfer_list = page.transfers;
    }
    page.tbody.innerHTML = "";
    for (const transfer of transfer_list) {
        const tr = document.createElement('tr');
        tr.id = transfer.id;
        tr.innerHTML = `
            <td>${transfer.transfer_type.name}</td>
            <td>${transfer.status.name}</td>
            <td>${transfer.category.name}</td>
            <td>${transfer.subcategory.name}</td>
            <td>${transfer.money_sum}</td>
            <td>${transfer.comment}</td>
            <td>${transfer.date}</td>
        `;
        tr.addEventListener('click', async () => {
            page.transfer_selected = transfer;
            page.main_page.classList.add('d-none');
            page.update_page.classList.remove('d-none');
            await rerenderUpdateForm();
        });
        page.tbody.appendChild(tr);
    }

    const filters = await get_filter_list();
    loaded_filters.type = filters.type;
    loaded_filters.category = filters.category;
    loaded_filters.subcategory = filters.subcategory;
    loaded_filters.status = filters.status;
    rerenderFilters();
}


function rerenderFilters() {
    rerenderSelect(loaded_filters.type_select, loaded_filters.type, 'Все');
    rerenderSelect(loaded_filters.category_select, loaded_filters.category, 'Все');
    rerenderSelect(loaded_filters.subcategory_select, loaded_filters.subcategory, 'Все');
    rerenderSelect(loaded_filters.status_select, loaded_filters.status, 'Все');
}

function rerenderSelect(select_element, data_list, default_text) {
    select_element.innerHTML = `<option value="">${default_text}</option>`;
    for (const item of data_list) {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.innerText = item.name;
        select_element.appendChild(opt);
    }
}