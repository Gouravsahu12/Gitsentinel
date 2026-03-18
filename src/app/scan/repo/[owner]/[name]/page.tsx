"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImmersiveScanner from "@/components/scan/ImmersiveScanner";

export default function RepoScanPage() {
  const params = useParams();
  const router = useRouter();
  const owner = params.owner as string;
  const name = params.name as string;

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete && owner && name) {
      router.push(`/dashboard/repo/${owner}/${name}`);
    }
  }, [isComplete, owner, name, router]);

  if (!owner || !name) return null;

  return (
    <div className="min-h-screen bg-[#050608] selection:bg-primary/30">
      <ImmersiveScanner 
        mode="repo"
        owner={owner} 
        target={name} 
        onComplete={() => setIsComplete(true)} 
      />
    </div>
  );
}
