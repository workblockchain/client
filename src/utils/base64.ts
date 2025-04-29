// 将Uint8Array转换为Base64字符串
export const toBase64 = (bytes: Uint8Array) =>
  Buffer.from(bytes).toString("base64")

// 将Base64字符串转换为Uint8Array
export const fromBase64 = (str: string) => Buffer.from(str, "base64")
