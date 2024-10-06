
import jsPDF from 'jspdf';
import React, { useState, useEffect } from 'react';

// Custom types for SpeechRecognitionEvent and SpeechRecognitionErrorEvent
interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResult[][];
}

interface SpeechRecognitionErrorEvent {
    error: string;
}

const chatbot: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [responses, setResponses] = useState<any[]>([]);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    // Mock data
    const gridAvailability = 4000; // Example grid availability in MW
    const renewableEnergy = 1200; // Example renewable energy contribution in MW
    const averageDemand = 5324; // Average demand in MW
    const minDemand = 4700; // Minimum demand for the next 24 hours in MW
    const maxDemand = 5900; // Maximum demand for the next 24 hours in MW
    const timeOfHighestDemand = "23:00:00"; // Time of highest demand
    const forecastedDemandNextDay = { 
        0: 4800, 
        1: 4900, 
        2: 5100, 
        3: 5300, 
        4: 5200, 
        5: 5400, 
        6: 5500, 
        7: 5600, 
        8: 5700, 
        9: 5800, 
        10: 5900, 
        11: 6000, 
        12: 5900, 
        13: 5800, 
        14: 5700, 
        15: 5600, 
        16: 5500, 
        17: 5400, 
        18: 5300, 
        19: 5200, 
        20: 5100, 
        21: 5000, 
        22: 4900, 
        23: 4800 
    };

    useEffect(() => {
        // Initialize speech recognition if supported
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
            const newRecognition = new SpeechRecognitionAPI();
            newRecognition.continuous = false; // Stops automatically after one result
            newRecognition.interimResults = false; // No interim results
            newRecognition.lang = 'en-US'; // Set language

            newRecognition.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                handleSubmit(transcript);
            };

            newRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error("Speech recognition error", event);
            };

            setRecognition(newRecognition);
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = (inputText: string) => {
        let answer = "";

        // Response handling based on user input
        if (inputText.toLowerCase().includes("highest demand")) {
            answer = `The highest predicted demand for the next 24 hours is ${maxDemand} MW at ${timeOfHighestDemand}.`;
        } else if (inputText.toLowerCase().includes("average demand")) {
            answer = `The average predicted demand for the next 24 hours is ${averageDemand.toFixed(2)} MW.`;
        } else if (inputText.toLowerCase().includes("minimum demand")) {
            answer = `The minimum predicted demand for the next 24 hours is ${minDemand} MW.`;
        } else if (inputText.toLowerCase().includes("grid availability")) {
            answer = `The current grid availability is ${gridAvailability} MW.`;
        } else if (inputText.toLowerCase().includes("renewable energy")) {
            answer = `The current renewable energy contribution is ${renewableEnergy} MW. It is advisable to maximize this contribution during peak demand periods to ensure a stable supply.`;
        } else if (inputText.toLowerCase().includes("sufficient power")) {
            const totalAvailablePower = gridAvailability + renewableEnergy;
            answer = totalAvailablePower >= maxDemand 
                ? "Yes, the available power is sufficient to meet the maximum demand." 
                : "No, the available power is not sufficient to meet the maximum demand.";
        } else if (inputText.toLowerCase().includes("report")) {
            const totalDemand = 120000; // Example total demand
            const powerNeeded = totalDemand - renewableEnergy;
            const totalAvailablePower = gridAvailability + renewableEnergy;
            const sufficiencyStatus = totalAvailablePower >= maxDemand 
                ? "sufficient" 
                : "not sufficient";

                answer = `Report Summary:\n
                - Highest Demand: ${maxDemand} MW\n
                - Average Demand: ${averageDemand} MW\n
                - Minimum Demand: ${minDemand} MW\n
                - Grid Availability: ${gridAvailability} MW\n
                - Renewable Energy: ${renewableEnergy} MW\n
                - Power Needed: ${powerNeeded} MW\n
                - Total Available Power: ${totalAvailablePower} MW\n
                - Is the power sufficient to meet the demand? The power is currently ${sufficiencyStatus}.\n
                - Precautions During Natural Calamities:\n
                  - During natural calamities such as storms or floods, it's essential to reduce power consumption to ensure grid stability.\n
                  - Essential services like hospitals and emergency services should prioritize power supply.\n
                  - Residents are advised to stock up on battery-operated devices and non-perishable food items.\n
                - Steps to Meet Power Demand if Insufficient:\n
                  1. Implement demand response programs to manage and reduce peak demand.\n
                  2. Increase renewable energy generation by optimizing solar and wind resources.\n
                  3. Utilize backup generators to supplement grid power during critical periods.\n
                  4. Consider energy storage solutions to store excess renewable energy for later use.\n
                  5. Encourage energy conservation measures among consumers.`;

        } else if (inputText.toLowerCase().includes("demand for the next 15 days")) {
            const average15Days = 5700;
            const highest15Days = 6300;
            const timeOfHighest15Days = "2024-10-17 23:00:00";

            answer = `The highest predicted demand for the next 15 days is ${highest15Days} MW at ${timeOfHighest15Days}. The average demand over this period is ${average15Days.toFixed(2)} MW. It’s crucial to adjust energy strategies based on these predictions.`;
        } else if (inputText.toLowerCase().includes("next day prediction")) {
            answer = `The demand forecast for the next 24 hours is as follows:
            ${Object.entries(forecastedDemandNextDay).map(([hour, demand]) => `Hour ${hour}: ${demand} MW\n`).join(', ')}.
            Ensure that the grid can accommodate these predictions and plan renewable energy generation accordingly.`;
        } else if (inputText.toLowerCase().includes("renewable energy recommendations")) {
            answer = `To enhance renewable energy contribution, consider investing in solar and wind energy projects. Additionally, incentivizing residential and commercial solar panel installations can significantly increase renewable energy output.`;
        } else if (inputText.toLowerCase().includes("impact of peak demand")) {
            answer = `Peak demand affects the stability of the grid and may lead to increased power outages. It is vital to manage demand and ensure sufficient power supply to prevent system overload.`;
        } else {
            answer = "Question not recognized.";
        }

        setResponses(prev => [
            ...prev,
            { question: inputText, answer: answer.trim() },
        ]);
        setInput('');
    };

    const speak = (text: string) => {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    };

    const toggleListening = () => {
        if (isListening) {
            // Stop listening
            recognition?.stop();
        } else {
            // Start listening
            recognition?.start();
        }
        setIsListening(!isListening);
    };

    const handleDelete = (index: number) => {
        setResponses(prevResponses => prevResponses.filter((_, i) => i !== index));
    };

    const handleReadAloud = (text: string) => {
        speak(text);
    };

    // Download chat history as PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Chat History', 10, 10);
        doc.setFontSize(12);
        
        responses.forEach((resp, index) => {
            doc.text(`Q: ${resp.question}`, 10, 25 + index * 20);
            doc.text(`A: ${resp.answer}`, 10, 30 + index * 20);
        });

        doc.save('chat-history.pdf');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingLeft:'450px' }}>
            <h1 style={{ textAlign: 'center' }}>Delhi Power Demand Chat Bot</h1>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your question..."
                style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '10px',
                }}
            />
            <button onClick={() => handleSubmit(input)} style={{ marginRight: '10px' ,backgroundColor:"#4379F2"}}>
                Submit
            </button>
            <button onClick={toggleListening} style={{ marginRight: '10px' ,backgroundColor:"#8FD14F"}}>
                {isListening ? "Stop Listening" : "Start Listening"}
            </button>
            <button onClick={handleDownloadPDF} style={{ marginRight: '10px' ,backgroundColor:"#C7253E"}}>
                Download PDF
            </button>
            <div style={{ marginTop: '20px' }}>
                {responses.map((resp, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '5px', backgroundColor:"grey"}}>
                        <p style={{ margin: '5px 0' }}>
                            <strong>Q:</strong> {resp.question}
                        </p>
                        <p style={{ margin: '5px 0' }}>
                            <strong>A:</strong> {resp.answer}
                        </p>
                        <div>
                            <button onClick={() => handleReadAloud(resp.answer)} style={{ marginRight: '10px', backgroundColor:"#8FD14F"}}>Read Aloud</button>
                            <button onClick={() => handleDelete(index) } style={{ marginRight: '10px', backgroundColor:"#C7253E"}}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default chatbot;

