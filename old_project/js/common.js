var tablerows = [];
var onclickshow = {};
var onclickhide = {};
var onclicktoggle = {};
var onclickvisible = {};
var onclickinvisible = {};
var onstartvisible = {};
var onstartinvisible = {};
var onstartshown = {};
var onstarthidden = {};

function storeCookie(cname,obj) {
    var d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000)); //1 day expiry time
    document.cookie = cname + "=" + encodeURIComponent(JSON.stringify(obj)) + "; expires="+ d.toUTCString() + "; path=/";
}
function delCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
function readCookie(cname) {
    var name = cname + "=";
	var ca = decodeURIComponent(document.cookie).split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') { c = c.substring(1); }
        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
}
function refreshCookie(name) {
	storeObj(name,loadObj(name));
}
function checkCookie() {
	var json = readCookie('json');
	//TODO: complete& write @ login time
}
function isEmptyObj(obj) {
	for(var prop in obj) if(obj.hasOwnProperty(prop)) return false;
	return true;
}
function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
	var valid = re.test(email.trim());
    return valid;
}
function render(title,caller) {
	var str = "";
	if (title===undefined) title="Let's test the kink out of you!";
	if (title!=='') str += "<h1>"+title+"</h1>";
    str += "<div id='maintable'><div id='overlay'><div id='message'></div></div><form id='maintableform'><table class='maintable'>";
    for (var i = 0; i < tablerows.length; i++) {
        str += "<tr>" + tablerows[i] + "</tr>";
    }
    $('#main').html(str + "</table></form></div>");
	$('#maintableform').submit(function(){return false;});
	$('form input').on('keypress', function(e) {return e.which !== 13;});
	//$('#maintableform').submit(function(event){event.preventDefault();});
	$('html, body').animate({ scrollTop: 0 }, 'fast');
    tablerows.length = 0; //.clear()
    for (var element in onclickshow) {
        if (onclickshow.hasOwnProperty(element)) {
            var target = onclickshow[element];
            $(element).click({target: target}, function (event) {
                $(event.data.target).show("fast");
            });
            delete onclickshow[element];
        }
    }
    for (var element in onclickhide) {
        if (onclickhide.hasOwnProperty(element)) {
            var target = onclickhide[element];
            $(element).click({target: target}, function (event) {
                $(event.data.target).hide("fast");
            });
            delete onclickhide[element];
        }
    }
    for (var element in onclicktoggle) {
        if (onclicktoggle.hasOwnProperty(element)) {
            var target = onclicktoggle[element];
            $(element).click({target: target}, function (event) {
                $(event.data.target).toggle("fast");
            });
            delete onclicktoggle[element];
        }
    }
    for (var element in onclickvisible) {
        if (onclickvisible.hasOwnProperty(element)) {
            var target = onclickvisible[element];
            $(element).click({target: target}, function (event) {
                $(event.data.target).fadeIn("slow");
            });
            delete onclickvisible[element];
        }
    }
    for (var element in onclickinvisible) {
        if (onclickinvisible.hasOwnProperty(element)) {
            var target = onclickinvisible[element];
            $(element).click({target: target}, function (event) {
                $(event.data.target).fadeOut("slow");
            });
            delete onclickinvisible[element];
        }
    }
    for (var element in onstartvisible) {
        if (onstartvisible.hasOwnProperty(element)) {
            var target = onstartvisible[element];
            $(element).fadeIn(1);
            delete onstartvisible[element];
        }
    }
    for (var element in onstartinvisible) {
        if (onstartinvisible.hasOwnProperty(element)) {
            var target = onstartinvisible[element];
            $(element).fadeOut(1);
            delete onstartinvisible[element];
        }
    }
    for (var element in onstartshown) {
        if (onstartshown.hasOwnProperty(element)) {
            var target = onstartshown[element];
            $(element).show();
            delete onstartshown[element];
        }
    }
    for (var element in onstarthidden) {
        if (onstarthidden.hasOwnProperty(element)) {
            var target = onstarthidden[element];
            $(element).hide();
            delete onstarthidden[element];
        }
    }
	if(user.email && user.email!=="") $(".email").val(user.email);
    $(".email").change(function () {
        var objid = $(this).attr('id');
        var myemail = $('#' + objid).val();
        $('#' + objid).val(myemail.trim());
        if (myemail !== "" && !isValidEmail(myemail)) {
            if (myemail.indexOf(' ') >= 0) alert(dict.emailerrorhasspaces.replace('%%',myemail));
            else alert(dict.emailerrorinvalid.replace('%%',myemail));
        }
    });
    $(".repeatemail").change(function () {
        var objid = $(this).attr('id');
        objid = objid.slice(0, -1);
        var email1 = $('#' + objid + "1").val();
        if (email1===undefined) email1 = $('#' + objid).val();
        var email2 = $('#' + objid + "2").val();
        if (email1 !== email2 && (email1 === "" || email2 === "")) {
            alert(dict.emailerroroneempty);
        } else if (email1 === "" && email2 === "") {
			
        } else if (email1 !== email2) {
            alert(dict.emailerrordifferent);
        } else {//valid and equal
            email = email1;
            email=email.trim();
            $('input.email[type="text"]').filter(function () {
                return this.value.length === 0;
            }).val(email);
        }
    });
	balanceText();
	if (1==0 && caller!="showAnonOrAccount") {
		var random = Math.random().toString(36).substring(2);
		$('#main').html($('#main').html()+"<p style='text-align:center; color:#bbb;'>--- Clicking the ad below will not interrupt your test ---</p><a href='https://playamedia.go2cloud.org/aff_c?offer_id=131&aff_id=1310&aff_sub={"+encodeURI(caller)+"}&url_id=798&random="+random+"' target='_blank'><img style='display:block; width:100%' src='/fetish.gif'><img src='https://playamedia.go2cloud.org/aff_i?offer_id=131&aff_id=1310&aff_sub={"+encodeURI(caller)+"}&url_id=798&random="+random+"' width='1' height='1' style='opacity:0.1;'><img src='/backend/img.php?for=fetish.com&rand="+random+".png' width='2' height='2'></a>");
	}
}
function verifyInput() {
	var ok = true;
    $(".email").each(function () {
		var myemail = $(this).val().trim().toLowerCase();
		$(this).val(myemail);
        var objid = $(this).attr('id');
        if (myemail !== "" && !isValidEmail(myemail)) {
            if (myemail.indexOf(' ') >= 0) {
				alert(dict.emailerrorhasspaces.replace('%%',myemail));
				ok=false;
				return false;
			} else {
				alert(dict.emailerrorinvalid.replace('%%',myemail));
				ok=false;
				return false;
			}
        }
    });
	return ok;
}
function objToSelect(name,obj,defaultkey,cascadeobj) {
	var validkeys = Object.keys(obj).sort(function(a,b){return obj[a]-obj[b]});
	var validvalues = [];
	for (var i=0; i<validkeys.length; i++) {
		validvalues.push(obj[validkeys[i]]);
	}
	var virgin = true;
	if (cascadeobj!==null && cascadeobj!==undefined) {
		var onchange = "$('.cascade').hide();";
		for (var k in cascadeobj) onchange+= "if ($('#"+name+"_id').val()=='"+k+"') $('#cascade_"+k+"').show();"; 
		var outstr = "<select name='" + name + "' id='" + name + "_id' onchange=\""+onchange+"\">";
	} else var outstr = "<select name='" + name + "' id='" + name + "_id'>";
	for (var j = 0; j < validkeys.length; j++) {
		var selectme = virgin && ("" + validkeys[j]) === ("" + defaultkey);
		outstr += "<option value='" + validkeys[j] + "'" + (selectme ? " selected='selected'" : "") + ">" + validvalues[j] + "</option>";
		if (selectme)
			virgin = false;
	}
	outstr += "</select>";
	if (cascadeobj !== null && cascadeobj!==undefined) {
		for (var k in cascadeobj) {
			outstr+="<div id='cascade_"+k+"' class='cascade' style='display:none;'>"+objToSelect(name+"_"+k,cascadeobj[k],null,null)+"</div>";
		}
	}
	return outstr;
}


