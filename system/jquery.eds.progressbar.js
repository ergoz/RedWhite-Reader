/*
 * <div class="progressbar"><div></div><span>0%</span></div>	
 * Функции для создания прогресс бара
 * Styles: 
.progressbar 
{
	position: relative;
	height: 24px;
	border: 1px solid #494949;
	background: #444;	

	border-radius: 5px;
	-o-border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;

	box-shadow: 0px 1px 3px #222;
	-o-box-shadow: 0px 1px 3px #222;
	-moz-box-shadow: 0px 1px 3px #222;
	-webkit-box-shadow: 0px 1px 3px #222;
}

.progressbar div
{
	width: 0%;
	height: 100%;
	background-color: #369;
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #37a), color-stop(1, #369));
	overflow: hidden;

	margin: -1px;
	border: 1px solid #37c;

	border-radius: 4px; 
	-o-border-radius: 4px;
	-moz-border-radius: 4px;
	-webkit-border-radius: 4px;
}

.progressbar span
{
	display: block; width: 100%;
	text-align: center;
	font-size: 13px; font-family: Tahoma, Arial; font-weight: bold;
	color: #eee; 
	text-shadow: 0px 1px 0px #333;
	position: absolute; top: 0;
	line-height: 24px;
} 
 */
	 
 function set_progress(percent) {
	 $(".progressbar div").css("width",percent);
	 $(".progressbar span").html(percent+"%"); 
 }