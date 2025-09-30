
import React from 'react';
import type { SentimentAnalysisResult } from '../types';

interface SentimentAnalysisViewProps {
  result: SentimentAnalysisResult | null;
  status: 'idle' | 'connecting' | 'connected' | 'analyzing' | 'finished';
}

const sentimentStyles = {
    Positive: 'bg-green-500/20 text-green-400 border-green-500/30',
    Neutral: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Negative: 'bg-red-500/20 text-red-400 border-red-500/30',
    Error: 'bg-red-500/20 text-red-400 border-red-500/30',
    'N/A': 'bg-slate-600/20 text-slate-400 border-slate-600/30',
};

export const SentimentAnalysisView: React.FC<SentimentAnalysisViewProps> = ({ result, status }) => {
    
    const renderContent = () => {
        if (status === 'analyzing') {
            return (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mb-4"></div>
                    <p className="font-semibold">Analyzing feedback...</p>
                    <p className="text-sm text-slate-500">Please wait.</p>
                </div>
            )
        }
        
        if (!result) {
            return (
                 <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>Analysis will appear here after the conversation ends.</p>
                </div>
            )
        }

        const sentimentClass = sentimentStyles[result.overallSentiment] || sentimentStyles['N/A'];

        return (
             <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Overall Sentiment</h3>
                    <p className={`px-3 py-1 text-lg font-bold rounded-full inline-block border ${sentimentClass}`}>
                        {result.overallSentiment}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Summary</h3>
                    <p className="text-slate-300 italic">"{result.summary}"</p>
                </div>
                {result.keyPoints.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 mb-2">Key Feedback Points</h3>
                        <ul className="space-y-3">
                            {result.keyPoints.map((kp, index) => (
                                <li key={index} className="flex items-start">
                                    {kp.type === 'Positive' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a2 2 0 00-.8 1.4z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.642a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.2-1.867a2 2 0 00.8-1.4z" />
                                        </svg>
                                    )}
                                    <div>
                                        <p className="text-slate-300">{kp.point}</p>
                                        {kp.context && (
                                            <span className="mt-1 inline-block text-xs bg-slate-700 text-sky-400 px-2 py-0.5 rounded-full">{kp.context}</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )
    }

  return (
    <>
      <h2 className="text-lg font-bold text-sky-400 border-b border-slate-700/50 pb-4 mb-4">Feedback Analysis</h2>
      {renderContent()}
    </>
  );
};