import { pipeline } from "@huggingface/transformers";

//首次运行时，pipeline将下载并缓存与任务关联的默认预训练模型。这可能需要一段时间，但后续调用会快得多。
//默认情况下，模型将从 Hugging Face Hub 下载并存储在浏览器缓存中，但有一些方法可以指定自定义模型和缓存位置。

// const classifier = await pipeline("sentiment-analysis");

// const result = await classifier("i have less intrest to fiction");
// console.log(result);

// const reviewer = await pipeline(
//   "sentiment-analysis",
//   "Xenova/bert-base-multilingual-uncased-sentiment"
// );

// const result = await reviewer(
//   "The Shawshank Redemption is a true masterpiece of cinema."
// );
// console.log(result);

// Allocate a pipeline for Automatic Speech Recognition
// const transcriber = await pipeline(
//   "automatic-speech-recognition",
//   "Xenova/whisper-small.en"
// );

// Transcribe an audio file, loaded from a URL.
// try {
//   const result = await transcriber(
//     "https://huggingface.co/datasets/Narsil/asr_dummy/resolve/main/mlk.flac"
//   );
//   console.log(result);
// } catch (err) {
//   console.error(err);
// }

// console.log("hello");
// const detector = await pipeline("object-detection", "Xenova/detr-resnet-50");
// console.log("hello2");
// async function detect(img) {
//   const output = await detector(img.src, {
//     threshold: 0.5,
//     percentage: true,
//   });
//   console.log("output", output);
//   // ...
// }

// window.onImgLoad = function (evt) {
//   const file = evt.target.files[0];
//   if (!file) {
//     return;
//   }

//   const reader = new FileReader();

//   // Set up a callback when the file is loaded
//   reader.onload = function (e2) {
//     debugger;
//     const image = document.createElement("img");
//     image.src = e2.target.result;
//     detect(image); // Uncomment this line to run the model
//   };
//   reader.readAsDataURL(file);
// };
// console.log(window.onImgLoad);

// Create a feature-extraction pipeline

// const extractor = await pipeline(
//   "feature-extraction",
//   "mixedbread-ai/mxbai-embed-xsmall-v1",
//   { device: "webgpu" }
// );

// // Compute embeddings
// const texts = ["Hello world!", "This is an example sentence."];
// const embeddings = await extractor(texts, { pooling: "mean", normalize: true });
// console.log(embeddings.tolist());

// Create automatic speech recognition pipeline

// const transcriber = await pipeline(
//   "automatic-speech-recognition",
//   "onnx-community/whisper-tiny.en",
//   { device: "webgpu" }
// );

// // Transcribe audio from a URL
// const url =
//   "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";
// const output = await transcriber(url);
// console.log(output);

// Allocate a pipeline for text2text-generation
// const poet = await pipeline(
//   "text2text-generation",
//   "Xenova/LaMini-Flan-T5-783M"
// );
// const result = await poet("write a poem about spring time ", {
//   max_new_tokens: 200,
//   temperature: 0.1,
//   repetition_penalty: 2.0,
//   no_repeat_ngram_size: 3,
// });
// console.log(result);

// Create a text generation pipeline
const generator = await pipeline(
  "text-generation",
  "onnx-community/Qwen2.5-0.5B-Instruct",
  { dtype: "q4" }
);

// Define the list of messages
const messages = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Tell me a funny joke." },
];

// Generate a response
const output = await generator(messages, { max_new_tokens: 128 });
console.log(output);