function addHeaderRow(title, colspan) {
    if (colspan === undefined) colspan = 1;
    tablerows.push("<th colspan=" + colspan + " class='toprow'><p>" + title + "</p></th>");
}
function addBigButtonRow(text, colspan, button_id) {
    if (button_id === undefined) button_id = "bigbutton";
    if (colspan === undefined) colspan = 1;
    tablerows.push("<td colspan=" + colspan + "><p style='text-align:center;line-height:80px;'><button class='bigbutton' id='"+button_id+"' type='submit'>" + text + " &#9658;</button></p></td>");
}
function add2BigButtonRow(text1, text2, colspan1, colspan2, button1_id, button2_id) {
    tablerows.push("<td colspan=" + colspan1 + "><p style='text-align:center;line-height:80px;'><button class='bigbutton' id='"+button1_id+"' type='submit'>" + text1 + " &#9658;</button></p></td><td colspan=" + colspan2 + "><p style='text-align:center;line-height:80px;'><button class='bigbutton' id='"+button2_id+"' type='submit'>" + text2 + " &#9658;</button></p></td>");
}
function addBlackRow(text, colspan) {
    if (colspan === undefined) colspan = 1;
    tablerows.push("<td colspan=" + colspan + " class='bottomrow'>" + text + "</td>");
}
function addInputRow(id, name, description, displaytype, validkeys, defaultkey, optionwordings) {
    if (description === null || description === undefined) description = '';
    var str1 = "<td class='question' style='width:30%'>" + name + (description === '' ? '' : "<div style='font-size:0.75em'>" + description + "</div>") + "</td>";
    var str2 = "<td class='question'>";
    if (displaytype === 'raw') {
		str2+=optionwordings;
    } else if (displaytype === 'multitext') {
		str2+="<table>";
		for (var j = 0; j < validkeys.length; j++) {
			str2 += "<tr><td>"+optionwordings[validkeys[j]]+"</td><td><input type='text' id='" + id + "["+validkeys[j]+"]" + "'></td></tr>";
		}
		str2+="</table>";
    } else if (displaytype === 'text') {
        str2 += "<input type='text' id='" + id + "' name='" + id + "' style='width:250px;'>";
    } else if (displaytype === 'textarea') {
        str2 += "<div style='padding:7px 9px 7px 5px;'><textarea name='" + id + "' rows=6 placeholder=\""+defaultkey+"\" style='width:100%;'></textarea></div>";
    } else if (displaytype === 'multinumber') {
		str2+="<table>";
		for (var j = 0; j < validkeys.length; j++) {
			str2 += "<tr><td>"+optionwordings[validkeys[j]]+"</td><td><input type='number' id='" + id + "["+validkeys[j]+"]" + "'></td></tr>";
		}
		str2+="</table>";
    } else if (displaytype === 'number') {
        str2 += "<input type='number' id='" + id + "'>";
    } else if (displaytype === 'password') {
        str2 += "<input type='password' id='" + id + "' style='width:250px;'>";
    } else if (displaytype === 'select') {
        str2 += "<select name='" + id + "'>";
        var virgin = true;
        for (var j = 0; j < validkeys.length; j++) {
            var selectme = virgin && ("" + validkeys[j]) === ("" + defaultkey);
            str2 += "<option value='" + validkeys[j] + "'" + (selectme ? " selected='selected'" : "") + ">" + optionwordings[validkeys[j]] + "</option>";
            if (selectme)
                virgin = false;
        }
        str2 += "</select>";
    } else if (displaytype === 'selectother') {
        str2 += "<select name='" + id + "' id='" + id + "_id' onchange=\"if ($('#"+id+"_id').val()=='o') $('#"+id+"_hide').show(); else $('#"+id+"_hide').hide();\">";
        var virgin = true;
        for (var j = 0; j < validkeys.length; j++) {
            var selectme = virgin && ("" + validkeys[j]) === ("" + defaultkey);
            str2 += "<option value='" + validkeys[j] + "'" + (selectme ? " selected='selected'" : "") + ">" + optionwordings[validkeys[j]] + "</option>";
            if (selectme)
                virgin = false;
        }
        str2 += "</select>";
		str2 += "<div id='"+id+"_hide' style='display:none'><input type='text' name='"+id+"_other'></div>";
    } else if (displaytype === 'text+select') {
        str2 += "<input type='text' name='" + id + "_txt' style='width:100px;'>"+optionwordings[0]+"<select name='" + id + "_select'>";
        var virgin = true;
        for (var j = 0; j < validkeys.length; j++) {
            var selectme = virgin && ("" + validkeys[j]) === ("" + defaultkey);
            str2 += "<option value='" + validkeys[j] + "'" + (selectme ? " selected='selected'" : "") + ">" + optionwordings[1][validkeys[j]] + "</option>";
            if (selectme)
                virgin = false;
        }
        str2 += "</select>";
    } else if (displaytype === 'selectcascade') {
		str2 += objToSelect(id,validkeys,defaultkey,optionwordings);
    } else if (displaytype === 'multiselect') {
		var validsubkeys = validkeys[1];
		validkeys = validkeys[0];
		str2+="<table>";
        for (var j = 0; j < validkeys.length; j++) {
			str2 += "<tr><td>"+optionwordings[0][validkeys[j]]+"</td><td><select name='" + id + '['+validkeys[j]+']' + "'>";
			var virgin = true;
			for (var k = 0; k < validsubkeys.length; k++) {
				var selectme = virgin && ("" + validsubkeys[k]) === ("" + defaultkey);
				str2 += "<option value='" + validsubkeys[k] + "'" + (selectme ? " selected='selected'" : "") + ">" + optionwordings[1][validsubkeys[k]] + "</option>";
				if (selectme)
					virgin = false;
			}
			str2 += "</select></td></tr>";
        }
		str2+="</table>";
    } else if (displaytype === 'multiselect-big') {
		var validsubkeys = validkeys[1];
		validkeys = validkeys[0];
		str2+="<table>";
        for (var j = 0; j < validkeys.length; j++) {
			str2 += "<tr><td>"+optionwordings[0][validkeys[j]]+"</td></tr><tr><td><select name='" + id + '['+validkeys[j]+']' + "'>";
			var virgin = true;
			for (var k = 0; k < validsubkeys.length; k++) {
				var selectme = virgin && ("" + validsubkeys[k]) === ("" + defaultkey);
				str2 += "<option value='" + validsubkeys[k] + "'" + (selectme ? " selected='selected'" : "") + ">" + optionwordings[1][validsubkeys[k]] + "</option>";
				if (selectme)
					virgin = false;
			}
			str2 += "</select></td></tr>";
        }
		str2+="</table>";
    } else if (displaytype === 'multiselect2') {
		str2+="<table>";
        for (var j = 0; j < validkeys.length; j++) {
			str2 += "<tr><td>"+optionwordings[validkeys[j]][0]+"</td></tr><tr><td><select name='" + id + '['+validkeys[j]+']' + "'>";
			var virgin = true;
			for (var k = 0; k < optionwordings[validkeys[j]][1].length; k++) {
				var selectme = virgin && (("" + k) === ("" + defaultkey[j]));
				str2 += "<option value='" + k + "'" + (selectme ? " selected='selected'" : "") + ">" + optionwordings[validkeys[j]][1][k] + "</option>";
				if (selectme)
					virgin = false;
			}
			str2 += "</select></td></tr>";
        }
		str2+="</table>";
    } else if (displaytype === 'multiradio') {
		var validsubkeys = validkeys[1];
		validkeys = validkeys[0];
        str2 += '<table><tr><td></td>';
		for (var k = 0; k < validsubkeys.length; k++) {
			str2+="<td style='padding:5px;text-align:center'>"+optionwordings[1][validsubkeys[k]]+"</td>";
		}
		str2+="</tr>";
        for (var j = 0; j < validkeys.length; j++) {
			str2+="<tr><td style='text-align:right;padding-right:3px;'>"+optionwordings[0][validkeys[j]]+":</td>";
			for (var k = 0; k < validsubkeys.length; k++) {
				var selectme = ("" + validsubkeys[k]) === ("" + defaultkey);
				var unique = id + '['+validkeys[j]+']' + "_" + k;
				str2 += "<td style='vertical-align:top; display:table-cell; text-align:center;padding-bottom:5px;'><label style='padding:10px'><input type='radio' id='" + unique + "' name='" + id + '['+validkeys[j]+']' + "' value='" + validsubkeys[k] + "'" + (selectme ? " checked='checked'" : "") + "></label></td>";
			}
			str2 += "</tr>";
        }
        str2 += '</table>';
    } else if (displaytype === 'radio') {
        str2 += '<table>';
        for (var j = 0; j < validkeys.length; j++) {
            var selectme = ("" + validkeys[j]) === ("" + defaultkey);
            //alert(validkeys[j]+" vs "+defaultkey+" has "+(validkeys[j]===defaultkey))
            var unique = id + "_" + j;
            str2 += "<tr>";
            str2 += "<td style='width:25px; vertical-align:top;'><input type='radio' id='" + unique + "' name='" + id + "' value='" + validkeys[j] + "'" + (selectme ? " checked='checked'" : "") + "></td>";
            str2 += "<td style='width:275px;'><label for='" + unique + "'>" + optionwordings[validkeys[j]] + "</label></td>";
            str2 += "</tr>";
        }
        str2 += '</table>';
    }
    str2 += "</td>";
    if (displaytype !== 'hidden')
        tablerows.push(str1 + str2);
}
function addSmallInputRow(id, name, description, displaytype, classname) {
    if (description === null || description === undefined)
        description = '';
    var str1 = "<td class='"+classname+"' style='width:50px'></td><td class='"+classname+" question' style='width:135px'>" + name + (description === '' ? '' : "<div style='font-size:0.75em'>" + description + "</div>") + "</td>";
    var str2 = "<td class='"+classname+" question' style='width:195px;'>";
    if (displaytype === 'text') {
        str2 += "<input type='text' id='" + id + "' style='width:175px'>";
    } else if (displaytype === 'password') {
        str2 += "<input type='password' id='" + id + "' style='width:175px'>";
    } else if (displaytype === 'readonly') {
        str2 += "<input type='text' id='" + id + "' style='width:175px' readonly>";
	}
    str2 += "</td><td class='"+classname+"' style='width:50px'></td>";
    if (displaytype !== 'hidden')
        tablerows.push(str1 + str2);
}
function oneline(input) {
	return input.replace('<br>',' ').replace('  ',' ');
}
function addQuestionTextRow(id, text, mailtext) {
    var maildiv = "";
    if (mailtext !== '' && mailtext !== null && mailtext !== undefined) {
        maildiv = "<div id='q_" + id + "_maildiv' class='qmail'>" + mailtext;
        maildiv += "<table id=q_" + id + "_mail_fields>";
        maildiv += "<tr><td style='width:20%; padding:2px;'><label style='padding:10px'><input type='radio' id='q_" + id + "_nomail' name='q_" + id + "_wantsmail' checked>No</label></td>";
        maildiv += "<td class='q_" + id + "_mail_label' style='width:43%;'><span>Enter email address:</span></td>";
        maildiv += "<td class='q_" + id + "_mail_label' style='width:37%;'><input placeholder='yourname@email.com' id='q_" + id + "_mail_field1' type='text' style='width:100%' class='email'></td></tr>";
        maildiv += "<tr><td style='width:20%; padding:2px;'><label style='padding:10px'><input type='radio' id='q_" + id + "_yesmail' name='q_" + id + "_wantsmail'>Yes</label></td>";
        maildiv += "<td class='q_" + id + "_mail_label' style='width:43%;'><span>Repeat email address:</span></td>";
        maildiv += "<td class='q_" + id + "_mail_label' style='width:37%;'><input placeholder='yourname@email.com' id='q_" + id + "_mail_field2' type='text' style='width:100%' class='email repeatemail'></td></tr>";
        maildiv += "</table>";
        maildiv += "</div>";
        onclickinvisible["#q_" + id + "_nomail"] = ".q_" + id + "_mail_label";
        onclickvisible["#q_" + id + "_yesmail"] = ".q_" + id + "_mail_label";
        onstartinvisible[".q_" + id + "_mail_label"] = ".q_" + id + "_mail_label";
    }
    tablerows.push("<td colspan=7 class='question' id='q_" + id + "_text'>" + text + "" + maildiv + "</td>");
}
function addQuestionHeaderRow() {
    tablerows.push("<th colspan=7 class='toprow'><div class='red balance-text'>"+dict.fulldisagree+"</div><span class='yellow balance-text'>"+dict.neutral+"</span><div class='green balance-text'>"+dict.fullagree+"</div></th>");
}
function addQuestionOptionsRow(name, mailcond) {
    var letters = ["", "G", "F", "E", "D", "C", "B", "A"];
    var str = "";
    for (var i = 1; i < letters.length; i++) {
        str += "<td class='opt " + letters[i] + "'><label for='" + name + "_radio_" + i + "' style='padding:10px' title='" + dict.qansweralts[i] + "'><input type='radio' value='" + i + "' name='" + name + "' id='" + name + "_radio_" + i + "'></label></td>";
        if (mailcond !== undefined) {
            if (mailcond.indexOf(i) >= 0) {
                onclickshow['#' + name + "_radio_" + i] = '#' + name + "_maildiv";
            } else {
                onclickhide['#' + name + "_radio_" + i] = '#' + name + "_maildiv";
            }
        }
    }
    tablerows.push(str);
}
function addSpacerRow(colspan) {
    if (colspan === undefined)
        colspan = 1;
    tablerows.push("<td colspan=" + colspan + "><div style='height:5px;'></div></td>");
}
function addFeedbackHeaderRow() {
    tablerows.push("<th><div class='grey'>no<br>idea</div></th><th colspan=7 class='toprow'><div class='red2 balance-text'>"+dict.fulldisagree+"</div><span class='yellow2 balance-text'>"+dict.neutral+"</span><div class='green2 balance-text'>"+dict.fullagree+"</div></th>");
}
function addFeedbackOptionsRow(name, toogreen, toored) {
    var letters = ["Z", "G", "F", "E", "D", "C", "B", "A"];
    var str = "";
    for (var i = 0; i < letters.length; i++) {
        str += "<td class='optmini " + letters[i] + "'><label style='padding:10px' title='" + dict.qansweralts[i] + "'><input type='radio' value='" + i + "' name='" + name + "' id='" + name + "_radio_" + i + "'" + (i === 0 ? " checked='checked'" : "") + "></label></td>";
/*        if (toogreen.indexOf(i) >= 0) {
            onclickshow['#' + name + "_radio_" + i] = '#' + name + "_toogreendiv";
            onclickhide['#' + name + "_radio_" + i] = '#' + name + "_tooreddiv";
        } else if (toored.indexOf(i) >= 0) {
            onclickhide['#' + name + "_radio_" + i] = '#' + name + "_toogreendiv";
            onclickshow['#' + name + "_radio_" + i] = '#' + name + "_tooreddiv";
        } else {
            onclickhide['#' + name + "_radio_" + i] = '.' + name + "_feedbackdiv";
        }*/
    }
    tablerows.push(str);
}
function addFeedbackTextRow(id, name, description) {
    tablerows.push("<td colspan=8 class='question'><div id='f_" + id + "_text' class='center'>" + name + " <span class='small hidden' id='f_" + id + "_showdesc'>(click to show description)</span></div><div class='small' id='f_" + id + "_desc'>" + description + "</div>" /*+ toogreendiv + tooreddiv*/ + "</td>");
    //onclickshow["#f_"+id+"_text"]="#f_"+id+"_desc";
    //onclickhide["#f_"+id+"_text"]="#f_"+id+"_showdesc";
}
function addWaitingRow() {
	addBlackRow("<div id='loading' class='lds-spinner' style='margin:0 auto; '><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>");
}
function waitDialog(title) {
	addHeaderRow(title);
	addWaitingRow();
	render(undefined,"waitDialog");
}
function okDialog(title,message,resume) { //will erase all that the user filled in...
	addHeaderRow(title);
	addBlackRow(message);
	addBigButtonRow('OK',1,'okButton');
	render(undefined,"okDialog");
	$('okButton').one("click",resume);
}
function dechex(number) {
    if (number < 0) { number = 0xFFFFFFFF + number + 1; }
    return parseInt(number, 10).toString(16);
}
function addResultRow(id,score,name,desc) {
	var col = 0.75;
    if (score>50) col = "#"+dechex(Math.floor(col*(40+4*(100-score))))+dechex(Math.floor(col*240))+dechex(Math.floor(col*40))+"";
    else col = "#"+dechex(Math.floor(col*240))+dechex(Math.floor(col*(40+4*score)))+dechex(Math.floor(col*40))+"";
	var str = "<tr style='color:"+col+";cursor:pointer;' id='bttn_"+id+"' class='result_row'>";
	str += "<td style='width:16px'></td>";
	str += "<td style='width:60px'>"+score+"%</td>";
	str += "<td style='width:105px'><div style='width:"+(3+score)+"px; border:1px "+col+" solid;'></div></td>";
	str += "<td style='width:170px'>"+name+"</td>";
	str += "<td style='width:100x'><span class='desc' style='color:#888'>More&nbsp;info</span></td>";
	str += "<td style='width:16px'></td>";
	str += "</tr>";
	str += "<tr id='info_"+id+"'><td></td><td colspan=4><div class='desc info'>"+desc+"</div></td><td></td></tr>";
	tablerows.push(str);
	onclicktoggle["#bttn_"+id]="#info_"+id;
	onclickhide["#info_"+id]="#info_"+id;
	onstarthidden["#info_"+id]='dummy';
}
function minipage(title, txt) {
    addHeaderRow(title);
    addBlackRow(txt);
    render(undefined,"waitDialog");
}

