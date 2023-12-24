
//-------------------------------------------------------------------------------------------------------------------------
setTimeout(function () {
    location.reload();
  }, 60000*5);

//-------------------------------------------------------------------------------------------------------------------------

var info = document.getElementById("info");

var isInfoVisible = false;
document.addEventListener('DOMContentLoaded', 
    function() {
        info.style.zIndex = "1001";
        info.style.display = "block";
        info.classList.remove("inactive");
        info.classList.add("active");
        isInfoVisible = true;
        //
        legendControl.addTo(map);
        isInfoVisible2 = true;
        setTimeout(function () {
            legendControl.remove(map);
            isInfoVisible2 = false;
            }, 5000);
});
document.getElementById("nut").addEventListener("click", 
    function toggleInfo() {
        if (isInfoVisible) {
            isInfoVisible = false;
            info.classList.remove("active");
            info.classList.add("inactive");
            map.setView([15.640470684336918, 106.0246588180541], calculateZoom());
        } else {
            info.style.zIndex = "1001";
            info.style.display = "block";
            info.classList.remove("inactive");
            info.classList.add("active");
            isInfoVisible = true;
            map.setView([15.640470684336918, 111.0246588180541], calculateZoom());
        }
    });



//-------------------------------------------------------------------------------------------------------------------------
var map = new L.map('map', {
    tap: false,
    center: [15.640470684336918, 111.0246588180541],
    zoom: calculateZoom(), // Sử dụng hàm tính toán mức zoom
    minZoom: calculateZoom(), // Giới hạn zoom
    maxBounds: L.latLngBounds(L.latLng(-75, -190.55), L.latLng(75, 300)), // Giới hạn tọa độ
    
});
//wrapLatLng(20.552, 70.21484);
// Hàm tính toán mức zoom dựa trên kích thước màn hình
function calculateZoom() {
    var screenWidth = window.innerWidth;
    if (screenWidth < 1000) {
        return 2; 
    } else if (screenWidth < 1537) {
        return 2;
    } else {
        return 6;
    }
}
//-------------------------------------------------------------------------------------------------------------------------

