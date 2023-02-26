export const renderResults = (data: any, property: string) => (
    <ul>
      {data.map((item: any) => (
        <li key={item.id}>{item[property]}</li>
      ))}
    </ul>
  );
  