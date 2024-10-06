import jsPDF from 'jspdf';
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/system";

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

const DashboardBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    borderRadius: "1rem",
    boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
    padding: '20px', // Added padding
    maxWidth: '900px', // Increased max width
    margin: '0 auto', // Center the box
}));

const Title = styled('h1')(({ theme }) => ({
    textAlign: 'center',
    color: '#D3D3D3', // Whitish grey color for title
    fontFamily: 'sans-serif',
}));

const Chatbot: React.FC = () => {
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
        }else if (inputText.toLowerCase().includes("maximum demand")) {
            answer = `The highest predicted demand for the next 24 hours is ${maxDemand} MW at ${timeOfHighestDemand}.`;
        }  
        else if (inputText.toLowerCase().includes("average demand")) {
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

    const handleReadAloud = (answer: string) => {
        speak(answer);
    };

    const toggleListening = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        }
        setIsListening(!isListening);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const title = 'Chatbot Conversation Report';
        const reportContent = responses.map((response, index) => 
            `Q${index + 1}: ${response.question}\nA${index + 1}: ${response.answer}\n`
        ).join('\n');
        
        doc.setFontSize(22);
        doc.text(title, 10, 10);
        doc.setFontSize(12);
        doc.text(reportContent, 10, 30);
        
        doc.save('chatbot_report.pdf');
    };

    const handleDelete = (index: number) => {
        const updatedResponses = responses.filter((_, i) => i !== index);
        setResponses(updatedResponses);
    };

    const buttonStyle = {
        backgroundColor: '#D3D3D3', // Whitish grey color for buttons
        color: '#000', // Black text color for contrast
        padding: '15px 25px', // Increased padding for larger button size
        border: 'none', // No border
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
        margin: '5px', // Margin around buttons
        fontSize: '16px', // Increase font size
        marginBottom: '15px'
    };

    const deleteButtonStyle = {
        backgroundColor: 'red', // Red color for delete button
        color: '#fff', // White text for contrast
        padding: '10px 20px', // Padding for the delete button
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const readAloudButtonStyle = {
        backgroundColor: 'green', // Green color for read aloud button
        color: '#fff', // White text for contrast
        padding: '10px 20px', // Padding for the read aloud button
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px', // Margin around buttons
    };

    return (
        <DashboardBox>
            <Title>Power Demand Prediction Chatbot</Title> {/* Updated title component */}
            <input 
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your question... (Eg: Highest Demand)"
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' , fontFamily: 'sans-serif'}} // Styling for input
            />
            <button style={buttonStyle} onClick={() => handleSubmit(input)}>Send</button>
            <button style={buttonStyle} onClick={toggleListening}>{isListening ? 'Stop Listening' : 'Start Listening'}</button>
            <button style={buttonStyle} onClick={handleDownloadPDF}>Download PDF</button>
            <div>
                {responses.map((response, index) => (
                    <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: '#D3D3D3', fontFamily: 'sans-serif' }}>
                        <strong>Q:</strong> {response.question} <br />
                        <strong>A:</strong> {response.answer} <br />
                        <button style={deleteButtonStyle} onClick={() => handleDelete(index)}>Delete</button>
                        <button style={readAloudButtonStyle} onClick={() => handleReadAloud(response.answer)}>Read Aloud</button>
                    </div>
                ))}
            </div>
        </DashboardBox>
    );
};

export default Chatbot;