// Cập nhật lại mức zoom khi kích thước màn hình thay đổi
window.addEventListener('resize', 
    function() {
        location.reload();
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
    "arcgis/streets-relief": getV2Basemap("arcgis/streets-relief").addTo(map),
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
               /* popup = L.popup()
                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)   
                        .setContent('<div class="text-center"> <strong> Tọa độ được chọn '+ '<br>' + '(vĩ độ, kinh độ) = '  +'('+ e.latlng.toString().slice(7,13)+', '+ e.latlng.toString().slice(18,25)+')' + '</strong> </div>')
                        .openOn(map);
                }
                //map.on('click', onMapClick); */
//---------------------------------------------------------------------------------------------------------------------------------
    
//---------------------------------------------------------------------------------------------------------------------------------
function content_popup() {
    marker.bindPopup(`
    <div class="img_text">
        <p id="text_nam"><strong>${feature.properties.chang} (${feature.properties.id})</strong></p>
        <p id="text_nam"><strong>${feature.properties.place}</strong></p>
        <p id="text_p">&nbsp ${feature.properties.noi_dung}</p>
        ${feature.properties.trung1}
    </div>
`).openPopup();
}

// Define the createGeoJSONLayer function
function createGeoJSONLayer(data) {
    return [
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                var marker = L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'my-div-icon',
                        html: `
                        <div class="icon-text"><strong>${feature.properties.id}</strong></div>
                            <img src="img/XTN.svg" class="icon-image"/>`,
                        iconSize: [40, 35]
                    })
                });
                //
                marker.on('click', function() {
                    map.setView(latlng, 4);
                });
                return marker;
            },
            onEachFeature: function(feature, marker) {
                var content_popup = `
                <div class="img_text">
                    <p id="text_nam"><strong>${feature.properties.chang} (${feature.properties.id.toString().slice(0,1)})</strong></p>
                    <p id="text_nam"><strong>${feature.properties.place}</strong></p>
                    <p id="text_p">&nbsp ${feature.properties.noi_dung}</p>
                    ${feature.properties.trung1}
                </div>
                `;
                var popupOpened = false;
                marker.on('click', function() {
                    if (!popupOpened) {
                        setTimeout(function() {
                            marker.bindPopup(content_popup).openPopup();
                            popupOpened = true;
                            marker.unbindPopup();
                        }, 1000*0.2); // 1000 milliseconds = 1 second
                    } else {
                        setTimeout(function() {
                        marker.unbindPopup().bindPopup(content_popup).openPopup();
                        popupOpened = false;
                        marker.unbindPopup();
                    }, 1000*0.2);
                    }
                });
            }
        }),
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
                            `<img src="img/XTN.svg" class="icon-image"/>`,
                        iconSize: [20, 20]
                    })
                });
                marker.on('click', function() {
                    var customLatLng = L.latLng(latlng.lat + .3, latlng.lng + 0.3);
                    map.flyTo(customLatLng, 9);
                    isInfoVisible = false;
                    info.classList.remove("active");
                    info.classList.add("inactive");

                });
                return marker;
            },
            onEachFeature: function(feature, marker) {
                var content_popup = 
                `    <div class="img_main">
                        <div class="slideshow-container">
                            <div class="mySlides" class="fade" id="s1">
                            <img class="noidung_img" src='${feature.properties.img_url1}'>
                            </div>
                        
                            <div class="mySlides" class="fade" id="s2">
                            <img class="noidung_img" src='${feature.properties.img_url2}' >
                            </div>
                        
                            <div class="mySlides" class="fade" id="s3">
                            <img class="noidung_img" src='${feature.properties.img_url3}'>
                            </div>

                            <div class="mySlides" class="fade" id="s4">
                            <img class="noidung_img" src='${feature.properties.img_url4}'>
                            </div>

                            <div class="mySlides" class="fade" id="s5">
                            <img class="noidung_img" src='${feature.properties.img_url5}'>
                            </div>
                            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                            <a class="next" onclick="plusSlides(1)">&#10095;</a>
                            <div class="dott">
                            <span class="dot" id="dot1" onclick="currentSlide(1)"></span>
                            <span class="dot" onclick="currentSlide(2)"></span>
                            <span class="dot" onclick="currentSlide(3)"></span>
                            <span class="dot" onclick="currentSlide(4)"></span>
                            <span class="dot" onclick="currentSlide(5)"></span>
                        </div>
                        </div>
                        <div>
                            <div class="img_text">
                                <p id="text_nam"><strong>Khoa ${feature.properties.khoa}</strong></p>
                                <p id="text_nam"><strong>NĂM ${feature.properties.nam}</strong></p>
                                <p id="text_nam">${feature.properties.t_add}</p>
                                <p id="text_p">${feature.properties.t_p.slice(1,-1)}</p>
                            </div>
                        </div>
                    </div>
                `;
                var popupOpened = false;
                marker.on('click', function() {
                    if (!popupOpened) {
                        setTimeout(function() {
                            marker.bindPopup(content_popup).openPopup();
                            popupOpened = true;
                            marker.unbindPopup();
                        }, 1000*0.5); // 1000 milliseconds = 1 second
                    } else {
                        setTimeout(function() {
                        marker.unbindPopup().bindPopup(content_popup).openPopup();
                        popupOpened = false;
                        marker.unbindPopup();
                    }, 1000*0.5);
                    }
                });
            }
            
        }),

    ];
}
// Create GeoJSON layers
var [data00] = createGeoJSONLayer1(data00);
var [data1] = createGeoJSONLayer(data1);
var [data2] = createGeoJSONLayer(data2);
var [data3] = createGeoJSONLayer(data3);
var [data4] = createGeoJSONLayer(data4);

L.layerGroup([data00]).addTo(map);

//---------------------------------------------------------------------------------------------------------------------------------

// Define the toggleLayer function
function toggleLayer(dataLayer) {
    map.closePopup();
    // Remove all layers from the map
    map.eachLayer(function (mapLayer) {
  
        if (mapLayer instanceof L.GeoJSON) {
            map.removeLayer(mapLayer);
        }
    });
    // Add the selected layers to the map
    dataLayer.addTo(map);
    isInfoVisible = false;
    info.classList.remove("active");
    info.classList.add("inactive");


    
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
    map.closePopup();
    // Remove all layers from the map
    map.eachLayer(function (mapLayer) {
        if (mapLayer instanceof L.GeoJSON) {
            map.removeLayer(mapLayer);
        }
    });
    map.closePopup();
    var screenWidth = window.innerWidth;
    if (screenWidth < 1537) {
        setTimeout(function () {
            L.layerGroup([data00]).addTo(map);
        }, 300);
    } else {
        L.layerGroup([data00]).addTo(map);
    }
    // Add the selected layers to the map
    isInfoVisible = false;
    info.classList.remove("active");
    info.classList.add("inactive");
    map.setView([15.640470684336918, 106.0246588180541], calculateZoom());
    dao.addTo(map);
    legendControl.addTo(map);
    isInfoVisible2 = true;
    
}

//---------------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------------------

var legendControl2 = L.control({ position: 'bottomleft' });
legendControl2.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
    <p id="p2"> <a href="https://maithulamm.glitch.me/" target="_blank">Thực hiện: MAI THƯ LÂM</a> 
    </p>
    <input id = "i" type="button" value = "i" onclick="open_info3()">
    `;
    return div;
};
//legendControl2.addTo(map);

function open_info3() {
    const paragraph = document.getElementById('p2');
    paragraph.style.opacity = (parseFloat(paragraph.style.opacity) === 1) ? 0 : 1;
}