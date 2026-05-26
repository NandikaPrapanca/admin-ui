import React from 'react'
import MainLayout from '../components/Layouts/MainLayout'
import CardBalance from '../components/Fragments/CardBalance';
import CardGoal from '../components/Fragments/CardGoal';
import CardUpcomingBill from '../components/Fragments/CardUpcomingBill';
import CardRecentTransaction from '../components/Fragments/CardRecentTransaction';
import CardStatistic from '../components/Fragments/CardStatistic';
import CardExpenseBeakdown from '../components/Fragments/CardExpenseBeakdown';
import { transactions, bills, expensesBreakdowns } from '../data';

function dashboard() {
  return (
    <>
    <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance />
          </div>
          <div className="sm:col-span-4">
            <CardGoal />
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={bills} />
          </div>
        <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions}/>
          </div>
          <div className="sm:col-span-8">
            <CardStatistic />
          </div>
          <div className="sm:col-span-8">
            <CardExpenseBeakdown data={expensesBreakdowns}/>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default dashboard;