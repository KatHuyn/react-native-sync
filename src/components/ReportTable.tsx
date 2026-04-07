import { useState, useMemo, useRef, useCallback } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, ChevronDown, ChevronRight, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
export interface Column<T> {
  key: string;
  label: string;
  width?: number;
  minWidth?: number;
  sticky?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  expandable?: boolean;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, expanded: boolean) => React.ReactNode;
}

export interface ReportTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string;
  expandedContent?: (row: T) => React.ReactNode;
}

// --- Filter Popover ---
interface FilterPopoverProps {
  column: Column<any>;
  uniqueValues: string[];
  activeFilters: Set<string>;
  searchText: string;
  onSearchChange: (text: string) => void;
  onToggleFilter: (value: string) => void;
  onClearFilters: () => void;
  onClose: () => void;
  sortDirection: "asc" | "desc" | null;
  onSort: (dir: "asc" | "desc") => void;
}

const FilterPopover = ({
  column,
  uniqueValues,
  activeFilters,
  searchText,
  onSearchChange,
  onToggleFilter,
  onClearFilters,
  onClose,
  sortDirection,
  onSort,
}: FilterPopoverProps) => {
  const filteredValues = uniqueValues.filter((v) =>
    v.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div
      className="absolute top-full left-0 z-50 mt-1 bg-white rounded-lg shadow-xl border border-slate-200 w-48 animate-in fade-in slide-in-from-top-2 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sort buttons */}
      {column.sortable !== false && (
        <div className="px-2 pt-2 pb-1 border-b border-slate-100 flex gap-1">
          <button
            onClick={() => onSort("asc")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider transition-all",
              sortDirection === "asc"
                ? "bg-[#1AB1A5] text-white"
                : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            )}
          >
            <ArrowUp className="w-2.5 h-2.5" /> A→Z
          </button>
          <button
            onClick={() => onSort("desc")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider transition-all",
              sortDirection === "desc"
                ? "bg-[#1AB1A5] text-white"
                : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            )}
          >
            <ArrowDown className="w-2.5 h-2.5" /> Z→A
          </button>
        </div>
      )}

      {/* Filter section */}
      {column.filterable !== false && (
        <div className="p-2">
          <div className="relative mb-1.5">
            <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-slate-300" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full pl-5 pr-2 py-1 text-[8px] font-bold border border-slate-200 rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#1AB1A5] focus:border-[#1AB1A5] placeholder:text-slate-300"
            />
          </div>

          <div className="max-h-28 overflow-y-auto space-y-0.5 custom-scrollbar">
            {filteredValues.map((val) => (
              <label
                key={val}
                className="flex items-center gap-1.5 px-1 py-0.5 rounded hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.size === 0 || activeFilters.has(val)}
                  onChange={() => onToggleFilter(val)}
                  className="w-2.5 h-2.5 rounded border-slate-300 text-[#1AB1A5] focus:ring-[#1AB1A5] focus:ring-offset-0"
                />
                <span className="text-[7px] font-bold text-slate-600 truncate">
                  {val || "(Trống)"}
                </span>
              </label>
            ))}
          </div>

          {activeFilters.size > 0 && (
            <button
              onClick={onClearFilters}
              className="w-full mt-1.5 flex items-center justify-center gap-1 px-2 py-1 rounded bg-rose-50 text-rose-500 text-[7px] font-black uppercase tracking-wider hover:bg-rose-100 transition-colors"
            >
              <X className="w-2 h-2" /> Bỏ lọc
            </button>
          )}
        </div>
      )}

      {/* Close */}
      <div className="px-2 pb-2">
        <button
          onClick={onClose}
          className="w-full px-2 py-1 rounded bg-slate-900 text-white text-[7px] font-black uppercase tracking-wider hover:bg-slate-800 transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

