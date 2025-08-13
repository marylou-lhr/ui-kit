document.addEventListener("DOMContentLoaded", function()
{
	var first_name_input = document.getElementById("first-name");
	var first_name_hint = document.getElementById("first-name").nextElementSibling;

	var last_name_input = document.getElementById("last-name");
	var last_name_hint = document.getElementById("last-name").nextElementSibling;

	var email_input = document.getElementById("email");
	var email_hint = document.getElementById("email").nextElementSibling;

	var pwd_input = document.getElementById("pwd");
	var pwd_hint = document.getElementById("pwd").nextElementSibling;

	var confirm_pwd_input = document.getElementById("confirm-pwd");

	var btn = document.getElementById("signup-btn");

	var form = document.getElementById("signup-form");

	const EMAIL_REGEX = /^[a-z0-9._-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})$/;
	const PWD_REGEX = /^(?=.*[^\w\s])([^\s]){8,16}$/;

	updBtnState();

	first_name_input.addEventListener("keyup", function()
	{
		updBtnState();

		if (!aboveThreeChars(first_name_input.value))
		{
			showError(first_name_input, first_name_hint);
		}
		else if (aboveThreeChars(first_name_input.value)) {
			showSuccess(first_name_input, first_name_hint);
		}
	});

	last_name_input.addEventListener("keyup", function()
	{
		updBtnState();

		if (!aboveThreeChars(last_name_input.value))
		{
			showError(last_name_input, last_name_hint);
		}
		else if (aboveThreeChars(last_name_input.value)) {
			showSuccess(last_name_input, last_name_hint);
		}
	});

	email_input.addEventListener("keyup", function()
	{
		updBtnState();

		let email_is_valid = emailValid(email_input.value, EMAIL_REGEX);
		if (!email_is_valid)
		{
			showError(email_input, email_hint);
		}
		else {
			showSuccess(email_input, email_hint);
		}
	});

	pwd_input.addEventListener("keyup", function()
	{
		updBtnState();

		let pwd_is_valid = pwdValid(pwd_input.value, PWD_REGEX);
		if (!pwd_is_valid)
		{
			showError(pwd_input, pwd_hint);
		}
		else {
			showSuccess(pwd_input, pwd_hint);
		}
	});

	confirm_pwd_input.addEventListener("keyup", function()
	{
		updBtnState();

		let pwds_are_the_same = sameStr(pwd_input.value, confirm_pwd_input.value);

		if (!pwds_are_the_same)
		{
			showError(confirm_pwd_input, null);
		}
		else
		{
			showSuccess(confirm_pwd_input, null);
		}
	});

	function updBtnState()
	{
		let first_name_ok = aboveThreeChars(first_name_input.value);
		let last_name_ok = aboveThreeChars(last_name_input.value);
		let email_ok = emailValid(email_input.value, EMAIL_REGEX);
		let pwd_ok = pwdValid(pwd_input.value, PWD_REGEX);
		let same_pwds_ok = sameStr(pwd_input.value, confirm_pwd_input.value);

		if (first_name_ok && last_name_ok && email_ok && pwd_ok && same_pwds_ok) btn.disabled = false;
		else btn.disabled = true;
	}

	form.addEventListener("submit", function (event)
	{
		event.preventDefault();

		let msgbox = document.getElementById("msg-box");

		msgbox.innerHTML =
		'<div class="message-box success"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>An email has been sent.</div>';
	});

});



function aboveThreeChars(str)
{
	return str.length >= 3;
}

function pwdValid(pwd, regex)
{
	let pwd_valid = regex.test(pwd);

	return pwd_valid;
}

function sameStr(str1, str2)
{
	if (str1.length > 0 && str2.length > 0) return str1 === str2;
	else return false;
}

function emailValid(email, regex)
{
	let email_valid = regex.test(email);

	return email_valid;
}

function showError(input, hint)
{
	input.classList.add("signup__input--err");
	input.classList.remove("signup__input--ok");

	if (hint)
	{
		hint.classList.add("signup__input--err__hint");	
	}
	
}

function showSuccess(input, hint)
{
	input.classList.remove("signup__input--err");
	input.classList.add("signup__input--ok");

	if (hint)
	{
		hint.classList.remove("signup__input--err__hint");
	}
	
}