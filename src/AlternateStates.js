/*global define */

define(["jquery", "qlik"], function($, qlik) {
	function createBtn(cmd, text) {
		return '<button class="qirby-button" style="font-size:13px;" data-cmd="' + cmd + '">' + text + '</button>';
	}

	return {
		initialProperties : {
			version : 1.0			
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
			}
		},
		paint : function($element, layout) {
			$element.css('overflow', 'auto');
		  	var self = this;
			var html = '';
		    var app = qlik.currApp(this);
		  
		  	html += '<div class="qirby-buttongroup">';		  	
		 	html += '<input class="qirby-input" type="text" id="altStateName" value="" name"altStateName"/>';
		    html += createBtn("addAltState", "Add");
		  	html += '</div>';
		  
		    html += '<div class="qirby-buttongroup">';
		    html += '<select class="qirby-select" id="altStates">';
		  
		    var getLayoutPromise = app.getAppLayout();
		  
			getLayoutPromise.then(function(layout){			 
			  $.each(layout.qStateNames, function(key, value) {						
				html += "<option value='" + value + "'>" + value + "</option>";
			  });
			});
			 
			getLayoutPromise.finally(function(){			 
			  html += '</select>';
			  html += createBtn("removeAltState", "Remove");			
			  $element.html(html);
			  
			  $element.find('button').on('qv-activate', function() {
				switch($(this).data('cmd')) {					
					case 'addAltState':
						app.addAlternateState($element.find("#altStateName").val());
						app.doSave().then(function(){
						  self.paint($element, layout);
						});						
						break;
					case 'removeAltState':
						app.removeAlternateState($element.find("#altStates").val());
						app.doSave().then(function(){
						  self.paint($element, layout);
						});	
						break;
				}
			  });
			});	
		}
	};
});
