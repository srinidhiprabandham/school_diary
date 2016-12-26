export function FormatEvent(evnt) {
  var split = evnt.split("-");
  var date_split = split[2].split("<br />");
  return {
    color: split[0],
    event_name: split[1],
    from: date_split[0],
    to: date_split[1],
  }
}

export function GenerateEventStyle(color) {
  return {
    borderLeftWidth: 15,
    borderLeftColor: color,
  }
}

export function Contains(array, obj) {
    var i = array.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}
