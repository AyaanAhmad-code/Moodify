import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import './FaceExpression.scss';

const emojiMap = {
    "happy": "😊",
    "sad": "😢",
    "surprised": "😲",
    "neutral": "😐",
    "angry": "😠",
    "Detecting...": "📡"
};

const moodColors = {
    happy: "#ff6b00",
    sad: "#00e5ff",
    surprised: "#ff00ff",
    neutral: "#4ADE80",
    angry: "#ff4b2b",
    "Detecting...": "#888888"
};

export default function FaceExpression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
        init({ videoRef, landmarkerRef, streamRef });

        return () => {
            if (landmarkerRef.current) landmarkerRef.current.close();
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const activeColor = moodColors[expression.toLowerCase()] || moodColors.neutral;

    async function handleClick() {
        // We use the detect utility to get the result
        const detectedExp = await detect({ landmarkerRef, videoRef, setExpression });
        // Send it back to the Home component
        onClick(detectedExp);
    }

    return (
        <div 
            className="face-expression" 
            style={{ 
                "--mood-color": activeColor,
                "--mood-glow": `${activeColor}44` 
            }}
        >
            {/* Video is kept for AI detection but hidden from user to avoid layout breaks */}
            <video
                ref={videoRef}
                className="face-expression__video-hidden"
                playsInline
                autoPlay
                muted
            />

            <div className="scanner-container">
                <div className="scan-line"></div>
                
                <div className="emoji-wrap">
                    <span className="main-emoji">
                        {emojiMap[expression.toLowerCase()] || emojiMap.neutral}
                    </span>
                </div>
                
                {/* Visual UI Elements */}
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
            </div>

            <div className="face-expression__info">
                <span className="face-expression__label">AI BIO-ANALYSIS</span>
                <h2 className={`face-expression__status ${expression === "Detecting..." ? "detecting" : "detected"}`}>
                    {expression.toUpperCase()}
                </h2>
            </div>

            <button onClick={handleClick} className="face-expression__button">
                Capture Vibe
            </button>
        </div>
    );
}