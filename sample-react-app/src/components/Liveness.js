import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function LivenessDetection({ onSmileDetected }) {
    const videoRef = useRef();
    const [smileDetected, setSmileDetected] = useState(false);
    const [blinkDetected, setBlinkDetected] = useState(false);

    useEffect(() => {
        let isComponentMounted = true; // Flag to manage cleanup and updates safely
        async function loadModelsAndStartVideo() {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
                ]);
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                if (isComponentMounted) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }

                const displaySize = { width: videoRef.current.offsetWidth, height: videoRef.current.offsetHeight };
                faceapi.matchDimensions(videoRef.current, displaySize);

                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()
                    ).withFaceLandmarks().withFaceExpressions();

                    detections.forEach(detection => {
                        const { expressions, landmarks } = detection;
                        // Inside LivenessDetection.js somewhere in your detection logic
                        if (expressions.happy > 0.9 && !smileDetected) {
                            onSmileDetected(); // Call the prop function when a smile is detected
                            setSmileDetected(true);
                        }

                        const leftEye = landmarks.getLeftEye();
                        const rightEye = landmarks.getRightEye();
                        if (isEyeClosed(leftEye) && isEyeClosed(rightEye)) {
                            setBlinkDetected(true);
                            setTimeout(() => setBlinkDetected(false), 1500); // Reset blink detection after 1.5 seconds
                        }
                    });
                }, 100);
            } catch (error) {
                console.error("Error loading models or starting video:", error);
            }
        }

        loadModelsAndStartVideo();

        return () => {
            isComponentMounted = false; // Prevent state updates on unmounted component
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        };
    }, []);

    function isEyeClosed(eyeLandmarks) {
        const vertical1 = faceapi.euclideanDistance(eyeLandmarks[1], eyeLandmarks[5]);
        const vertical2 = faceapi.euclideanDistance(eyeLandmarks[2], eyeLandmarks[4]);
        const horizontal = faceapi.euclideanDistance(eyeLandmarks[0], eyeLandmarks[3]);
        const ear = (vertical1 + vertical2) / (2 * horizontal);
        return ear < 0.25; // Adjust this threshold based on experimental observations
    }

    return (
        <div className="video-container">
            <video ref={videoRef} autoPlay={true} muted={true} style={{ width: '100%' }} />
            {smileDetected && <div className="smile-detection">Smile is detected</div>}
            {blinkDetected && <div className="blink-detection">Blink is detected</div>}
        </div>
    );
}

export default LivenessDetection;
