import { analyzeRepositoryBehavior } from "@/ai/flows/analyze-repository-behavior";
import { getMockRepoData, getFallbackRepoAssessment } from "@/lib/mock-data";
import RepoDashboardContent from "@/components/dashboard/RepoDashboardContent";
import ResilientAnalysisBanner from "@/components/dashboard/ResilientAnalysisBanner";

export default async function RepositoryDashboard({ params }: { params: Promise<{ owner: string, name: string }> }) {
  const { owner, name } = await params;
  
  const rawData = getMockRepoData(owner, name);
  
  let analysis;
  let errorMsg = "";

  try {
    analysis = await analyzeRepositoryBehavior(rawData);
  } catch (error: any) {
    errorMsg = error instanceof Error ? error.message : String(error);
    analysis = getFallbackRepoAssessment(rawData);
  }

  return (
    <div className="min-h-screen bg-[#050608]">
      {errorMsg && (
        <div className="p-4 md:p-10 pb-0">
          <ResilientAnalysisBanner errorMessage={errorMsg} />
        </div>
      )}
      <RepoDashboardContent 
        owner={owner} 
        name={name} 
        rawData={rawData} 
        analysis={analysis} 
      />
    </div>
  );
}
