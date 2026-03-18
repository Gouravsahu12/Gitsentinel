"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImmersiveScanner from "@/components/scan/ImmersiveScanner";

export default function UserScanPage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete && username) {
      router.push(`/dashboard/${username}`);
    }
  }, [isComplete, username, router]);

  if (!username) return null;

  return (
    <div className="min-h-screen bg-[#050608] selection:bg-primary/30">
      <ImmersiveScanner 
        mode="user"
        target={username}
        onComplete={() => setIsComplete(true)} 
      />
    </div>
  );
}
