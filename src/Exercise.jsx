import React from "react";
import UserCard from "./UserCard";

function Exercise() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          User Cards
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <UserCard 
            name="Gin"
            email="gintoki@gmail.com" 
            street="Jalan Mangga 2"
            city="Jakarta"
          />
          <UserCard 
            name="Nan"
            email="nan@gmail.com"
            street="Jalan Mangga 3"
            city="Jakarta"
          />
          <UserCard 
            name="Peter"
            email="peter@gmail.com"
            street="Jalan Mangga 4"
            city="Jakarta"
          />
        </div>
      </div>
    </>
  );
}

export default Exercise;