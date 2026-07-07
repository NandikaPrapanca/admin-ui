import React, { useContext, useEffect, useState } from "react";
import Card from "../Elements/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { billService } from "../../services/dataService";
import { AuthContext } from "../../context/authContext";
import Icon from "../Elements/Icon";

// Map logo filename (dari API) ke icon komponen
const logoIconMap = {
  "Figma.png": <Icon.Figma size={22} />,
  "Adobe.png": <Icon.Adobe size={22} />,
};

function CardUpcomingBill() {
  const [bills, setBills] = useState(null); // null = sedang loading
  const { logout } = useContext(AuthContext);

  const fetchBills = async () => {
    try {
      const data = await billService();
      // billService returns response.data.data — pastikan array
      setBills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal mengambil data bills:", err);
      if (err?.status === 401) {
        logout();
      }
      setBills([]);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // ── Loading: CircularProgress tepat di tengah card ──
  const loadingContent = (
    <div className="flex flex-col justify-center items-center h-full text-primary">
      <CircularProgress color="inherit" size={50} />
      <span className="mt-3 text-sm">Loading Data</span>
    </div>
  );

  // ── Empty state ──
  const emptyContent = (
    <div className="flex flex-col justify-center items-center h-full text-gray-03">
      <Icon.Bill size={40} />
      <p className="mt-3 text-sm">Tidak ada tagihan.</p>
    </div>
  );

  // ── Data content ──
  const billsContent = (
    <div className="flex flex-col justify-around h-full divide-y divide-gray-05">
      {bills && bills.map((item) => (
        <div key={item.id} className="flex justify-between items-start py-4 first:pt-0 last:pb-0">
          {/* Kiri: Tanggal box */}
          <div className="flex items-start gap-4">
            <div className="bg-special-bg rounded-lg px-3 py-2 flex flex-col items-center min-w-[52px] shrink-0">
              <span className="text-xs text-gray-03 leading-tight">{item.month ?? "-"}</span>
              <span className="text-2xl font-bold leading-tight">{item.date ?? "-"}</span>
            </div>

            {/* Tengah: icon + nama + deskripsi */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                {logoIconMap[item.logo] ?? <Icon.Bill size={18} />}
                <span className="font-bold text-sm leading-tight">{item.name ?? "-"}</span>
              </div>
              <p className="text-xs text-gray-03 leading-snug line-clamp-2">
                {item.description ?? ""}
              </p>
            </div>
          </div>

          {/* Kanan: Nominal */}
          <div className="flex items-center ml-3 shrink-0">
            <span className="py-1.5 px-3 border border-gray-05 rounded-lg font-bold text-sm whitespace-nowrap">
              ${item.amount ?? 0}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  let content;
  if (bills === null) {
    content = loadingContent;
  } else if (bills.length === 0) {
    content = emptyContent;
  } else {
    content = billsContent;
  }

  return (
    <Card
      title="Upcoming Bill"
      link="/bill"
      desc={content}
    />
  );
}

export default CardUpcomingBill;
