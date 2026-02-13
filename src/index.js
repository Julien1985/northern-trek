import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { svgPathProperties } from "svg-path-properties";

// You can add your custom JS here
console.log('Bootstrap loaded!');

const path = document.getElementById('motionPath');
const marker = document.querySelector('.animated-element');
const totalEarned = document.getElementById('total-earned');
const northernTrekImg = document.querySelector('img[src="assets/img/northern-trek.svg"]');
// const progressSpan = document.getElementById('progress');
const total = 140536;
const parallaxStrength = 0.4; // Adjust between 0.2-0.6 for subtle to moderate effect


const properties = new svgPathProperties(path.getAttribute('d'));


// Get the total length of the path
// const pathLength = path.getTotalLength();
const pathLength = properties.getTotalLength();

function updatePosition() {
    // Calculate scroll progress (0 to 1)
    const scrollTop = window.pageYOffset - 150 < 0 ? 0 : window.pageYOffset - 150;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    console.log('Scroll Top:', scrollTop, 'Document Height:', docHeight);
    const scrollPercent = scrollTop / (docHeight);
    
    // Get the point along the path based on scroll progress
    const point = properties.getPointAtLength(scrollPercent * pathLength);
    console.log('Scroll Percent:', scrollPercent, 'Point:', point);
    // Update marker position
    marker.setAttribute('transform', `translate(${point.x}, ${point.y - 20})`); // Adjust for marker size
    totalEarned.textContent = `$${Math.round(scrollPercent * total).toLocaleString()}`;
    
    // Apply parallax effect to northern-trek.svg
    if (northernTrekImg) {
        const parallaxOffset = window.pageYOffset * parallaxStrength;
        northernTrekImg.style.transform = `translateY(-${parallaxOffset}px)`;
    }
    
    // Update progress indicator
    // progressSpan.textContent = Math.round(scrollPercent * 100);
    
    // Hide scroll hint after scrolling starts
    // if (scrollPercent > 0.05) {
    // document.querySelector('.scroll-hint').style.opacity = '0';
    // } else {
    // document.querySelector('.scroll-hint').style.opacity = '1';
    // }
}

// Update on scroll
window.addEventListener('scroll', updatePosition);

// Initial position
updatePosition();