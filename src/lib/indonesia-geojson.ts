// Simplified Indonesia GeoJSON data for village-level analysis
// This is a representative sample of Indonesian villages with realistic coordinates
import type { Feature, FeatureCollection, Point } from "geojson";

export const indonesiaVillagesGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    // Java villages
    {
      "type": "Feature",
      "properties": {
        "id": "desa_1_1",
        "name": "Desa Sukamaju",
        "kabupaten": "Bogor",
        "provinsi": "Jawa Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [106.8456, -6.5944]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_1_2",
        "name": "Desa Makmur",
        "kabupaten": "Bogor",
        "provinsi": "Jawa Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [106.8123, -6.6234]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_1_3",
        "name": "Desa Sejahtera",
        "kabupaten": "Bogor",
        "provinsi": "Jawa Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [106.7890, -6.5678]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_2_1",
        "name": "Desa Merdeka",
        "kabupaten": "Bandung",
        "provinsi": "Jawa Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [107.6191, -6.9175]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_2_2",
        "name": "Desa Pancasila",
        "kabupaten": "Bandung",
        "provinsi": "Jawa Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [107.5834, -6.8945]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_3_1",
        "name": "Desa Sumber Rejeki",
        "kabupaten": "Malang",
        "provinsi": "Jawa Timur"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [112.6304, -7.9797]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_3_2",
        "name": "Desa Tani Makmur",
        "kabupaten": "Malang",
        "provinsi": "Jawa Timur"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [112.6123, -7.9456]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_4_1",
        "name": "Desa Karya Bhakti",
        "kabupaten": "Surabaya",
        "provinsi": "Jawa Timur"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [112.7521, -7.2575]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_5_1",
        "name": "Desa Gotong Royong",
        "kabupaten": "Semarang",
        "provinsi": "Jawa Tengah"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [110.4203, -6.9932]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_5_2",
        "name": "Desa Bina Karya",
        "kabupaten": "Semarang",
        "provinsi": "Jawa Tengah"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [110.3876, -7.0234]
      }
    },
    
    // Sumatra villages
    {
      "type": "Feature",
      "properties": {
        "id": "desa_6_1",
        "name": "Desa Suka Damai",
        "kabupaten": "Medan",
        "provinsi": "Sumatera Utara"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [98.6722, 3.5952]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_6_2",
        "name": "Desa Harapan Jaya",
        "kabupaten": "Medan",
        "provinsi": "Sumatera Utara"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [98.6456, 3.5678]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_7_1",
        "name": "Desa Maju Bersama",
        "kabupaten": "Padang",
        "provinsi": "Sumatera Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [100.3543, -0.9471]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_7_2",
        "name": "Desa Berkah Ilahi",
        "kabupaten": "Padang",
        "provinsi": "Sumatera Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [100.3234, -0.9789]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_8_1",
        "name": "Desa Sumber Makmur",
        "kabupaten": "Palembang",
        "provinsi": "Sumatera Selatan"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [104.7458, -2.9761]
      }
    },
    
    // Kalimantan villages
    {
      "type": "Feature",
      "properties": {
        "id": "desa_9_1",
        "name": "Desa Rimba Jaya",
        "kabupaten": "Pontianak",
        "provinsi": "Kalimantan Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [109.3425, -0.0263]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_9_2",
        "name": "Desa Hutan Lestari",
        "kabupaten": "Pontianak",
        "provinsi": "Kalimantan Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [109.3123, -0.0567]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_10_1",
        "name": "Desa Barito Indah",
        "kabupaten": "Banjarmasin",
        "provinsi": "Kalimantan Selatan"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [114.5906, -3.3194]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_10_2",
        "name": "Desa Martapura Sejahtera",
        "kabupaten": "Banjarmasin",
        "provinsi": "Kalimantan Selatan"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [114.5634, -3.3456]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_11_1",
        "name": "Desa Mahakam Jaya",
        "kabupaten": "Samarinda",
        "provinsi": "Kalimantan Timur"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [117.1436, -0.5018]
      }
    },
    
    // Sulawesi villages
    {
      "type": "Feature",
      "properties": {
        "id": "desa_12_1",
        "name": "Desa Bugis Makmur",
        "kabupaten": "Makassar",
        "provinsi": "Sulawesi Selatan"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [119.4221, -5.1477]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_12_2",
        "name": "Desa Toraja Indah",
        "kabupaten": "Makassar",
        "provinsi": "Sulawesi Selatan"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [119.3987, -5.1789]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_13_1",
        "name": "Desa Minahasa Jaya",
        "kabupaten": "Manado",
        "provinsi": "Sulawesi Utara"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [124.8421, 1.4748]
      }
    },
    
    // Bali villages
    {
      "type": "Feature",
      "properties": {
        "id": "desa_14_1",
        "name": "Desa Pura Agung",
        "kabupaten": "Denpasar",
        "provinsi": "Bali"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [115.2126, -8.6705]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_14_2",
        "name": "Desa Sawah Indah",
        "kabupaten": "Denpasar",
        "provinsi": "Bali"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [115.1876, -8.6456]
      }
    },
    
    // Nusa Tenggara villages
    {
      "type": "Feature",
      "properties": {
        "id": "desa_15_1",
        "name": "Desa Lombok Hijau",
        "kabupaten": "Mataram",
        "provinsi": "Nusa Tenggara Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [116.1178, -8.5833]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_15_2",
        "name": "Desa Sasak Makmur",
        "kabupaten": "Mataram",
        "provinsi": "Nusa Tenggara Barat"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [116.0945, -8.6123]
      }
    },
    
    // Papua villages
    {
      "type": "Feature",
      "properties": {
        "id": "desa_16_1",
        "name": "Desa Cendrawasih",
        "kabupaten": "Jayapura",
        "provinsi": "Papua"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [140.7182, -2.5489]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "desa_16_2",
        "name": "Desa Merauke Jaya",
        "kabupaten": "Jayapura",
        "provinsi": "Papua"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [140.6876, -2.5789]
      }
    }
  ]
}

// Generate additional villages programmatically to reach 80 villages
export function generateIndonesiaVillages(): FeatureCollection {
  const baseFeatures = indonesiaVillagesGeoJSON.features
  const additionalFeatures: GeoJSON.Feature[] = []
  
  // Generate more villages around existing ones
  baseFeatures.forEach((feature, index) => {
    if (additionalFeatures.length < 50) { // Add up to 50 more villages
      const [lng, lat] = feature.geometry.coordinates
      
      // Generate 1-2 additional villages near each base village
      for (let i = 1; i <= 2; i++) {
        const newLng = lng + (Math.random() - 0.5) * 0.1 // Within ~5km
        const newLat = lat + (Math.random() - 0.5) * 0.1
        
        additionalFeatures.push({
          "type": "Feature",
          "properties": {
            "id": `desa_${index + 17}_${i}`,
            "name": `Desa ${feature.properties.name.split(' ')[1]} ${i === 1 ? 'Utara' : 'Selatan'}`,
            "kabupaten": feature.properties.kabupaten,
            "provinsi": feature.properties.provinsi
          },
          "geometry": {
            "type": "Point",
            "coordinates": [newLng, newLat]
          }
        })
      }
    }
  })
  
  return {
    "type": "FeatureCollection",
    "features": [...baseFeatures, ...additionalFeatures]
  }
}