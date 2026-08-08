const map = new maplibregl.Map({
  container: "map",
  style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerKey}`,
  center: listing.geometry.coordinates,
  zoom: 12,
});

const markerEl = document.createElement("div");
markerEl.className = "custom-marker";

markerEl.innerHTML = `
  <img
    src="https://res.cloudinary.com/exrq62mf/image/upload/v1786125284/AtithiStay_-_Atithi_Devo_Bhava_rbm5rp.png"
    alt="AtithiStay"
  />
`;

new maplibregl.Marker({
  element: markerEl,
})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new maplibregl.Popup({ offset: 25 }).setHTML(
      `<h5>${listing.title}</h5>
       <p>${listing.location}, ${listing.country}</p>`,
    ),
  )
  .addTo(map);

map.on("error", (e) => console.log(e));
