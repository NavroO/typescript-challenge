const compareKeys = (files: File[], setMissingKeys: React.Dispatch<React.SetStateAction<{ [key: string]: string[]; }>>) => {
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

export default {
    compareKeys,
    getKeys
};