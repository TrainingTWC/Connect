import React, { useState } from 'react';import React, { useState, useRef } from 'react';import React, { useState, useRef } from 'react';

import { ConversationView } from './components/ConversationView';

import { SentimentAnalysisView } from './components/SentimentAnalysisView';import { ConversationView } from './components/ConversationView';

import { ControlPanel } from './components/ControlPanel';

import type { TranscriptionEntry, SentimentAnalysisResult } from './types';import { SentimentAnalysisView } from './components/SentimentAnalysisView';import { ConversationView } from './components/ConversationView';import React, { useState, useRef, useCallback } from 'react';



const App: React.FC = () => {import { ControlPanel } from './components/ControlPanel';

  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'analyzing' | 'finished'>('idle');

  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionEntry[]>([]);import type { TranscriptionEntry, SentimentAnalysisResult } from './types';import { SentimentAnalysisView } from './components/SentimentAnalysisView';import { ConversationView } from './components/ConversationView';

  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResult | null>(null);



  const handleStartConversation = async () => {

    setStatus('connecting');const App: React.FC = () => {import { ControlPanel } from './components/ControlPanel';import { SentimentAnalysisView } from './components/SentimentAnalysisView';

    setTranscriptionHistory([]);

    setSentimentResult(null);  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'analyzing' | 'finished'>('idle');



    // Simulate conversation start  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionEntry[]>([]);import type { TranscriptionEntry, SentimentAnalysisResult } from './types';import { ControlPanel } from './components/ControlPanel';

    setTimeout(() => {

      setStatus('connected');  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResult | null>(null);

      const greeting: TranscriptionEntry = {

        text: "Hi, thanks for joining this HR Connect call today. To start, could you tell me a bit about how things have been going for you recently at the store?",import type { TranscriptionEntry, SentimentAnalysisResult } from './types';

        isUser: false,

        timestamp: Date.now()  const mediaStreamRef = useRef<MediaStream | null>(null);

      };

      setTranscriptionHistory([greeting]);  const recognitionRef = useRef<any>(null);const App: React.FC = () => {import { decode, encode, decodeAudioData, createPcmBlob } from './utils/audioUtils';

    }, 1000);

  };  const conversationRef = useRef<string>('');



  const handleEndConversation = async () => {  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'analyzing' | 'finished'>('idle');import domainContext from './domain_context.json';

    setStatus('analyzing');

  const handleStartConversation = async () => {

    // Simulate sentiment analysis

    setTimeout(() => {    setStatus('connecting');  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionEntry[]>([]);

      setSentimentResult({

        overallSentiment: "Positive",    setTranscriptionHistory([]);

        summary: "Employee expressed satisfaction with work environment and team support.",

        keyPoints: [    setSentimentResult(null);  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResult | null>(null);// Polyfill for webkitAudioContext

          {

            point: "Enjoys working with the team",    conversationRef.current = '';

            type: "Positive",

            context: "Team Dynamics"const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

          },

          {    try {

            point: "Would like more training opportunities", 

            type: "Concern",      const stream = await navigator.mediaDevices.getUserMedia({   const mediaStreamRef = useRef<MediaStream | null>(null);

            context: "Professional Development"

          }        audio: {

        ]

      });          echoCancellation: true,  const recognitionRef = useRef<any>(null);const App: React.FC = () => {

      setStatus('finished');

    }, 2000);          noiseSuppression: true,

  };

        }  const conversationRef = useRef<string>('');  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'analyzing' | 'finished'>('idle');

  return (

    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-sky-500 selection:text-white">      });

      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8">

        <div className="w-full md:w-2/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 overflow-hidden flex flex-col">      mediaStreamRef.current = stream;  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionEntry[]>([]);

          <header className="p-4 border-b border-slate-700/50">

            <h1 className="text-xl font-bold text-sky-400">TWC HR Connect</h1>

            <p className="text-sm text-slate-400">Real-time Employee Feedback</p>

          </header>      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;  const handleStartConversation = async () => {  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResult | null>(null);

          <ConversationView transcriptionHistory={transcriptionHistory} status={status} />

          <ControlPanel status={status} onStart={handleStartConversation} onEnd={handleEndConversation} />      if (!SpeechRecognition) {

        </div>

        throw new Error('Speech recognition not supported in this browser');    setStatus('connecting');

        <div className="w-full md:w-1/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 p-6 flex flex-col">

          <SentimentAnalysisView result={sentimentResult} status={status} />      }

        </div>

      </div>    setTranscriptionHistory([]);  const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);

      <footer className="text-center mt-8 text-slate-500 text-xs">

        <p>Powered by OpenAI GPT-4o-mini via GitHub Models. For internal demonstration purposes at TWC only.</p>      recognitionRef.current = new SpeechRecognition();

      </footer>

    </div>      recognitionRef.current.continuous = true;    setSentimentResult(null);  const inputAudioContextRef = useRef<AudioContext | null>(null);

  );

};      recognitionRef.current.interimResults = true;



export default App;      recognitionRef.current.lang = 'en-US';    conversationRef.current = '';  const outputAudioContextRef = useRef<AudioContext | null>(null);



      let finalTranscript = '';  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);



      recognitionRef.current.onresult = async (event: any) => {    try {  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

        let interimTranscript = '';

              // Get user media for microphone access  const mediaStreamRef = useRef<MediaStream | null>(null);

        for (let i = event.resultIndex; i < event.results.length; i++) {

          const transcript = event.results[i][0].transcript;      const stream = await navigator.mediaDevices.getUserMedia({ 

          if (event.results[i].isFinal) {

            finalTranscript += transcript;        audio: {  const currentInputTranscriptionRef = useRef('');

          } else {

            interimTranscript += transcript;          echoCancellation: true,  const currentOutputTranscriptionRef = useRef('');

          }

        }          noiseSuppression: true,  const outputAudioQueueRef = useRef<{ source: AudioBufferSourceNode; buffer: AudioBuffer }[]>([]);



        if (finalTranscript.trim()) {        }  const nextStartTimeRef = useRef(0);

          const userEntry: TranscriptionEntry = {

            text: finalTranscript,      });  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

            isUser: true,

            timestamp: Date.now()      mediaStreamRef.current = stream;  

          };

          setTranscriptionHistory(prev => [...prev, userEntry]);  const ai = useRef<GoogleGenAI | null>(null);

          conversationRef.current += `User: ${finalTranscript}\\n`;

      // Initialize speech recognition

          try {

            const response = await fetch('http://localhost:3001/api/chat', {      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;  const getAi = useCallback(() => {

              method: 'POST',

              headers: {      if (!SpeechRecognition) {    if (!ai.current) {

                'Content-Type': 'application/json',

              },        throw new Error('Speech recognition not supported in this browser');        if (!import.meta.env.VITE_API_KEY) {

              body: JSON.stringify({

                message: finalTranscript,      }            alert("VITE_API_KEY environment variable not set.");

                conversation: conversationRef.current

              }),            throw new Error("VITE_API_KEY not set");

            });

      recognitionRef.current = new SpeechRecognition();        }

            if (response.ok) {

              const data = await response.json();      recognitionRef.current.continuous = true;        ai.current = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

              const aiEntry: TranscriptionEntry = {

                text: data.response,      recognitionRef.current.interimResults = true;    }

                isUser: false,

                timestamp: Date.now()      recognitionRef.current.lang = 'en-US';    return ai.current;

              };

              setTranscriptionHistory(prev => [...prev, aiEntry]);  }, []);

              conversationRef.current += `AI: ${data.response}\\n`;

            }      let finalTranscript = '';

          } catch (error) {

            console.error('Error calling AI:', error);  const handleStartConversation = async () => {

          }

      recognitionRef.current.onresult = async (event: any) => {    setStatus('connecting');

          finalTranscript = '';

        }        let interimTranscript = '';    setTranscriptionHistory([]);

      };

            setSentimentResult(null);

      recognitionRef.current.onerror = (event: any) => {

        console.error('Speech recognition error:', event.error);        for (let i = event.resultIndex; i < event.results.length; i++) {

      };

          const transcript = event.results[i][0].transcript;    try {

      recognitionRef.current.onstart = () => {

        setStatus('connected');          if (event.results[i].isFinal) {      const stream = await navigator.mediaDevices.getUserMedia({ 

        const greeting: TranscriptionEntry = {

          text: "Hi, thanks for joining this HR Connect call today. To start, could you tell me a bit about how things have been going for you recently at the store?",            finalTranscript += transcript;        audio: {

          isUser: false,

          timestamp: Date.now()          } else {          echoCancellation: true,

        };

        setTranscriptionHistory([greeting]);            interimTranscript += transcript;          noiseSuppression: true,

        conversationRef.current = 'AI: ' + greeting.text + '\\n';

      };          }        }



      recognitionRef.current.start();        }      });



    } catch (error) {      mediaStreamRef.current = stream;

      console.error('Error starting conversation:', error);

      setStatus('idle');        if (finalTranscript.trim()) {

      alert('Error starting conversation. Please make sure you have a microphone and allow access.');

    }          // Add user message to conversation      inputAudioContextRef.current = new AudioContext({ sampleRate: 16000 });

  };

          const userEntry: TranscriptionEntry = {      outputAudioContextRef.current = new AudioContext({ sampleRate: 24000 });

  const handleEndConversation = async () => {

    setStatus('analyzing');            text: finalTranscript,      nextStartTimeRef.current = 0;



    if (recognitionRef.current) {            isUser: true,      

      recognitionRef.current.stop();

    }            timestamp: Date.now()      const systemInstruction = `You are "ConnectAI", an expert AI HR assistant for Third Wave Coffee (TWC), designed to conduct HR Connect check-ins. Your persona is friendly, empathetic, and professional.



    if (mediaStreamRef.current) {          };

      mediaStreamRef.current.getTracks().forEach(track => track.stop());

    }          setTranscriptionHistory(prev => [...prev, userEntry]);**Conversation Flow & Strategy:**



    try {          conversationRef.current += `User: ${finalTranscript}\n`;Your primary goal is to actively guide the conversation to understand the employee's experience at TWC. Be proactive and lead the discussion by asking open-ended questions. Keep your own responses short and focused on encouraging the employee to share more.

      const response = await fetch('http://localhost:3001/api/analyze', {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',          // Call OpenAI API through our backend1.  **Opening:** Start IMMEDIATELY with a warm, open-ended question. For example: "Hi, thanks for joining this HR Connect call today. To start, could you tell me a bit about how things have been going for you recently at the store?" Do not wait for the user to speak first.

        },

        body: JSON.stringify({          try {2.  **Explore Key Areas:** Gently guide the conversation through these topics. Use follow-up questions to dig deeper when appropriate.

          conversation: conversationRef.current

        }),            const response = await fetch('http://localhost:3001/api/chat', {    *   **Role & Team:** "How are you finding your day-to-day responsibilities?" or "How is the dynamic with your team and shift manager?"

      });

              method: 'POST',    *   **Challenges & Support:** "Are there any challenges you're facing that you'd like to talk about?" or "Do you feel you have the support you need from your manager and the company?"

      if (response.ok) {

        const data = await response.json();              headers: {    *   **Positives & Recognition:** "What's been a recent highlight for you at work?" or "Is there anything you're particularly proud of?"

        

        const sentimentMatch = data.analysis.match(/Overall sentiment: (Positive|Negative|Neutral)/i);                'Content-Type': 'application/json',    *   **Growth & Development:** "What are your thoughts on your career growth at TWC?" or "Have you had a chance to use our training resources on ZingLearn?"

        const summaryMatch = data.analysis.match(/Summary: (.+?)(?:\\n|$)/);

                      },3.  **Closing:** End with a wrap-up question like, "Thanks for sharing all of that. Is there anything else on your mind, big or small, that we haven't touched on?"

        setSentimentResult({

          overallSentiment: sentimentMatch ? sentimentMatch[1] : "Neutral",              body: JSON.stringify({

          summary: summaryMatch ? summaryMatch[1] : "Analysis completed successfully",

          keyPoints: [                message: finalTranscript,**Full Domain Context:**

            {

              point: "Employee provided feedback about their experience",                conversation: conversationRef.currentYou have deep knowledge of TWC's internal structure, policies, and programs. Use this information to ask relevant follow-up questions and to understand the context of the employee's feedback. Here is the full context:

              type: "Positive",

              context: "General Feedback"              }),${JSON.stringify(domainContext)}

            }

          ]            });`;

        });

      } else {

        throw new Error('Failed to analyze sentiment');

      }            if (response.ok) {      sessionPromiseRef.current = getAi().live.connect({

    } catch (error) {

      console.error('Sentiment analysis error:', error);              const data = await response.json();        model: 'gemini-2.5-flash-native-audio-preview-09-2025',

      setSentimentResult({

        overallSentiment: "Error",              const aiEntry: TranscriptionEntry = {        callbacks: {

        summary: "Failed to analyze sentiment.",

        keyPoints: [],                text: data.response,          onopen: () => {

      });

    } finally {                isUser: false,            setStatus('connected');

      setStatus('finished');

    }                timestamp: Date.now()            

  };

              };            // Send an initial silent packet to prompt the AI to start speaking.

  return (

    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-sky-500 selection:text-white">              setTranscriptionHistory(prev => [...prev, aiEntry]);            const silentPacket = new Float32Array(4096); 

      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8">

        <div className="w-full md:w-2/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 overflow-hidden flex flex-col">              conversationRef.current += `AI: ${data.response}\n`;            const silentBlob = createPcmBlob(silentPacket);

          <header className="p-4 border-b border-slate-700/50">

            <h1 className="text-xl font-bold text-sky-400">TWC HR Connect</h1>            }            sessionPromiseRef.current?.then((session) => {

            <p className="text-sm text-slate-400">Real-time Employee Feedback</p>

          </header>          } catch (error) {                session.sendRealtimeInput({ media: silentBlob });

          <ConversationView transcriptionHistory={transcriptionHistory} status={status} />

          <ControlPanel status={status} onStart={handleStartConversation} onEnd={handleEndConversation} />            console.error('Error calling AI:', error);            });

        </div>

          }

        <div className="w-full md:w-1/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 p-6 flex flex-col">

          <SentimentAnalysisView result={sentimentResult} status={status} />            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);

        </div>

      </div>          finalTranscript = '';            mediaStreamSourceRef.current = source;

      <footer className="text-center mt-8 text-slate-500 text-xs">

        <p>Powered by OpenAI GPT-4o-mini via GitHub Models. For internal demonstration purposes at TWC only.</p>        }            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);

      </footer>

    </div>      };            scriptProcessorRef.current = scriptProcessor;

  );

};



export default App;      recognitionRef.current.onerror = (event: any) => {            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {

        console.error('Speech recognition error:', event.error);              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);

      };              const pcmBlob = createPcmBlob(inputData);

              sessionPromiseRef.current?.then((session) => {

      recognitionRef.current.onstart = () => {                session.sendRealtimeInput({ media: pcmBlob });

        setStatus('connected');              });

        // Add initial AI greeting            };

        const greeting: TranscriptionEntry = {            source.connect(scriptProcessor);

          text: "Hi, thanks for joining this HR Connect call today. To start, could you tell me a bit about how things have been going for you recently at the store?",            scriptProcessor.connect(inputAudioContextRef.current!.destination);

          isUser: false,          },

          timestamp: Date.now()          onmessage: async (message: LiveServerMessage) => {

        };            if (message.serverContent?.outputTranscription) {

        setTranscriptionHistory([greeting]);              currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;

        conversationRef.current = 'AI: ' + greeting.text + '\n';            }

      };            if (message.serverContent?.inputTranscription) {

              currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;

      recognitionRef.current.start();            }



    } catch (error) {            if (message.serverContent?.turnComplete) {

      console.error('Error starting conversation:', error);              const userInput = currentInputTranscriptionRef.current.trim();

      setStatus('idle');              const modelOutput = currentOutputTranscriptionRef.current.trim();

      alert('Error starting conversation. Please make sure you have a microphone and allow access.');              

    }              setTranscriptionHistory(prev => {

  };                  const newHistory = [...prev];

                  if(userInput) newHistory.push({ speaker: 'You', text: userInput });

  const handleEndConversation = async () => {                  if(modelOutput) newHistory.push({ speaker: 'HR Bot', text: modelOutput });

    setStatus('analyzing');                  return newHistory;

              });

    // Stop speech recognition

    if (recognitionRef.current) {              currentInputTranscriptionRef.current = '';

      recognitionRef.current.stop();              currentOutputTranscriptionRef.current = '';

    }            }

            

    // Stop media stream            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;

    if (mediaStreamRef.current) {            if (base64Audio) {

      mediaStreamRef.current.getTracks().forEach(track => track.stop());                const audioContext = outputAudioContextRef.current;

    }                if(audioContext){

                    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContext.currentTime);

    // Analyze sentiment                    const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);

    try {                    const source = audioContext.createBufferSource();

      const response = await fetch('http://localhost:3001/api/analyze', {                    source.buffer = audioBuffer;

        method: 'POST',                    source.connect(audioContext.destination);

        headers: {                    

          'Content-Type': 'application/json',                    source.addEventListener('ended', () => {

        },                        sourcesRef.current.delete(source);

        body: JSON.stringify({                    });

          conversation: conversationRef.current

        }),                    source.start(nextStartTimeRef.current);

      });                    nextStartTimeRef.current += audioBuffer.duration;

                    sourcesRef.current.add(source);

      if (response.ok) {                }

        const data = await response.json();            }

        

        // Parse the AI response to extract sentiment data            if (message.serverContent?.interrupted) {

        const sentimentMatch = data.analysis.match(/Overall sentiment: (Positive|Negative|Neutral)/i);                for (const source of sourcesRef.current.values()) {

        const summaryMatch = data.analysis.match(/Summary: (.+?)(?:\n|$)/);                    source.stop();

                            sourcesRef.current.delete(source);

        setSentimentResult({                }

          overallSentiment: sentimentMatch ? sentimentMatch[1] : "Neutral",                nextStartTimeRef.current = 0;

          summary: summaryMatch ? summaryMatch[1] : "Analysis completed successfully",            }

          keyPoints: [          },

            {          onerror: (e: ErrorEvent) => {

              point: "Employee provided feedback about their experience",            console.error('Session error:', e);

              type: "Positive",            setStatus('idle');

              context: "General Feedback"            alert('An error occurred with the connection.');

            }          },

          ]          onclose: (e: CloseEvent) => {

        });            console.log('Session closed.');

      } else {          },

        throw new Error('Failed to analyze sentiment');        },

      }        config: {

    } catch (error) {          responseModalities: [Modality.AUDIO],

      console.error('Sentiment analysis error:', error);          inputAudioTranscription: {},

      setSentimentResult({          outputAudioTranscription: {},

        overallSentiment: "Error",          systemInstruction: systemInstruction,

        summary: "Failed to analyze sentiment.",        },

        keyPoints: [],      });

      });

    } finally {    } catch (error) {

      setStatus('finished');      console.error('Failed to start conversation:', error);

    }      setStatus('idle');

  };      alert('Could not access microphone. Please check permissions and try again.');

    }

  return (  };

    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-sky-500 selection:text-white">

      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8">  const handleEndConversation = async () => {

        {/* Left Panel: Conversation */}    if (sessionPromiseRef.current) {

        <div className="w-full md:w-2/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 overflow-hidden flex flex-col">        const session = await sessionPromiseRef.current;

          <header className="p-4 border-b border-slate-700/50">        session.close();

            <h1 className="text-xl font-bold text-sky-400">TWC HR Connect</h1>    }

            <p className="text-sm text-slate-400">Real-time Employee Feedback</p>    

          </header>    // Cleanup audio resources

          <ConversationView transcriptionHistory={transcriptionHistory} status={status} />    scriptProcessorRef.current?.disconnect();

          <ControlPanel status={status} onStart={handleStartConversation} onEnd={handleEndConversation} />    mediaStreamSourceRef.current?.disconnect();

        </div>    mediaStreamRef.current?.getTracks().forEach(track => track.stop());

    inputAudioContextRef.current?.close();

        {/* Right Panel: Analysis */}    outputAudioContextRef.current?.close();

        <div className="w-full md:w-1/3 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700/50 p-6 flex flex-col">    

          <SentimentAnalysisView result={sentimentResult} status={status} />    sourcesRef.current.forEach(source => source.stop());

        </div>    sourcesRef.current.clear();

      </div>

      <footer className="text-center mt-8 text-slate-500 text-xs">    sessionPromiseRef.current = null;

        <p>Powered by OpenAI GPT-4o-mini via GitHub Models. For internal demonstration purposes at TWC only.</p>    scriptProcessorRef.current = null;

      </footer>    mediaStreamSourceRef.current = null;

    </div>    mediaStreamRef.current = null;

  );

};    setStatus('analyzing');

    const fullTranscript = transcriptionHistory.map(t => `${t.speaker}: ${t.text}`).join('\n');

export default App;    
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

Here is the full domain context for TWC to help your analysis:
${JSON.stringify(domainContext)}

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
