import os
from PIL import Image

# Path to the generated image
src_path = r"C:\Users\rachi\.gemini\antigravity-ide\brain\08f10d9b-c8f7-405a-af16-3bb324d3a263\feedy_new_logo_1783008666254.png"
dest_dir = r"c:\Users\rachi\projects_rachit\feedy\public\feedy-favicons"
app_dir = r"c:\Users\rachi\projects_rachit\feedy\src\app"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

try:
    img = Image.open(src_path)
    
    # 1. Save PNG sizes
    sizes = {
        "favicon-16x16.png": (16, 16),
        "favicon-32x32.png": (32, 32),
        "favicon-192x192.png": (192, 192),
        "favicon-512x512.png": (512, 512),
        "favicon-2048x2048.png": (2048, 2048),
        "apple-touch-icon.png": (180, 180),
    }
    
    for filename, size in sizes.items():
        resized = img.resize(size, Image.Resampling.LANCZOS)
        resized.save(os.path.join(dest_dir, filename))
        print(f"Saved {filename} to {dest_dir}")
        
    # 2. Save favicon.ico to public/feedy-favicons/ and src/app/
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_img = img.resize((48, 48), Image.Resampling.LANCZOS)
    
    ico_path_public = os.path.join(dest_dir, "favicon.ico")
    ico_path_app = os.path.join(app_dir, "favicon.ico")
    
    ico_img.save(ico_path_public, format='ICO', sizes=ico_sizes)
    ico_img.save(ico_path_app, format='ICO', sizes=ico_sizes)
    print("Saved favicon.ico to both destinations.")
    
    # 3. Create a simple favicon.svg since it is needed
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9333ea" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="url(#gradient)" />
  <text x="50%" y="65%" font-size="50" font-weight="bold" font-family="sans-serif" fill="white" text-anchor="middle">F</text>
</svg>"""
    with open(os.path.join(dest_dir, "favicon.svg"), "w") as f:
        f.write(svg_content)
    print("Saved favicon.svg.")
    
except Exception as e:
    print(f"Error processing images: {e}")
