'use client'; 

import React from 'react';
import Link from 'next/link'; 

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Main</h1>
      <br />
      <Link href="/expenseEntry" className="text-blue-500 underline">
        Expense Entry
      </Link>
      <hr />
      <Link href="/expenseReport" className="text-blue-500 underline">
        Expense Report
      </Link>
    </div>
  );
};

export default MainPage;
