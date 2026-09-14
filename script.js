/* =====================================================
   LANKAEXPLORE - COMPLETE SCRIPT
   ===================================================== */


/* =====================================================
   MOBILE MENU
   ===================================================== */

function toggleMenu() {

    const nav = document.getElementById("navMenu");

    if (nav) {
        nav.classList.toggle("active");
    }

}


/* =====================================================
   DESTINATION SEARCH
   ===================================================== */

function searchDestinations() {

    const inputElement =
        document.getElementById("destinationSearch");

    if (!inputElement) return;

    const input =
        inputElement.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".destination-card");

    cards.forEach(function(card) {

        const name =
            (card.dataset.name || "").toLowerCase();

        if (name.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =====================================================
   BOOKING MODAL
   ===================================================== */

function openBooking(place) {

    const modal =
        document.getElementById("bookingModal");

    const title =
        document.getElementById("bookingTitle");

    if (!modal || !title) return;

    title.innerText =
        "Book " + place;

    modal.classList.add("active");

}


function closeBooking() {

    const modal =
        document.getElementById("bookingModal");

    if (modal) {

        modal.classList.remove("active");

    }

}


function submitBooking(event) {

    event.preventDefault();

    const form = event.target;
    const inputs = form.querySelectorAll("input");
    const title = document.getElementById("bookingTitle");

    if (!title || inputs.length < 4) {
        alert("Booking form is not available. Please try again.");
        return;
    }

    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const date = inputs[2].value;
    const travelers = inputs[3].value;

    if (!name || !email || !date || !travelers) {
        alert("Please complete all booking fields.");
        return;
    }

    const booking = {
        id: Date.now(),
        place: title.innerText.replace(/^Book\s+/, "").trim(),
        name,
        email,
        date,
        travelers,
        status: "Pending",
        createdAt: new Date().toISOString()
    };

    let bookings = [];
    try {
        bookings = JSON.parse(localStorage.getItem("lankaBookings") || "[]");
        if (!Array.isArray(bookings)) bookings = [];
    } catch (error) {
        bookings = [];
    }

    bookings.push(booking);
    localStorage.setItem("lankaBookings", JSON.stringify(bookings));

    alert(
        "Booking request received!\n\n" +
        "Destination: " + booking.place + "\n" +
        "Date: " + booking.date + "\n" +
        "Travelers: " + booking.travelers
    );

    form.reset();
    closeBooking();

}


/* =====================================================
   3D EARTH
   ===================================================== */

const container =
    document.getElementById("earth");


if (
    container &&
    typeof THREE !== "undefined"
) {

    /* =================================================
       SCENE
       ================================================= */

    const scene =
        new THREE.Scene();


    /* =================================================
       CAMERA
       ================================================= */

    const camera =
        new THREE.PerspectiveCamera(
            45,
            container.clientWidth /
            container.clientHeight,
            0.1,
            1000
        );


    /* =================================================
       RENDERER
       ================================================= */

    const renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    /* Natural colour rendering */

    renderer.outputEncoding =
        THREE.sRGBEncoding;


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    container.appendChild(
        renderer.domElement
    );


    /* =================================================
       EARTH
       ================================================= */

    const earthGeometry =
        new THREE.SphereGeometry(
            2.3,
            64,
            64
        );


    const textureLoader =
        new THREE.TextureLoader();


    const earthTexture =
        textureLoader.load(
            "images/earth.jpg"
        );


    /* Natural texture colour */

    earthTexture.encoding =
        THREE.sRGBEncoding;


    const earthMaterial =
        new THREE.MeshStandardMaterial({

            map: earthTexture,

            roughness: 1.0,

            metalness: 0.0

        });


    const earth =
        new THREE.Mesh(
            earthGeometry,
            earthMaterial
        );


    scene.add(earth);


    /* =================================================
       ATMOSPHERE
       ================================================= */

    const atmosphereGeometry =
        new THREE.SphereGeometry(
            2.42,
            64,
            64
        );


    const atmosphereMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xff7a00,

            transparent: true,

            opacity: 0.08,

            side: THREE.BackSide

        });


    const atmosphere =
        new THREE.Mesh(
            atmosphereGeometry,
            atmosphereMaterial
        );


    scene.add(atmosphere);


    /* =================================================
       SRI LANKA MARKER
       ================================================= */

    const sriLankaGroup =
        new THREE.Group();


    const latitude =
        THREE.MathUtils.degToRad(
            7.8731
        );


    const longitude =
        THREE.MathUtils.degToRad(
            80.7718
        );


    const markerRadius = 2.36;


    const x =
        markerRadius *
        Math.cos(latitude) *
        Math.cos(longitude);


    const y =
        markerRadius *
        Math.sin(latitude);


    const z =
        -markerRadius *
        Math.cos(latitude) *
        Math.sin(longitude);


    /* Marker */

    const markerGeometry =
        new THREE.SphereGeometry(
            0.065,
            20,
            20
        );


    const markerMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xff7a00

        });


    const marker =
        new THREE.Mesh(
            markerGeometry,
            markerMaterial
        );


    marker.position.set(
        x,
        y,
        z
    );


    sriLankaGroup.add(
        marker
    );


    /* =================================================
       MARKER LIGHT
       ================================================= */

    const markerLight =
        new THREE.PointLight(
            0xff7a00,
            3,
            0.8
        );


    markerLight.position.set(
        x,
        y,
        z
    );


    sriLankaGroup.add(
        markerLight
    );


    earth.add(
        sriLankaGroup
    );


    /* =================================================
       LIGHTING
       ================================================= */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            0.45
        );


    scene.add(
        ambientLight
    );


    const sunLight =
        new THREE.DirectionalLight(
            0xffffff,
            1.0
        );


    sunLight.position.set(
        5,
        3,
        5
    );


    scene.add(
        sunLight
    );


    /* Soft orange light */

    const orangeLight =
        new THREE.PointLight(
            0xff7a00,
            0.6,
            10
        );


    orangeLight.position.set(
        4,
        2,
        5
    );


    scene.add(
        orangeLight
    );


    /* =================================================
       CAMERA
       ================================================= */

    camera.position.z = 6;


    /* =================================================
       EARTH INTERACTION VARIABLES
       ================================================= */

    let targetRotationY =
        earth.rotation.y;


    let targetRotationX =
        earth.rotation.x;


    let isDragging =
        false;


    let previousMouseX = 0;

    let previousMouseY = 0;


    let previousTouchX = 0;

    let previousTouchY = 0;


    /* =================================================
       MOUSE DRAG
       ================================================= */

    container.addEventListener(
        "mousedown",
        function(event) {

            isDragging = true;

            previousMouseX =
                event.clientX;

            previousMouseY =
                event.clientY;

        }
    );


    window.addEventListener(
        "mouseup",
        function() {

            isDragging = false;

        }
    );


    container.addEventListener(
        "mousemove",
        function(event) {

            if (!isDragging) return;


            const deltaX =
                event.clientX -
                previousMouseX;


            const deltaY =
                event.clientY -
                previousMouseY;


            targetRotationY +=
                deltaX * 0.005;


            targetRotationX +=
                deltaY * 0.003;


            /* Vertical limit */

            targetRotationX =
                Math.max(
                    -0.6,
                    Math.min(
                        0.6,
                        targetRotationX
                    )
                );


            previousMouseX =
                event.clientX;


            previousMouseY =
                event.clientY;

        }
    );


    /* =================================================
       TOUCH DRAG - MOBILE
       ================================================= */

    container.addEventListener(
        "touchstart",
        function(event) {

            if (
                !event.touches ||
                !event.touches.length
            ) return;


            isDragging = true;


            previousTouchX =
                event.touches[0].clientX;


            previousTouchY =
                event.touches[0].clientY;

        },
        {
            passive: true
        }
    );


    container.addEventListener(
        "touchmove",
        function(event) {

            if (!isDragging) return;


            if (
                !event.touches ||
                !event.touches.length
            ) return;


            const touchX =
                event.touches[0].clientX;


            const touchY =
                event.touches[0].clientY;


            const deltaX =
                touchX -
                previousTouchX;


            const deltaY =
                touchY -
                previousTouchY;


            targetRotationY +=
                deltaX * 0.005;


            targetRotationX +=
                deltaY * 0.003;


            targetRotationX =
                Math.max(
                    -0.6,
                    Math.min(
                        0.6,
                        targetRotationX
                    )
                );


            previousTouchX =
                touchX;


            previousTouchY =
                touchY;

        },
        {
            passive: true
        }
    );


    container.addEventListener(
        "touchend",
        function() {

            isDragging = false;

        }
    );


    /* =================================================
       MOUSE WHEEL ZOOM
       ================================================= */

    container.addEventListener(
        "wheel",
        function(event) {

            event.preventDefault();


            camera.position.z +=
                event.deltaY * 0.002;


            /* Zoom limits */

            camera.position.z =
                Math.max(
                    2.8,
                    Math.min(
                        6,
                        camera.position.z
                    )
                );

        },
        {
            passive: false
        }
    );


    /* =================================================
       RESET EARTH BUTTON
       ================================================= */

    const resetButton =
        document.createElement(
            "button"
        );


    resetButton.innerHTML =
        "↻ Reset Earth";


    resetButton.className =
        "earth-reset-button";


    container.appendChild(
        resetButton
    );


    resetButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            targetRotationY = 0;

            targetRotationX = 0;


            earth.rotation.y = 0;

            earth.rotation.x = 0;


            camera.position.z = 6;

        }
    );


    /* =================================================
       ANIMATION
       ================================================= */

    let pulse = 0;


    function animate() {

        requestAnimationFrame(
            animate
        );


        /* Automatic rotation */

        if (!isDragging) {

            targetRotationY +=
                0.0018;

        }


        /* Smooth rotation */

        earth.rotation.y +=
            (
                targetRotationY -
                earth.rotation.y
            ) * 0.08;


        earth.rotation.x +=
            (
                targetRotationX -
                earth.rotation.x
            ) * 0.08;


        /* Atmosphere */

        atmosphere.rotation.y +=
            0.001;


        /* Marker pulse */

        pulse += 0.05;


        const scale =
            1 +
            Math.sin(pulse) *
            0.25;


        marker.scale.set(
            scale,
            scale,
            scale
        );


        /* Marker light */

        markerLight.intensity =
            2.5 +
            Math.sin(pulse) *
            1.2;


        /* Render */

        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =================================================
       RESPONSIVE EARTH
       ================================================= */

    window.addEventListener(
        "resize",
        function() {

            const width =
                container.clientWidth;


            const height =
                container.clientHeight;


            camera.aspect =
                width / height;


            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        }
    );

}