var totalErrors = 0;

function delay(f) {
	timeouts.push(setTimeout(f,3000));
}
function cleardelayed() {
	for (var i=0; i<timeouts.length; i++) {
		clearTimeout(timeouts[i]);
	}
}
dict['']='';
//What do we do? A call is launched, we show a screen, meanwhile we process the safepost
function safepost(url,data,proceed,restore,attempt) {
	if (attempt===undefined) attempt = 0;
	if (restore===undefined) restore = function(){};
	if (proceed===undefined) proceed = function(answer){};
	if (data===undefined) data = {dummy:"dummy"};
	var success = function(answer){ if (answer===undefined) {alert(dict.connectionissues); restore();} else { totalErrors=0; proceed(answer); } }
	var error = function(jqXHR, textStatus) {
		totalErrors += 1;
		if (totalErrors>100) {minipage('Error',dict.toomanyerrors); return;}
		switch(textStatus) {
		case "error":
			switch(jqXHR.status) {
			case 0:
			case 423: 
				alert(dict.connectionissues);
				//proceed();
				break;
			case 408:
				if (attempt<1) { return safepost(url,data,proceed,restore,attempt+1); } else { alert(dict.timeout); }
				break;
			case 500:
				alert(dict.error500);
				break;
			case 503: //temporarily down for maintenance
				var msg = dict.error503;
				if (jqXHR.responseText && jqXHR.responseText.length !== 0) msg+=' '+dict.downtime.replace('%m%',jqXHR.responseText);
				alert(msg);
				break;
			case 501:
				alert(dict.error501.replace('%ID%',jqXHR.responseText));
				break;
			default:
				alert("Error "+jqXHR.status+": "+dict[jqXHR.responseText]);
				break;
			}
			break;
		case "abort":
		case "timeout":
			if (attempt<1) { return safepost(url,data,proceed,restore,attempt+1); } else { alert(dict.timeout); }
			break;
		case "parsererror":
			if (jqXHR.responseText && jqXHR.responseText.length !== 0) {alert(dict.parsererror+"<br><br>"+jqXHR.responseText);} else {alert(dict.emptystring);}
			break;
		default:
			alert(dict.unknownerror+"<br><br>"+jqXHR.responseText);
			break;
		}
		restore();
	}	
	$.ajax({url:url,method:"POST",timeout:10000,dataType: "json",data:data,success:success,error:error});
}

