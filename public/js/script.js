"use strict";var startTimeout=750,codeLength=6;function joinLobby(t){var s=$(".code-input");$.ajax({type:"POST",url:t.attr("action"),data:t.serialize(),success:function(t){t.success?(s.addClass("success").prop("disabled",!0),$(".code-submit").addClass("hide")):s.hasClass("fail")?(s.removeClass("fail"),setTimeout(function(){s.addClass("fail")},300)):s.addClass("fail")}})}$(".refresh").click(function(){location.reload()}),$(".main-btn").click(function(){$(".start-btns").addClass("swipe"),setTimeout(function(){$(".start-btns").css({display:"none"})},startTimeout)}),$(".host-btn").click(function(){$.get("/new-lobby",function(t){$(".code").text(t.code).focus()}),setTimeout(function(){$(".host-menu").addClass("jump").css("display","block")},startTimeout)}),$(".join-btn").click(function(){setTimeout(function(){$(".join-menu").addClass("jump").css("display","block"),$(".code-input").focus()},startTimeout)}),$(".code-input").on("input",function(t){var s=$(t.currentTarget),e=s.parent(),n=s[0].value;n.length>codeLength?s.addClass("fail"):n.length<codeLength?s.removeClass("fail"):joinLobby(e)}),$(".join-menu form").submit(function(t){t.preventDefault(),joinLobby($(t.currentTarget)),$(".code-submit").blur()});