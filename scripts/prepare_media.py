"""Prepare browser-compatible evaluation videos. Requires ffmpeg on PATH."""
from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]
output = ROOT / 'public' / 'videos'
output.mkdir(parents=True, exist_ok=True)
sessions = [
    ('hellen', 'evaluacion-Hellen-a-Jose'),
    ('mauricio', 'evaluacion-Mauricio-a-Jair'),
    ('rimsky', 'evaluacion-rimsky-a-rony'),
]
manifest = {}
for key, name in sessions:
    source, target = ROOT / f'{name}.mkv', output / f'{name}.mp4'
    if source.exists() and (not target.exists() or source.stat().st_mtime > target.stat().st_mtime):
        subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(source),
                        '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-pix_fmt', 'yuv420p',
                        '-c:a', 'aac', '-movflags', '+faststart', str(target)], check=True)
    manifest[key] = f'videos/{name}.mp4' if target.exists() else None
(ROOT / 'public' / 'media.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print('Estado de entrevistas:', json.dumps(manifest, ensure_ascii=False))
