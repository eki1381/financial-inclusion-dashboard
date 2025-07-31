import pandas as pd
import json

# Load Excel
df = pd.read_excel('Indeks Inklusi Keuangan.xlsx')
df['idkab'] = df['idkab'].astype(str)

# Load GeoJSON
with open('indonesia-kab.geojson', encoding='utf-8') as f:
    geo = json.load(f)

# Group IFI and scores by idkab and tahun
grouped = df.groupby(['idkab', 'tahun']).first().reset_index()

# Get all unique years
years = sorted(df['tahun'].unique())

for feature in geo['features']:
    idkab = feature['properties']['idkab']
    for year in years:
        row = grouped[(grouped['idkab'] == idkab) & (grouped['tahun'] == year)]
        if not row.empty:
            feature['properties'][f'access_score_{year}'] = float(row['access_score'].values[0])
            feature['properties'][f'avail_score_{year}'] = float(row['avail_score'].values[0])
            feature['properties'][f'usage_score_{year}'] = float(row['usage_score'].values[0])
            feature['properties'][f'IFI_{year}'] = float(row['IFI'].values[0])
        else:
            feature['properties'][f'access_score_{year}'] = None
            feature['properties'][f'avail_score_{year}'] = None
            feature['properties'][f'usage_score_{year}'] = None
            feature['properties'][f'IFI_{year}'] = None

with open('indonesia-kab-merged.geojson', 'w', encoding='utf-8') as f:
    json.dump(geo, f, ensure_ascii=False)
print('Merge selesai. File: indonesia-kab-merged.geojson')
