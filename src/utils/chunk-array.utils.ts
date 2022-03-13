export const chunkArray = (array: any[], size: number) => Array.from({
  length: Math.ceil(array.length / size)
}, (value, index) => array.slice(index * size, index * size + size));
