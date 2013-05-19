apiKey = 'SEBNTL8YHEZDY7UBN';

var sandID = 'TRXDVZO13EB6B41679';
var sandURL = 'audio/sandman.mp3';

var comeID = 'TRSLJZD13EB9329250';
var comeURL = 'audio/come.mp3'

var beatID = 'TRYRRZY13EB6B14F6C';
var beatURL = 'audio/beat.mp3'


function Remixer() {

	this.remixers = {};
	this.players = {};
	this.tracks = {};
	
	tracks = this.tracks
	remixers = this.remixers
	players = this.players
	
	this.playQuantum = function(type,track,index) {
		
		if(type=="bar") {
			players[beatID].queue(tracks[track].analysis.bars[index])
		}
		else if(type=="beat") {
			players[beatID].queue(tracks[track].analysis.beats[index])
		}
		else if(type=="tatum") {
			players[beatID].queue(tracks[track].analysis.tatums[index])
		}    
	}
	
	this.playQuanta = function(type,track,start,end) {
		for(var i=start; i<end; i++) {
			if(type=="bar") {
				players[beatID].queue(tracks[track].analysis.bars[i])
			}
			else if(type=="beat") {
				players[beatID].queue(tracks[track].analysis.beats[i])
			}
			else if(type=="tatum") {
				players[beatID].queue(tracks[track].analysis.tatums[i])
			}  
		}  
	}
	
	this.playThrice= function(type,track,start,end) {
		this.playQuanta(type,track,start,end);
		this.playQuanta(type,track,start,end);
		this.playQuanta(type,track,start,end);
	}
	
	this.playQueue = function(queue){
		console.log(queue)
		for (var i=0; i<queue.length; i++) {
			console.log(queue[i])
			playQuantum(queue[i][0],queue[i][1],queue[i][2])	
		}
	}
	
	this.init = function() {
	    if (window.webkitAudioContext === undefined) {
	        error("Sorry, this app needs advanced web audio. Your browser doesn't"
	            + " support it. Try the latest version of Chrome");
	    } else {
	        var context = new webkitAudioContext();
	        
	        beatmixer = createJRemixer(context, $, apiKey);
	        comemixer = createJRemixer(context, $, apiKey);
	        sandmixer = createJRemixer(context, $, apiKey);
	        $("#info").text("Loading analysis data...");
	
			
			function initRemix(trackID, trackURL) {
					remixer = createJRemixer(context, $, apiKey);
					player = remixer.getPlayer();
					players[trackID] = player
		        	remixer.remixTrackById(trackID, trackURL, function(t, percent) {
		            tracks[trackID] = t;
		
		            $("#info").text(percent + "% of the track loaded");
		            if (percent == 100) {
		                $("#info").text(percent + "% of the track loaded, remixing...");
		            }
		
		            if (t.status == 'ok') {
		                $("#bars").text("The track has " + t.analysis.bars.length + " bars");
		                $("#beats").text("The track has " + t.analysis.beats.length + " beats");
		                $("#info").text("Remix complete!");
		            }
		            
		        	}) 
		        	remixers[trackID] = remixer;
	       		}
	       		initRemix('TRXDVZO13EB6B41679','audio/sandman.mp3')
	       		initRemix('TRSLJZD13EB9329250','audio/come.mp3')
	       		initRemix('TRYRRZY13EB6B14F6C','audio/beat.mp3')
	   		}
	   		
	  }
}	 
