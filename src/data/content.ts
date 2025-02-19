export interface Content {
  id: number;
  type: 'puzzle' | 'task';
  title: string;
}

export const generateContent = (type: 'puzzle' | 'task', index: number): Content => {
  return {
    id: index + 1,
    type,
    title: `${type.toUpperCase()} ${index + 1}`
  };
};