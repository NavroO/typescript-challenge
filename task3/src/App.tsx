import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [missingKeys, setMissingKeys] = useState<{ [key: string]: number }>({});
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

            const missingKeysObj: { [key: string]: number } = {};
            for (const key of allKeys) {
              let count = 0;
              for (const keys of objects.map((obj) => getKeys(obj))) {
                if (!keys.includes(key)) {
                  count++;
                }
              }
              if (count > 0) {
                missingKeysObj[key] = count;
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

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "flexDirection": "column"
    }}>
      <input type="file" onChange={handleFiles} multiple />
      <Button variant="contained" onClick={compareKeys}>
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
                .sort(([key1, count1], [key2, count2]) =>
                  key1.localeCompare(key2)
                )
                .map(([key, count]) => (
                  <li key={key}>
                    {key} is missing in {count} file(s) you uploaded
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
