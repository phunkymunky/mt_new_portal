/* prevents the page reload when button is clicked*/
var startButton = document.getElementById("StartTime");
var endButton = document.getElementById("EndTime");
$(startButton).click( function(event) {
	event.preventdefault();
});
$(endButton).click( function(event) {
	event.preventdefault();
});
        tinymce.init({
            selector: "textarea#tmce",
            contenteditable: false,
            statusbar: false,
            menubar: false,
            toolbar: false,
            readonly: 1,
            convert_urls: false,
            relative_urls: false
        });
        tinymce.init({
            selector: "textarea#Ticket_Description",
            menubar: "tools",
            paste_as_text: true,
            statusbar: false,
            height: 250,
            toolbar: false,
            browser_spellcheck: true,
            contextmenu: false,
            plugins: [
                        ["advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker"],
                        ["searchreplace visualblocks visualchars code fullscreen insertdatetime nonbreaking"],
                        ["save table contextmenu directionality emoticons template paste"]
                    ],	
            toolbar: "bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | undo | fullscreen",	
        });
        tinymce.init({
            selector: "textarea#ticket_notes",
            statusbar: false,
            menubar: false,
            convert_urls: false,
            relative_urls: false,
            //plugins : "paste,,",
            theme_advanced_button3_add: "pastetext,pasteword,selectall",
            paste_auto_cleanup_on_paste: true,
            paste_strip_class_attributes: "mso",
            browser_spellcheck: true,
            contextmenu: false,
            plugins: [
                        ["advlist autolink code link image lists charmap print preview hr anchor pagebreak spellchecker"],
                        ["searchreplace visualblocks visualchars code fullscreen insertdatetime nonbreaking"],
                        ["save table directionality emoticons template paste textcolor"]
                    ],	
            toolbar: "bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist indent | insertdatetime | code link | fullscreen",
            insertdatetime_formats: ["%d.%m.%Y - %H.%M","%d.%m.%Y - %r","%d.%m.%Y", "%r"]		
        });
        tinymce.init({
            selector: "textarea#tech_notes",
            statusbar: false,
            menubar: false,
            convert_urls: false,
            relative_urls: false,
            browser_spellcheck: true,
            contextmenu: false,
            plugins: [
                        ["advlist autolink code link image lists charmap print preview hr anchor pagebreak spellchecker"],
                        ["searchreplace visualblocks visualchars code fullscreen insertdatetime nonbreaking"],
                        ["save table directionality emoticons template paste textcolor"]

                    ],	
            toolbar: "bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist indent | insertdatetime | code link | fullscreen",
            insertdatetime_formats: ["%d.%m.%Y - %H.%M","%d.%m.%Y - %r","%d.%m.%Y", "%r"]		
        });
        tinymce.init({
            selector: "div.tmcearea",
            contenteditable: false,
            statusbar: false,
            menubar: false,
            toolbar: false,
            readonly: false,
            convert_urls: false,
            relative_urls: false,
            contextmenu: false,
            forced_root_block : false,
            plugins: [
                        ["fullscreen link autolink preview"]
                    ],
            default_link_target:"_blank",
            extended_valid_elements : "a[href|target=_blank]",
            toolbar: "preview",
        });
function InsertTimeNow(target){
	var d = new Date();
	var currYear = d.getFullYear();
	var currMonth = d.getMonth() + 1;
	var currDate = d.getDate();
	var currHour = d.getHours();
	var currMin = d.getMinutes();
	time = currYear + "-" +
		(currMonth < 9 ? "0" : "") + currMonth + "-" +
		(currDate < 10 ? "0" : "") + currDate + " " +
		(currHour < 10 ? "0" : "") + currHour + ":" +
		(currMin < 10 ? "0" : "") + currMin + " ";
	theInput = document.getElementById(target);
	if (theInput.value != "") {
		theInput.value += "\n";
	}
	theInput.value += time;
	// Set the position to the bottom of the window
	theInput.focus();
	theInput.scrollTop = theInput.scrollHeight;
}

function getTime(t){
	var dd = new Date();
	var hh = (dd.getHours()<10?'0':'') + dd.getHours();
    var mm = (dd.getMinutes()<10?'0':'') + dd.getMinutes();
    var ss = (dd.getSeconds()<10?'0':'') + dd.getSeconds();
    var mth = (dd.getMonth() < 9 ? "0" : "") + (dd.getMonth() + 1);
    var day = (dd.getDate()  < 10 ? "0" : "") +(dd.getDate());
    var yr = dd.getFullYear();
    var timeuk =  day + '/' + mth + '/' + yr + ' ' + hh + ':' + mm;
    var timeus =  mth + '/' + day + '/' + yr + ' ' + hh + ':' + mm;
    if (t == "now") {
    	document.getElementById('Time_Start').value = timeuk;
    }
    if (t == "start"){
		document.getElementById('Time_Start').value = timeuk;
    }
    if (t == "end"){
		document.getElementById('Time_end').value = timeuk;
    }
}

