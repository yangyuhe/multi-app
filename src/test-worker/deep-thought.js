
import("./foo").then(res => res.sayHello())
self.onmessage = ({ data: { question } }) => {
    self.postMessage({
        answer: 42,
    });
};