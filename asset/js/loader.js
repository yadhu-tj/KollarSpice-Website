
function addLoaderAnimationStyles() {// in this fuunction we adding the loaders css 
  if (!$("#loaderAnimationStyles").length) {
    const style = `
      <style id="loaderAnimationStyles">
        /* From Uiverse.io by ZacharyCrespin */ 
        @keyframes square-animation {
        0% {
        left: 0;
        top: 0;
        }

        10.5% {
        left: 0;
        top: 0;
        }

        12.5% {
        left: 32px;
        top: 0;
        }

        23% {
        left: 32px;
        top: 0;
        }

        25% {
        left: 64px;
        top: 0;
        }

        35.5% {
        left: 64px;
        top: 0;
        }

        37.5% {
        left: 64px;
        top: 32px;
        }

        48% {
        left: 64px;
        top: 32px;
        }

        50% {
        left: 32px;
        top: 32px;
        }

        60.5% {
        left: 32px;
        top: 32px;
        }

        62.5% {
        left: 32px;
        top: 64px;
        }

        73% {
        left: 32px;
        top: 64px;
        }

        75% {
        left: 0;
        top: 64px;
        }

        85.5% {
        left: 0;
        top: 64px;
        }

        87.5% {
        left: 0;
        top: 32px;
        }

        98% {
        left: 0;
        top: 32px;
        }

        100% {
        left: 0;
        top: 0;
        }
        }



    .loader-square {
    
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    margin: 2px;
    border-radius: 0px;
    background:#6BC663;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    animation: square-animation 10s ease-in-out infinite both;
    }

    .loader-square:nth-of-type(0) {
    animation-delay: 0s;
    }

    .loader-square:nth-of-type(1) {
    animation-delay: -1.4285714286s;
    }

    .loader-square:nth-of-type(2) {
    animation-delay: -2.8571428571s;
    }

    .loader-square:nth-of-type(3) {
    animation-delay: -4.2857142857s;
    }

    .loader-square:nth-of-type(4) {
    animation-delay: -5.7142857143s;
    }

    .loader-square:nth-of-type(5) {
    animation-delay: -7.1428571429s;
    }

    .loader-square:nth-of-type(6) {
    animation-delay: -8.5714285714s;
    }

    .loader-square:nth-of-type(7) {
    animation-delay: -10s;
    }
      </style>
    `;
    $("head").append(style);
  }
}

function addLoaderAlignmentStyles() { // this is for align loader 
  if (!$("#loaderWrapperStyles").length) {
    const style = `
      <style id="loaderWrapperStyles">
        .mainLoader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          color : #426644;
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .loader {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 96px;
          height: 96px;
          transform: translate(-50%, -50%) rotate(45deg);
        }


        
      </style>
    `;
    $("head").append(style);
  }
}

function initLoaderUI() { // in here the  loader will init
  addLoaderAlignmentStyles();
  addLoaderAnimationStyles();

  if ($('.mainLoader').length === 0) {
    $('body').append(`
      <div class="mainLoader">
        <!-- From Uiverse.io by ZacharyCrespin --> 
<div class="loader">
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
<div class="loader-square"></div>
</div>
      </div>
    `);
  }
}

function showLoader() {
  $('.mainLoader').fadeIn();

  // Disable interaction
  $('body').css({
    'pointer-events': 'none',
    'touch-action': 'none',
    'overflow': 'hidden' // 🔒 Prevent scrolling
  });

  // Prevent touch and wheel scroll events
  $(document).on('touchmove.disableScroll wheel.disableScroll', function(e) {
    e.preventDefault();
  });
}

function hideLoader() {
  $('.mainLoader').fadeOut();

  // Re-enable interaction
  $('body').css({
    'pointer-events': '',
    'touch-action': '',
    'overflow': ''
  });

  // Remove scroll blockers
  $(document).off('touchmove.disableScroll wheel.disableScroll');
}



