"use strict";var onRightEdge,onBottomEdge,onLeftEdge,onTopEdge,rightScreenEdge,bottomScreenEdge,preSnapped,b,x,y,e,minWidth=60,minHeight=40,FULLSCREEN_MARGINS=-10,MARGINS=4,clicked=null,redraw=!1,pane=document.getElementById("r2resize-windowcard-pane"),ghostpane=document.getElementById("r2resize-windowcard-ghostpane");function setBounds(e,n,t,i,o){e.style.left=n+"px",e.style.top=t+"px",e.style.width=i+"px",e.style.height=o+"px"}function hintHide(){setBounds(ghostpane,b.left,b.top,b.width,b.height),ghostpane.style.opacity=0}function onTouchDown(e){onDown(e.touches[0]),e.preventDefault()}function onTouchMove(e){onMove(e.touches[0])}function onTouchEnd(e){0==e.touches.length&&onUp(e.changedTouches[0])}function onMouseDown(e){onDown(e),e.preventDefault()}function onDown(e){calc(e);var n=onRightEdge||onBottomEdge||onTopEdge||onLeftEdge;clicked={x:x,y:y,cx:e.clientX,cy:e.clientY,w:b.width,h:b.height,isResizing:n,isMoving:!n&&canMove(),onTopEdge:onTopEdge,onLeftEdge:onLeftEdge,onRightEdge:onRightEdge,onBottomEdge:onBottomEdge}}function canMove(){return 0<x&&x<b.width&&0<y&&y<b.height&&y<30}function calc(e){b=pane.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top,onTopEdge=y<MARGINS,onLeftEdge=x<MARGINS,onRightEdge=x>=b.width-MARGINS,onBottomEdge=y>=b.height-MARGINS,rightScreenEdge=window.innerWidth-MARGINS,bottomScreenEdge=window.innerHeight-MARGINS}function onMove(n){calc(n),e=n,redraw=!0}function animate(){var n;if(requestAnimationFrame(animate),redraw)return redraw=!1,clicked&&clicked.isResizing?(clicked.onRightEdge&&(pane.style.width=Math.max(x,minWidth)+"px"),clicked.onBottomEdge&&(pane.style.height=Math.max(y,minHeight)+"px"),clicked.onLeftEdge&&(n=Math.max(clicked.cx-e.clientX+clicked.w,minWidth),minWidth<n&&(pane.style.width=n+"px",pane.style.left=e.clientX+"px")),clicked.onTopEdge&&(n=Math.max(clicked.cy-e.clientY+clicked.h,minHeight),minHeight<n&&(pane.style.height=n+"px",pane.style.top=e.clientY+"px")),void hintHide()):clicked&&clicked.isMoving?(b.top<FULLSCREEN_MARGINS||b.left<FULLSCREEN_MARGINS||b.right>window.innerWidth-FULLSCREEN_MARGINS||b.bottom>window.innerHeight-FULLSCREEN_MARGINS?(setBounds(ghostpane,0,0,window.innerWidth,window.innerHeight),ghostpane.style.opacity=.2):b.top<MARGINS?(setBounds(ghostpane,0,0,window.innerWidth,window.innerHeight/2),ghostpane.style.opacity=.2):b.left<MARGINS?(setBounds(ghostpane,0,0,window.innerWidth/2,window.innerHeight),ghostpane.style.opacity=.2):b.right>rightScreenEdge?(setBounds(ghostpane,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight),ghostpane.style.opacity=.2):b.bottom>bottomScreenEdge?(setBounds(ghostpane,0,window.innerHeight/2,window.innerWidth,window.innerWidth/2),ghostpane.style.opacity=.2):hintHide(),preSnapped?void setBounds(pane,e.clientX-preSnapped.width/2,e.clientY-Math.min(clicked.y,preSnapped.height),preSnapped.width,preSnapped.height):(pane.style.top=e.clientY-clicked.y+"px",void(pane.style.left=e.clientX-clicked.x+"px"))):void(onRightEdge&&onBottomEdge||onLeftEdge&&onTopEdge?pane.style.cursor="nwse-resize":onRightEdge&&onTopEdge||onBottomEdge&&onLeftEdge?pane.style.cursor="nesw-resize":onRightEdge||onLeftEdge?pane.style.cursor="ew-resize":onBottomEdge||onTopEdge?pane.style.cursor="ns-resize":canMove()?pane.style.cursor="move":pane.style.cursor="default")}function onUp(e){calc(e),clicked&&clicked.isMoving&&(e={width:b.width,height:b.height},preSnapped=b.top<FULLSCREEN_MARGINS||b.left<FULLSCREEN_MARGINS||b.right>window.innerWidth-FULLSCREEN_MARGINS||b.bottom>window.innerHeight-FULLSCREEN_MARGINS?(setBounds(pane,0,0,window.innerWidth,window.innerHeight),e):b.top<MARGINS?(setBounds(pane,0,0,window.innerWidth,window.innerHeight/2),e):b.left<MARGINS?(setBounds(pane,0,0,window.innerWidth/2,window.innerHeight),e):b.right>rightScreenEdge?(setBounds(pane,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight),e):b.bottom>bottomScreenEdge?(setBounds(pane,0,window.innerHeight/2,window.innerWidth,window.innerWidth/2),e):null,hintHide()),clicked=null}pane.addEventListener("mousedown",onMouseDown),document.addEventListener("mousemove",onMove),document.addEventListener("mouseup",onUp),pane.addEventListener("touchstart",onTouchDown),document.addEventListener("touchmove",onTouchMove),document.addEventListener("touchend",onTouchEnd),animate();
