export function logMessage(message: string, isError: boolean = false): void {
  const prefix: string = isError ? "[ERROR]" : "[INFO]";

  const timestamp = new Date().toISOString();

  console.log(`${prefix} [${timestamp}] - ${message}`);
}
