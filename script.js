/* =====================================================
   MARISOHP. BOARDING HOUSE
   JAVASCRIPT
===================================================== */


/* =====================================================
   TENANT ACCOUNT
===================================================== */

let tenantLoggedIn = false;

let tenantEmail = "";


/* =====================================================
   OWNER ACCOUNT
===================================================== */

/*
   DEMO OWNER LOGIN

   Email:
   Boardinghouse@marisohp.com

   Password:
   Delacruz
*/

const OWNER_EMAIL = "Boardinghouse@marisohp.com";

const OWNER_PASSWORD =  "Delacruz";


/* =====================================================
   GET HTML ELEMENTS
===================================================== */

const tenantLoginModal =
    document.getElementById(
        "tenantLoginModal"
    );

const ownerLoginModal =
    document.getElementById(
        "ownerLoginModal"
    );

const reservationModal =
    document.getElementById(
        "reservationModal"
    );


/* =====================================================
   TENANT LOGIN
===================================================== */


/* Open tenant login */

const reserveButtons =
    document.querySelectorAll(
        ".reserve-btn"
    );


reserveButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                /*
                   Save the room the tenant
                   wants to reserve.
                */

                const room =
                    button.getAttribute(
                        "data-room"
                    );

                const price =
                    button.getAttribute(
                        "data-price"
                    );


                sessionStorage.setItem(
                    "selectedRoom",
                    room
                );

                sessionStorage.setItem(
                    "selectedPrice",
                    price
                );


                /*
                   If tenant is already logged in,
                   go directly to reservation.
                */

                if (tenantLoggedIn === true) {

                    openReservationForm();

                }

                else {

                    tenantLoginModal.style.display =
                        "flex";

                }

            }
        );

    }
);


/* =====================================================
   CLOSE TENANT LOGIN
===================================================== */

document
    .getElementById(
        "closeTenantLogin"
    )
    .addEventListener(
        "click",
        function () {

            tenantLoginModal.style.display =
                "none";

        }
    );


/* =====================================================
   TENANT LOGIN FORM
===================================================== */

document
    .getElementById(
        "tenantLoginForm"
    )
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "tenantEmail"
                ).value;

            const password =
                document.getElementById(
                    "tenantPassword"
                ).value;


            /*
               For this school/demo version,
               any valid email + password
               can log in.
            */

            if (
                email.trim() !== "" &&
                password.trim() !== ""
            ) {

                tenantLoggedIn = true;

                tenantEmail = email;


                sessionStorage.setItem(
                    "tenantLoggedIn",
                    "true"
                );

                sessionStorage.setItem(
                    "tenantEmail",
                    email
                );


                tenantLoginModal.style.display =
                    "none";


                openReservationForm();

            }

            else {

                alert(
                    "Please enter your email and password."
                );

            }

        }
    );


/* =====================================================
   OPEN RESERVATION FORM
===================================================== */

function openReservationForm() {

    const room =
        sessionStorage.getItem(
            "selectedRoom"
        );

    const price =
        sessionStorage.getItem(
            "selectedPrice"
        );


    document.getElementById(
        "selectedRoomText"
    ).textContent =
        room + " - " + price;


    document.getElementById(
        "reservationEmail"
    ).value =
        tenantEmail;


    reservationModal.style.display =
        "flex";

}


/* =====================================================
   CLOSE RESERVATION
===================================================== */

document
    .getElementById(
        "closeReservation"
    )
    .addEventListener(
        "click",
        function () {

            reservationModal.style.display =
                "none";

        }
    );


/* =====================================================
   SUBMIT RESERVATION
===================================================== */

document
    .getElementById(
        "reservationForm"
    )
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const room =
                sessionStorage.getItem(
                    "selectedRoom"
                );

            const price =
                sessionStorage.getItem(
                    "selectedPrice"
                );


            const reservation = {

                id: Date.now(),

                name:
                    document.getElementById(
                        "fullName"
                    ).value,

                phone:
                    document.getElementById(
                        "phone"
                    ).value,

                email:
                    document.getElementById(
                        "reservationEmail"
                    ).value,

                address:
                    document.getElementById(
                        "address"
                    ).value,

                room:
                    room,

                price:
                    price,

                moveInDate:
                    document.getElementById(
                        "moveInDate"
                    ).value,

                duration:
                    document.getElementById(
                        "duration"
                    ).value,

                message:
                    document.getElementById(
                        "message"
                    ).value,

                dateSubmitted:
                    new Date().toLocaleString()

            };


            /*
               Get existing reservations.
            */

            let reservations =
                JSON.parse(
                    localStorage.getItem(
                        "marisohpReservations"
                    )
                ) || [];


            /*
               Add new reservation.
            */

            reservations.push(
                reservation
            );


            /*
               Save reservation.
            */

            localStorage.setItem(
                "marisohpReservations",
                JSON.stringify(
                    reservations
                )
            );


            alert(
                "Reservation submitted successfully!\n\nThe owner can now view your reservation request."
            );


            reservationModal.style.display =
                "none";


            document
                .getElementById(
                    "reservationForm"
                )
                .reset();


            sessionStorage.removeItem(
                "selectedRoom"
            );

            sessionStorage.removeItem(
                "selectedPrice"
            );

        }
    );


