import { useEffect, useRef, useState } from "react";
import { init,detect } from "../utils/utils"
import './FaceExpression.scss'

export default function FaceExpression({onClick=()=>{}}) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null)

    const [ expression, setExpression ] = useState("Detecting...");


    useEffect(() => {
        

        init({videoRef,landmarkerRef,streamRef});

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick(){
        const expression = detect({landmarkerRef,videoRef,setExpression})
        onClick(expression)
    }

    return (
        <div className="face-expression">
            <video
                ref={videoRef}
                className="face-expression__video"
                playsInline
            />
            <div className="face-expression__info">
                <span className="face-expression__label">Your Expression</span>
                <h2 className={`face-expression__status ${expression === "Detecting..." ? "detecting" : "detected"}`}>
                    {expression}
                </h2>
            </div>
            <button onClick={handleClick} className="face-expression__button">
                Detect Expression & Play
            </button>
        </div>
    );
}