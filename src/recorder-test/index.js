import { createRoot } from "react-dom/client"
import * as React from 'react'



function App() {
    const [state, setState] = React.useState('')
    const stopFnRef = React.useRef(null)
    const playFnRef = React.useRef(null)
    const audioChunks = React.useRef([])
    return <div>
        <button onClick={() => {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                let audioRecorder = new MediaRecorder(stream);
                audioRecorder.start()
                setState("开始录音")
                audioRecorder.addEventListener("dataavailable", e => {
                    audioChunks.current.push(e.data)
                })
                stopFnRef.current = () => {
                    audioRecorder.stop()
                    setState("结束录音")
                }
                playFnRef.current = () => {
                    const blob = new Blob(audioChunks.current, { type: 'audio/webm' })
                    const url = URL.createObjectURL(blob)
                    const audio = new Audio(url)
                    audio.play()
                    setState("播放中")
                }
            })

        }}>start</button>
        <button onClick={() => {
            stopFnRef.current?.()
            stopFnRef.current = null;
        }}>stop</button>
        <button onClick={() => {
            playFnRef.current?.()
        }}>play</button>
        <div>{state}</div>
        <button onClick={() => {
            const obj = { hello: "world" };
            const blob = new Blob([JSON.stringify(obj, null, 2)], {
                type: "text/plain",
            });
            let url = URL.createObjectURL(blob)

            window.open(url, "_blank");
        }}>blob</button>
    </div>
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)