import React, { useState } from 'react';

import { ConversationView } from './components/ConversationView';import React, { useState } from 'react';

import { SentimentAnalysisView } from './components/SentimentAnalysisView';import { ConversationView } from './components/ConversationView';

import { ControlPanel } from './components/ControlPanel';import { SentimentAnalysisView } from './components/SentimentAnalysisView';

import type { TranscriptionEntry, SentimentAnalysisResult } from './types';import { ControlPanel } from './components/ControlPanel';

import type { TranscriptionEntry, SentimentAnalysisResult } from './types';

const App: React.FC = () => {

  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'analyzing' | 'finished'>('idle');// FIX: Added a local interface for the `LiveSession` object as it's not exported.

  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionEntry[]>([]);// This interface defines the methods used in this component.

  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResult | null>(null);interface LiveSession {

  sendRealtimeInput(params: { media: Blob }): void;

  const handleStartConversation = async () => {  close(): void;

    setStatus('connecting');}

    setTranscriptionHistory([]);

    setSentimentResult(null);// Polyfill for webkitAudioContext

// FIX: Cast `window` to `any` to access the vendor-prefixed `webkitAudioContext`

    // Simulate conversation start// without causing a TypeScript error.

    setTimeout(() => {const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

      setStatus('connected');

      const greeting: TranscriptionEntry = {const App: React.FC = () => {

        text: "Hi, thanks for joining this HR Connect call today. To start, could you tell me a bit about how things have been going for you recently at the store?",  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'analyzing' | 'finished'>('idle');

        isUser: false,  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionEntry[]>([]);

        timestamp: Date.now()  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResult | null>(null);

      };

      setTranscriptionHistory([greeting]);  const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);

    }, 1000);  const inputAudioContextRef = useRef<AudioContext | null>(null);

  };  const outputAudioContextRef = useRef<AudioContext | null>(null);

  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const handleEndConversation = async () => {  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    setStatus('analyzing');  const mediaStreamRef = useRef<MediaStream | null>(null);



    // Simulate sentiment analysis  const currentInputTranscriptionRef = useRef('');

    setTimeout(() => {  const currentOutputTranscriptionRef = useRef('');

      setSentimentResult({  const outputAudioQueueRef = useRef<{ source: AudioBufferSourceNode; buffer: AudioBuffer }[]>([]);

        overallSentiment: "Positive",  const nextStartTimeRef = useRef(0);

        summary: "Employee expressed satisfaction with work environment and team support.",  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

        keyPoints: [  

          {  const ai = useRef<GoogleGenAI | null>(null);

            point: "Enjoys working with the team",

            type: "Positive",  const getAi = useCallback(() => {

            context: "Team Dynamics"    if (!ai.current) {

          },        if (!process.env.API_KEY) {

          {            alert("API_KEY environment variable not set.");

            point: "Would like more training opportunities",             throw new Error("API_KEY not set");

            type: "Concern",        }

            context: "Professional Development"        ai.current = new GoogleGenAI({ apiKey: process.env.API_KEY });

          }    }

        ]    return ai.current;

      });  }, []);

      setStatus('finished');

    }, 2000);  const handleStartConversation = async () => {

  };    setStatus('connecting');

    setTranscriptionHistory([]);

  return (    setSentimentResult(null);

    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-sky-500 selection:text-white">

      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8">    try {

        <div className="w-full md:w-2/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 overflow-hidden flex flex-col">      const stream = await navigator.mediaDevices.getUserMedia({ 

          <header className="p-4 border-b border-slate-700/50">        audio: {

            <h1 className="text-xl font-bold text-sky-400">TWC HR Connect</h1>          echoCancellation: true,

            <p className="text-sm text-slate-400">Real-time Employee Feedback</p>          noiseSuppression: true,

          </header>        }

          <ConversationView transcriptionHistory={transcriptionHistory} status={status} />      });

          <ControlPanel status={status} onStart={handleStartConversation} onEnd={handleEndConversation} />      mediaStreamRef.current = stream;

        </div>

      inputAudioContextRef.current = new AudioContext({ sampleRate: 16000 });

        <div className="w-full md:w-1/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 p-6 flex flex-col">      outputAudioContextRef.current = new AudioContext({ sampleRate: 24000 });

          <SentimentAnalysisView result={sentimentResult} status={status} />      nextStartTimeRef.current = 0;

        </div>      

      </div>      const systemInstruction = `You are "ConnectAI", an expert AI HR assistant for Third Wave Coffee (TWC), designed to conduct HR Connect check-ins. Your persona is friendly, empathetic, and professional.

      <footer className="text-center mt-8 text-slate-500 text-xs">

        <p>Powered by OpenAI GPT-4o-mini via GitHub Models. For internal demonstration purposes at TWC only.</p>**Conversation Flow & Strategy:**

      </footer>Your primary goal is to actively guide the conversation to understand the employee's experience at TWC. Be proactive and lead the discussion by asking open-ended questions. Keep your own responses short and focused on encouraging the employee to share more.

    </div>

  );1.  **Opening:** Start IMMEDIATELY with a warm, open-ended question. For example: "Hi, thanks for joining this HR Connect call today. To start, could you tell me a bit about how things have been going for you recently at the store?" Do not wait for the user to speak first.

};2.  **Explore Key Areas:** Gently guide the conversation through these topics. Use follow-up questions to dig deeper when appropriate.

    *   **Role & Team:** "How are you finding your day-to-day responsibilities?" or "How is the dynamic with your team and shift manager?"

export default App;    *   **Challenges & Support:** "Are there any challenges you're facing that you'd like to talk about?" or "Do you feel you have the support you need from your manager and the company?"
    *   **Positives & Recognition:** "What's been a recent highlight for you at work?" or "Is there anything you're particularly proud of?"
    *   **Growth & Development:** "What are your thoughts on your career growth at TWC?" or "Have you had a chance to use our training resources on ZingLearn?"
3.  **Closing:** End with a wrap-up question like, "Thanks for sharing all of that. Is there anything else on your mind, big or small, that we haven't touched on?"

**Domain Rules & Guardrails:**
1. **Domain Lock**: You can ONLY discuss topics related to an employee's experience at Third Wave Coffee, including their store, team, TWC programs, and HR policies. If asked about anything else, respond with: "I can only talk about your experience at Third Wave Coffee—your store, team, and TWC programs and policies."
2. **Policy Expert**: You are an expert on TWC HR policies. When you answer a question using policy information, you MUST cite the source policy and section in brackets, like this: [POL-LEAVE-002 §EL].
3. **Uncertainty**: If you cannot answer a question based on the provided policy information, you MUST say: "I couldn’t verify that in the current HR policy set. Please check with your HRBP or share the exact clause." Do not invent answers.
4. **Safety**: You must AVOID providing legal interpretations, medical advice, or disclosing any employee's personal data.

**Key Domain Information Summary:**
This is a summary of key policies. Refer to it for answering questions.
*   **Domain:** Third Wave Coffee (TWC)
*   **Key Programs:** RESPECT values (badges for performance), ZingLearn LMS (training), Bench Planning (career growth), HR Connect (check-ins).
*   **Policies:**
    *   **Leave (POL-LEAVE-002):** 24 Earned Leaves (EL) per year, 7 can be carried forward. 12-14 Flexi Leaves (FL) for various purposes.
    *   **Meals (POL-MEAL-012):** Full-time store employees get two beverages and one food item per working day.
    *   **Mobile Phone (POL-MOB-014):** Phones must be handed to the Manager on Duty (MOD) during shifts.
    *   **Working Hours (POL-WH-003):** Standard shift is 9 hours, including a 1-hour break. Employees get 4 weekly offs per month. Overtime (OT) applies if you work 30+ minutes beyond your shift.
    *   **POSH (POL-POSH-005):** The POSH policy addresses sexual harassment. Complaints should be filed with the Internal Committee (IC) at posh@thirdwavecoffee.in within 3 months of an incident.
    *   **Attendance (POL-FAQ-015):** 4 attendance regularizations are allowed per month.
*   **Glossary:** EL (Earned Leave), FL (Flexi Leave), IC (Internal Committee), MOD (Manager on Duty), TWC (Third Wave Coffee).`;

      sessionPromiseRef.current = getAi().live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setStatus('connected');
            
            // Send an initial silent packet to prompt the AI to start speaking.
            const silentPacket = new Float32Array(4096); 
            const silentBlob = createPcmBlob(silentPacket);
            sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: silentBlob });
            });

            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            mediaStreamSourceRef.current = source;
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
            }
            if (message.serverContent?.inputTranscription) {
              currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
            }

            if (message.serverContent?.turnComplete) {
              const userInput = currentInputTranscriptionRef.current.trim();
              const modelOutput = currentOutputTranscriptionRef.current.trim();
              
              setTranscriptionHistory(prev => {
                  const newHistory = [...prev];
                  if(userInput) newHistory.push({ speaker: 'You', text: userInput });
                  if(modelOutput) newHistory.push({ speaker: 'HR Bot', text: modelOutput });
                  return newHistory;
              });

              currentInputTranscriptionRef.current = '';
              currentOutputTranscriptionRef.current = '';
            }
            
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
                const audioContext = outputAudioContextRef.current;
                if(audioContext){
                    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContext.currentTime);
                    const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    
                    source.addEventListener('ended', () => {
                        sourcesRef.current.delete(source);
                    });

                    source.start(nextStartTimeRef.current);
                    nextStartTimeRef.current += audioBuffer.duration;
                    sourcesRef.current.add(source);
                }
            }

            if (message.serverContent?.interrupted) {
                for (const source of sourcesRef.current.values()) {
                    source.stop();
                    sourcesRef.current.delete(source);
                }
                nextStartTimeRef.current = 0;
            }
          },
          // FIX: The onerror callback for `live.connect` expects an `ErrorEvent`, not a generic `Error`.
          onerror: (e: ErrorEvent) => {
            console.error('Session error:', e);
            setStatus('idle');
            alert('An error occurred with the connection.');
          },
          onclose: (e: CloseEvent) => {
            console.log('Session closed.');
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: systemInstruction,
        },
      });

    } catch (error) {
      console.error('Failed to start conversation:', error);
      setStatus('idle');
      alert('Could not access microphone. Please check permissions and try again.');
    }
  };

  const handleEndConversation = async () => {
    if (sessionPromiseRef.current) {
        const session = await sessionPromiseRef.current;
        session.close();
    }
    
    // Cleanup audio resources
    scriptProcessorRef.current?.disconnect();
    mediaStreamSourceRef.current?.disconnect();
    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();

    sessionPromiseRef.current = null;
    scriptProcessorRef.current = null;
    mediaStreamSourceRef.current = null;
    mediaStreamRef.current = null;

    setStatus('analyzing');
    const fullTranscript = transcriptionHistory.map(t => `${t.speaker}: ${t.text}`).join('\n');
    
    if (fullTranscript.trim().length === 0) {
        setStatus('finished');
        setSentimentResult({
            overallSentiment: "N/A",
            summary: "No conversation was recorded.",
            keyPoints: [],
        });
        return;
    }

    try {
        const analysisPrompt = `You are an expert HR analyst for Third Wave Coffee (TWC). Analyze the sentiment of the following HR Connect conversation transcript. Your analysis should help HR leadership understand employee feedback and identify trends.

Based on the conversation, provide a structured analysis.
For each key point, try to link it to a specific TWC entity if mentioned (e.g., a policy like 'Leave Policy', a role like 'Area Manager', or a program like 'RESPECT badges').

---
CONVERSATION:
${fullTranscript}
---
`;
        const response = await getAi().models.generateContent({
            model: "gemini-2.5-flash",
            contents: analysisPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        overallSentiment: { type: Type.STRING, description: 'Overall sentiment of the conversation: "Positive", "Neutral", or "Negative".' },
                        summary: { type: Type.STRING, description: 'A concise, one-sentence summary of the employee\'s main feedback.' },
                        keyPoints: {
                            type: Type.ARRAY,
                            description: 'Up to three most important points raised by the employee.',
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    point: { type: Type.STRING, description: 'A summary of the employee\'s feedback point.' },
                                    type: { type: Type.STRING, description: 'The nature of the feedback: "Concern" or "Positive".' },
                                    context: { type: Type.STRING, description: 'Related TWC policy, role, or program (e.g., "Leave Policy", "Area Manager"). Can be empty.' }
                                },
                                required: ['point', 'type']
                            }
                        },
                    }
                },
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        setSentimentResult(result);

    } catch (error) {
        console.error("Sentiment analysis failed:", error);
        setSentimentResult({
            overallSentiment: "Error",
            summary: "Failed to analyze sentiment.",
            keyPoints: [],
        });
    } finally {
        setStatus('finished');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Panel: Conversation */}
        <div className="w-full md:w-2/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 overflow-hidden flex flex-col">
          <header className="p-4 border-b border-slate-700/50">
            <h1 className="text-xl font-bold text-sky-400">TWC HR Connect</h1>
            <p className="text-sm text-slate-400">Real-time Employee Feedback</p>
          </header>
          <ConversationView transcriptionHistory={transcriptionHistory} status={status} />
          <ControlPanel status={status} onStart={handleStartConversation} onEnd={handleEndConversation} />
        </div>

        {/* Right Panel: Analysis */}
        <div className="w-full md:w-1/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 p-6 flex flex-col">
           <SentimentAnalysisView result={sentimentResult} status={status} />
        </div>
      </div>
       <footer className="text-center mt-8 text-slate-500 text-xs">
            <p>Powered by Google Gemini. For internal demonstration purposes at TWC only.</p>
        </footer>
    </div>
  );
};

export default App;
