import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
  selectedIds: Map<string, Set<string>>;
}

const initialState: SelectionState = {
  selectedIds: new Map(),
};

export const selectedIdsSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    addSelectedIds: (state, action: PayloadAction<{ tableKey: string; ids: string[] }>) => {
      const { tableKey, ids } = action.payload;
      const currentIds = state.selectedIds.get(tableKey) || new Set();
      ids.forEach(id => currentIds.add(id));
      state.selectedIds.set(tableKey, currentIds);
    },
    removeSelectedIds: (state, action: PayloadAction<{ tableKey: string; ids: string[] }>) => {
      const { tableKey, ids } = action.payload;
      const currentIds = state.selectedIds.get(tableKey) || new Set();
      ids.forEach(id => currentIds.delete(id));
      state.selectedIds.set(tableKey, currentIds);
    },
    toggleSelectedId: (state, action: PayloadAction<{ tableKey: string; id: string }>) => {
      const { tableKey, id } = action.payload;
      const currentIds = state.selectedIds.get(tableKey) || new Set();
      if (currentIds.has(id)) {
        currentIds.delete(id);
      } else {
        currentIds.add(id);
      }
      state.selectedIds.set(tableKey, currentIds);
    },
    clearSelectedIds: (state, action: PayloadAction<string>) => {
      state.selectedIds.delete(action.payload);
    },
    setSelectedIds: (state, action: PayloadAction<{ tableKey: string; ids: string[] }>) => {
      const { tableKey, ids } = action.payload;
      state.selectedIds.set(tableKey, new Set(ids));
    },
  },
});

export const {
  addSelectedIds,
  removeSelectedIds,
  toggleSelectedId,
  clearSelectedIds,
  setSelectedIds,
} = selectedIdsSlice.actions;

export default selectedIdsSlice.reducer;