import fs from 'fs';
import path from 'path';
import './data.json';

interface IFile {
  link: string;
  text: string;
}

const path_to_file = path.join(__dirname, 'data.json');

export const getLinkedTextFromFile = (): string => {
  const data: IFile = JSON.parse(fs.readFileSync(path_to_file, { encoding: 'utf-8' }));
  return `<a href="${data.link}">${data.text}</a>`;
}

export const saveDataToFile = (text?: string, link?: string): IFile => {
  const data: IFile = JSON.parse(fs.readFileSync(path_to_file, { encoding: 'utf-8' }));
  link && (data.link = link);
  text && (data.text = text);
  fs.writeFileSync(path_to_file, JSON.stringify(data, null, 2));
  return data;
} 