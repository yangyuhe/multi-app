import React, { useMemo, useState } from "react";
import ReactClient from "react-dom/client";
import "./index.less";

function App() {
  const send = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://10.252.26.28:8080/api/v1/chat/completions",
        {
          method: "POST",
          body: JSON.stringify({
            ...(extraBody ? JSON.parse(extraBody) : {}),
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmYjhlNjU1LWMyZGYtNDE1Yi1iMGUwLWM5OWQ1YzQxMDk5NiJ9.8c3qEXYXyPCJmvwbazzNJVGgIzmjb_MwEaAQbKwtSYI",
          },
        }
      );
      const json = await res.json();
      const text = JSON.stringify(json, null, 4);
      setResp(text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const [prompt, setPrompt] = useState("");
  const [resp, setResp] = useState("");
  const [extraBody, setExtraBody] = useState("");
  const text = useMemo(() => {
    try {
      return JSON.parse(resp).choices[0].message.content;
    } catch (err) {
      return "";
    }
  }, [resp]);
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState<
    { prompt: string; resp: string; extraBody: string }[]
  >(JSON.parse(localStorage.getItem("chat-ai-options") || "[]"));
  const save = () => {
    const newOptions = [...options];
    const index = newOptions.findIndex((item) => item.prompt === prompt);
    const newItem = { prompt, resp, extraBody };
    if (index > -1) {
      newOptions.splice(index, 1, newItem);
    } else {
      newOptions.push(newItem);
    }
    localStorage.setItem("chat-ai-options", JSON.stringify(newOptions));
    setOptions(newOptions);
  };
  return (
    <div className="p-4">
      <select
        className="border border-solid w-[800px]"
        onChange={(evt) => {
          const prompt = evt.target.value;
          const option = options.find((item) => item.prompt === prompt);
          if (option) {
            setPrompt(prompt);
            setResp(option.resp);
            setExtraBody(option.extraBody);
          } else {
            setPrompt("");
            setResp("");
            setExtraBody("");
          }
        }}
      >
        <option key="empty" value="">
          空
        </option>
        {options.map((option) => (
          <option key={option.prompt} value={option.prompt}>
            {option.prompt}
          </option>
        ))}
      </select>
      <button
        className="border p-1"
        onClick={() => {
          const body = "return " + extraBody + "";
          const value = new Function(body)();
          setExtraBody(JSON.stringify(value, null, 4));
        }}
      >
        beautify
      </button>
      <div className="flex my-1">
        <textarea
          value={prompt}
          onChange={(evt) => {
            const val = evt.target.value;
            setPrompt(val);
          }}
          className="flex-1 w-[600px] h-[300px] block border border-solid p-1"
        />
        <textarea
          value={extraBody}
          onChange={(evt) => setExtraBody(evt.target.value)}
          className="border border-solid flex-1"
        ></textarea>
      </div>
      <button className="border border-solid p-1" onClick={send}>
        {loading ? "loading" : "send"}
      </button>
      <button className="border border-solid p-1" onClick={save}>
        save
      </button>
      <div className="flex">
        <div
          className="border border-solid flex-1"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {resp}
        </div>
        <div
          className="flex-1 border border-solid"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById("app");
if (container) {
  const root = ReactClient.createRoot(container);
  root.render(<App />);
}