/* =====================================================
   OWNER LOGIN
===================================================== */


/* Open owner login */

document
    .getElementById(
        "ownerLoginBtn"
    )
    .addEventListener(
        "click",
        function () {

            ownerLoginModal.style.display =
                "flex";

        }
    );


/* Close owner login */

document
    .getElementById(
        "closeOwnerLogin"
    )
    .addEventListener(
        "click",
        function () {

            ownerLoginModal.style.display =
                "none";

        }
    );


/* =====================================================
   OWNER LOGIN FORM
===================================================== */

document
    .getElementById(
        "ownerLoginForm"
    )
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "ownerEmail"
                ).value;

            const password =
                document.getElementById(
                    "ownerPassword"
                ).value;


            if (
                email === OWNER_EMAIL &&
                password === OWNER_PASSWORD
            ) {

                sessionStorage.setItem(
                    "ownerLoggedIn",
                    "true"
                );


                ownerLoginModal.style.display =
                    "none";


                showOwnerDashboard();


                displayReservations();


                document
                    .getElementById(
                        "ownerDashboard"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }

            else {

                alert(
                    "Incorrect owner email or password."
                );

            }

        }
    );


/* =====================================================
   SHOW OWNER DASHBOARD
===================================================== */

function showOwnerDashboard() {

    document.getElementById(
        "ownerDashboard"
    ).style.display =
        "block";

}


/* =====================================================
   LOGOUT OWNER
===================================================== */

document
    .getElementById(
        "logoutBtn"
    )
    .addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "ownerLoggedIn"
            );


            document.getElementById(
                "ownerDashboard"
            ).style.display =
                "none";


            alert(
                "You have been logged out."
            );

        }
    );


/* =====================================================
   DISPLAY RESERVATIONS
===================================================== */

function displayReservations() {

    const list =
        document.getElementById(
            "reservationList"
        );


    let reservations =
        JSON.parse(
            localStorage.getItem(
                "marisohpReservations"
            )
        ) || [];


    list.innerHTML = "";


    /*
       Update total.
    */

    document.getElementById(
        "totalReservations"
    ).textContent =
        reservations.length;


    /*
       No reservations.
    */

    if (reservations.length === 0) {

        list.innerHTML = `

            <div class="no-reservation">

                <h3>
                    No Reservation Requests
                </h3>

                <p>
                    There are currently no
                    reservation requests.
                </p>

            </div>

        `;

        return;

    }


    /*
       Show reservations.
    */

    reservations.forEach(
        function (reservation) {

            const record =
                document.createElement(
                    "div"
                );


            record.className =
                "reservation-record";


            record.innerHTML = `

                <h3>
                    ${reservation.name}
                </h3>

                <p>
                    <strong>Email:</strong>
                    ${reservation.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${reservation.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${reservation.address}
                </p>

                <p>
                    <strong>Room:</strong>
                    ${reservation.room}
                </p>

                <p>
                    <strong>Price:</strong>
                    ${reservation.price}
                </p>

                <p>
                    <strong>Move-in Date:</strong>
                    ${reservation.moveInDate}
                </p>

                <p>
                    <strong>Length of Stay:</strong>
                    ${reservation.duration}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${
                        reservation.message ||
                        "No additional message."
                    }
                </p>

                <p>
                    <strong>Submitted:</strong>
                    ${reservation.dateSubmitted}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteReservation(${reservation.id})">

                    Delete Reservation

                </button>

            `;


            list.appendChild(
                record
            );

        }
    );

}


/* =====================================================
   DELETE RESERVATION
===================================================== */

function deleteReservation(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this reservation?"
        );


    if (
        confirmation === false
    ) {

        return;

    }


    let reservations =
        JSON.parse(
            localStorage.getItem(
                "marisohpReservations"
            )
        ) || [];


    reservations =
        reservations.filter(
            function (reservation) {

                return reservation.id !== id;

            }
        );


    localStorage.setItem(
        "marisohpReservations",
        JSON.stringify(
            reservations
        )
    );


    displayReservations();

}


/* =====================================================
   CHECK OWNER LOGIN WHEN PAGE LOADS
===================================================== */

window.addEventListener(
    "load",
    function () {

        const ownerLoggedIn =
            sessionStorage.getItem(
                "ownerLoggedIn"
            );


        const tenantIsLoggedIn =
            sessionStorage.getItem(
                "tenantLoggedIn"
            );


        if (
            ownerLoggedIn === "true"
        ) {

            showOwnerDashboard();

            displayReservations();

        }


        if (
            tenantIsLoggedIn === "true"
        ) {

            tenantLoggedIn = true;

            tenantEmail =
                sessionStorage.getItem(
                    "tenantEmail"
                ) || "";

        }

    }
);