
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [verdict, setVerdict] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/verdict", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setVerdict(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CHORUS-X™ Live Verdict</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Analyze</button>
      {verdict && (
        <div>
          <h2>Verdict: {verdict.verdict}</h2>
          <pre>{JSON.stringify(verdict, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
