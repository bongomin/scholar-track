

function parentsFunction() {
   document.getElementById('studentsdiv').style.display = "none"
   document.getElementById('parentsdiv').style.display = "block"
   document.getElementById('reportsdiv').style.display = "none"
   document.getElementById('scholarsdiv').style.display = "none"
}

function reportsFunction() {
   document.getElementById('studentsdiv').style.display = "none"
   document.getElementById('parentsdiv').style.display = "none"
   document.getElementById('reportsdiv').style.display = "block"
   document.getElementById('scholarsdiv').style.display = "none"
}
function scholarsFunction() {
   document.getElementById('studentsdiv').style.display = "none"
   document.getElementById('parentsdiv').style.display = "none"
   document.getElementById('reportsdiv').style.display = "none"
   document.getElementById('scholarsdiv').style.display = "block"
}

function changediv() {
   document.getElementById('parentForm').style.display = "block"
   document.getElementById('studentForm').style.display = "none"

}
function changeback() {
   document.getElementById('parentForm').style.display = "none"
   document.getElementById('studentForm').style.display = "block"

}
