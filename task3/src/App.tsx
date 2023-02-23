import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useState } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [missingKeys, setMissingKeys] = useState<string[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files as FileList;
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const compareKeys = () => {
    if (files.length < 2) {
      console.log('Please upload at least two files');
      return;
    }
  
    const readers = files.map((file) => new FileReader());
    const objects: any[] = [];
  
    readers.forEach((reader, i) => {
      reader.onload = () => {
        try {
          const data = reader.result;
          let obj = null;
          if (typeof data === 'string') {
            if (data != null && typeof data === 'string') {
              obj = JSON.parse(data);
            } else {
              console.log('Invalid file format');
            }
          }
          objects[i] = obj;
          if (objects.length === files.length) {
            const allKeys = new Set(
              objects.map((obj) => getKeys(obj)).flat()
            );
  
            const missingKeysArr: string[] = [...allKeys].filter((key) => {
              for (const keys of objects.map((obj) => getKeys(obj))) {
                if (!keys.includes(key)) {
                  return true;
                }
              }
              return false;
            });
  
            setMissingKeys(missingKeysArr);
          }
        } catch (e) {
          console.log(`Error parsing JSON in file ${files[i].name}:`, e);
        }
      };
  
      reader.readAsText(files[i]);
    });
  };

  const getKeys = (obj: { [x: string]: any; }): string[] => {
    const keys = [];
    for (const key of Object.keys(obj)) {
      keys.push(key);
      if (typeof obj[key] === 'object') {
        keys.push(...getKeys(obj[key]).map((subkey: any) => `${key}.${subkey}`));
      }
    }
    return keys;
  };
  
  return (
    <div>
      <input type="file" onChange={handleFiles} multiple />
      <button onClick={compareKeys}>Compare Keys</button>
      {missingKeys.length > 0 &&
        missingKeys.map((key, index) => (
          <p key={index}>
            {key} is missing in one or more of the files you uploaded
          </p>
        ))}
    </div>
  );
}

export default App;