/* =====================================================
   INTERACTIVE SRI LANKA MAP
   ===================================================== */

function initSriLankaMap() {

    const mapElement =
        document.getElementById(
            "sriLankaMap"
        );


    if (!mapElement) return;


    if (typeof L === "undefined") {

        console.error(
            "Leaflet library not loaded."
        );

        return;

    }


    /* =================================================
       CREATE MAP
       ================================================= */

    const map =
        L.map(
            mapElement,
            {

                zoomControl: true,

                scrollWheelZoom: true

            }
        );


    map.setView(
        [
            7.8731,
            80.7718
        ],
        7
    );


    /* =================================================
       OPEN STREET MAP
       ================================================= */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {

            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"

        }
    ).addTo(map);


    /* =================================================
       DESTINATIONS
       ================================================= */

    const places = [

        {
            name: "Sigiriya",

            coords: [
                7.9570,
                80.7603
            ],

            tagline:
                "Ancient Rock Fortress"
        },


        {
            name: "Kandy",

            coords: [
                7.2906,
                80.6337
            ],

            tagline:
                "Cultural Capital"
        },


        {
            name: "Nuwara Eliya",

            coords: [
                6.9497,
                80.7891
            ],

            tagline:
                "Little England"
        },


        {
            name: "Ella",

            coords: [
                6.8667,
                81.0466
            ],

            tagline:
                "Misty Mountain Escape"
        },


        {
            name: "Yala",

            coords: [
                6.3725,
                81.5185
            ],

            tagline:
                "Wildlife Adventure"
        },


        {
            name: "Galle",

            coords: [
                6.0329,
                80.2168
            ],

            tagline:
                "Historic Coastal City"
        },


        {
            name: "Mirissa",

            coords: [
                5.9485,
                80.4716
            ],

            tagline:
                "Tropical Beach Paradise"
        },


        {
            name: "Colombo",

            coords: [
                6.9271,
                79.8612
            ],

            tagline:
                "Capital City"
        }

    ];


    /* =================================================
       MAP ICON
       ================================================= */

    const orangeIcon =
        L.divIcon({

            className:
                "lanka-map-pin",

            html:
                "<span></span>",

            iconSize: [
                26,
                26
            ],

            iconAnchor: [
                13,
                13
            ],

            popupAnchor: [
                0,
                -14
            ]

        });


    /* =================================================
       ADD MARKERS
       ================================================= */

    places.forEach(
        function(place) {

            const popup = `

                <div class="map-popup">

                    <small>
                        SRI LANKA
                    </small>

                    <h3>
                        ${place.name}
                    </h3>

                    <p>
                        ${place.tagline}
                    </p>

                    <button
                        onclick="showDestination('${place.name}')">

                        Explore

                    </button>

                </div>

            `;


            L.marker(
                place.coords,
                {
                    icon: orangeIcon
                }
            )
            .addTo(map)
            .bindPopup(
                popup
            );

        }
    );


    /* Fix map size */

    setTimeout(
        function() {

            map.invalidateSize();

        },
        500
    );

}


