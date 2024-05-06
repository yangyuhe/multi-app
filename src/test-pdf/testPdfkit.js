import React from 'react';
import { createRoot } from "react-dom/client"
import PDFDocument from 'pdfkit'
import BlobStream from 'blob-stream'

function App() {
    const iframeRef = React.useRef()
    React.useEffect(() => {
        let pdf = new PDFDocument()
        const stream = doc.pipe(BlobStream());

        doc.end();
        stream.on('finish', function () {
            // get a blob you can do whatever you like with
            const blob = stream.toBlob('application/pdf');

            // or get a blob URL for display in the browser
            const url = stream.toBlobURL('application/pdf');
            iframeRef.current.src = url;
        });
    }, [])
    return <div>
        <ifrme ref={iframeRef} />
        <div>下载</div>
    </div>
};

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)