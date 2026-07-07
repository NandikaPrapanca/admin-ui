import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import ExpenseCard from "../components/Fragments/ExpenseCard";
import CircularProgress from "@mui/material/CircularProgress";
import { expenseService } from "../services/dataService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/Elements/AppSnackbar";

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await expenseService();
      setExpenses(data);
    } catch (err) {
      console.error("Gagal mengambil data expenses:", err);
      setSnackbar({
        open: true,
        message: err?.msg || "Gagal mengambil data expenses",
        severity: "error",
      });
      if (err?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <MainLayout>
      <div>
        {/* Judul — sesuai referensi */}
        <div className="text-2xl font-bold mb-6">Expenses Comparison</div>

        {/* Loader — pola sama dengan CardGoal */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 text-primary">
            <CircularProgress color="inherit" size={50} />
            <span className="mt-3">Loading Data</span>
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center text-gray-03 mt-10">
            Tidak ada data expenses.
          </div>
        ) : (
          /* Grid 3 kolom — identik dengan grid di CardExpenseBreakdown */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenses.map((item, idx) => (
              <ExpenseCard key={item?.category ?? idx} item={item} />
            ))}
          </div>
        )}
      </div>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </MainLayout>
  );
}

export default ExpensePage;
