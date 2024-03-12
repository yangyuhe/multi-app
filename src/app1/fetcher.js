let count = 0
export async function fetcher(args) {
    console.log("invoked", args)
    count++;
    if (count > 5) {
        throw new Error("超过次数了")
    }
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("hello")
        }, 2000);
    })
}