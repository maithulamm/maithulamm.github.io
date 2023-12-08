
//import "leaflet-arrowheads";

//-------------------------------------------------------------------------------------------------------------------------
function toggleInfo() {
    var info = document.getElementById("info");
    info.classList.toggle("active");
  }

var nut = document.getElementById("nut");
var info = document.getElementById("info");

document.addEventListener('DOMContentLoaded', 
    
    function() {
        info.style.zIndex = "1001";
        info.style.display = "block";
        info.classList.remove("inactive");
        info.classList.add("active");
        isInfoVisible = true;
        
    });
var isInfoVisible = false;

nut.addEventListener("click", 
    function toggleInfo() {
        if (isInfoVisible) {
            isInfoVisible = false;
            info.classList.remove("active");
            info.classList.add("inactive");
            map.setView([20.552, 23.21484], calculateZoom());
        } else {
            info.style.zIndex = "1001";
            info.style.display = "block";
            info.classList.remove("inactive");
            info.classList.add("active");
            isInfoVisible = true;
            map.setView([20.552, 55.21484], calculateZoom());
        }
    });

//-------------------------------------------------------------------------------------------------------------------------
var map = L.map('map', {
    tap: false,
    center: [20.552, 55.21484],
    zoom: calculateZoom(), // Sử dụng hàm tính toán mức zoom
    minZoom: 2, // Giới hạn zoom
    maxBounds: L.latLngBounds(L.latLng(-90, -250.55), L.latLng(90, 310)), // Giới hạn tọa độ

});
//wrapLatLng(20.552, 70.21484);
// Hàm tính toán mức zoom dựa trên kích thước màn hình
function calculateZoom() {
    var screenWidth = window.innerWidth;
    if (screenWidth < 1275) {
        return 2; // Mức zoom tương ứng với kích thước màn hình < 768
    } else if (screenWidth < 1537) {
        return 2; // Mức zoom tương ứng với kích thước màn hình từ 1280 đến 1536
    } else {
        return 3; // Mức zoom mặc định cho các kích thước màn hình lớn hơn 1537
    }
}
//-------------------------------------------------------------------------------------------------------------------------

// Cập nhật lại mức zoom khi kích thước màn hình thay đổi
window.addEventListener('resize', 
    function() {
        map.setZoom(calculateZoom());
    });


//-------------------------------------------------------------------------------------------------------------------------

//Esri Leaflet
const apiKey = "AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn";

function getV2Basemap(style) {
    return L.esri.Vector.vectorBasemapLayer(style, {
    language: "vi", //Chọn ngôn ngữ
    apikey: apiKey,
    version:2
    })
}
    

                
//Bộ chọn bản đồ nền Esri

const basemapLayers = {

    "arcgis/outdoor": getV2Basemap("arcgis/outdoor"),
    "arcgis/community": getV2Basemap("arcgis/community"),
    "arcgis/navigation": getV2Basemap("arcgis/navigation"),
    "arcgis/streets": getV2Basemap("arcgis/streets"),
    "arcgis/streets-relief": getV2Basemap("arcgis/streets-relief"),
    "arcgis/imagery": getV2Basemap("arcgis/imagery"),
    "arcgis/oceans": getV2Basemap("arcgis/oceans"),
    "arcgis/topographic": getV2Basemap("arcgis/topographic"),
    "arcgis/light-gray": getV2Basemap("arcgis/light-gray"),
    "arcgis/dark-gray": getV2Basemap("arcgis/dark-gray"),
    "arcgis/human-geography": getV2Basemap("arcgis/human-geography"),
    "arcgis/charted-territory": getV2Basemap("arcgis/charted-territory").addTo(map),
    "arcgis/nova": getV2Basemap("arcgis/nova"),
    "osm/standard": getV2Basemap("osm/standard"),
    "osm/navigation": getV2Basemap("osm/navigation"),
    "osm/streets": getV2Basemap("osm/streets"),
    "osm/blueprint": getV2Basemap("osm/blueprint")
    
};
                
//L.control.layers(basemapLayers).addTo(map);
// Tạo Scale Control và thêm vào bản đồ
L.control.scale({ position: 'bottomright', metric: true, imperial: false }).addTo(map);

//-------------------------------------------------------------------------------------------------------------------------

