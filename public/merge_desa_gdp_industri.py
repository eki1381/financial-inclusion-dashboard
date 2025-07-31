import pandas as pd
import json

# Load Excel files
df_industri = pd.read_excel('Model Industri Desa.xlsx')
df_gdp = pd.read_excel('Model GDP.xlsx')

# Pastikan kolom IDDESA bertipe string
df_industri['IDDESA'] = df_industri['IDDESA'].astype(str)
df_gdp['IDDESA'] = df_gdp['IDDESA'].astype(str)

# Tambahkan suffix pada kolom (kecuali IDDESA)
industri_cols = [col for col in df_industri.columns if col != 'IDDESA']
gdp_cols = [col for col in df_gdp.columns if col != 'IDDESA']

df_industri = df_industri.rename(columns={col: f"{col}_industri" for col in industri_cols})
df_gdp = df_gdp.rename(columns={col: f"{col}_gdp" for col in gdp_cols})

# Merge kedua DataFrame berdasarkan IDDESA
df_merged = pd.merge(df_industri, df_gdp, on='IDDESA', how='outer')

# Load GeoJSON
with open('indonesia-desa-desa.geojson', encoding='utf-8') as f:
    geo = json.load(f)

# Buat dict hasil merge untuk lookup cepat
merge_dict = df_merged.set_index('IDDESA').to_dict(orient='index')

# Tambahkan data ke properties setiap fitur
for feature in geo['features']:
    iddesa = feature['properties'].get('IDDESA')
    if iddesa is not None:
        iddesa = str(iddesa)
        if iddesa in merge_dict:
            for k, v in merge_dict[iddesa].items():
                feature['properties'][k] = None if pd.isna(v) else v

with open('indonesia-desa-merged.geojson', 'w', encoding='utf-8') as f:
    json.dump(geo, f, ensure_ascii=False)
print('Merge selesai. File: indonesia-desa-merged.geojson')
