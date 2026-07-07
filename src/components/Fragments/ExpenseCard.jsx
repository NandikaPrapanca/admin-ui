import React from "react";
import Icon from "../Elements/Icon";

/**
 * ExpenseCard — layout identik dengan item di CardExpenseBreakdown (dashboard),
 * ditambah section detail transaksi di bawahnya.
 *
 * Props:
 *   item: { category, amount, percentage, trend, detail: [{item, amount, date}] }
 */

// Map category (lowercase) ke icon dan label — sama persis dengan data.jsx di dashboard
const categoryMap = {
  housing:        { icon: <Icon.House />,     label: "Housing" },
  food:           { icon: <Icon.Food />,      label: "Food" },
  transportation: { icon: <Icon.Transport />, label: "Transportation" },
  entertainment:  { icon: <Icon.Gamepad />,   label: "Entertainment" },
  shopping:       { icon: <Icon.Shopping />,  label: "Shopping" },
  others:         { icon: <Icon.Other />,     label: "Others" },
};

// Arrow JSX — sama persis dengan pola arrow di data.jsx
function ArrowIcon({ trend }) {
  if (trend === "up") {
    return (
      <div className="text-special-red">
        <Icon.ArrowUp size={16} />
      </div>
    );
  }
  return (
    <div className="text-special-green">
      <Icon.ArrowDown size={16} />
    </div>
  );
}

function ExpenseCard({ item }) {
  const key  = item?.category?.toLowerCase?.() ?? "";
  const meta = categoryMap[key] ?? {
    icon:  <Icon.Other />,
    label: item?.category ?? "Unknown",
  };
  const details = Array.isArray(item?.detail) ? item.detail : [];

  return (
    <div className="bg-white rounded-lg shadow-xl px-6 py-5 flex flex-col">

      {/* ── Header: identik dengan satu item di CardExpenseBreakdown ── */}
      <div className="flex items-center justify-between">
        <div className="flex">
          {/* Icon box — copy persis dari CardExpenseBreakdown */}
          <div>
            <div className="bg-special-bg text-gray-02 px-3 py-5 rounded-lg flex flex-col place-content-center">
              {meta.icon}
            </div>
          </div>

          {/* Category + Amount + Percentage + Arrow */}
          <div className="ms-4">
            <span className="text-gray-02">{meta.label}</span>
            <br />
            <span className="font-bold text-lg">${item?.amount ?? 0}</span>
            <div className="flex items-center">
              <span className="text-gray-02">{item?.percentage ?? 0}%</span>
              <span className="ms-1">
                <ArrowIcon trend={item?.trend} />
              </span>
            </div>
          </div>
        </div>

        {/* Arrow right — identik dengan CardExpenseBreakdown */}
        <div className="flex place-content-center flex-col me-2">
          <Icon.ArrowRight />
        </div>
      </div>

      {/* ── Divider pemisah header dan detail ── */}
      {details.length > 0 && (
        <div className="border-b border-gray-05 my-3"></div>
      )}

      {/* ── Detail transaksi ── */}
      {details.length === 0 ? (
        <p className="text-xs text-gray-03 mt-3">No transactions</p>
      ) : (
        <div className="flex flex-col">
          {details.map((tx, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center py-2">
                {/* Nama transaksi — rata kiri */}
                <span className="text-sm text-gray-01">{tx?.item ?? "-"}</span>

                {/* Nominal + tanggal — rata kanan */}
                <div className="text-right">
                  <div className="font-bold text-sm">${tx?.amount ?? 0}</div>
                  <div className="text-xs text-gray-03">{tx?.date ?? ""}</div>
                </div>
              </div>

              {/* Divider antar transaksi, kecuali setelah yang terakhir */}
              {idx < details.length - 1 && (
                <div className="border-b border-gray-05"></div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default ExpenseCard;
