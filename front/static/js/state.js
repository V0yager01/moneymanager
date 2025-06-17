export const page = {
  main_page: document.getElementById('mainpage'),
  transfers: [],
  tbody: document.getElementById('tbody'),
  filter_form: document.getElementById('filterform'),
  create_button: document.getElementById('createbutton'),
  create_page: document.getElementById('createpage'),
  update_page: document.getElementById('updatepage'),
  transfer_selected: {}
};

export const create_page = {
    status_select: document.getElementById('selectstatus'),
    type_select: document.getElementById('selecttype'),
    category_select: document.getElementById('selectcategory'),
    subcategory_select: document.getElementById('selectsubcategory'),
    create_form: document.getElementById('postForm'),
    back_button: document.getElementById('backButton'),
    main_page: document.getElementById('mainpage'),
    create_page: document.getElementById('createpage'),
}

export const update_page = {
    back_button: document.getElementById('backUpdateButton'),
    update_button: document.getElementById('updateButton'),
    update_form: document.getElementById('postFormUpdate'),
    status_select: document.getElementById('selectstatusUpdate'),
    type_select: document.getElementById('selecttypeUpdate'),
    category_select: document.getElementById('selectcategoryUpdate'),
    subcategory_select: document.getElementById('selectsubcategoryUpdate'),
    date: document.getElementById('dateUpdate'),
    money_sum: document.getElementById('moneysumUpdate'),
    comment: document.getElementById('commentUpdate'),
    delete_button: document.getElementById('deleteButton')
}

export const loaded_filters = {
  type: [],
  type_select: document.getElementById('typeSelect'),
  status: [],
  status_select: document.getElementById('statusSelect'),
  category: [],
  category_select: document.getElementById('categorySelect'),
  subcategory: [],
  subcategory_select: document.getElementById('subcategorySelect'),
};
