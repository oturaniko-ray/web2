// app/videos/page.js (Server Component)
import fs from "fs";
import path from "path";

export default function VideosPage() {
  const videosDir = path.join(process.cwd(), "public", "videos");
  let files = [];
  try {
    files = fs.readdirSync(videosDir).filter(f => /\.(mp4|mov|mkv|avi)$/i.test(f));
  } catch (e) {
    files = [];
  }

  return (
    <main>
      <h1>Videos</h1>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16}}>
        {files.map((file) => {
          const name = file.replace(/\.[^.]+$/, "");
          const poster = `/posters/${name}.jpg`;
          const src = `/videos/${file}`;
          return (
            <article key={file} style={{border: "1px solid #eee", padding: 12}}>
              <h2>{name.replace(/[-_]/g, " ")}</h2>
              <video
                controls
                preload="metadata"
                poster={poster}
                style={{width: "100%", height: "auto"}}
              >
                <source src={src} type="video/mp4" />
                Tu navegador no soporta la etiqueta video.
              </video>
            </article>
          );
        })}
      </div>
    </main>
  );
}