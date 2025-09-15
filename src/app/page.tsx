"use client";

export default function Home() {
  return (
    <button
      onClick={() => {
        window.location.href = "/api/auth/authorize";
      }}
    >
      Connect DrChrono
    </button>

  );
}