/* =====================================================
   START MAP
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initSriLankaMap();

    }
);


/* =====================================================
   DESTINATION DETAILS
   ===================================================== */

function showDestination(place) {

    const destinationData = {

        "Sigiriya": {

            title:
                "Sigiriya",

            location:
                "Central Province",

            image:
                "images/sigiriya.jpg",

            description:
                "Explore the legendary Lion Rock and discover the ancient royal city surrounded by beautiful nature.",

            activities: [

                "Climb Sigiriya Rock",

                "Explore ancient frescoes",

                "Visit the Water Gardens",

                "Sunrise photography"

            ],

            bestTime:
                "January - April",

            budget:
                "From Rs. 15,000"

        },


        "Kandy": {

            title:
                "Kandy",

            location:
                "Central Province",

            image:
                "images/kandy.jpg",

            description:
                "Discover Sri Lanka's cultural heart, surrounded by green mountains and historic landmarks.",

            activities: [

                "Visit Temple of the Tooth",

                "Kandy Lake walk",

                "Cultural dance show",

                "Explore botanical gardens"

            ],

            bestTime:
                "December - April",

            budget:
                "From Rs. 12,000"

        },


        "Nuwara Eliya": {

            title:
                "Nuwara Eliya",

            location:
                "Central Province",

            image:
                "images/nuwara.jpg",

            description:
                "Enjoy cool mountain weather, tea plantations, waterfalls and the charm of Little England.",

            activities: [

                "Visit tea factories",

                "Explore Gregory Lake",

                "Horton Plains",

                "Tea plantation tours"

            ],

            bestTime:
                "January - April",

            budget:
                "From Rs. 14,000"

        },


        "Ella": {

            title:
                "Ella",

            location:
                "Uva Province",

            image:
                "images/ella.jpg",

            description:
                "A breathtaking mountain destination famous for its dramatic landscapes, hikes and waterfalls.",

            activities: [

                "Little Adam's Peak",

                "Nine Arch Bridge",

                "Ella Rock",

                "Ravana Falls"

            ],

            bestTime:
                "January - March",

            budget:
                "From Rs. 13,000"

        },


        "Yala": {

            title:
                "Yala",

            location:
                "Southern Province",

            image:
                "images/yala.jpg",

            description:
                "Experience Sri Lanka's wild side with exciting safaris and unforgettable wildlife encounters.",

            activities: [

                "Jeep safari",

                "Wildlife photography",

                "Bird watching",

                "Sunset safari"

            ],

            bestTime:
                "February - June",

            budget:
                "From Rs. 18,000"

        },


        "Galle": {

            title:
                "Galle",

            location:
                "Southern Province",

            image:
                "images/galle.jpg",

            description:
                "Walk through the historic Galle Fort and enjoy the unique combination of colonial history and ocean views.",

            activities: [

                "Explore Galle Fort",

                "Lighthouse visit",

                "Old town walk",

                "Beach sunset"

            ],

            bestTime:
                "December - March",

            budget:
                "From Rs. 11,000"

        },


        "Mirissa": {

            title:
                "Mirissa",

            location:
                "Southern Province",

            image:
                "images/mirissa.jpg",

            description:
                "Relax on tropical beaches and experience one of Sri Lanka's most beautiful coastal destinations.",

            activities: [

                "Beach relaxation",

                "Whale watching",

                "Coconut Tree Hill",

                "Sunset photography"

            ],

            bestTime:
                "December - April",

            budget:
                "From Rs. 13,000"

        },


        "Colombo": {

            title:
                "Colombo",

            location:
                "Western Province",

            image:
                "images/colombo.jpg",

            description:
                "Experience Sri Lanka's vibrant capital with modern attractions, food, shopping and historic places.",

            activities: [

                "Galle Face Green",

                "Colombo Fort",

                "Shopping",

                "Local food tour"

            ],

            bestTime:
                "January - March",

            budget:
                "From Rs. 10,000"

        }

    };


    const destination =
        destinationData[place];


    if (!destination) {

        console.error(
            "Destination not found:",
            place
        );

        return;

    }


    /* Save selected destination */

    localStorage.setItem(
        "selectedDestination",
        JSON.stringify(
            destination
        )
    );


    /* Open destination page */

    window.location.href =
        "destination.html";

}