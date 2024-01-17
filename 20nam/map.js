
//-------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------

var info = document.getElementById("info");

var isInfoVisible = false;
document.addEventListener('DOMContentLoaded', 
    function() {
        info.style.zIndex = "1001";
        info.style.display = "block";
        info.classList.add("active");
        isInfoVisible = true;
        /*            if (window.innerWidth <= 1000) {
            info.style.display = "none";
            } */
        // legendControl.addTo(map);
        isInfoVisible2 = true;
        setTimeout(function () {
            //legendControl.remove(map);
            isInfoVisible2 = false;
            }, 5000);
});

document.getElementById("nut").addEventListener("click", 
    function toggleInfo() {
        if (isInfoVisible) {
            isInfoVisible = false;
            info.classList.remove("active");
            //map.setView([11.014, 106.830], calculateZoom());
        } else {
            info.style.zIndex = "1001";
            info.style.display = "block";
            info.classList.add("active");
            isInfoVisible = true;
            //map.setView([11.014, 107.830], calculateZoom());
        }
    });



//-------------------------------------------------------------------------------------------------------------------------
var map = new L.map('map', {
    tap: false,
    center: [11.014, 106.830],
    zoom: calculateZoom(), // Sử dụng hàm tính toán mức zoom
    minZoom: calculateZoom(), // Giới hạn zoom
    maxBounds: L.latLngBounds(L.latLng(-75, -190.55), L.latLng(75, 300)), // Giới hạn tọa độ
    
});
//wrapLatLng(20.552, 70.21484);
// Hàm tính toán mức zoom dựa trên kích thước màn hình
function calculateZoom() {
    var screenWidth = window.innerWidth;
    if (screenWidth < 1000) {
        return 7; 
    } else if (screenWidth < 1537) {
        return 7;
    } else {
        return 7;
    }
}
//-------------------------------------------------------------------------------------------------------------------------
/*
// Cập nhật lại mức zoom khi kích thước màn hình thay đổi
window.addEventListener('resize', 
    function() {
        location.reload();
    });*/


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
// var dao = L.geoJSON(data_island, {
//     style: {
//         fillColor: '#f1f6d2', // Màu sắc cho polygon
//         fillOpacity: 1,    // Độ trong suốt của màu
//         color: '#a37ea0',   // Màu viền
//         weight:  0.5,           // Độ dày của viền
//         dashArray: '4, 5'   // Độ dài và khoảng cách của nét đứt khúc
// },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(`<div class="text-center"><strong>${feature.properties.name}<br>${feature.properties.tinh} , ${feature.properties.vn}</strong></div>`);
//         layer.openPopup();
//     }
// }).addTo(map);

// Tạo một lớp để chứa các marker
var markersLayer = L.layerGroup().addTo(map);

