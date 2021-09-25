/* From https://www.w3schools.com/howto/howto_js_collapsible.asp */

var coll = document.getElementsByClassName("collapsible-header");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("collapsible-active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }

    /***
    // close everything else
    for (j = 0; j < coll.length; j++) {
      if (col[j] != this) {
        coll[j].toggle("collabsible-header");

        var other_content = col[j].nextElementSibling;
        if (other_content.style.display === "block") {
          other_content.style.display = "none";
        } else {
          other_content.style.display = "block";
        }
      }
    }
    ***/
  });

}