function UK2USdate(input){
  var parts = input.split('/');
  var day = parts[0];
  var month = parts[1];
  var yearTimeParts = parts[2].split(" ");
  var year = yearTimeParts[0];
  var time = yearTimeParts[1];
  var timeParts = time.split(':');
  var hours = timeParts[0];
  var minutes = timeParts[1];
  return new Date(year, month, day, hours, minutes, 0, 0); // Note: months are 0-based
}

function calculateTimeDifferenceUnits(){
	date1 = UK2USdate(document.getElementById('Time_Start').value);
	date2 = UK2USdate(document.getElementById('Time_end').value);
	mincharge = document.getElementById('startmincharge').value;

	sec = (date2.getTime() / 1000.0) - (date1.getTime() / 1000.0);
	timdif = (date2.getTime() / 1000.0) - (date1.getTime() / 1000.0);
	hours = parseInt(sec / 60 / 60);
	sec = sec - hours * 60 * 60;
	min = parseInt(sec / 60);
	ses = sec - min * 60;
	inminutes = (hours*60);
	timespent = Math.floor(timdif/60);
	units = timdif/60/15;
	units = Math.ceil(units);
	
	//if there is no time spent
	if (isNaN(timespent) || timespent <= 0){
		timespent = 0;
		units = 0;
		mincharge = 0;
	}
	if (isNaN(units)) {
	    units = 0;
	}
	//if the ticket is less then 3 minutes set min charge
	if (timespent <= 4){
		mincharge = 0;
	}
	//if the calculated unit is more than 4 minutes set min charge
	if (units > 4 && mincharge > 0 ){
		mincharge = +mincharge + Math.ceil((units*0.2));
	}
	document.getElementById('TimeSpent').value=timespent;
	document.getElementById('CalcUnits').value=units;
	document.getElementById('Charged_Units').value=mincharge;
}
function calculateTimeDifferenceTime() {
    date1 = UK2USdate(document.getElementById('Time_Start').value);
    date2 = UK2USdate(document.getElementById('Time_end').value);
    mincharge = document.getElementById('startmincharge').value;

    sec = (date2.getTime() / 1000.0) - (date1.getTime() / 1000.0);
    timdif = (date2.getTime() / 1000.0) - (date1.getTime() / 1000.0);
    hours = parseInt(sec / 60 / 60);
    sec = sec - hours * 60 * 60;
    min = parseInt(sec / 60);
    ses = sec - min * 60;
    inminutes = (hours * 60);
    timespent = Math.floor(timdif / 60);
    units = timdif / 60 / 15;
    units = Math.ceil(units);

    //if there is no time spent
    if (isNaN(timespent) || timespent <= 0) {
        timespent = 0;
        units = 0;
        mincharge = 0;
    }
    if (isNaN(units)) {
        units = 0;
    }
    //if the ticket is less then 3 minutes set min charge
    if (timespent <= 4) {
        mincharge = 0;
    }
    if (units > 4) {
        mincharge = +mincharge + Math.ceil((units * 0.2));
    }
    document.getElementById('TimeSpent').value = timespent;
    document.getElementById('Charged_Time').value = mincharge;
}

function toggleSelection(t,l){
	var lst = document.getElementsByClassName(t);
	var bttntxt = document.getElementById(l).innerHTML;
	if (bttntxt == "Show") {
		for(var i = 0; i < lst.length; ++i) {
        	lst[i].style.display = '';
    	}
		document.getElementById(l).innerHTML = 'Hide';
	}else {
		for(var i = 0; i < lst.length; ++i) {
        	lst[i].style.display = 'none';
    	}
		document.getElementById(l).innerHTML = 'Show';
	}
}

//$('#TicketHistoryContent').load('open-ticket-history.asp?id=20523');
$('#TicketHistoryContent').load('open-ticket-history.html');
setInterval(
    function () {
        if(document.getElementById("autorefresh").value=="ON"){
            //$('#TicketHistoryContent').load('open-ticket-history.asp?id=20523');
            $('#TicketHistoryContent').load('open-ticket-history.html');
        }
    },120000); //120 sec/3 min refresh

function AutoRefresh(){
    var btn = document.getElementById("autorefresh");
    if(btn.value=="OFF"){
        btn.value="ON";
        btn.innerHTML="Auto Refresh ON&nbsp;";
        btn.style="background:green;color:white;" 
        $('#TicketHistoryContent').load('open-ticket-history.html');
    }
    else {
        btn.value="OFF";
        btn.innerHTML="Auto Refresh OFF";
        btn.style="background:red;color:white;" 
    }           
}

$(function(){$( "#tabs" ).tabs();});
$(function(){$( "#desctab" ).tabs();});
$(function(){$( "#ticketinfotab" ).tabs();});
$(function(){$( "#tickethistorytab" ).tabs();});			
$( function() {$( "#accordionmenu" ).accordion({collapsible: true,heightStyle: "content",active: false});} );