// Hàm để thêm hoặc xóa tên các đảo dựa trên mức zoom
function updateIslandLabels() {
    var zoom = map.getZoom();
    markersLayer.clearLayers();
    islands.forEach(function(island) {
        if (zoom >= 4) {
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
                        .setContent('<div class="text-center"> <strong> Tọa độ được chọn '+ '<br>' + '(vĩ độ, kinh độ) = '  +'('+ e.latlng.toString().slice(7,13)+', '+ e.latlng.toString().slice(17,25)+')' + '</strong> </div>')
                        .openOn(map);
                }
                map.on('click', onMapClick); */
//---------------------------------------------------------------------------------------------------------------------------------
function content_popup (feature) {
    return `    
    <div class="img_main">
    <div class="slideshow-container">
        <div class="mySlides" class="fade" id="s1">
        <a href="https://maithulamm.github.io/20nam/image/${feature.properties.i1}" target="_blank"><img class="noidung_img" src="https://maithulamm.github.io/20nam/image/${feature.properties.i1}"></a>
        </div>
        <div class="mySlides" class="fade" id="s2">
        <a href="https://maithulamm.github.io/20nam/image/${feature.properties.i2}" target="_blank"><img class="noidung_img" src="https://maithulamm.github.io/20nam/image/${feature.properties.i2}"></a>
        </div>
        <div class="mySlides" class="fade" id="s3">
        <a href="https://maithulamm.github.io/20nam/image/${feature.properties.i3}" target="_blank"><img class="noidung_img" src="https://maithulamm.github.io/20nam/image/${feature.properties.i3}"></a>
        </div>
        <div class="mySlides" class="fade" id="s4">
        <a href="https://maithulamm.github.io/20nam/image/${feature.properties.i4}" target="_blank"><img class="noidung_img" src="https://maithulamm.github.io/20nam/image/${feature.properties.i4}"></a>
        </div>
        <div class="mySlides" class="fade" id="s5">
        <a href="https://maithulamm.github.io/20nam/image/${feature.properties.i5}" target="_blank"><img class="noidung_img" src="https://maithulamm.github.io/20nam/image/${feature.properties.i5}"></a>
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
        <p id="text_nam"><strong>${feature.properties.donvi}</strong></p>
            <p id="text_nam"><strong>Năm ${feature.properties.nam}</strong></p>
            <p id="text_nam">${feature.properties.name_detail}</p>
            <p id="text_nam1">${feature.properties.name}</p>
            <p id="text_p">${feature.properties.mota}</p>
        </div>
    </div>
    </div>`
};
//---------------------------------------------------------------------------------------------------------------------------------

// Define the createGeoJSONLayer function
function createGeoJSONLayer(data, polygon) {
    if (data == data00) {
        return [
            L.geoJSON(data, {
                pointToLayer: function(feature, latlng) {
                    var [polygon0] = createPolygon (polygon, feature.properties.join);
                    var marker = L.marker(latlng, {
                        icon: L.divIcon({
                            className: 'my-div-icon',
                            html: `
                            <img src="https://maithulamm.github.io/20nam/img/XTN.svg" class="icon-image"/>`,
                            iconSize: [30, 30],
                        })
                    });
                        // Define your popup content (replace with actual content)
                    var popupOpened = false;
                    marker.on('click', function() {
                        data_ = data00a;
                        var customLatLng = L.latLng(latlng.lat + 0.03, latlng.lng + 0.0);
                        map.flyTo(customLatLng, 11, { duration: 0.5 });
                        isInfoVisible = false;
                        info.classList.remove("active");
                        delLayer();
                        data_.addTo(map);
                        slideIndex = 1;
                        setTimeout(function() {
                            polygon0.addTo(map);
                        }, 1000 * 0.6);
                        if (!popupOpened) {
                            setTimeout(function() {
                                marker.bindPopup(content_popup(feature)).openPopup();
                            }, 1000 * 0.5);
                                popupOpened = true;
                                marker.unbindPopup();
                                // setTimeout(function() {
                                //     polygon0.addTo(map);
                                // }, 1000 * 0.5);
                        } else {
                            setTimeout(function() {
                                marker.unbindPopup().bindPopup(content_popup(feature)).openPopup();
                            }, 1000 * 0.5);
                                popupOpened = false;
                                marker.unbindPopup();
                                // setTimeout(function() {
                                //     polygon0.addTo(map);
                                // }, 1000 * 0.5);
                        }
                    });
                    return marker;
                },
            }),
        ];
    }
    else if (data == data1) {
        return [
            L.geoJSON(data, {
                pointToLayer: function(feature, latlng) {
                    var [polygon0] = createPolygon (polygon, feature.properties.join);
                    var marker = L.marker(latlng, {
                        icon: L.divIcon({
                            className: 'my-div-icon',
                            html: `
                            <div class="icon-text"><strong>${feature.properties.nam}</strong></div>
                            <img src="img/XTN.svg" class="icon-image"/>`,
                            iconSize: [30, 30],
                        })
                    });
                        // Define your popup content (replace with actual content)
                    var popupOpened = false;
                    marker.on('click', function() {
                        data_ = data1a;
                        var customLatLng = L.latLng(latlng.lat + 0.03, latlng.lng + 0.0);
                       map.flyTo(customLatLng, 11, { duration: 0.5 });
                        isInfoVisible = false;
                        info.classList.remove("active");
                        delLayer();
                        data_.addTo(map);
                        slideIndex = 1;
                        setTimeout(function() {
                            polygon0.addTo(map);
                        }, 1000 * 0.6);
                        if (!popupOpened) {
                            setTimeout(function() {
                                marker.bindPopup(content_popup(feature)).openPopup();
                            }, 1000 * 0.5);
                                popupOpened = true;
                                marker.unbindPopup();
                                // setTimeout(function() {
                                //     polygon0.addTo(map);
                                // }, 1000 * 0.5);
                        } else {
                            setTimeout(function() {
                                marker.unbindPopup().bindPopup(content_popup(feature)).openPopup();
                            }, 1000 * 0.5);
                                popupOpened = false;
                                marker.unbindPopup();
                                // setTimeout(function() {
                                //     polygon0.addTo(map);
                                // }, 1000 * 0.5);
                        }
                    });
                    return marker;
                },
            }),
        ];
    } else if (data == data2) {
    return [
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                var [polygon0] = createPolygon (polygon, feature.properties.join);
                var marker = L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'my-div-icon',
                        html: `
                        <div class="icon-text"><strong>${feature.properties.nam}</strong></div>
                        <img src="img/XTN.svg" class="icon-image"/>`,
                        iconSize: [30, 30],
                    })
                });
                    // Define your popup content (replace with actual content)
                var popupOpened = false;
                marker.on('click', function() {
                    data_ = data2a;
                    var customLatLng = L.latLng(latlng.lat + 0.03, latlng.lng + 0.0);
                   map.flyTo(customLatLng, 11, { duration: 0.5 });
                    isInfoVisible = false;
                    info.classList.remove("active");
                    delLayer();
                    data_.addTo(map);
                    slideIndex = 1;
                    setTimeout(function() {
                        polygon0.addTo(map);
                    }, 1000 * 0.6);
                    if (!popupOpened) {
                        setTimeout(function() {
                            marker.bindPopup(content_popup(feature)).openPopup();
                        }, 1000 * 0.5);
                            popupOpened = true;
                            marker.unbindPopup();
                            // setTimeout(function() {
                            //     polygon0.addTo(map);
                            // }, 1000 * 0.5);
                    } else {
                        setTimeout(function() {
                            marker.unbindPopup().bindPopup(content_popup(feature)).openPopup();
                        }, 1000 * 0.5);
                            popupOpened = false;
                            marker.unbindPopup();
                            // setTimeout(function() {
                            //     polygon0.addTo(map);
                            // }, 1000 * 0.5);
                    }
                });
                return marker;

            },
        }),
    ];
} else if (data == data3) {
    return [
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                var [polygon0] = createPolygon (polygon, feature.properties.join);
                var marker = L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'my-div-icon',
                        html: `
                        <div class="icon-text"><strong>${feature.properties.nam}</strong></div>
                        <img src="img/XTN.svg" class="icon-image"/>`,
                        iconSize: [30, 30],
                    })
                });
                    // Define your popup content (replace with actual content)
                var popupOpened = false;
                marker.on('click', function() {
                    data_ = data3a;
                    var customLatLng = L.latLng(latlng.lat + 0.03, latlng.lng + 0.0);
                   map.flyTo(customLatLng, 11, { duration: 0.5 });
                    isInfoVisible = false;
                    info.classList.remove("active");
                    delLayer();
                    data_.addTo(map);
                    slideIndex = 1;
                    setTimeout(function() {
                        polygon0.addTo(map);
                    }, 1000 * 0.6);
                    if (!popupOpened) {
                        setTimeout(function() {
                            marker.bindPopup(content_popup(feature)).openPopup();
                        }, 1000 * 0.5);
                            popupOpened = true;
                            marker.unbindPopup();
                            // setTimeout(function() {
                            //     polygon0.addTo(map);
                            // }, 1000 * 0.5);
                    } else {
                        setTimeout(function() {
                            marker.unbindPopup().bindPopup(content_popup(feature)).openPopup();
                        }, 1000 * 0.5);
                            popupOpened = false;
                            marker.unbindPopup();
                            // setTimeout(function() {
                            //     polygon0.addTo(map);
                            // }, 1000 * 0.5);
                    }
                });
                return marker;

            },
        }),
    ]
} else if (data == data4) {
    return [
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                var [polygon0] = createPolygon (polygon, feature.properties.join);
                var marker = L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'my-div-icon',
                        html: `
                        <div class="icon-text"><strong>${feature.properties.nam}</strong></div>
                        <img src="img/XTN.svg" class="icon-image"/>`,
                        iconSize: [30, 30],
                    })
                });
                    // Define your popup content (replace with actual content)
                var popupOpened = false;
                marker.on('click', function() {
                    data_ = data4a;
                    var customLatLng = L.latLng(latlng.lat + 0.03, latlng.lng + 0.0);
                   map.flyTo(customLatLng, 11, { duration: 0.5 });
                    isInfoVisible = false;
                    info.classList.remove("active");
                    delLayer();
                    data_.addTo(map);
                    slideIndex = 1;
                    setTimeout(function() {
                        polygon0.addTo(map);
                    }, 1000 * 0.6);
                    if (!popupOpened) {
                        setTimeout(function() {
                            marker.bindPopup(content_popup(feature)).openPopup();
                        }, 1000 * 0.5);
                            popupOpened = true;
                            marker.unbindPopup();
                            // setTimeout(function() {
                            //     polygon0.addTo(map);
                            // }, 1000 * 0.5);
                    } else {
                        setTimeout(function() {
                            marker.unbindPopup().bindPopup(content_popup(feature)).openPopup();
                        }, 1000 * 0.5);
                            popupOpened = false;
                            marker.unbindPopup();
                            // setTimeout(function() {
                            //     polygon0.addTo(map);
                            // }, 1000 * 0.5);
                    }
                });
                return marker;

            },
        }),
    ]
}
}



