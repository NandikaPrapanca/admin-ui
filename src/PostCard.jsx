import React, { useState } from "react";

function PostCard({ id, userId, title, body }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
        className="
      bg-white p-4 rounded-md shadow-sm
        flex flex-col justify-between
        transition-all duration-300
        hover:scale-105 hover:border hover:border-special-red2 
      hover:bg-red-50 hover:shadow-md
      "
    >
      <h1 className="font-bold text-2xl mb-3 text-center">
        {title}
      </h1>
      <p className="text-xs text-gray-500 text-center flex-1 mb-3 line-clamp-3 leading-relaxed">
        {body}
      </p>
      <button
        onClick={() => setClicked(true)}
        className={`
          py-1.5 text-xs rounded-md text-white transition-all duration-300
          ${clicked 
            ? "bg-special-red2 hover:brightness-110" 
            : "bg-gray-01 hover:bg-gray-400"}
        `}
      >
        {clicked ? "Tombol sudah diklik" : "Silakan Klik"}
      </button>
    </div>
  );
}

export default PostCard;