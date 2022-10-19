import fs from 'fs';


export const writeToJSONFile = (data, path) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(path, jsonData, 'utf8', () => {
        console.log('done');
    });
}

export const convertJSONtoObject = (path) => {
  const data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data);
}