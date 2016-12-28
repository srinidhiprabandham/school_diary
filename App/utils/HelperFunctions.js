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

export var RequestApi = {
  get: function(path,token) {
    var request_url = "https://schooldiary.online/api/" + path;

    return fetch(request_url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token,
      },
    })
  },
  post: function(path,body,token) {
    var request_url = "https://schooldiary.online/api/" + path;
    var request_body = body ? body : {  }

    return fetch(request_url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(request_body)
    })
  },
}

export function CurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  var today = yyyy+'-'+mm+'-'+dd;
  return today
}
