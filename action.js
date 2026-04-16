// ================= SIDEBAR =================
const menu = document.getElementById("menu-toggle");
const sidebar = document.getElementById("mobile-sidebar");
const overlay = document.getElementById("overlay");

menu.onclick = () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
};

overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
};

// ================= DATE TIME =================
function updateDateTime(){
    const now = new Date();
    document.getElementById("datetime").textContent =
        now.toLocaleString("ms-MY");
}
setInterval(updateDateTime,1000);
updateDateTime();

// ================= MAP =================
function searchLocation(){
    const q = document.getElementById("mapSearch").value;
    document.getElementById("map").src =
        `https://www.google.com/maps?q=${q}&output=embed`;
}

// ================= FAQ =================
document.querySelectorAll(".faq-item").forEach(item=>{
    item.addEventListener("click",()=>{
        item.classList.toggle("active");
    });
});

// ================= IDLE RESET (FIXED KIOSK LOGIC) =================
let idle;

function resetIdle(){
    clearTimeout(idle);
    idle = setTimeout(()=>{
        window.scrollTo({top:0,behavior:"smooth"});
    },30000);
}

["click","mousemove","keydown","touchstart"].forEach(e=>{
    window.addEventListener(e,resetIdle);
});

// ================= PARALLAX (ORIGINAL IDEA MAINTAINED) =================
window.addEventListener("scroll",()=>{
    let value = window.scrollY;

    const text = document.getElementById("text");
    const cloud = document.getElementById("cloud");
    const sun = document.getElementById("sun");
    const mountains = document.getElementById("mountains");

    if(text) text.style.top = 50 + value * -0.2 + "%";
    if(cloud) cloud.style.left = value * 2 + "px";
    if(sun) sun.style.top = value * 1 + "px";
    if(mountains) mountains.style.top = value * 0.3 + "px";
});
