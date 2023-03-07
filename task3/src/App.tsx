import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import keyCompareService from './service/keyCompareService';
import './App.css';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [missingKeys, setMissingKeys] = useState({});
  const [fileContents, setFileContents] = useState<string[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files as FileList;
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result?.toString();
        setFileContents((prevContents) => [
          ...prevContents,
          reader.result as string ?? '',
        ]);
      };
      reader.readAsText(file);
    });
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
  
            const missingKeysObj: { [key: string]: string[] } = {};
            for (const key of allKeys) {
              const fileNames: string[] = [];
              for (let j = 0; j < files.length; j++) {
                const keys = getKeys(objects[j]);
                if (!keys.includes(key)) {
                  fileNames.push(files[j].name);
                }
              }
              if (fileNames.length > 0) {
                missingKeysObj[key] = fileNames;
              }
            }
            setMissingKeys(missingKeysObj);
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

  const handleCompare = () => {
    keyCompareService.compareKeys(files, setMissingKeys);
  };

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "flexDirection": "column"
    }}>
      <input type="file" onChange={handleFiles} multiple />
      <Button variant="contained" onClick={handleCompare}>
        Compare Keys
      </Button>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {files.map((file, index) => (
          <TextField
            key={index}
            sx={{
              width: "50%",
            }}
            label={file.name}
            value={fileContents[index] || ''}
            multiline
            rows={10}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        ))}
      </Box>
      <Box>
        {Object.keys(missingKeys).length > 0 && (
          <div>
            <h2>Missing Keys:</h2>
            <ul>
              {Object.entries(missingKeys)
                .sort(([key1, files1], [key2, files2]) =>
                  key1.localeCompare(key2)
                )
                .map(([key, files]) => (
                  <li key={key}>
                    {/* @ts-ignore */}
                    {key} is missing in {files.length} file(s) you uploaded:{" "}
                    {/* @ts-ignore */}
                    {files.join(", ")}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </Box>

    </Box>
  );
}

export default App;
