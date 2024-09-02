import React, { useState } from "react";
import Link from "next/link";

export default function CompanyCard({ company, showFullDetails }) {
  const [showFull, setShowFull] = useState(false);
  const handleShow = () => {
    if (showFullDetails) {
      setShowFull(true);
    } else {
      alert("You must be logged in to see full details.");
      setShowFull(false);
    }
  };
  return (
    <div
      className={`border rounded p-4 shadow bg-gradient-to-r from-rose-100 to-orange-100 h-min`}
    >
      <div className="flex items-center gap-2 mb-3">
        <img
          src={company.logo}
          alt="Logo"
          className="w-12 h-12 rounded-full border text-xs"
        />
        <h2 className="text-lg font-semibold underline">{company.name}</h2>
      </div>
      {showFull && (
        <>
          <p>
            <span className="font-semibold">Address: </span>
            {company.address}
          </p>
          <p>
            <span className="font-semibold">Zip: </span>
            {company.zip}
          </p>
        </>
      )}
      <p>
        <span className="font-semibold">Country: </span>
        {company.country}
      </p>
      <p>
        <span className="font-semibold">Industry: </span>
        {company.industry}
      </p>
      {!showFull && (
        <button onClick={handleShow} className="text-blue-500 hover:underline">
          See More...
        </button>
      )}
      {showFull && (
        <>
          <p>
            {" "}
            <span className="font-semibold">Market Cap: </span>{" "}
            {company.marketCap}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Employees Count: </span>{" "}
            {company.employeeCount}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Website: </span> <Link href={company.domain} className="hover:underline">{company.domain}</Link>
          </p>
          <p>
            <span className="font-semibold">CEO: </span> {company.ceoName}
          </p>
          <button
            onClick={() => setShowFull(false)}
            className="text-blue-500 hover:underline"
          >
            See Less...
          </button>
        </>
      )}
    </div>
  );
}
