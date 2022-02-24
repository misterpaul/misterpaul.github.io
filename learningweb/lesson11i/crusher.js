function crusherInit () {
    // globals. maybe modify the page objects instead, or make these local and pass them as args
    boot                  = document.getElementById('boot')
    bottle                = document.getElementById('waterBottle')
    metricTon             = document.getElementById('metricTon')
    millionMetricTon      = document.getElementById('millionMetricTon')
    showAtEnd             = ['metricTon', 'millionMetricTon']
    boot.style.visibility = 'hidden'
    bottle.minHeight      = 2           // min bottleSize of bottle when crushed
    bottle.minWidth       = 60          // hardcode this bc we don't have it calculated anywhere
    bottle.metricTon      = 100000      // number of bottles in a metric ton. A metric ton is 1000 kg, or 1,000,000 g, or 100,000 10-gram water bottles.
    bottle.mTStackHeight  = 400         // how many bottles to stack in metric ton box
    bottle.mmTStackHeight = 8000        // how many bottles to stack in million metric ton box

    bottle.bottom = bottle.offsetTop + bottle.height
    boot.bottom = boot.offsetTop + boot.height
    boot.verticalDistance =  bottle.bottom - bottle.minHeight - (boot.offsetTop + boot.height)
    boot.verticalMoveRate = boot.verticalDistance / crushTime  // pixels per millisecond
}

function moveBoot ( t ) {
    let bottleSize, bottleDistance, bottleScale
    if ( t == 0 ) {
        // initialize boot and bottle in case we've run this before
        boot.style.transform = 'translateY(0px)'
        bottle.style.transform = 'translateY(0px) scale(1)'
    }
    // distance to move is the lesser of the calculated distance, or the max distance
    let bootDistance = Math.min(boot.verticalMoveRate * t, boot.verticalDistance)
    boot.style.transform = 'translateY(' + bootDistance + 'px)'
    boot.bottom = boot.offsetTop + bootDistance + boot.height
    //console.log( "bootDistance: " + bootDistance + ", boot.top: " + boot.offsetTop + ", boot.bottom:" + boot.bottom)

    if (bootDistance + boot.offsetTop + boot.height <= bottle.offsetTop) {
        // boot has not yet touched the bottle
        bottleSize = bottle.height
        bottleDistance = 0
    } else {
        // we're in the midst of crunching
        bottleSize = bottle.bottom - boot.bottom
        bottleDistance = bootDistance/2
    }
    bottleScale = bottleSize/bottle.height
    //bottle.style.transform = 'translateY(' + bottleDistance + 'px) scale(' + bottleScale + ',' +  bottleScale + ')'
    bottle.style.transform = 'translateY(' + bottleDistance + 'px) scale(1,' +  bottleScale + ')'
}

function moveBootAnimation ( timestamp ) {

    boot.style.visibility="visible"
    if ( crushStart == -1 ) {
        crushStart = timestamp
    }
    const elapsed = timestamp - crushStart;

    moveBoot ( elapsed )

    if (elapsed <= crushTime) {
        window.requestAnimationFrame ( moveBootAnimation )
    } else {
        metricTon.style.backgroundColor = "green"
        millionMetricTon.style.backgroundColor = "purple" 
        revealBlocks()   
    }
}

function crushIt () {
    // set the time to -1 in case we've run this before
    crushStart = -1

    alert("Perhaps we should crush the bottle first...")
    window.requestAnimationFrame ( moveBootAnimation )
}

function revealBlocks () {
    var elements = document.getElementsByClassName("hiddenText");
    for (var i = 0; i < elements.length; i++) {
        elements.item(i).style.visibility = "visible"
    }
    fillCalculatedValues ()
    drawline ('#ton-canvas')
}

function fillCalculatedValues () {
    var elements = document.getElementsByClassName("crushedBottleHeight");
    for (var i = 0; i < elements.length; i++) {
        elements.item(i).innerHTML = bottle.minHeight
    }

    var elements = document.getElementsByClassName("crushedBottleWidth");
    for (var i = 0; i < elements.length; i++) {
        elements.item(i).innerHTML = bottle.minWidth
    }

    // calculate the height & width for metric ton box
    mTonHeight = bottle.mTStackHeight * bottle.minHeight
    mTonWidth = bottle.metricTon * bottle.minWidth / ( mTonHeight / bottle.minHeight ) 
    metricTon.style.height = mTonHeight + "px"
    metricTon.style.width = mTonWidth + "px"
    var elements = document.getElementsByClassName("metricTonStackHeight");
    for (var i = 0; i < elements.length; i++) {
        elements.item(i).innerHTML = Number(bottle.mTStackHeight).toLocaleString ()
    }
    var elements = document.getElementsByClassName("metricTonHeight");
    for (var i = 0; i < elements.length; i++) {
        elements.item(i).innerHTML = Number(mTonHeight).toLocaleString ()
    }
    var elements = document.getElementsByClassName("metricTonStackWidth");
    for (var i = 0; i < elements.length; i++) {
        elements.item(i).innerHTML = Number(mTonWidth / bottle.minWidth).toLocaleString ()
    }
    var elements = document.getElementsByClassName("metricTonWidth");
    for (var i = 0; i < elements.length; i++) {
        elements.item(i).innerHTML = Number(mTonWidth).toLocaleString ()
    }

   // calculate the height & width for million metric ton box
   mmTonHeight = bottle.mmTStackHeight * bottle.minHeight
   mmTonWidth = bottle.metricTon * bottle.minWidth * 1000000 / ( mmTonHeight / bottle.minHeight ) 
   millionMetricTon.style.height = mmTonHeight + "px"
   millionMetricTon.style.width = mmTonWidth + "px"
   var elements = document.getElementsByClassName("millionMetricTonStackHeight");
   for (var i = 0; i < elements.length; i++) {
       elements.item(i).innerHTML = Number(bottle.mmTStackHeight).toLocaleString ()
   }
   var elements = document.getElementsByClassName("millionMetricTonHeight");
   for (var i = 0; i < elements.length; i++) {
       elements.item(i).innerHTML = Number(mmTonHeight).toLocaleString ()
   }
   var elements = document.getElementsByClassName("milionMetricTonStackWidth");
   for (var i = 0; i < elements.length; i++) {
       elements.item(i).innerHTML = Number(mmTonWidth / bottle.minWidth).toLocaleString ()
   }
  var elements = document.getElementsByClassName("millionMetricTonWidth");
   for (var i = 0; i < elements.length; i++) {
       elements.item(i).innerHTML = Number(mmTonWidth).toLocaleString ()
   }


    
}