// --- Main ReportTable ---
function ReportTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  expandedContent,
}: ReportTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filterConfigs, setFilterConfigs] = useState<
    Record<string, Set<string>>
  >({});
  const [filterSearchTexts, setFilterSearchTexts] = useState<
    Record<string, string>
  >({});
  const [activeFilterCol, setActiveFilterCol] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);

  // Unique values per column for filter
  const uniqueValuesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    columns.forEach((col) => {
      if (col.filterable !== false) {
        const vals = new Set<string>();
        data.forEach((row) => {
          const v = String(row[col.key] ?? "");
          vals.add(v);
        });
        map[col.key] = Array.from(vals).sort();
      }
    });
    return map;
  }, [columns, data]);

  // Apply filters + sort
  const processedData = useMemo(() => {
    let result = [...data];

    // Filter
    Object.entries(filterConfigs).forEach(([key, filterSet]) => {
      if (filterSet.size > 0) {
        result = result.filter((row) => filterSet.has(String(row[key] ?? "")));
      }
    });

    // Sort
    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        
        // Try numeric comparison first
        const aNum = typeof aVal === 'number' ? aVal : parseFloat(String(aVal).replace(/,/g, ""));
        const bNum = typeof bVal === 'number' ? bVal : parseFloat(String(bVal).replace(/,/g, ""));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return direction === "asc" ? aNum - bNum : bNum - aNum;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return direction === "asc" ? -1 : 1;
        if (aStr > bStr) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filterConfigs, sortConfig]);

  const handleSort = useCallback(
    (key: string, direction: "asc" | "desc") => {
      setSortConfig((prev) =>
        prev?.key === key && prev.direction === direction
          ? null
          : { key, direction }
      );
    },
    []
  );

  const handleToggleFilter = useCallback(
    (columnKey: string, value: string) => {
      setFilterConfigs((prev) => {
        const current = new Set(prev[columnKey] || []);
        if (current.has(value)) {
          current.delete(value);
        } else {
          current.add(value);
        }
        return { ...prev, [columnKey]: current };
      });
    },
    []
  );

  const handleClearFilters = useCallback((columnKey: string) => {
    setFilterConfigs((prev) => {
      const next = { ...prev };
      delete next[columnKey];
      return next;
    });
  }, []);

  const toggleRowExpand = useCallback((key: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const hasActiveFilter = (key: string) =>
    filterConfigs[key] && filterConfigs[key].size > 0;

  const stickyColumns = columns.filter((c) => c.sticky);
  const scrollColumns = columns.filter((c) => !c.sticky);
  const stickyWidth = stickyColumns.reduce(
    (sum, c) => sum + (c.width || c.minWidth || 64),
    0
  );

  return (
    <div className="relative w-full">
      {/* Active filters summary */}
      {Object.keys(filterConfigs).some(k => filterConfigs[k]?.size > 0) && (
        <div className="px-2 py-1 bg-[#1AB1A5]/5 border-b border-[#1AB1A5]/10 flex items-center gap-1 flex-wrap">
          <Filter className="w-2.5 h-2.5 text-[#1AB1A5] shrink-0" />
          <span className="text-[7px] font-black text-[#1AB1A5] uppercase tracking-widest">Đang lọc:</span>
          {Object.entries(filterConfigs).map(([key, filterSet]) => {
            if (filterSet.size === 0) return null;
            const col = columns.find(c => c.key === key);
            return (
              <div key={key} className="flex items-center gap-0.5 bg-[#1AB1A5]/10 rounded px-1.5 py-0.5">
                <span className="text-[6px] font-black text-[#1AB1A5] uppercase">{col?.label}: {filterSet.size}</span>
                <button
                  onClick={() => handleClearFilters(key)}
                  className="text-[#1AB1A5] hover:text-[#1AB1A5]/70"
                >
                  <X className="w-2 h-2" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Results count */}
      <div className="px-2 py-1 bg-white border-b border-slate-100 flex items-center justify-between">
        <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">
          {processedData.length} / {data.length} kết quả
        </span>
      </div>

      {/* Table container */}
      <div
        ref={tableRef}
        className="overflow-x-auto overflow-y-visible w-full"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <table className="w-full border-collapse" style={{ minWidth: stickyWidth + scrollColumns.length * 80 }}>
          {/* Header */}
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "bg-slate-800 text-left px-2 py-1.5 select-none whitespace-nowrap border-r border-slate-700/50 last:border-r-0",
                    col.sticky && "sticky left-0 z-20"
                  )}
                  style={{
                    width: col.width || col.minWidth || undefined,
                    minWidth: col.minWidth || 60,
                    ...(col.sticky
                      ? {
                          boxShadow: "3px 0 6px -2px rgba(0,0,0,0.15)",
                        }
                      : {}),
                  }}
                >
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveFilterCol(
                          activeFilterCol === col.key ? null : col.key
                        )
                      }
                      className="flex items-center gap-1 w-full group"
                    >
                      <span
                        className={cn(
                          "text-[7px] font-black uppercase tracking-wider leading-none",
                          hasActiveFilter(col.key)
                            ? "text-[#1AB1A5]"
                            : "text-white/80"
                        )}
                      >
                        {col.label}
                      </span>
                      <div className="flex items-center gap-0.5 ml-auto opacity-50 group-hover:opacity-100 transition-opacity">
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === "asc" ? (
                            <ArrowUp className="w-2 h-2 text-[#1AB1A5]" />
                          ) : (
                            <ArrowDown className="w-2 h-2 text-[#1AB1A5]" />
                          )
                        ) : (
                          <ArrowUpDown className="w-2 h-2 text-white/40" />
                        )}
                        {hasActiveFilter(col.key) && (
                          <Filter className="w-2 h-2 text-[#1AB1A5]" />
                        )}
                      </div>
                    </button>

                    {/* Filter popover */}
                    {activeFilterCol === col.key && (
                      <FilterPopover
                        column={col}
                        uniqueValues={uniqueValuesMap[col.key] || []}
                        activeFilters={filterConfigs[col.key] || new Set()}
                        searchText={filterSearchTexts[col.key] || ""}
                        onSearchChange={(text) =>
                          setFilterSearchTexts((prev) => ({
                            ...prev,
                            [col.key]: text,
                          }))
                        }
                        onToggleFilter={(val) =>
                          handleToggleFilter(col.key, val)
                        }
                        onClearFilters={() => handleClearFilters(col.key)}
                        onClose={() => setActiveFilterCol(null)}
                        sortDirection={
                          sortConfig?.key === col.key
                            ? sortConfig.direction
                            : null
                        }
                        onSort={(dir) => handleSort(col.key, dir)}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {processedData.map((row, rowIndex) => {
              const key = rowKey(row, rowIndex);
              const isExpanded = expandedRows.has(key);
              const hasExpandableContent = columns.some(
                (c) => c.expandable && row[c.key]
              ) || !!expandedContent;

              return (
                <>
                  <tr
                    key={key}
                    onClick={() =>
                      hasExpandableContent && toggleRowExpand(key)
                    }
                    className={cn(
                      "transition-colors border-b border-slate-100/80",
                      rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                      hasExpandableContent &&
                        "cursor-pointer hover:bg-[#1AB1A5]/5 active:bg-[#1AB1A5]/10",
                      isExpanded && "bg-[#1AB1A5]/5"
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-2 py-1.5 border-r border-slate-100/80 last:border-r-0",
                          col.sticky &&
                            (rowIndex % 2 === 0
                              ? "sticky left-0 z-10 bg-white"
                              : "sticky left-0 z-10 bg-slate-50/60"),
                          isExpanded && col.sticky && "bg-[#1AB1A5]/5",
                          col.align === "right" && "text-right",
                          col.align === "center" && "text-center"
                        )}
                        style={{
                          width: col.width || col.minWidth || undefined,
                          minWidth: col.minWidth || 60,
                          ...(col.sticky
                            ? {
                                boxShadow:
                                  "3px 0 6px -2px rgba(0,0,0,0.08)",
                              }
                            : {}),
                        }}
                      >
                        {col.render ? (
                          col.render(row[col.key], row, isExpanded)
                        ) : col.expandable ? (
                          <div
                            className={cn(
                              "text-[7px] font-bold text-slate-500 leading-tight transition-all duration-200",
                              !isExpanded && "line-clamp-1"
                            )}
                          >
                            {String(row[col.key] || "-")}
                          </div>
                        ) : (
                          <span className="text-[8px] font-bold text-slate-700 whitespace-nowrap">
                            {String(row[col.key] ?? "-")}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Expanded row content */}
                  {isExpanded && expandedContent && (
                    <tr key={`${key}-expanded`}>
                      <td
                        colSpan={columns.length}
                        className="bg-[#1AB1A5]/[0.03] border-b border-[#1AB1A5]/10 p-0"
                      >
                        <div className="animate-in slide-in-from-top-1 fade-in duration-200">
                          {expandedContent(row)}
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Expanded details for expandable columns (when no custom expandedContent) */}
                  {isExpanded && !expandedContent && (
                    <tr key={`${key}-details`}>
                      <td
                        colSpan={columns.length}
                        className="bg-[#1AB1A5]/[0.03] border-b border-[#1AB1A5]/10 p-0"
                      >
                        <div className="px-3 py-2 space-y-1.5 animate-in slide-in-from-top-1 fade-in duration-200">
                          {columns
                            .filter((c) => c.expandable && row[c.key])
                            .map((col) => (
                              <div key={col.key}>
                                <p className="text-[6px] font-black text-[#1AB1A5] uppercase tracking-widest mb-0.5">
                                  {col.label}
                                </p>
                                <p className="text-[8px] font-bold text-slate-600 leading-relaxed bg-white/80 rounded px-2 py-1.5 border border-[#1AB1A5]/10">
                                  {String(row[col.key])}
                                </p>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Click outside to close popover */}
      {activeFilterCol && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveFilterCol(null)}
        />
      )}
    </div>
  );
}

export default ReportTable;
