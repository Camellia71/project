import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { TableProps } from 'antd';
import {
  addSelectedIds,
  removeSelectedIds,
  clearSelectedIds,
} from '../store/selection/selectedIdsSlice';
import type { RootState } from '../store';

export interface UseTableSelectionOptions<T> {
  tableKey: string;
  rowKey?: keyof T;
}

export interface UseTableSelectionResult<T> {
  rowSelection: TableProps<T>['rowSelection'];
  selectedIds: string[];
  isAllSelected: boolean;
  selectAll: () => void;
  deselectAll: () => void;
  clearSelection: () => void;
  toggleRow: (id: string) => void;
}

function useTableSelection<T extends object>(
  dataSource: T[],
  options: UseTableSelectionOptions<T>
): UseTableSelectionResult<T> {
  const { tableKey, rowKey = 'id' as keyof T } = options;
  const dispatch = useDispatch();

  const globalSelectedIds = useSelector((state: RootState) => {
    const ids = state.selectedIds.selectedIds.get(tableKey);
    return ids ? Array.from(ids) : [];
  });

  const localSelectedIds = useMemo(() => {
    const currentPageIds = new Set(
      dataSource.map(item => String(item[rowKey]))
    );
    return new Set(
      globalSelectedIds.filter(id => currentPageIds.has(id))
    );
  }, [dataSource, globalSelectedIds, rowKey]);

  const isAllSelected = dataSource.length > 0 && 
    dataSource.every(item => localSelectedIds.has(String(item[rowKey])));

  const handleSelectChange = useCallback((selectedRowKeys: React.Key[]) => {
    const stringKeys = selectedRowKeys.map(k => String(k));
    const newSelected = new Set(stringKeys);
    
    const added = stringKeys.filter(k => !localSelectedIds.has(k));
    const removed = Array.from(localSelectedIds).filter(k => !newSelected.has(k));
    
    if (added.length > 0) {
      dispatch(addSelectedIds({ tableKey, ids: added }));
    }
    if (removed.length > 0) {
      dispatch(removeSelectedIds({ tableKey, ids: removed }));
    }
  }, [tableKey, localSelectedIds, dispatch]);

  const handleSelectAll = useCallback(() => {
    const allIds = dataSource.map(item => String(item[rowKey]));
    dispatch(addSelectedIds({ tableKey, ids: allIds }));
  }, [tableKey, dataSource, rowKey, dispatch]);

  const handleSelectNone = useCallback(() => {
    const currentIds = dataSource.map(item => String(item[rowKey]));
    dispatch(removeSelectedIds({ tableKey, ids: currentIds }));
  }, [tableKey, dataSource, rowKey, dispatch]);

  const selectAll = useCallback(() => {
    handleSelectAll();
  }, [handleSelectAll]);

  const deselectAll = useCallback(() => {
    handleSelectNone();
  }, [handleSelectNone]);

  const clearSelection = useCallback(() => {
    dispatch(clearSelectedIds(tableKey));
  }, [tableKey, dispatch]);

  const toggleRow = useCallback((id: string) => {
    if (globalSelectedIds.includes(id)) {
      dispatch(removeSelectedIds({ tableKey, ids: [id] }));
    } else {
      dispatch(addSelectedIds({ tableKey, ids: [id] }));
    }
  }, [tableKey, globalSelectedIds, dispatch]);

  const rowSelection: TableProps<T>['rowSelection'] = {
    type: 'checkbox',
    selectedRowKeys: Array.from(localSelectedIds),
    onChange: handleSelectChange,
    onSelectAll: selected => {
      if (selected) {
        handleSelectAll();
      } else {
        handleSelectNone();
      }
    },
  };

  return {
    rowSelection,
    selectedIds: globalSelectedIds,
    isAllSelected,
    selectAll,
    deselectAll,
    clearSelection,
    toggleRow,
  };
}

export { useTableSelection };
