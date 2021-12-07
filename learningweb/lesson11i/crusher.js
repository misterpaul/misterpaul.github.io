function crusherInit () {
    // globals. maybe modify the page objects instead, or make these local and pass them as args
    boot                  = document.getElementById('boot')
    bottle                = document.getElementById('waterBottle')
    metricTon             = document.getElementById('metricTon')
    millionMetricTon      = document.getElementById('millionMetricTon')
    showAtEnd             = ['metricTon', 'millionMetricTon']
    boot.style.visibility = 'hidden'
    bottle.minSize        = 2  // min bottleSize of bottle when crushed

    bottle.bottom = bottle.offsetTop + bottle.height
    boot.bottom = boot.offsetTop + boot.height
    boot.verticalDistance =  bottle.bottom - bottle.minSize - (boot.offsetTop + boot.height)
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
    }
}

function crushIt () {
    // set the time to -1 in case we've run this before
    crushStart = -1

    alert("Perhaps we should crush the bottle first...")
    window.requestAnimationFrame ( moveBootAnimation )
    metricTon.style.backgroundColor = "green"
    millionMetricTon.style.backgroundColor = "violet"
}
