/*
    Copyright 2012 Miguel Cervera

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var freeToGo = true;
var stories, aux;
var current_element = -1;
var pathname;
localStorage['close'] = "false";

function findClosestElementUp(){
  if($(stories[current_element]).offset().top < $(document).scrollTop())
    while($(stories[current_element]).offset().top < $(document).scrollTop())
      current_element++;
  else if($(stories[current_element]).offset().top > $(document).scrollTop()+$(document).height())
    while($(stories[current_element]).offset().top > $(document).scrollTop()+$(document).height())
      current_element--;
}

function findClosestElementDown(){
  if($(stories[current_element]).offset().top > $(document).scrollTop())
    while($(stories[current_element]).offset().top > $(document).scrollTop())
      current_element--;
  else if($(stories[current_element]).offset().top < $(document).scrollTop()-$(stories[current_element]).height())
    while($(stories[current_element]).offset().top < $(document).scrollTop()-$(stories[current_element]).height())
      current_element++;
}

$("html").live('mousemove', function(){
  onReloadActions();
});

function onReloadActions(){
  fixHomeScreen();
  reloadStories();
  fixFontSize();
}

function fixHomeScreen(){
  if(localStorage['close'] == "true"){
    $('#contentArea').width(770);
    $('#rightCol').hide();
    $('.shareRedesign').width('100%');
    $('.uiUfi').width('100%');
  }else{
    $('#contentArea').width('');
    $('#rightCol').show();
    $('.shareRedesign').width(398);
    $('.uiUfi').width('');
  }
}

function reloadStories() {
  if(pathname != document.location.pathname){
    current_element = -1;
    pathname = document.location.pathname;
  }
  stories = $(".uiStreamStory");
  if(stories.length == 0){
    stories = $(".fbTimelineUnit")
  }
}

function fixFontSize(){
  $(".uiStreamRedesign, .uiStreamMessage, .messageBody, .uiMetaComposerMessageBox").css("font-size","11px");
}

$("textarea, input[type=text], .fbNubFlyoutFooter .inputContainer textarea, .uiTextareaAutogrow").live('focus', function(event){
    freeToGo = false;
  });

  $("textarea, input[type=text], .fbNubFlyoutFooter .inputContainer textarea, .uiTextareaAutogrow").live('blur', function(event){
    freeToGo = true;
  });

$(document).ready(function(){
  pathname = document.location.pathname;
  reloadStories();
  
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-32529446-1']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
  fixHomeScreen();
  /*
  j=106,74
  k=107,75
  l=108,76
  u=117
  c=99
  t=116
  b=98
  p=112
  h=104
  */
  $(window).keydown(function(event){
    var offs = 100;
    if(document.location.pathname.length <= 1){
      offs=50;
    }
//    alert(offs); 
//    alert(event.which);
    if(freeToGo){
      switch(event.keyCode){
        case 76:
        case 108:
          if($(stories[current_element]).find(".like_link .default_message").html() == "Like")
            $(stories[current_element]).find(".like_link").click();
        break;
        case 85:
        case 117:
          if($(stories[current_element]).find(".like_link .default_message").html() == "Unlike")
            $(stories[current_element]).find(".like_link").click();
        break;
        case 67:
        case 99:
          $(stories[current_element]).find(".comment_link input").click();
          return false;
        break;
        case 75:
        case 107:
          $(stories[current_element]).css("background-color", "white");
          reloadStories();
          if(current_element > 0){
            current_element--;
            findClosestElementDown();
            $(stories[current_element]).css("background-color", "#D8DFEA");
            $('html, body').animate({
             scrollTop: $(stories[current_element]).offset().top-offs
            }, 150);
          }
        break;
        case 74:
        case 106:
          $(stories[current_element]).css("background-color", "white");
          reloadStories();
          if(current_element < stories.length){
            current_element++;
            findClosestElementUp();
            $(stories[current_element]).css("background-color", "#D8DFEA");
            $('html, body').animate({
             scrollTop: $(stories[current_element]).offset().top-offs
            }, 150);
          }
        break;
        case 66:
        case 98:
          $(stories[current_element]).css("background-color", "white");
          reloadStories();
          current_element = stories.length-1;
          $(stories[current_element]).css("background-color", "#D8DFEA");
          $('html, body').animate({
           scrollTop: $(stories[current_element]).offset().top-offs
          }, 500);
        break;
        case 84:
        case 116:
          $(stories[current_element]).css("background-color", "white");
          reloadStories();
          aux = current_element;
          current_element = 0;
          $(stories[current_element]).css("background-color", "#D8DFEA");
            $('html, body').animate({
             scrollTop: $(stories[current_element]).offset().top-offs
            }, 500);
        break;
        case 80:
        case 112:
          window.location.replace("http://www.facebook.com/profile.php");
        break;
        case 72:
        case 104:
          if(document.location.pathname.length > 1)
            window.location.replace("http://www.facebook.com/");
        break;
        case 39:
          localStorage['close'] = localStorage['close'] != "true";
          fixHomeScreen();
        break;
      }
    }
  });
});