function ad(ad_url) {
    var ad_minwidth = 800;
    var framewidth = 470;
    if (window.innerWidth > 500) framewidth=window.innerWidth-30;
    var framescale = framewidth*1.0/ad_minwidth;
    if (framescale>1) framescale = 1.0;
    var frameheight = Math.round($('#fulloverlay').height()*1.0/framescale);
    var framewidth = Math.round(framewidth*1.0/framescale);
    var framemargin = (Math.round(470/framescale)-framewidth)/2;
    
    var backuptitle = $('h1').html();
    $('h1').click(function(){
        $('#fulloverlay').hide();
        $('h1').html(backuptitle);
    });
    $('h1').html("<span style='color:white'>Click here to return to test</span>");
    $('#fulloverlay').show();
	$('html, body').animate({ scrollTop: 0 }, 'fast');
    $('#fulloverlay').html("<iframe id='frame' src='"+ad_url+"' width='"+framewidth+"' height='"+frameheight+"' style='margin-left:"+framemargin+"px;'></iframe>");
    $('#fulloverlay').css('-ms-zoom',framescale);
    $('#fulloverlay').css('-moz-transform',"scale("+framescale+")");
    $('#fulloverlay').css('-moz-transform-origin',"0 0");
    $('#fulloverlay').css('-o-transform',"scale("+framescale+")");
    $('#fulloverlay').css('-o-transform-origin',"0 0");
    $('#fulloverlay').css('-webkit-transform',"scale("+framescale+")");
    $('#fulloverlay').css('-webkit-transform-origin',"0 0");
    $('#fulloverlay').css('transform',"scale("+framescale+")");
    $('#fulloverlay').css('transform-origin',"0 0");
}
function common() {
	checkCookie();
    var isOperaMini = (navigator.userAgent.indexOf('Opera Mini') > -1);
    if (isOperaMini) {
        $('#desc').html("It seems that your browser (Opera Mini) does not support Javascript properly.<br>Please use an actual web browser to visit this website: Chrome, Firefox, Safari, Android's default browser, Edge, Opera, Opera Mobile (not Mini!), or any other mobile or desktop browser of your choice.");
    } else {
        route();
    }
    window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    if (!window.mobileCheck()) {
    } else {
        document.body.style.overflowX="hidden";
        $('iframe').css({'overflow-x': 'hidden'});
        $('div').css({'overflow-x': 'hidden'});
    }
}

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-58187237-1', 'auto');