//The hien polygon 2 dao
var dao = L.geoJSON(data_island, {
    style: {
        fillColor: '#f1f6d2', // Màu sắc cho polygon
        fillOpacity: 1,    // Độ trong suốt của màu
        color: '#a37ea0',   // Màu viền
        weight:  0.5,           // Độ dày của viền
        dashArray: '4, 5'   // Độ dài và khoảng cách của nét đứt khúc
},
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<div class="text-center"><strong>${feature.properties.name}<br>${feature.properties.tinh} , ${feature.properties.vn}</strong></div>`);
        layer.openPopup();
    }
}).addTo(map);

                // Tạo một lớp để chứa các marker
                var markersLayer = L.layerGroup().addTo(map);
    
                // Hàm để thêm hoặc xóa tên các đảo dựa trên mức zoom
                function updateIslandLabels() {
                    var zoom = map.getZoom();
                    markersLayer.clearLayers();
                    islands.forEach(function(island) {
                        if (zoom >= 6) {
                            var icon = L.divIcon({
                                className: 'custom-icon',
                                html: `<div >${island.name}</div>`,
                            });
                            var marker = L.marker(island.coords, { icon: icon });
                            markersLayer.addLayer(marker);
                        }
                    });
                }
                // Sự kiện zoomend để cập nhật tên các đảo khi mức zoom thay đổi
                map.on('zoomend', updateIslandLabels);
                // Ban đầu, hiển thị tên các đảo theo mức zoom
                updateIslandLabels();
    
//---------------------------------------------------------------------------------------------------------------------------------
                popup = L.popup()
                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)   
                        .setContent('<div class="text-center"> <strong> Tọa độ được chọn '+ '<br>' + '(vĩ độ, kinh độ) = '  +'('+ e.latlng.toString().slice(7,13)+', '+ e.latlng.toString().slice(18,25)+')' + '</strong> </div>')
                        .openOn(map);
                }
                //map.on('click', onMapClick);
//---------------------------------------------------------------------------------------------------------------------------------
                //Dom data
/*var data_point1 = L.geoJSON(data1, {
    pointToLayer: function(feature, latlng) {
        var marker = L.marker(latlng, {
            icon: L.divIcon({
                className: 'my-div-icon',
                html: `<img src="icon_star.png" class="icon-image"/>`,
                iconSize: [25, 50]
            })
        });
        marker.on('click', function() {
            var customLatLng = L.latLng(latlng.lat + 10, latlng.lng - 3);
            map.setView(customLatLng, 4, { duration: 1. // Adjust the duration for the desired animation speed
            });
            marker.popupTimeout = setTimeout(function() {
                marker.bindPopup(`
                    <div class="img_text">
                        <p id="text_nam"><strong>${feature.properties.chang} (${feature.properties.id})</strong></p>
                        <p id="text_nam">${feature.properties.place}</p>
                        <p id="text_p">${feature.properties.noi_dung}</p>
                    </div>
                `).openPopup();
            }, 0);
            isInfoVisible = false;
            info.classList.remove("active");
            info.classList.add("inactive");
            
        });
        return marker;
    },
}).addTo(map);
                
                //var line = L.polyline([[10.76015786,106.7130549],[1.357929489,103.8531614]], {dashArray: "5 5"});
                //line.addTo(map);



            
                /*var data_line1 = L.geoJSON(line0, {
                    style: {
                        //fillColor: '#f1f6d2', // Màu sắc cho polygon
                        //fillOpacity: 1,    // Độ trong suốt của màu
                        color: '#a37ea0',   // Màu viền
                        weight:  2.5,           // Độ dày của viền
                        dashArray: '4, 5'   // Độ dài và khoảng cách của nét đứt khúc
                    },
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(`<div class="text-center"><strong>Chặng ${feature.properties.chang} <br> Cảng Sài Gòn - Le Havre </strong></div>`);
                        //layer.openPopup();
                    }
                    }).addTo(map);*/
//---------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------------------

                /*
                // Lắng nghe sự kiện click cho nút
                document.getElementById('zoom-to-current-location').addEventListener('click', function() {
                    if (currentLocation) {
                        map.setView(currentLocation, 16); // Đặt lại tọa độ và mức zoom
                    }
                });
                var dataControlLayer; // Biến để lưu lớp điểm đánh dấu*/
    
//---------------------------------------------------------------------------------------------------------------------------------

function hover1() {
    document.getElementById("d").addEventListener("mouseover", mouseOver);
    document.getElementById("d").addEventListener("mouseout", mouseOut);
    function mouseOver() {
    document.getElementById("d1").style.display = "inline";
    };
    function mouseOut() {
    document.getElementById("d1").style.display = "none";
    };
}
// Define the createGeoJSONLayer function
function createGeoJSONLayer(data, line) {
    return [
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                var marker = L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'my-div-icon',
                        html: `
                        <div class="icon-text"><strong>${feature.properties.id}</strong></div>
                            <img src="https://cdn.glitch.global/90845d8e-81a9-424d-b13a-0acd2c0b3b63/8603698.png?v=1700463807212" class="icon-image"/>`,
                        iconSize: [40, 35]
                    })
                });
                marker.on('click', function() {
                    var customLatLng = L.latLng(latlng.lat + 10, latlng.lng - 3);
                    map.setView(customLatLng, calculateZoom());
                    marker.popupTimeout = setTimeout(function() {
                        marker.bindPopup(`
                            <div class="img_text">
                                <p id="text_nam"><strong>${feature.properties.chang} (${feature.properties.id})</strong></p>
                                <p id="text_nam"><strong>${feature.properties.place}</strong></p>
                                <p id="text_p">&nbsp ${feature.properties.noi_dung}</p>
                                ${feature.properties.trung1}
                            </div>
                        `
                        ).openPopup();
                    }, 0);
                    isInfoVisible = false;
                    info.classList.remove("active");
                    info.classList.add("inactive");

                });
                
                return marker;
            },
        })
        ,
        L.geoJSON(line, {
            onEachFeature: function (feature, layer) {
                layer.setText(`          ►           `+"", {offset: 5,attributes: {fill: `${feature.properties.color}`,'font-size':"15px"}, orientation: '', center: false,repeat: true});
                layer.setStyle({
                    'color': feature.properties.color,
                    'dashArray': feature.properties.dashArray,
                    'weight': 3,
                    //'lineJoin': feature.properties.lineJoin,
                    //"dashArray": "2,15",
                    // "lineJoin": "round"
                });
                layer.bindPopup(`<div class="text-center"><strong> ${feature.properties.chang}</strong></div>`);
            }
        })
    ];
}



function createGeoJSONLayer1(data) {
    return [
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                var marker = L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'my-div-icon',
                        html: 
                        //<div class="icon-text"><strong>${feature.properties.id}</strong></div>
                            `<img src="https://cdn.glitch.global/90845d8e-81a9-424d-b13a-0acd2c0b3b63/8603698.png?v=1700463807212" class="icon-image"/>`,
                        iconSize: [20, 20]
                    })
                });
                marker.on('click', function() {
                    var customLatLng = L.latLng(latlng.lat + 10, latlng.lng - 3);
                    map.setView(customLatLng, calculateZoom());
                    marker.popupTimeout = setTimeout(function() {
                        marker.bindPopup(`
                            <div class="img_text">
                                <p id="text_nam"><strong>${feature.properties.chang} (${feature.properties.id})</strong></p>
                                <p id="text_nam"><strong>${feature.properties.place}</strong></p>
                                <p id="text_p">&nbsp ${feature.properties.noi_dung}</p>
                                ${feature.properties.trung1}
                            </div>
                        `
                        ).openPopup();
                    }, 0);
                    isInfoVisible = false;
                    info.classList.remove("active");
                    info.classList.add("inactive");

                });
                
                return marker;
            },
        })
    ];
}
// Create GeoJSON layers
var [data00] = createGeoJSONLayer1(data00);
var [data1, line1] = createGeoJSONLayer(data1, line1);
var [data2, line2] = createGeoJSONLayer(data2, line2);
var [data3, line3] = createGeoJSONLayer(data3, line3);
var [data4, line4] = createGeoJSONLayer(data4, line4);
var [data5, line5] = createGeoJSONLayer(data5, line5);
var [data6, line6] = createGeoJSONLayer(data6, line6);
var [data7, line7] = createGeoJSONLayer(data7, line7);
var [data8, line8] = createGeoJSONLayer(data8, line8);
var [data9, line9] = createGeoJSONLayer(data9, line9);
var [data10, line10] = createGeoJSONLayer(data10, line10);

var line00 = L.layerGroup([line1, line2, line3, line4, line5, line6, line7, line8, line9, line10,data00]).addTo(map);

/*
line1.addTo(map);
line2.addTo(map);
line3.addTo(map);
line4.addTo(map);
line5.addTo(map);
line6.addTo(map);
line7.addTo(map);
line8.addTo(map);
line9.addTo(map);
line10.addTo(map);*/
//---------------------------------------------------------------------------------------------------------------------------------

// Define the toggleLayer function
function toggleLayer(dataLayer, lineLayer) {
    // Remove all layers from the map
    map.eachLayer(function (mapLayer) {
        if (mapLayer instanceof L.GeoJSON) {
            map.removeLayer(mapLayer);
        }
    });
    // Add the selected layers to the map
    dataLayer.addTo(map);
    lineLayer.addTo(map);
    isInfoVisible = false;
    info.classList.remove("active");
    info.classList.add("inactive");
    function getCenterOfDataLayer(lineLayer) {
        // Get the bounds of the 
        var bounds = lineLayer.getBounds();
    
        if (bounds.isValid()) {
            // If the bounds are valid, return the center of the bounds
            return bounds.getCenter();
        } else {
            // If the bounds are not valid, return null or handle the case accordingly
            return null;
        }
    }
    // Sử dụng hàm để lấy điểm trung tâm của 
    var centerPoint = getCenterOfDataLayer(lineLayer);
    
    if (centerPoint !== null) {
        // Sử dụng điểm trung tâm, ví dụ:
        console.log("Center Point:", centerPoint);
        map.setView(centerPoint, 3);
    } else {
        console.log("Invalid bounds");
    }
        
    dao.addTo(map);
    legendControl.remove(map);
    isInfoVisible2 = false;
}

function toggleLayer1() {
    // Remove all layers from the map
    map.eachLayer(function (mapLayer) {
        if (mapLayer instanceof L.GeoJSON) {
            map.removeLayer(mapLayer);
        }
    });

    // Add the selected layers to the map
    setTimeout(function () {
        L.layerGroup([line1, line2, line3, line4, line5, line6, line7, line8, line9, line10,data00]).addTo(map);
      }, 300);
    
    isInfoVisible = false;
    info.classList.remove("active");
    info.classList.add("inactive");
    map.setView([20.552, 23.21484], calculateZoom());
    dao.addTo(map);
    legendControl.addTo(map);
    isInfoVisible2 = true;
    
}

//---------------------------------------------------------------------------------------------------------------------------------

    // Tạo control chú giải
    var legendControl = L.control({ position: 'bottomleft' });

    legendControl.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <div id="info2" >
        <h4>Chú giải</h4>
        <ul class="chugiai_ul">
            <li class="chugiai_li"> 
                <div class="chugiai_line line0">
                </div>
                <p> Hành trình trên bộ</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line1">
                </div>
                <p> Hành trình trên biển</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line2">
                </div>
                <p> Chặng 1: Cảng Sài Gòn - Le Havre</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line3">
                </div>
                <p> Chặng 2: Vòng quanh châu Phi</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line4">
                </div>
                <p> Chặng 3: Pháp - Châu Mỹ - Anh</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line5">
                </div>
                <p> Chặng 4: Pháp - Liên Xô</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line6">
                </div>
                <p> Chặng 5: Moskva - Quảng Châu </p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line7">
                </div>
                <p> Chặng 6: Moskva - Xiêm</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line8">
                </div>
                <p> Chặng 7: Hong Kong - Thượng Hải</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line9">
                </div>
                <p> Chặng 8: Thượng Hải - Moskva</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line10">
                </div>
                <p> Chặng 9: Moskva - Quế Lâm</p>
            </li>
            <li class="chugiai_li"> 
                <div class="chugiai_line line11">
                </div>
                <p> Chặng 10: Quế Lâm - Pác Pó</p>
            </li>
        </ul>
        </div>
        
      `;
      return div;
    };

    // Thêm control chú giải vào bản đồ
    legendControl.addTo(map);
    isInfoVisible2 = true;
    setTimeout(function () {
        legendControl.remove(map);
        isInfoVisible2 = false;
      }, 5000);
    function toggleInfo2() {
        info2.classList.toggle("active");
      }
    var nut2 = document.getElementById("nut2");
    document.addEventListener('DOMContentLoaded', 
        function() {
            legendControl.addTo(map);
            isInfoVisible2 = true;
        });
    
    nut2.addEventListener("click", 
        function toggleInfo() {
            if (isInfoVisible2) {
                isInfoVisible2 = false;
                legendControl.remove(map);
            } else {
                isInfoVisible2 = true;
                legendControl.addTo(map);
            }
        });
//---------------------------------------------------------------------------------------------------------------------------------



