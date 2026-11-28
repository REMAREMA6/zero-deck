export type FileAnalysisOutcome =
  'confirmed_threat' | 'suspicious' | 'no_known_threat_found' | 'could_not_decide';
export type AnalysisLifecycle =
  'queued' | 'analyzing' | 'completed' | 'cancelled' | 'interrupted' | 'failed';
export interface FileAnalysisResult {
  outcome: FileAnalysisOutcome;
  lifecycle: AnalysisLifecycle;
  engineId: string | null;
  engineVersion: string | null;
  completedAt: string | null;
  explanation: string;
}
export function isPositiveThreatOutcome(outcome: FileAnalysisOutcome): boolean {
  return outcome === 'confirmed_threat' || outcome === 'suspicious';
}
