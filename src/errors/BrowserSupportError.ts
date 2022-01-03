class BrowserSupportError extends Error {
  constructor(message?: string, public override readonly name: string = 'BrowserSupportError') {
    super(message);
  }
}

export default BrowserSupportError;
