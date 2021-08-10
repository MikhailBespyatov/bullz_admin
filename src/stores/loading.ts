import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

const [initialLoading, updateInitialLoading] = initializeToggleStore();
const [loading, updateLoading] = initializeToggleStore();

const loadingEffects = { updateLoading, updateInitialLoading };
const loadingStores = { loading, initialLoading };

export { loadingStores, loadingEffects };
