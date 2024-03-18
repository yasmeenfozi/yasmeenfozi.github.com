// Name: Yasmeen Fozi Saeed
// Javascript document of my profile website

// Wrapping code in an event listner to load html/css before fixating javascript
addEventListener("load", function () {

    
    $(document).ready(function () {
        
        // Using jQuery To change header attribute colors when directed to page
        $('.header-navigation li a').click(function () {
            $('li a').removeClass("active");
            $(this).addClass("active");
        });
        
        //When website is refreshed the website starts from the top.
       //  history.scrollRestoration = "manual";
       //  $(this).scrollTop(0);
    
    });

   

    // Creating constants for accessed conntent from html/css
    const carousel = document.querySelector(".carousel"),
    firstSlide = carousel.querySelectorAll(".carousel div")[0];
    arrowIcons = document.querySelectorAll(".slideshow i");
    carouselImg = carousel.querySelectorAll(".carousel img"); 


    // Prevents image movement while dragging through the carousel
    carouselImg.forEach(img => {
        img.addEventListener("dragstart", (e) => {
            e.preventDefault();
        })
        
    })





    // For checking purposes on console log :)
    //console.log("First Slide's clientWidth:", firstSlideWidth);

    // Showing/Hiding of arrows when carousel starts and ends
    const showHiddenIcon = () => {

        let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //Max scrollable width
        if (carousel.scrollLeft == 0) {
            arrowIcons[0].style.display = "none";
        } else {
            arrowIcons[0].style.display = "block";
        }

        if (carousel.scrollLeft == scrollWidth) {
            arrowIcons[1].style.display = "none";
        } else {
            arrowIcons[1].style.display = "block";
        }
    }

    // Selecting both arrow icons 
    // Creating event: when arrow id direction is clicked move one slide towards direction.
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {

            // Declaring variable 'firstSlideWidth' to withhold first slides width
            let firstSlideWidth = firstSlide.clientWidth + 16.4;

            if (icon.id == "left") {

                // Scroll to the left by the width of one slide
                carousel.scrollLeft -= firstSlideWidth;
            } else {
                // Scroll to the right by the width of one slide
                carousel.scrollLeft += firstSlideWidth;
            }

            showHiddenIcon();
            
        // Can also be written as shown below :) 

        // carousel.scrollLeft += icon.id == "left" ? -firstSlideWidth : firstSlideWidth;
        })
    });



    // Creating variable 'isDragStart' iniitialized as false and 2 uninitialized variables
    let isDragStart = false, 
        prevPageX, 
        prevScrollLeft,
        positionDiff;

    // Autoslide image to center
    //disabled 
    /*
    const autoSlide = () => {
        positionDiff = Math.abs(positionDiff);
        let firstSlideWidth = firstSlide.clientWidth + 16.4;
        let valDifference = firstSlideWidth - positionDiff;

        if(carousel.scrollLeft > prevScrollLeft){
            if (positionDiff > firstSlideWidth / 3)
            {
                carousel.scrollLeft += valDifference;
            } else {
                carousel.scrollLeft += positionDiff;
            }
        } else {
            if (positionDiff > firstSlideWidth / 3) {
                carousel.scrollLeft -= valDifference;
            } else {
                carousel.scrollLeft -= positionDiff;
            }

        }


    }*/

    // dragStart function triggers dragStart to true while mouse is pressed 
    // prevPageX carries the position the mouse is clicked
    // prevScrollLeft carries the last position of mouse when scrolling occurs
    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX ;
        prevScrollLeft = carousel.scrollLeft;
    }

    // dragging function triggered when mouse moves only if isDragStart is true (mouse is clicked)
    // 'e.preventDefault()' Prevents the default behavior of the mousemove event
    // 


    const dragging = (e) => {
        if(!isDragStart) return;
        e.preventDefault();
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;

        // Adding a "dragging" class to the carousel (for movement/styling purposes)
        carousel.classList.add("dragging");
        showHiddenIcon();
    }

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");
    }

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);

    
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);


    carousel.addEventListener("mouseup", dragStop);


    carousel.addEventListener("mouseleave", dragStop);
    carousel.addEventListener("touchend", dragStop);
});


