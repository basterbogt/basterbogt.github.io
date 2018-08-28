function setFooterDate() {
    let yearSpan = document.getElementById('copyrightyear');
    if (yearSpan) {
        let fromYear = 2018;
        let ToYear = new Date().getFullYear();
        yearSpan.innerHTML = (fromYear != ToYear) ? fromYear + " - " + ToYear : fromYear;
    }
}