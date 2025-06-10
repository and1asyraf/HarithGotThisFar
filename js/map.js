document.addEventListener('DOMContentLoaded', function() {
    // Raia Hotel coordinates
    const venue = [5.9647569323360825, 116.0687056877951];
    const map = L.map('map').setView(venue, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const venueIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const hotelIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Add Raia Hotel marker
    const venueMarker = L.marker(venue, {icon: venueIcon}).addTo(map);
    venueMarker.bindPopup(`
        <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0;">Raia Hotel</h3>
            <p style="margin: 0;">Wedding Venue</p>
            <p style="margin: 5px 0 0 0;">📍 Jalan Lintas, Kota Kinabalu</p>
        </div>
    `);

    // Function to calculate distance between two points
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distance in km
        return distance.toFixed(1);
    }

    const nearbyHotels = [
        {
            name: "Hotel Sixty3",
            position: [5.985833022862306, 116.07769196441532],
            address: "63 Jalan Gaya, Kota Kinabalu"
        },
        {
            name: "Hotel Capital",
            position: [5.98551711481453, 116.07678349375735],
            address: "Jalan Haji Saman, Kota Kinabalu"
        },
        {
            name: "Hotel Grandis",
            position: [5.988244788966549, 116.07812013742867],
            address: "Jalan Tun Fuad Stephens, Kota Kinabalu"
        },
        {
            name: "Tang Dynasty Park Hotel",
            position: [5.964988327608113, 116.07088252540194],
            address: "Jalan Gaya, Kota Kinabalu"
        },
        {
            name: "Paradise Suite @ Sutera Avenue",
            position: [5.96787157851426, 116.06576965277054],
            address: "Sutera Avenue, Kota Kinabalu"
        },
        {
            name: "Golden Hotel",
            position: [5.960868135535339, 116.06475096626389],
            address: "Jalan Gaya, Kota Kinabalu"
        },
        {
            name: "Margo Hotel KK",
            position: [5.9701193243457125, 116.06437593742827],
            address: "Jalan Haji Saman, Kota Kinabalu"
        },
        {
            name: "Stanton City Hotel",
            position: [5.965609162393996, 116.06357605277066],
            address: "Jalan Gaya, Kota Kinabalu"
        },
        {
            name: "Oceania Hotel",
            position: [5.970043272189225, 116.07175797975736],
            address: "Jalan Haji Saman, Kota Kinabalu"
        },
        {
            name: "The Sigar @ Sutera Bay",
            position: [5.969665172395768, 116.07095695092177],
            address: "Sutera Bay, Kota Kinabalu"
        },
        {
            name: "Sky Hotel",
            position: [5.970614238445951, 116.07141283900164],
            address: "Jalan Gaya, Kota Kinabalu"
        },
        {
            name: "Sabah Oriental Hotel",
            position: [5.970669277460048, 116.07021995413768],
            address: "Jalan Gaya, Kota Kinabalu"
        },
        {
            name: "Ming Garden Hotel",
            position: [5.9702621502331725, 116.06875723889561],
            address: "Jalan Gaya, Kota Kinabalu"
        },
        {
            name: "KK Times Square Hotel",
            position: [5.969986406994928, 116.06553205277062],
            address: "Times Square, Kota Kinabalu"
        },
        {
            name: "Manja Hotel",
            position: [5.969712631051607, 116.06531542393496],
            address: "Jalan Gaya, Kota Kinabalu"
        },
        {
            name: "The Klagan @ Riverson",
            position: [5.969362013894094, 116.0642078104417],
            address: "Riverson, Kota Kinabalu"
        },
        {
            name: "Hilton Hotel",
            position: [5.975002716700027, 116.07366929509966],
            address: "Jalan Tun Fuad Stephens, Kota Kinabalu"
        },
        {
            name: "Holiday Inn",
            position: [5.974305385320877, 116.0741662193028],
            address: "Jalan Tun Fuad Stephens, Kota Kinabalu"
        },
        {
            name: "Le Meridien Hotel",
            position: [5.980097512239996, 116.07160383242646],
            address: "Jalan Tun Fuad Stephens, Kota Kinabalu"
        }
    ];

    nearbyHotels.forEach(hotel => {
        const marker = L.marker(hotel.position, {icon: hotelIcon}).addTo(map);
        const distance = calculateDistance(venue[0], venue[1], hotel.position[0], hotel.position[1]);
        marker.bindPopup(`
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 5px 0;">${hotel.name}</h3>
                <p style="margin: 0;">Nearby Hotel</p>
                <p style="margin: 5px 0 0 0;">📍 ${hotel.address}</p>
                <p style="margin: 5px 0 0 0; color: #666;">🚶‍♂️ ${distance} km from Raia Hotel</p>
            </div>
        `);
    });
}); 