// Create GeoJSON layers
var [data00a] = createGeoJSONLayer(data00,polygon);


//L.control.layers(basemapLayers,overlays).addTo(map);
function createPolygon (polygon, id){
    p = L.geoJSON(polygon, {
        style: {
            fillColor: 'transparent',
            fillOpacity: 1,
            color: 'red',
            weight: 2.5,
            dashArray: '7, 10'
        },
        filter: function(feature) {
            return feature.properties.ID_4 === id;            
        }
    })
    return [p]
};


//data0 = L.layerGroup([data1, data2]);
data00a.addTo(map);

var [data1a] = createGeoJSONLayer(data1, polygon);
var [data2a] = createGeoJSONLayer(data2, polygon);
var [data3a] = createGeoJSONLayer(data3, polygon);
var [data4a] = createGeoJSONLayer(data4, polygon);
//---------------------------------------------------------------------------------------------------------------------------------
function delLayer() {
    return [
        map.eachLayer(function (mapLayer) {
            if (mapLayer instanceof L.GeoJSON) {
                map.removeLayer(mapLayer);
            }
        })
    ]
}
// Define the toggleLayer function
function toggleLayer(dataLayer,zoom) {
    if (innerWidth < 1000) {
        zoom = 7;
    }
    map.closePopup();
    // Remove all layers from the map
    delLayer();
    // Add the selected layers to the map
    dataLayer.addTo(map);
    isInfoVisible = false;
    info.classList.remove("active");
    info.classList.add("inactive");

    function getCenterOfDataLayer(Layer) {
        // Get the bounds of the 
        var bounds = Layer.getBounds();
        if (bounds.isValid()) {
            // If the bounds are valid, return the center of the bounds
            return bounds.getCenter();
        } else {
            // If the bounds are not valid, return null or handle the case accordingly
            return null;
        }
    }
    // Sử dụng hàm để lấy điểm trung tâm của 
    var centerPoint = getCenterOfDataLayer(dataLayer);
    
    if (centerPoint !== null) {
        map.flyTo(centerPoint, zoom, {duration : zoom/14});
    } else {
        console.log("Invalid bounds");
    }
        
    dao.addTo(map);
    isInfoVisible2 = false;
}

// function toggleLayer1() {

//     map.closePopup();
//     // Remove all layers from the map
//     delLayer();
//     map.closePopup();
//     var screenWidth = window.innerWidth;
//     if (screenWidth < 1537) {
//         setTimeout(function () {
//             data00a.addTo(map);
//         }, 300);
//     } else {
//         data00a.addTo(map);
//     }
//     // Add the selected layers to the map
//     isInfoVisible = false;
//     info.classList.remove("active");
//     info.classList.add("inactive");
//     map.setView([11.014, 106.830], calculateZoom(), {duration : .6});
//     dao.addTo(map);
//     //legendControl.addTo(map);
//     isInfoVisible2 = true;
// }

//---------------------------------------------------------------------------------------------------------------------------------

