class OutOfBoundError extends Error {
  constructor(accessedIndex: number, iterableSize: number) {
    super(`Attempted to access iterable of length ${iterableSize} at index ${accessedIndex}`);
    this.name = 'OutOfBoundError';
  }
}

export default OutOfBoundError;
