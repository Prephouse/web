class BrowserSupportError extends Error {
  constructor(message?: string, override readonly name: string = 'BrowserSupportError') {
    super(message);
  }
}

export default BrowserSupportError;
