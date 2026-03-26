const BASE_URL = "http://localhost:5000"; // change when deployed

// -----------------------------
// TYPES (important for clarity)
// -----------------------------
export interface ScanRequest {
    owner: string;
    repo: string;
    branch: string;
    last_n: number;
    token: string;
}

export interface CommitResult {
    commit_hash: string;
    subject: string;
    author_id: number;
    suspicious: boolean;
    probability: number;
    risk_level: "LOW" | "MEDIUM" | "HIGH";
}

export interface SourceCodeResult {
    filename: string;
    filepath: string;
    language: string;
    prediction: "SAFE" | "VULNERABLE";
    safe_probability: number;
    vulnerable_probability: number;
    confidence: number;
    risk_level: "LOW" | "MEDIUM" | "HIGH";
}

export interface ScanResponse {
    repo: string;
    branch: string;
    commit_analysis: {
        repo: string;
        branch: string;
        total_analyzed: number;
        suspicious_count: number;
        suspicious_pct: number;
        results: CommitResult[];
    };
    source_code_scan: {
        repo: string;
        branch: string;
        total_files: number;
        scanned_files: number;
        vulnerable_files: number;
        safe_files: number;
        skipped_files: number;
        repo_risk: "LOW" | "MEDIUM" | "HIGH";
        repo_risk_score: number;
        results: SourceCodeResult[];
    };
}

// -----------------------------
// MAIN API FUNCTION
// -----------------------------
export const scanRepository = async (
    data: ScanRequest
): Promise<ScanResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/scan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to scan repository");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("API Error:", error.message);
        throw error;
    }
};
