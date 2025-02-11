import React from "react";

function Home() {
  return (
    <div
      className="flex fixed overflow-hidden items-center justify-center w-full flex-col bg-[url('./assets/desert.jpg')] bg-cover "
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="mb-40">
        <p className="text-4xl">
          Sign in for hotel bookings !
        </p>
      </div>
    </div>
  );
}

export default Home;
