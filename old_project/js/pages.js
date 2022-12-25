var user = {};
var uauth = {};
var rauth = {};
var testdata = {};
var timeouts = [];
var currpage = '/splash';

function track(url,name,notrack) {
	currpage=url;
	if (notrack===undefined) ga('send','pageview',url);
	if (name!==undefined) window.history.pushState({}, name, url);
}
function verifyEmail() {
	var result = true;
	$('.email').each(function(index){
		var em = $(this).val().trim().toLowerCase();
		$(this).val(em);
		if(!isValidEmail(em)) {
			result=false;
			return false;
		}
	});
	return result;
}
function verifyEqual(id1,id2) {
	return $('#'+id1).val()===$('#'+id2).val();
}
function verifyPass() { //can be too short, or not identical --> make dict entries
	var result = true;
	var value = null;
	$("input:password").each(function(index){
		var pwd = $(this).val();
		if (pwd.length<=1) {
			result=false;
			return false;
		}
		if (value!==null && value!=pwd) {
			result=false;
			return false;
		}
	});
	return result;
}
function routing(regex) {
	var url = window.location.href;
	url = url+'?';
	url = url.substring(0 , url.indexOf('?'));
	url = url.substring(url.indexOf('bdsmtest.org') + 'bdsmtest.org'.length);
	return regex.test(url);
}
function route() {
	if(readCookie('uauth')!=="") {uauth=JSON.parse(readCookie('uauth'));}
	menuStartTest();
	if (uauth.uid!=0) menuProfileLogout(); else menuLoginRegister();
	menuInfoContact();
	switch(true) {
		case routing(/\/$/):
		case routing(/\/index\.php/):
		case routing(/\/quiz\.php/):
			if (uauth.uid>0) showUserOverview(); else showAnonOrAccount();
			break;
		case routing(/\/login-register/):
			if (uauth.uid>0) showUserOverview(); else showEmailSplash();
			break;
		case routing(/\/login/):
			if (uauth.uid>0) showUserOverview(); else showEmailSplash(); //should we allow /login/name@gmail.com?
			break;
		case routing(/\/register/):
			if (uauth.uid>0) showUserOverview(); else showEmailSplash(); //should we allow /register/name@gmail.com?
			break;
		case routing(/\/forgot-pass/):
			if (uauth.uid>0) showUserOverview(); else showEmailSplash(); //should we allow /forgot-pass/name@gmail.com?
			break;
		case routing(/\/profile/):
			if (uauth.uid>0) showUserOverview(); else showEmailSplash();
			break;
		case routing(/\/passreset/):
			if (uauth.uid>0) showUserOverview(); else showPassReset();
			break;
		case routing(/\/select-mode/):
			if (uauth.uid>0) showTestStartButton(); else showAnonOrAccount();
			break;
		case routing(/\/start/):
			if (uauth.uid>0) showTestStartButton(); else showAnonOrAccount();
			break;
		case routing(/\/resume/):
			resumeTest();
			break;
		case routing(/\/prelims/):
			resumeTest();
			break;
		case routing(/\/questions/):
		case routing(/\/questions-[0-9]+/):
			resumeTest();
			break;
		case routing(/\/feedback/):
			resumeTest();
			break;
		case routing(/\/submit/):
			resumeTest();
			break;
		case routing(/\/privacy/):
			showPrivacyDeclaration();
			break;
		case routing(/\/info/):
			showInfoPage();
			break;
		case routing(/\/contact/):
			showContactPage();
			break;
		case routing(/\/emailchange/):
			if (uauth.uid>0) showEmailChange(); else showAnonOrAccount();
			break;
		case routing(/\/passchange/):
			if (uauth.uid>0) showPassChange(); else showAnonOrAccount();
			break;
		case routing(/\/r\/([a-zA-Z0-9]+)/):
			var url = window.location.href;
			url = url+'?';
			url = url.substring(0 , url.indexOf('?'));
			url=url.substring(url.indexOf('bdsmtest.org') + 'bdsmtest.org'.length);
			id=url.substring('/r/'.length);
			rauth = {rid:id};
			showResultPage();
			break;
		case routing(/\/dating\/.*/):
			break;
		default:
			var url = window.location.href;
			url = url+'?';
			url = url.substring(0 , url.indexOf('?'));
			url=url.substring(url.indexOf('bdsmtest.org') + 'bdsmtest.org'.length);
			alert(dict.badrouting.replace('%url%',url));
			break;
	}
	$('#privacy').click(function(){
		if (testdata.complete) menuReturnResult();
		else if(!isEmptyObj(testdata.pdata)) menuResumeTest(); 
		else menuStartTest();
		showPrivacyDeclaration();
		cleardelayed();
		return false;
	});
}
function resetAuth() {
    uauth = {uid:0,salt:'',authsig:'814a69afc15258000678f00526b0c107ac271b5ea997beb4f7c1e81c861c972b'};
	user = {name:"",email:"",lang:1,langcode:'en'};
}
function resetRid() {
    rauth = {rid:0,version_id: 19,ridsig:""}
}
function resetTest() {
    testdata = {pdata: {},qdata: {},qemails: {},fdata: {},fextra: {}, timespent: 1, questionPageCounter: 0,percentage: 0, complete:false};
}
function menuTestProgress(perc) {
	if (perc===undefined) perc=testdata.percentage;
	$('#menu1').html("Progress:<br>"+perc+"%");
	$('#menu1').unbind("click");
}
function menuResumeTest(perc) {
	if (perc===undefined) perc=testdata.percentage;
	$('#menu1').html("Resume Test<br>("+perc+"% complete)");
	$('#menu1').unbind("click");
	$('#menu1').click(function(){
		menuTestProgress();
		showQuestionsPage();
		cleardelayed();
		return false;
	});
}
function menuReturnResult() {
	$('#menu1').html("Return to<br>your result");
	$('#menu1').unbind("click");
	$('#menu1').click(function(){
		cleardelayed();
		showResultPage();
		return false;
	});
}
function menuStartTest() {
	$('#menu1').html("Start new<br>BDSM Test");
	$('#menu1').unbind("click");
	$('#menu1').click(function(){
		cleardelayed();
		if(uauth.uid==0) showAnonOrAccount();
		else showTestStartButton();
		return false;
	});
}
function menuLoginRegister() {
	$('#menu2').html("Login /<br>Register");
	$('#menu2').unbind("click");
	$('#menu2').click(function(){
		if (testdata.complete) menuReturnResult();
		else if(!isEmptyObj(testdata.pdata)) menuResumeTest(); 
		else menuStartTest();
		showEmailSplash();
		cleardelayed();
		return false;
	});
}
function menuProfileLogout() {
	$('#menu2').html("Profile /<br>Log Out");
	$('#menu2').unbind("click");
	$('#menu2').click(function(){
		if (testdata.complete) menuReturnResult();
		else if(!isEmptyObj(testdata.pdata)) menuResumeTest(); 
		else menuStartTest();
		showUserOverview();
		cleardelayed();
		return false;
	});
}
function menuInfoContact() {
	$('#menu3').click(function(){
		if (testdata.complete) menuReturnResult();
		else if(!isEmptyObj(testdata.pdata)) menuResumeTest(); 
		else menuStartTest();
		showInfoPage();
		cleardelayed();
		return false;
	});
	$('#menu4').click(function(){
		if (testdata.complete) menuReturnResult();
		else if(!isEmptyObj(testdata.pdata)) menuResumeTest(); 
		else menuStartTest();
		showContactPage();
		cleardelayed();
		return false;
	});
}
function showAnonOrAccount() {
	track('/select-mode',dict.selectmode);
	//toon huidige formulier voor account of niet
	addHeaderRow(dict.welcometitle,4);
	addBlackRow("<p class='balance-text'>"+dict.anonoraccount+"</p>",4);
    addBlackRow("<p style='text-align:left'><input type='radio' name='auth' id='auth_no' value='no' checked='checked' style='margin-left:50px; margin-right:7px;'><label for='auth_no'> "+dict.startanon+"</label></p>",4);
    addBlackRow("<p style='text-align:left'><input type='radio' name='auth' id='auth_yes' value='yes' style='margin-left:50px; margin-right:7px;'><label for='auth_yes'> "+dict.startacc+"</label></p>",4);
	addBigButtonRow(dict.next,4,"bigbuttonNext");
	addBlackRow("By using this website you confirm that you are 18+.<br>Don't know what BDSM is? Please read the info pages first.",4);
	addSpacerRow(4);
	render(undefined,"showAnonOrAccount");
    $('#bigbuttonNext').click(function(){
		var auth = $('input[name="auth"]:checked').val();
		if (auth=='no') showTestStartButton();
		if (auth=='yes') showEmailSplash();
		return false;
	});
}
function showTestStartButton() {
	track('/start',oneline(dict.startnewtest));
	addHeaderRow(dict.beforewestart,1);
    addBlackRow(dict.robocheck,4);
	addBlackRow("<div id='spambot' class='spambot'></div>");
	addBigButtonRow(dict.pinkiepromise,1,"bigbuttonGo");
	render(undefined,"showTestStartButton");
    $('#bigbuttonGo').click(function(){
		function processStart(answer) {
			rauth=answer['rauth'];
			showPrelimariesPage(answer['prelims']);
		}
		waitDialog(dict.verifying);
	    safepost("/ajax/init", {uauth:uauth, user:user}, processStart, showTestStartButton);
		/*human = function(token) {
			resetRid();
			resetTest();
			safepost("/ajax/init", {recaptcha: token, uauth:uauth, user:user}, processStart, showTestStartButton);
		}
		var ticker = setInterval(function(){
			try{
				grecaptcha.reset();
				grecaptcha.execute();
				clearInterval(ticker);
			} catch(e) {}
		},100);
        return false;*/

    });
}
function showEmailSplash() {
	track('/login-register',dict.loginreg);
	addHeaderRow(dict.enteremail,1);
	addBlackRow("<input type='text' id='email' class='email' style='width:60%'>");
	addBigButtonRow(dict.next,1,"bigbuttonGo");
	render(undefined,"showEmailSplash");
	function processEmail(answer) {
		if (answer['exists']=='yes') {
			showLoginScreen();
		} else {
			showRegisterScreen();
		}
	}
    $('#bigbuttonGo').click(function(){
		user.email = $('#email').val().trim().toLowerCase();
		if(!verifyEmail()) {
			alert(dict.errreginvalidmail);
			return;
		}
		waitDialog(dict.pleasewait);
		human = function(token) {
			safepost("/ajax/email", {recaptcha: token, email:user.email}, processEmail, showEmailSplash);
		}
		var ticker = setInterval(function(){
			try{
				grecaptcha.reset();
				grecaptcha.execute();
				clearInterval(ticker);
			} catch(e) {}
		},100);
		return false;
    });
}
function showLoginScreen() {
	track('/login',dict.login);
	//show login screen
	addHeaderRow(dict.login,4);
    addSmallInputRow("email", dict.email, "", "text");
    addSmallInputRow("password", dict.pass, "", "password");
	addBigButtonRow(dict.login,4,"bigbuttonGo");
	addBlackRow(dict.passfgttxt,4);
	addBigButtonRow(dict.iforgot,4,"bigbuttonForgot");
	render(undefined,"showLoginScreen");
	$("#email").val(user.email);
	$("#email").prop("readonly", true);
	function processLogin(answer) {
		uauth=answer['uauth'];
		user=answer['user'];
		showUserOverview();
		menuProfileLogout();
	}
	function passResetMailed() {
		minipage(dict.passresetsenttitle,dict.passresetsent.replace('%em%',user.email));
	}
    $('#bigbuttonGo').click(function(){
		var pass = $('#password').val();
		if(!verifyPass()) {
			alert(dict.invalidpassword);
			return;
		}
		waitDialog(dict.loggingin);
		safepost("/ajax/login", {email:user.email,pass:pass}, processLogin, showLoginScreen);
		return false;
	});
    $('#bigbuttonForgot').click(function(){
		//todo: if invalid email: complain
		waitDialog(dict.sendingpassreset);
		human = function(token) {
			safepost("/ajax/forgotpass", {recaptcha: token, email:user.email}, passResetMailed, showLoginScreen);
		}
		var ticker = setInterval(function(){
			try{
				grecaptcha.reset();
				grecaptcha.execute();
				clearInterval(ticker);
			} catch(e) {}
		},100);
		return false;
	});
}
function showPassReset() {
	var url = window.location.href;
	url = url+'?';
	url = url.substring(0 , url.indexOf('?'));
	url=url.substring(url.indexOf('bdsmtest.org/passreset/') + 'bdsmtest.org/passreset/'.length);
	track('/passreset');
	var code = url.split("_");
	uauth={uid:code[0],salt:code[1],timestamp:code[2],authsig:code[3]};
	waitDialog(dict.verifid);
	function processUserdata(answer) {
		user.email = answer['email'];
		addHeaderRow(dict.choosepass,4);
		addSmallInputRow("email",dict.email,dict.cannotchange,"readonly");
		addSmallInputRow("password",dict.newpass,"","password");
		addSmallInputRow("password2",dict.newpass,dict.repeat,"password");
		addBigButtonRow(dict.reset,4,'bigbuttonReset');
		render(undefined,"showPassReset");
		$('#email').val(user.email);
		$('#bigbuttonReset').click(function(){
			if (!verifyPass()) {
				alert(dict.invalidpassword);
				return;
			}
			if (!verifyEqual("password","password2")) {
				alert(dict.samepasswtice);
				return;
			}
			$('#bigbuttonReset').unbind("click");
			safepost("/ajax/resetpass",{uauth:uauth,new_password:$('#password').val()},function(){resetAuth(); menuLoginRegister(); minipage(dict.changesuccess,dict.changesuccess);},showPassReset);
			return false;
		});
	}
	safepost("/ajax/getuserdata",{uauth:uauth},processUserdata,function(){minipage("Error","Error");});
}
function showPassChange() {
	track('/passchange');
	addHeaderRow(dict.choosepass,4);
	addSmallInputRow("email",dict.email,dict.cannotchange,"readonly");
	addSmallInputRow("password",dict.newpass,"","password");
	addSmallInputRow("password2",dict.newpass,dict.repeat,"password");
	addBigButtonRow(dict.reset,4,'bigbuttonReset');
	render(undefined,"showPassReset");
	$('#email').val(user.email);
	$('#bigbuttonReset').click(function(){
		if (!verifyPass()) {
			alert(dict.invalidpassword);
			return;
		}
		if (!verifyEqual("password","password2")) {
			alert(dict.samepasswtice);
			return;
		}
		$('#bigbuttonReset').unbind("click");
		safepost("/ajax/passchange",{uauth:uauth,new_password:$('#password').val()},function(){resetAuth(); menuLoginRegister(); minipage(dict.changesuccess,dict.changesuccess);},showPassReset);
		return false;
	});
}
function resumeTest() {
	if (rauth.rid===0 || rauth.rid===undefined) {
		if (uauth.uid===0 || uauth.uid===undefined) showAnonOrAccount();
		else showUserOverview();
	} else {
		showQuestionsPage();
		menuTestProgress();
	}
}
function showRegisterScreen() {
	track('/register',dict.register);
	//send regdata + recaptcha in, reload with error message if failed, showPrelimariesPage() if successful
	addHeaderRow(dict.registertitle,2);
	addBlackRow(dict.registerwelcome,2);
	addSpacerRow(2);
    addInputRow("reg_email", dict.email, "", "text","regrow");
    addInputRow("reg_email2", dict.repeatemail, dict.typos, "text","regrow");
    addInputRow("reg_password", dict.pass, "", "password","regrow");
    addInputRow("reg_password2", dict.repeatpass, dict.typos, "password","regrow");
    addInputRow("reg_name", dict.name, dict.howadress, "text","regrow");
	addBigButtonRow(dict.register,2,"bigbuttonGo");
	addBlackRow(dict.correctemail,2);
	addBigButtonRow(dict.return,2,'bigbuttonReturn');
	render(undefined,"showRegisterScreen");
	$("#reg_email").val(user.email);
	$("#reg_email").prop("readonly", true);
	function processRegister(answer) {
		uauth=answer.uauth;
		menuProfileLogout();
		if (answer.rauth!==undefined) {
			rauth=answer.rauth;
			showPrelimariesPage(answer['prelims']);
		} else {
			showUserOverview();
		}
	}
	$('#bigbuttonReturn').click(function(){showEmailSplash();return false;});
    $('#bigbuttonGo').click(function(){
		if (!verifyEqual("reg_email","reg_email2")) {
			alert(dict.emailerrordifferent);
			return;
		}
		if (!verifyEqual("reg_password","reg_password2")) {
			alert(dict.samepasswtice);
			return;
		}
		if (!verifyPass()) {
			alert(dict.invalidpassword);
			return;
		}
		$('#bigbuttonGo').unbind("click");
		var pass = $('#reg_password').val();
		user.name=$('#reg_name').val();
		user.email=$('#reg_email').val().toLowerCase().trim();
		waitDialog(dict.creating);
		human = function(token) {
			safepost("/ajax/register", {recaptcha: token, user:user, password: pass, rauth: rauth}, processRegister, showRegisterScreen);
		}
		var ticker = setInterval(function(){
			try{
				grecaptcha.reset();
				grecaptcha.execute();
				clearInterval(ticker);
			} catch(e) {}
		},100);
		return false;
	});
}
function showUserOverview() {
	track('/profile',dict.myprofile);
	function showrids(answer) {
		user.name = answer['name'];
		var emailhash = answer['emailhash'];
		answer = answer['rids'];
		addHeaderRow(dict.welcome.replace('%name%',user.name)+"<span id='changenameopt'>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='viewnamechange' value='"+dict.changename+"'></span>",2);
		addBlackRow("<div id='namechange' style='display:none'><input type='text' id='name' value='"+user.name+"'><input type='button' id='namechangebutton' value='"+dict.change+"'></div>",2);
		add2BigButtonRow(dict.logout,dict.changepass,1,1,"bigbuttonLogout","bigbuttonChangePass");
		add2BigButtonRow(dict.changeemail,"Unsubscibe/Delete",1,1,"bigbuttonChangeEmail","bigbuttonUnsubscribe");
		//addBigButtonRow("Change email/unsubscribe/delete me",2,"bigbuttonEmailStuff");
		addBlackRow("<br><div id='oldres'>"+dict.loadingprev+"</div>",2);
		addBigButtonRow(dict.startnew,2,"bigbuttonStart");
		addBlackRow("<hr><p class='balance-text'>"+dict.proffeedbtxt+"</p>",2);
		addBlackRow("<div id='feedbackpart'><p style='text-align:center'><textarea rows=6 cols=50 style='background-color:rgba(255,255,255,0.5);' id='profilefeedback'></textarea></p><input type='button' id='feedbackbutton' value='"+dict.send+"'></div>",2);
		addSpacerRow(2);
		render(undefined,"showUserOverview");
		rauths = {};
		var ridshtml = "<hr><p>"+dict.prevresbelow+"</p>";
		for (var i=0; i<answer.length; i++) {
			//alert(JSON.stringify(answer[i]));
			ridshtml += "<p style='margin:7px'><span id='rlink"+i+"' style='color:white; text-decoration:underline; cursor:pointer; margin-left:140px; display:inline-block'>"+answer[i]['date']+"</span>   "+answer[i]['time']+" <input style='margin-left:50px;display:inline-block;' type='button' id='unclaimbutton-"+i+"' value='"+dict.unclaim+"'></p>";
		}
		ridshtml += "<p>"+dict.enterearlier+"<div><input type='text' id='claimid' placeholder='"+dict.exansw+" 29gEr9'><input type='button' id='claimbutton' value='"+dict.claim+"'></div>"+dict.enterearlier2+"</p>";
		$('#oldres').html(ridshtml);
		for (var i=0; i<answer.length; i++) {
			$("#rlink"+i).click(function(){var i = parseInt($(this).attr("id").substring(5)); rauth=answer[i]['rauth']; showResultPage(); return false;});
			$('#unclaimbutton-'+i).click(function(){
				var i = parseInt($(this).attr("id").substring(14));
				var claim_rid = answer[i]['rauth']['rid'];
				waitDialog(dict.removingclaim);
				safepost("/ajax/unclaim",{uauth:uauth,claim_rid:claim_rid},showUserOverview,showUserOverview);
				showUserOverview();
				return false;
			});
		}
		$('#viewnamechange').click(function(){
			$('#namechange').show();
			$('#changenameopt').hide()
		});
		$('#claimbutton').click(function(){
			var claim_rid = $('#claimid').val();
			waitDialog(dict.addingclaim);
			safepost("/ajax/addclaim",{uauth:uauth,claim_rid:claim_rid},showUserOverview,showUserOverview);
			return false;
		});
		$('#feedbackbutton').click(function(){
			safepost("/ajax/storefeedback",{uauth:uauth,message:$('#profilefeedback').val()},function(){$('#feedbackpart').html("<div style='color:#0B0'>Feedback successfully stored!</div>");});
			return false;
		});
		$('#namechangebutton').click(function(){
			var newname = $('#name').val();
			waitDialog(dict.changingname);
			safepost("/ajax/changename",{uauth:uauth,name:newname},showUserOverview,showUserOverview);
			return false;
		});
		/*function passResetMailed() {
			minipage(dict.passresetsenttitle,dict.passresetsent.replace('%em%',user.email));
			resetAuth();
			menuLoginRegister(); 
		}*/
		$('#bigbuttonChangePass').click(function(){
			showPassChange();
			return false;
		});
		$('#bigbuttonUnsubscribe').click(function(){
			window.location.href = '//dev.bdsmtest.org/email/mailinglists.php?key='+emailhash;
			return false;
		});
		$('#bigbuttonChangeEmail').click(function(){
			showEmailChange();
			return false;
		});
		$('#bigbuttonStart').click(function(){ showTestStartButton(); return false;});
		$('#bigbuttonLogout').click(function(){ resetAuth(); menuLoginRegister(); showEmailSplash(); return false;});
	}
	waitDialog(dict.loadingdata);
	safepost("/ajax/myresults",{uauth:uauth},showrids,function(){minipage("Error","Error");});
}
function showEmailChange() {
	track('/emailchange',dict.changeemail);
	addHeaderRow("Change your email address", 2);
	addInputRow("new_email", dict.newemail, "", "text", "regrow");
    addInputRow("new_email2", dict.repeatemail, dict.typos, "text", "regrow");
    addBigButtonRow("Change", 2, 'bigbuttonChange');
    render(undefined,"showEmailChange");
	function showEmailChanged() {
		resetAuth();
		menuLoginRegister(); 
		minipage(dict.emailchangesenttitle,dict.emailchangesent);
	}
    $('#bigbuttonChange').click(function(){
		if (!verifyEqual("new_email","new_email2")) {
			alert(dict.emailerrordifferent);
			return;
		}
		var newemail = $('#new_email').val();
		waitDialog("Changing your email address...");
		safepost("/ajax/changeemail",{uauth:uauth,new_email:newemail},showEmailChanged,function(){minipage("Error","Error");});
		return false;
	});
}
function showPassChange() {
	track('/passchange',dict.changepass);
	addHeaderRow(dict.choosepass,4);
	addSmallInputRow("email",dict.email,dict.cannotchange,"readonly");
	addSmallInputRow("password",dict.newpass,"","password");
	addSmallInputRow("password2",dict.newpass,dict.repeat,"password");
	addBigButtonRow(dict.reset,4,'bigbuttonReset');
	render(undefined,"showPassReset");
	$('#email').val(user.email);
	$('#bigbuttonReset').click(function(){
		if (!verifyPass()) {
			alert(dict.invalidpassword);
			return;
		}
		if (!verifyEqual("password","password2")) {
			alert(dict.samepasswtice);
			return;
		}
		$('#bigbuttonReset').unbind("click");
		safepost("/ajax/passchange",{uauth:uauth,new_password:$('#password').val()},function(){resetAuth(); menuLoginRegister(); minipage(dict.changesuccess,dict.changesuccess);},showPassReset);
		return false;
	});
}
function showPrelimariesPage(prelims) {
	track('/prelims',dict.prelimhead);
	//show prelims, on submit showQuestionsPage()
	answer=prelims;
	addHeaderRow(dict.prelimhead, 2);
    for (var j = 0; j < answer.length; j++) {
        addInputRow("prelim_"+answer[j]['id'], answer[j]['EN']['name'], answer[j]['EN']['desc'], answer[j]['displaytype'], answer[j]['validkeys'], answer[j]['defaultkey'], answer[j]['EN']['options']);
    }
    addBigButtonRow(dict.next, 2, 'bigbuttonNext');
    render(undefined,"showPrelimariesPage");
	//$('#bottomads').show();
	//$('#footer').hide();
    $('#bigbuttonNext').click(function () {
		testdata['pdata']={};
		testdata['qdata']={};
        for (var j = 0; j < answer.length; j++) {
            if (answer[j]['displaytype'] === 'select') {
                testdata['pdata'][answer[j]['id']] = $('select[name="prelim_' + answer[j]['id'] + '"]').val();
            } else if (answer[j]['displaytype'] === 'radio') {
                testdata['pdata'][answer[j]['id']] = $('input[name="prelim_' + answer[j]['id'] + '"]:checked').val();
            }
        }
		if (testdata['pdata'][23]!=='EN' && testdata['pdata'][20]!=='0') {
			alert("Unfortunately we cannot currently offer the more accurate version in your language. Please select 'English' (or the short version if you don't speak English).");
			return false;
		}
		//alert(JSON.stringify(testdata['pdata']));
		//return false;
		menuTestProgress(0);
		//$('#bottomads').html("");
		//$('#footer').show();
        started = true;
        window.onbeforeunload = function () {
            return dict.onbeforeunload;
        };
		testdata.questionPageCounter = 0;
		showQuestionsPage();
		return false;
    });
}
function showQuestionsPage() {
	//fetch next 7 questions and show them
	//on empty, showFeedbackPage()
	//on submit, showQuestionsPage()
	function displayQuestions(answer){
		if (answer.length === 0) {
			menuTestProgress(100);
			showFeedbackPage();
		} else {
			track('/questions-'+testdata.questionPageCounter,dict.pagecounter.replace('%p%',testdata.questionPageCounter));
			testdata.percentage=answer[0];
			menuTestProgress();
			addHeaderRow(dict.questionhead, 7);
			addBlackRow(dict.progressbar+": " + answer[0] + "%", 7);
			addQuestionHeaderRow();
			for (var j = 1; j < answer.length; j++) {
				if (j > 1) addSpacerRow();
				addQuestionTextRow(answer[j]['id'], answer[j]['wording'], answer[j]['mailtext']);
				addQuestionOptionsRow('q_' + answer[j]['id'], answer[j]['mail']);
			}
			addBigButtonRow("Next", 7);
			addBlackRow("Consent is essential for any form of BDSM. Always do your research before engaging in any serious form of BDSM!",7);
			render(undefined,"showQuestionsPage-"+answer[0]+'%');
			$('.bigbutton').click(function () {
				for (var j = 1; j < answer.length; j++) {
					if (!$("input:radio[name='q_" + answer[j]['id'] + "']").is(":checked")) {
						alert(dict.answerall);
						return false;
					}
					testdata['qdata'][answer[j]['id']] = $("input[name='q_" + answer[j]['id'] + "']:checked").val();
					if (answer[j]['mail'] !== undefined) {
						var cage = "q_" + answer[j]['id'];
						if ($('#' + cage + "_yesmail").is(':checked')) {
							var em1 = $('#' + cage + "_mail_field1").val();
							var em2 = $('#' + cage + "_mail_field2").val();
							if (em1 !== em2) {
								alert(dict.diffemails.replace('%em1%',em1).replace('%em2%',em2).replace('%q%',answer[j]['wording']));
								return false;
							} else if (em1 === '' || !isValidEmail(em1)) {
								alert(dict.invalidem1.replace('%em1%',em1).replace('%q%',answer[j]['wording']));
								return false;
							} else if (em2 === '' || !isValidEmail(em2)) {
								alert(dict.invalidem2.replace('%em2%',em2).replace('%q%',answer[j]['wording']));
								return false;
							}
							testdata['qemails'][answer[j]['id']] = em1;
						}
					}
				}
				testdata.questionPageCounter += 1;
				showQuestionsPage();
				return false;
			});
		}
	}
	waitDialog(dict.fetchingq);
	safepost("/ajax/questions", {uauth:uauth,rauth:rauth,user:user,testdata:testdata}, displayQuestions, function(){delay(showQuestionsPage);} );
}
function showFeedbackPage() {
	addBlackRow(dict.fetchingf);
	render(undefined,"waitFeedbackPage");
	function displayFeedback(answer) {
		if (answer.length==0) {
			submitResult();
		} else {
			track('/feedback',dict.optf);
			addHeaderRow(dict.optstep, 8);
			addBlackRow(dict.optstepdesc, 8);
			addBigButtonRow(dict.skip, 8);
			addBlackRow(dict.feedbdesc+"<br>"+dict.feedbdesc2, 8);
			addFeedbackHeaderRow();
			for (var i = 0; i < answer.length; i++) {
				addFeedbackTextRow(answer[i].id, answer[i].name, answer[i].description);
				addFeedbackOptionsRow("f_" + answer[i].id);
				addSpacerRow(8);
			}
			addBigButtonRow(dict.next, 8);
			render(undefined,"showFeedbackPage");
			$('.bigbutton').click(function () {
				$('.bigbutton').unbind("click");
				for (var i = 0; i < answer.length; i++) {
					testdata['fdata'][answer[i]['id']] = $("input[name='f_" + answer[i]['id'] + "']:checked").val();
				}
				submitResult();
				return false;
			});
		}
	}
	safepost("/ajax/feedback", {uauth:uauth,rauth:rauth,user:user,testdata:testdata}, displayFeedback, function(){delay(showFeedbackPage);});
}
function submitResult() {
	track('/submit',dict.submit);
	waitDialog(dict.calcing);
	testdata.timespent = -1;
    try { testdata.timespent = TimeMe.getTimeOnCurrentPageInSeconds(); } catch (e) {}
    safepost("/ajax/score", {uauth:uauth,rauth:rauth,testdata:testdata,user:user}, showResultPage, function(){delay(submitResult);});
}
function rating_restore() {
	var idx = $('#rating-result').val();
	rating_show(idx);
}
function rating_store(idx) {
    $('#rating-result').val(idx);
    rating_show(idx);
	if (idx<4) $('#ratingfeedback').show();
	else $('#ratingfeedback').hide();
	safepost("/ajax/storerating",{rauth:rauth,rating:idx});
}
function rating_show(idx) { 
	$('#rating').css('background-position', '0px -'+(32*parseInt(idx))+'px');
}
function showResultPage() {
	cleardelayed();
	testdata.percentage=100;
	testdata.complete=true;
	var rid = rauth.rid;
	track('/r/'+rid,dict.res,true);
	waitDialog(dict.fetchingr)
	menuStartTest();
	//show results as now
	var copyfailed = false;
	function nthIndex(str, pat, n){
		var L= str.length, i= -1;
		while(n-- && i++<L){
			i= str.indexOf(pat, i);
			if (i < 0) break;
		}
		return i;
	}
	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}
	function copyToClipboard() {
		if (!copyfailed) try {
			var success = document.execCommand('copy');
			if (!success) {
				copyfailed = true;
				alert(dict.browsernocopy);
			} else {
				alert(dict.copied);
				var sel;
				if ( (sel = document.selection) && sel.empty ) {
					sel.empty();
				} else {
					if (window.getSelection) {
						window.getSelection().removeAllRanges();
					}
					var activeEl = document.activeElement;
					if (activeEl) {
						var tagName = activeEl.nodeName.toLowerCase();
						if ( tagName === "textarea" ||
								(tagName === "input" && activeEl.type === "text") ) {
							// Collapse the selection to the end
							activeEl.selectionStart = activeEl.selectionEnd;
						}
					}
				}
			}
		} catch (err) {
			copyfailed = true;
			alert(dict.browsernocopy);
		}
	}
	function displayResult(answer) {
		addHeaderRow(dict.summary.replace('%%',"<span id='resultdate'>"+dict.sometimeago+"</span>"), 6);
		var copytext = "== Results from bdsmtest.org == ";
		for (var i=0;i<answer['scores'].length;i++) {
			var scoreObj = answer['scores'][i];
			addResultRow(scoreObj['id'],scoreObj['score'],dict.allarchetypes[scoreObj['id']].name,dict.allarchetypes[scoreObj['id']].description+"<br><br>"+dict.allarchetypes[scoreObj['id']].pairdesc);
			copytext += "\n"+scoreObj['score']+"% "+dict.allarchetypes[scoreObj['id']].name+" ";
		}
		addBlackRow(dict.copymsg,6);
		tablerows.push("<tr></td><td><td colspan=4><table><tr><td rowspan=4><textarea id='copypastearea' style='width:270px; height:100px; background-color:rgba(255,255,255,0.5); margin:5px 10px; display:block; padding:0 auto;' spellcheck='false'></textarea></td><td><input type='button' id='copyall' class='copybutton' value='Copy All'></td></tr><tr><td><input type='button' id='copy10' class='copybutton' value='Copy Top 10'></td></tr><tr><td><input type='button' id='copyurl' class='copybutton' value='Copy Link'></td></tr><tr><td><input type='button' id='copyallandurl' class='copybutton' value='Copy All+Link'></td></tr></table></td><td></td></tr>");
		var yours = 0;
		if (answer['auth']) {
			addBlackRow(dict.ratemsg,6);
			var ratehtml = "<tr><td colspan=6><div class='rating' id='rating' onmouseout='rating_restore();' onload='rating_restore();'><input type='hidden' id='rating-result' value='0'><ul class='rating'>";
			for (var i=1;i<=5;i++) ratehtml += "<li class='rating' id='rating"+i+"' onmouseover='rating_show("+i+")' onclick='rating_store("+i+")'></li>";
			tablerows.push(ratehtml+"</ul></div></td></tr>");
            addBlackRow(dict.ratescale,6);
			addBlackRow("<div id='ratingfeedback'>What part(s) should we have predicted better?<div><textarea id='resultfeedback' rows=3 style='width:80%;background-color:rgba(192,192,192,0.9)'></textarea><div><input type='button' id='resultfeedbackbutton' value='Let us know!'></div>",6);
			track('/results/yours');
			yours = 1;
		} else {
			track('/results/notyours');
			yours = 0;
		}
		addSpacerRow(6);

		addBlackRow("<div style='line-height:30px'>New! Follow us on social media: &nbsp; <a href='https://twitter.com/BdsmTest' target='_blank'><img src='/css/twitter.png' width='30' height='30' style='vertical-align:middle;'></a> &nbsp; <a href='https://fetlife.com/BdsmTest' target='_blank'><img src='/css/fetlife3.png' width='30' height='30' style='vertical-align:middle;'></a><div>",6);
		
		//addBlackRow("<p style='margin-bottom:5px;'>Feel like doing something back for us? We rely on donations to stay online, so we could really use your support:</p>",6);
		//addBlackRow("<a href='https://www.paypal.com/donate/?hosted_button_id=MFSPZS44WM5G2'><img style='height:35px;' src='/css/paypal2.png' alt='Donate via PayPal'></a>",6);
		
		//addBlackRow("<a class='bigbutton' style='text-decoration:none;' href='/pdf/"+rid+"'><img style='width:18px; height:18px; vertical-align:middle;' src='/css/pdf.png' alt='PDF icon'>&nbsp;"+dict.pdfbutton+" &#9658;</a>",6);
		
		addSpacerRow(6);
		addSpacerRow(6);
		render("Test Results (id: <span style='font-variant: normal;'>"+rid+"</span>)","testresults-"+yours);
		$('#ratingfeedback').hide();
        $('#resultdate').html(answer['date']);
		$("#copypastearea").html(copytext+"\nhttp://bdsmtest.org/r/"+rid);
		var resultsText = $('#copypastearea').val();
		var resultsField = document.getElementById('copypastearea');
		var tenthResultIndex = nthIndex(resultsText,'\n',11);
		var urlIndex = resultsText.lastIndexOf('\n')+1;
		$('#resultfeedbackbutton').click(function(){
			safepost("/ajax/storeresultfeedback",{rauth:rauth,rating:$('#rating-result').val(),feedback:$('#resultfeedback').val()},function(){$('#ratingfeedback').html("<div style='color:#0B0'>Feedback successfully stored!</div>");});
		});
		$("#copyall").click(function(){
			createSelection(resultsField, 0, urlIndex);
			copyToClipboard();
			track('/results/copy/all');
			return false;
		});
		$("#copy10").click(function(){
			createSelection(resultsField, 0, tenthResultIndex);
			copyToClipboard();
			track('/results/copy/ten');
			return false;
		});
		$("#copyurl").click(function(){
			createSelection(resultsField, urlIndex, resultsText.length);
			copyToClipboard();
			track('/results/copy/url');
			return false;
		});
		$("#copyallandurl").click(function(){
			createSelection(resultsField, 0, resultsText.length);
			copyToClipboard();
			track('/results/copy/allandurl');
			return false;
		});
		rating_show($('#rating-result').val());
		//$('#resultdate').html(date);
		//$('#title').html(dict.resultstitle);
		//$('#redotext').html(dict.restartbutton);
		//resetRid();
		//resetTest();
		if (answer['auth']) testdata.complete=true;
		window.onbeforeunload = null;
	}
	safepost("/ajax/getresult",{uauth:uauth,rauth:rauth},displayResult,function(){delay(showResultPage);});
}
function showInfoPage() {
	//show basic info and the archetype that the test implements
	track('/info',dict.infoarch);
	addHeaderRow(dict.info);
	addBlackRow("<div class='longread'>"+dict.bdsmtestinfo1+"<ul><li>"+dict.bdsmtestinfoBD+"<li>"+dict.bdsmtestinfoDS+"<li>"+dict.bdsmtestinfoSM+"</ul>"+dict.bdsmtestinfo2+"<br>"+dict.bdsmtestinfoConsent+"</div>");
	addHeaderRow(dict.arch);
	addBlackRow("<div class='longread'>"+dict.bdsmtestinfoArchetypes+"</div>");
	var showtypes = [7,24,22,11,20,21,12,23,6,8,14,18,4,3,17,19,5,10,1,28,27,29,13,25,26];
	for (var i=0;i<showtypes.length;i++) {
		var a=showtypes[i];
		addBlackRow("<div class='longread'><div style='font-weight:bold; color:#CCC; text-align:center;'>"+dict.allarchetypes[a].name+"</div>"+dict.allarchetypes[a].description+"</div>");
	}
	render(undefined,"showInfoPage");
}
function showContactPage() {
	//show various reasons to contact (or not contact) and the email address(es)
	track('/contact',dict.abfqct);
	addHeaderRow(dict.about);
	addBlackRow("<p class='longread'>"+dict.bdsmtestabout+"</p>");
	addHeaderRow(dict.contact);
	addBlackRow("<div class='longread'>"+dict.bdsmtestcontact+"<div id='feedbackdiv'><textarea id='feedback' style='width:400px; height:120px;display:block;margin:0 auto;margin-top:10px;margin-bottom:10px;'></textarea><div style='padding:10px; text-align:center;'><input type='button' id='submitFeedback' class='bigbutton' value='"+dict.send+"'></div></div></div>");
	addHeaderRow(dict.faq);
	for (var i=1;i<=4;i++) {
		addBlackRow("<div class='longread'><div style='font-weight:bold;'>"+dict.faqlist['q'+i]+"</div><div style='font-style:italic'>"+dict.faqlist['a'+i]+"</div></div>");
	}
	render(undefined,"showContactPage");
	$("#submitFeedback").click(function(){
		safepost("/ajax/storecontact",{uauth:uauth,message:$('#feedback').val()},function(){$('#feedbackdiv').html("<div style='color:#0B0'>Feedback successfully stored!</div>");});
	});
}
function showPrivacyDeclaration() {
	//show various reasons to contact (or not contact) and the email address(es)
	track('/privacy',"Privacy Policy");
	addHeaderRow("Privacy Policy");
	addBlackRow("<p class='longread'>Bdsmtest.org values your privacy and the protection of your personally identifying information. In this privacy declaration, we want to provide clear and transparent information on how we collect, store and process your personal data. We do what we can to warrant your privacy and to deal correctly with your personal data, including compliance with the EU’s GDPR.<br><br>If, after reading this document, you are left with any questions regarding how we deal with your privacy, you can contact us at any time by email on bdsmtest.org@gmail.com with any questions or concerns you may have. However please keep in mind that bdsmtest.org is a near-zero budget, non-profit project. Everything about it is volunteers' work (including writing this document).</p>"); 
	addHeaderRow("Who is this text for?");
	addBlackRow("<div class='longread'>This privacy declaration is applicable to all current and future users of the website, who leave behind personally identifiable information, as well as everyone contacting us via other methods (email, social media, etc.)</div>");
	addHeaderRow("What personal information do we process/store?");
	addBlackRow("<div class='longread'><ul><li>All information explicitly passed on by you (your email address if you make an account or sign up for a mailinglist, answers given to test questions, etc.) as well as non-personally-identiable data computable from that (your test results, time it took you to complete the test, etc.)<li>All information implicit in your connection (the current time, your ip adress, etc.) as well as non-personally-identiable data computable from that (the country you’re browsing from, the type of device you’re using, etc.)<li>Any data that you happen to pass to us when contacting us via email, social media or other channels.</ul></div>");
	addHeaderRow("Why do we process/store this?");
	addBlackRow("<div class='longread'><ul><li>In case of email, we collect this to uniquely identify you as a user, and to send occasional emails if you sign up for our mailinglists.<li>For other data, we collect this to ensure the proper functioning of the test, both to serve and host your results, as well as to sustain our quality control to improve the test taking experience for future users.<li>In case of email and social media traffic, this is mainly a side effect of the platforms at hand (as is the case with anyone communicating to another human being via email or social media).</ul></div>");
	addHeaderRow("Who has access to your data? ");
	addBlackRow("<div class='longread'>We fully rely on external parties for our technical needs:<ul><li>Our web hosting company (currently Versio) has access to all data except for our email traffic and social media conversations.<li>Our email web applications (currently Gmail) have access to all our non-automated email traffic.<li>Each social media website has access to the conversations on their platform.<li>Our cloud storage solution (currently Dropbox) has access to the database backups that we regularly make as part of the website’s maintenance.<li>Our web analytics solution (currently Google Analytics) has access to all connection-based and device-based information that it tracks; the same holds for our anti-bot mechanism (currently Invisible Recaptcha); the same holds for the company behind every advertisement that we show you.<li>And so on... </ul>We do not provide direct access by third parties to your data, unless mandated by law. If we ever do marketing of some sort (e.g. in exchange for sponsorship to sustain our development), we intend to do this ourselves so that we don’t need to pass on your personal information to third parties (or if we really need to, we'll make sure to have the right contractual guarantees about the safety of said data). We can occasionally send anonymized data to third parties for statistical analysis. We do not keep personally identifying information for more than 10 years after its last usage.</div>");
	addHeaderRow("What security measures are in place?");
	addBlackRow("<div class='longread'>We believe we use more than reasonable security mechanisms to the standards of a near-zero-budget hobby project.<ul><li>We use encrypted https traffic wherever we can.<li>We use ssh to connect to the server whenever we can.<li>We use strong or randomized passwords that are difficult to guess.<li>We use an antivirus+firewall on all computers that access the website’s data or store backups of this data, and encrypt the computers’ hard drive to secure the data in case of loss or theft.<li>We have traps in place to detect a potential data breach (e.g. email addresses not used for any other purposes -- if these start receiving spam, we know that data has leaked).<li>We immediately change all relevant passwords should we become aware of any risk (e.g. a stolen phone while logged in to an bdsmtest-related email account).</ul>Should an incident occur involving your personally identifying data, then we will personally inform you as prescribed by the law.</div>");
	addHeaderRow("Legal rights");
	addBlackRow("<div class='longread'>If at some point you want to retract your consent to have us store this personally identifiable information, please send us an email to bdsmtest.org@gmail.com, from the email associated to your account, requesting to delete or anonymize your data, and we will do so. We will gladly assist you in requesting, correcting or deleting any personally identifyiable records that we have stored about you. Also for our mailing lists, you can at any time ask what mailing lists you are currently on, modify your subscription, and/or have your email address deleted from our database altogether. All of this via bdsmtest.org@gmail.com as usual.</div>");
	addHeaderRow("Complaints");
	addBlackRow("<div class='longread'>Should you have any complaints of any kind, we welcome them at bdsmtest.org@gmail.com and we will do our best to address them. Alternatively, you can file a complaint with your local privacy commission.</div>");
	addHeaderRow("Updates");
	addBlackRow("<div class='longread'>We can update this privacy policy at any time. However, the latest version can always be found at this very url.</div>");
	addHeaderRow("Recaptcha");
	addBlackRow("<div class='longread'>Since Google's Recaptcha puts this as a requirement, we hereby also link you to their <a href='https://policies.google.com/terms?hl=en'>Terms</a> and <a href='https://policies.google.com/privacy?hl=en'>Privacy policy</a>, which you must also accept in order to use this website.</div>");
	render(undefined,"showPrivacyDeclaration");
}
$(document).ready(function() {
	resetAuth();
	resetRid();
	resetTest();
	common();
	$('#desc').hide();
    TimeMe.initialize({currentPageName: "bdsmtest-org-main", idleTimeoutInSeconds: 15});
	$('#menu1').html(dict.startnewtest);
	$('#menu2').html(dict.loginreg);
	$('#menu3').html(dict.infoarch);
	$('#menu4').html(dict.abfqct);
});