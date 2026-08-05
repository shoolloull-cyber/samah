import sys
from PIL import Image
import os

def remove_checkerboard(img_path):
    if not os.path.exists(img_path):
        return
        
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # Checkerboard is usually white (255,255,255) and light grey (around 204,204,204)
        # If the pixel is very unsaturated (grey) and light, make it transparent
        if r > 180 and g > 180 and b > 180 and abs(r-g) < 15 and abs(r-b) < 15 and abs(g-b) < 15:
            new_data.append((255, 255, 255, 0))
        else:
            # Also soften edges by making slightly darker greys semi-transparent
            if r > 150 and g > 150 and b > 150 and abs(r-g) < 20 and abs(r-b) < 20 and abs(g-b) < 20:
                 new_data.append((r, g, b, int(a * 0.5)))
            else:
                 new_data.append(item)
            
    img.putdata(new_data)
    img.save(img_path)
    print(f"Processed {img_path}")

try:
    remove_checkerboard('public/assets/gift-box.png')
    remove_checkerboard('public/assets/teddy-bear.png')
    remove_checkerboard('public/assets/two-cats.png')
    remove_checkerboard('public/assets/envelope.png')
    remove_checkerboard('public/assets/parisian-lamp.png')
except Exception as e:
    print(e)
