"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home(): JSX.Element {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the landing page in the auth group
    router.push("/landing");
  }, [router]);

  // This is just a fallback, it won't be shown because of the redirect
  return <div className="h-screen bg-[#121212]"></div>;
}
