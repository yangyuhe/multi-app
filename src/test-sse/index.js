import React, { useEffect } from "react";
import { createRoot } from "react-dom/client"
import * as eventsource from "event-source-polyfill"
import axios from 'axios'
export default function App() {
    useEffect(() => {


    }, [])
    return <div><button onClick={async () => {
        //原生方法
        // const EventSource = eventsource.EventSourcePolyfill;
        // var es = new EventSource("http://localhost:7001/eventsource");
        // var listener = function (type, event) {
        //     console.log(type, event)
        // };
        // es.addEventListener("open", listener.bind(null, 'open'));
        // es.addEventListener("message", listener.bind(null, 'message'));
        // es.addEventListener("error", listener.bind(null, 'error'));


        //fetch方法请求eventsource接口测试
        // fetch("http://localhost:7001/eventsource").then(res => {
        //     return res.text()
        // }).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.error(err)
        // })

        //fetch流方法请求eventsource接口测试
        // const response = await fetch('http://127.0.0.1:7001/eventsource', {
        //     method: "POST",
        //     cache: "no-cache",
        //     keepalive: true,
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "text/event-stream",
        //     },
        //     body: JSON.stringify({
        //         arg1: 1,
        //         arg2: 2
        //     }),
        // });

        // const reader = response.body.getReader();

        // while (true) {
        //     const { value, done } = await reader.read();
        //     if (done) {
        //         console.log("over")
        //         break;
        //     }

        //     console.log('get.message', new TextDecoder().decode(value));
        // }

        //axios方法
        axios({
            method: 'get',
            url: 'http://localhost:7001/eventsource',
            responseType: 'stream',
            onDownloadProgress: function (args) {
                debugger
            },
        })
            .then(response => {

                debugger

            });


        //xhr原生方法
        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', "http://localhost:7001/eventsource", true);
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState === xhr.LOADING) {
        //         console.log("loading:", xhr.responseText);
        //     } else if (xhr.readyState === xhr.DONE) {
        //         if (xhr.status === 200) {
        //             console.log("end:", xhr.responseText)
        //         } else {
        //             console.eror(`XHR Failed with status ${xhr.status}: ${xhr.statusText}`);
        //         }
        //     }
        // };
        // xhr.send()

    }}>send</button></div>
}


const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)