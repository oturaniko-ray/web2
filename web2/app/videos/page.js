import fs from "fs";
import path from "path";

export default function VideosPage() {
  const dataPath = path.join(process.cwd(), "public", "data", "videos.json");
  let videos = [];
  try {
    const raw = fs.readFileSync(dataPath, "utf8");
    videos = JSON.parse(raw);
  } catch (e) {
    videos = [];
  }

  return (
    <main style={{padding: 24}}>
      <h1 style={{marginBottom: 16}}>Videos</h1>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16}}>
        {videos.map(v => (
          <article key={v.slug} style={{border: "1px solid #eee", borderRadius: 8, padding: 12}}>
            <h2 style={{fontSize: 18, margin: "0 0 8px"}}>{v.title}</h2>
            <video
              controls
              preload="metadata"
              poster={v.poster}
              style={{width: "100%", height: "auto", borderRadius: 4}}
              aria-label={v.title}
            >
              <source src={/videos/} type="video/mp4" />
              {v.subtitles && <track kind="subtitles" src={v.subtitles} srcLang="es" label="Español" default />}
              Tu navegador no soporta la etiqueta video.
            </video>
            {v.description && <p style={{marginTop: 8}}>{v.description}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
