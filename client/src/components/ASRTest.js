import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import './ASRTest.css';

const ASRTest = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const recorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm',
        desiredSampRate: 16000,
      });
      recorder.startRecording();
      recorderRef.current = recorder;
      setRecording(true);
    } catch (error) {
      console.error('获取麦克风权限失败:', error);
      alert('获取麦克风权限失败，请确保已授予麦克风访问权限。');
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        setAudioBlob(blob);
        setRecording(false);
      });
    }
  };

  const handleTranscribe = async () => {
    if (!audioBlob) {
      alert('请先录制音频');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('audio', new File([audioBlob], 'recording.webm', { type: 'audio/webm' }));

    try {
      const response = await fetch('/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setTranscription(result.text);
      } else {
        alert('识别失败，请重试');
      }
    } catch (error) {
      console.error('转录请求失败:', error);
      alert('转录请求失败，请检查服务器是否正常运行');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="asr-container">
      <div className="control-panel">
        <button 
          className={`record-button ${recording ? 'recording' : ''}`} 
          onClick={recording ? stopRecording : startRecording}
        >
          {recording ? '停止录制' : '开始录制'}
        </button>
        <button 
          className="transcribe-button"
          onClick={handleTranscribe} 
          disabled={!audioBlob || loading}
        >
          {loading ? '转换中...' : '转换'}
        </button>
      </div>
      
      {audioBlob && (
        <div className="audio-player">
          <h3>录音预览</h3>
          <audio controls src={URL.createObjectURL(audioBlob)} />
        </div>
      )}
      
      {transcription && (
        <div className="transcription-result">
          <h3>识别结果</h3>
          <div className="result-text">{transcription}</div>
        </div>
      )}
    </div>
  );
};

export default ASRTest;
