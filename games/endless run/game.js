
	var canvas     = document.getElementById('canvas'),
	    canvas2	   = document.getElementById('canvas2'),
	    canvas3	   = document.getElementById('canvas3'),
		ctx	       = canvas.getContext('2d'),
		ctx2	   = canvas2.getContext('2d'),
		ctx3	   = canvas3.getContext('2d'),
		BgImg      = new Image(),
		BgImgB     = new Image(),
		BgF    	   = new Image(),
		BgFB       = new Image(),
		BgFC       = new Image(),
		BgM    	   = new Image(),
		BgMB       = new Image(),
		BgMC       = new Image(),
		BgSp       = new Image(),
		BgSpB      = new Image(),
		BgSpC      = new Image(),
		dg         = new Image(),
		topOb      = new Image();
		botOb      = new Image();
		topOb2     = new Image();
		botOb2     = new Image();
		xdg        = 0,
		ydg        = 0,
		ytdg       = 200,
		xA         = 0;
		xB         = 800,
		xC         = 1600,
		xOA		   = 1000,
		xOB        = 1800,
		xOC 	   = 2600, 
		xBgB       = 800,
		xBgA       = 0,
		score      = 0,

		/*Variable Source Image*/
		BgImg.src  = 'background/bg_back_A.png';
		BgImgB.src = 'background/bg_back_B.png';
		BgF.src    = 'background/bg_front_ground_A.png';
		BgFB.src   = 'background/bg_front_ground_B.png';
		BgFC.src   = 'background/bg_front_ground_C.png';
		BgM.src    = 'background/bg_middle_A.png';
		BgMB.src   = 'background/bg_middle_B.png';
		BgMC.src   = 'background/bg_middle_C.png';
		BgSp.src   = 'background/bg_superfront_A.png';
		BgSpB.src  = 'background/bg_superfront_B.png';
		BgSpC.src  = 'background/bg_superfront_C.png';
		botOb.src  = 'obstacle/obs_btm_B.png';
		topOb.src  = 'obstacle/obs_top_A.png';
		botOb2.src = 'obstacle/obs_btm_A.png';
		topOb2.src = 'obstacle/obs_top_B.png';
		dg.src     = 'dragon.png';

		/*Function For Keydown and Keyup*/
		var Keys = {
	        up: false,
	        down: false,
	        left: false,
	        right: false
	    };

	    window.onkeydown = function (e) {
	        var kc = e.keyCode;
	        e.preventDefault();
	        if      (kc === 37) Keys.left = true;
	        else if (kc === 38) Keys.up = true;
	        else if (kc === 39) Keys.right = true;
	        else if (kc === 40) Keys.down = true;
	    };

	    window.onkeyup = function (e) {
	        var kc = e.keyCode;
	        e.preventDefault();
	        if      (kc === 37) Keys.left = true;
	        else if (kc === 38) Keys.up = true;
	        else if (kc === 39) Keys.right = true;
	        else if (kc === 40) Keys.down = true;
	    };

		window.onload = function()
		{
			/*Draw First Layer Canvas (Background and Obstacle)*/
			function drawLayerOne()
			{
				setInterval(function(){
					score++;
				}, 500);

				setInterval(function(){
					xBgA -= .5;
					xBgB -= .5;
					xA   -= 2;
					xB   -= 2;
					xC   -= 2;
					xOA  -= 2;
					xOB  -= 2;
					xOC  -= 2;

					/*setInterval(function(){
						xA   -= 2;
						xB   -= 2;
						xC   -= 2;
					}, 4000);*/

					if (xC == 0) {
						xA  = 800;
						xB  = 1600;
					}

					if (xOC == 0) {
						xOA = 1800 + Math.floor(Math.random() * 300);
						xOB = 2600 + Math.floor(Math.random() * 300);
					}

					if (xA == 0) {
						xB = 800;
						xC = 1600;

					}

					if (xOA == 0) {
						xOB = 1800 + Math.floor(Math.random() * 300);
						xOC = 2600 + Math.floor(Math.random() * 300);
					}

					if (xBgA == 0) {
						xBgB = 800;
					}

					if (xBgB == 0) {
						xBgA = 800;
					}



					ctx.drawImage(BgImg, xBgA, 0);
					ctx.drawImage(BgImgB, xBgB, 0);
					ctx.drawImage(BgM, xA, 0);
					ctx.drawImage(BgMB, xB, 0);
					ctx.drawImage(BgMC, xC, 0);

					ctx.drawImage(topOb2, xOA, 25);
					ctx.drawImage(topOb, xOB, 25);
					ctx.drawImage(topOb2, xOC, 25);

					ctx.drawImage(BgSp, xA, 0);
					ctx.drawImage(BgSpB, xB, 0);
					ctx.drawImage(BgSpC, xC, 0);

					ctx.drawImage(botOb2, xB, 245);

					ctx.drawImage(BgF, xA, -30);
					ctx.drawImage(BgFB, xB, -30);
					ctx.drawImage(BgFC, xC, -30);

					ctx.drawImage(botOb, xA, 245);
					ctx.drawImage(botOb, xC, 245);

					ctx.font = "24px Arial";
					ctx.fillStyle = 'white';
					ctx.fillText('Life : 3', 10, 25);
					ctx.fillText('Score : ' + score, 100, 25);

				});
			}

			/*Draw Second Layer (Dragon)*/
			function drawLayerTwo()
			{
				if (Keys.up) {
					
				}

				var terbang = setInterval(function(){
					xdg += 260;

					if (xdg == 1560) {
						xdg = 0;
						
						if (ydg == 0) {
							ydg = 260;
						} else if (ydg == 260) {
							ydg = 0;
						}
					}

					ctx2.clearRect(0,0,canvas2.width,canvas2.height);
					ctx2.drawImage(dg, xdg, ydg, 255, 255, 100, ytdg, 100, 100);
				}, 50);
			}

			function drawLayerThree()
			{
				
			}

			drawLayerThree();
			drawLayerOne();
			drawLayerTwo();
		}

			