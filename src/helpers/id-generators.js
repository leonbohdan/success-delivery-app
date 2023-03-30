/**
 * Sequential ID generator
 */
export const generateSequentialId = ((i) => () => i++)(0);

/**
 * UUID generator
 */
export const generateUUID = () => String(
  Date.now().toString(32) +
        Math.random().toString(16),
).replace(/\./g, '');
