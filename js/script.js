// Sample event data (replace with API fetch in a real app)
const events = [
    {
        id: 1,
        name: "Sips & Sounds Music Festival",
        date: "2025-03-08",
        location: "Auditorium Shores, Austin",
        category: "Music",
        description: "Presented by Coca-Cola, Sips & Sounds Music Festival is coming to Austin's Auditorium Shores on March 7-8. Halsey, Khalid, Benson Boone and AJR will headline the two-day event, while other performers include Suki Waterhouse, Ashe, Nessa Barrett, Brent (Chelsea Cutler & Jeremy Zucker) and more.",
        image: "https://people.com/thmb/OKPisHqVUxRxRKoC92Kgr24BejU=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x0:721x2):format(webp)/Sips--Sounds-Music-Festival-010725-8be0154876c04e79b794b4c0bec8a638.jpg",
        organizer: "Coca-Cola",
        price: "$50",
        duration: "6 hours",
        website: "https://people.com/music-festivals-2025-dates-locations-lineups-8770005"
    },
    {
        id: 2,
        name: "Little Beasts: Art, Wonder, and the Natural World",
        date: "2025-05-18",
        location: "Washington, D.C.",
        category: "Art",
        description: "Explore stunning contemporary art pieces by local artists. Wine and cheese provided.",
        image: "https://media.nga.gov/iiif/a2270c17-dd31-4ac4-9d83-a97dcbabaa4b/full/!740,560/0/default.jpg",
        organizer: "National Gallery of Art",
        price: "Free",
        duration: "3 hours",
        website: "https://www.nga.gov/exhibitions/2025/little-beasts.html"
    },
    {
        id: 3,
        name: "The Annual Meat Conference",
        date: "2025-03-24",
        location: "World Center Marriott, Orlando, FL",
        category: "Food",
        description: "The Annual Meat Conference is the leading event in the meat and poultry retail sector, attracting over 2,400 attendees and providing 25,000 square feet of exhibit space. It is the ideal platform for exhibitors to connect with more than 460 retailers and wholesalers, gain insights into consumer behavior, and showcase innovative products. With 99% of attendees visiting the exhibit hall and 98% event satisfaction, exhibitors can benefit from high-quality interactions and valuable networking opportunities that drive business growth.",
        image: "https://www.exponents.com/wp-content/uploads/2024/06/Ace-Shushi-20x20-trade-show-booth-rental-1024x819.jpg",
        organizer: "Annual Meat Conference",
        price: "$20",
        duration: "5 hours",
        website: "https://www.exponents.com/our-blog/top-30-food-beverage-industry-trade-shows-in-usa/"
    },
    {
        id: 4,
        name: "Kigali International Peace Marathon",
        date: "2025-06-08",
        location: "Kigali, Rwanda",
        category: "Sports",
        description: "Join thousands of runners in this annual marathon. Medals and refreshments for all participants!",
        image: "https://kigalimarathon.org/photogallery/_data/i/upload/2024/10/12/20241012092237-90ff2ffe-me.jpg",
        organizer: "Rwanda Athletic Federation, Ministry of Sports",
        price: "$75",
        duration: "4-6 hours",
        website: "https://kigalimarathon.org"
    },
    {
        id: 5,
        name: "Midsize Enterprise Summit Tech Conference",
        date: "2025-04-27",
        location: "Orlando, Florida",
        category: "Tech",
        description: "The Midsize Enterprise Summit (MES) Spring event offers the opportunity to discuss pain points and potential solutions, learn the latest technology trends from thought leaders and seasoned analysts, and build meaningful relationships.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        organizer: "Midsize Enterprise Summit",
        price: "$150",
        duration: "8 hours",
        website: "https://event.thechannelco.com/mes-spring/"
    }
];

// Home Page Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const city = document.getElementById('cityInput').value;
            const date = document.getElementById('dateInput').value;
            const category = document.getElementById('categoryInput').value;

            localStorage.setItem('searchCriteria', JSON.stringify({ city, date, category }));
            window.location.href = 'events.html';
        });
    }

    // Event List Page
    const eventList = document.getElementById('eventList');
    if (eventList) {
        const searchCriteria = JSON.parse(localStorage.getItem('searchCriteria') || '{}');
        let filteredEvents = events;

        if (searchCriteria.date) {
            filteredEvents = filteredEvents.filter(event => event.date === searchCriteria.date);
        }
        if (searchCriteria.category) {
            filteredEvents = filteredEvents.filter(event => event.category === searchCriteria.category);
        }

        filteredEvents.forEach(event => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card event-card">
                        <img src="${event.image}" class="card-img-top" alt="${event.name}">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                            <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                            <a href="event-details.html?id=${event.id}" class="btn btn-secondary">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            eventList.innerHTML += card;
        });
    }

    // Event Details Page
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    if (eventId) {
        const event = events.find(e => e.id == eventId);
        if (event) {
            document.getElementById('eventImage').src = event.image;
            document.getElementById('eventName').textContent = event.name;
            document.getElementById('eventDate').textContent = event.date;
            document.getElementById('eventLocation').textContent = event.location;
            document.getElementById('eventCategory').textContent = event.category;
            document.getElementById('eventDescription').textContent = event.description;
            document.getElementById('eventOrganizer').textContent = event.organizer;
            document.getElementById('eventPrice').textContent = event.price;
            document.getElementById('eventDuration').textContent = event.duration;
            document.getElementById('eventWebsite').href = event.website;
        }
    }
});