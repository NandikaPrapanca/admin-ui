import React from "react";
import PostCard from "./PostCard";
import postsData from "./postsData";

function Exercise() {
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center mb-6 text-red-600">
        Post Cards
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-24">
        
        {postsData.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}

      </div>

    </div>
  );
}

export default Exercise;