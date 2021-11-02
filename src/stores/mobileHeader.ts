import { createEvent, createStore } from 'effector';

const showSidebar = createEvent();
const showFilter = createEvent();
const showSearch = createEvent();

const sidebarVisible = createStore<boolean>(false).on(showSidebar, state => !state);
const filterVisible = createStore<boolean>(false).on(showFilter, state => !state);
const searchVisible = createStore<boolean>(false).on(showSearch, state => !state);

export const mobileHeaderEvents = { showSidebar, showFilter, showSearch };
export const mobileHeaderStores = { sidebarVisible, filterVisible, searchVisible };
