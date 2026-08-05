from PIL import Image

def remove_white(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        if r > 230 and g > 230 and b > 230:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    img.save(out_path)
    print("Processed", out_path)

remove_white('C:/Users/Extra/.gemini/antigravity-ide/brain/c76e85f5-f641-4710-80fe-9581a09f80cb/media__1780964418773.png', 'public/assets/star-patch.png')
remove_white('C:/Users/Extra/.gemini/antigravity-ide/brain/c76e85f5-f641-4710-80fe-9581a09f80cb/media__1780964418738.png', 'public/assets/clapperboard-patch.png')
