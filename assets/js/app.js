$(function(){
	console.log("App Loaded.");
	app.init();
});



var app = {
	
	modal: undefined,
	editMode: false,
	stashQuote: undefined,

	loadAllQuotes: function() {
		var _this=this;
		$.get('/get_quotes',function(data){
			data.forEach(function(row){
				_this.renderSection(row.id,row.quote,row.source,row.type);
			});
		});
	},

	submitQuote: function() {
		var _this=this;
		var data = {};
		data.quote = $('#new-quote').val();
		data.source= $('#new-source').val();
		data.type= $('#new-source-type').val();
		console.log(data.quote + ", " + data.source + ", " + data.type);
		if (data.quote && data.source) {
			$.post('/add_quote', data, function(id) {
				console.info('Added row: ' + id);
				_this.renderSection(id, data.quote, data.source, data.type);
			});
		} else {
			console.warn("Either the source or quote is empty.");
		}		
	},

	deleteQuote: function (quote) {
		var _this=this;
		var elementId=quote.attr('id');
		console.log("Delete event triggered on: "+elementId);
		var dataId = elementId.slice(6);
		$.ajax({
			    url: '/delete_quote/'+dataId,
			    type: 'DELETE',
			    success: function(result) {
			      console.info("Deleted " + result + " row(s).");
			      _this.unpinSection(quote);			      
			    }
			});		
	},

	updateQuote: function() {
		var _this=this;
		this.editMode=false;
		var elementId=this.stashQuote.attr('id');
		console.log("Edit event triggered on: "+elementId);
		var dataId = elementId.slice(6);
		
		var data = {};
		data.quote = $('#new-quote').val();
		data.source= $('#new-source').val();
		data.type= $('#new-source-type').val();
		console.log(data.quote + ", " + data.source + ", " + data.type);
		if (data.quote && data.source) {
			$.ajax({
			    url: '/update_quote/'+dataId,
			    type: 'PUT',
			    data: data,
			    success: function(result) {
			      console.info("Updated " + result + " row(s).");
			      _this.unpinSection(_this.stashQuote);
			      _this.renderSection(dataId, data.quote, data.source, data.type);
			    }
			});
		} else {
			console.warn("Either the source or quote is empty.");
		}
	},

	editQuote: function (quote) {
		this.stashQuote=quote;
		$('#new-quote').val(quote.find('.quote').text());
		var source=quote.find('.source').text().trim();
		var source_type=undefined;
		if(source.lastIndexOf(")")==source.length-1 && source.lastIndexOf("(")>0) {
			source_type = source.slice(source.lastIndexOf("(")+1, source.length-1);
			source=source.substr(0,source.lastIndexOf("(")).trim();
		}
		$('#new-source').val(source);
		$('#new-source-type').val(source_type);

		this.modal.open();
		this.editMode=true;
	},

	modalConfig: function() {
		this.modal = new AnimatedModal({
						    color: 'rgb(57, 190, 185)',
							animatedIn: 'bounceInUp', 
							animatedOut: 'bounceOutDown',
							closeBtn: '.close-modal', 
							modalTarget: 'animated-modal'
						});
	},

	attachEvents: function() {
		var _this=this;
		$('.add-quote').click(function(){
			_this.editMode=false;
			_this.clearModal();
			_this.modal.open();
		});
		$('#submit-quote').click(function(){
			_this.modal.close();
			if (_this.editMode) {
				_this.updateQuote();
			} else {
				_this.submitQuote();
			}
		});
		$('main>article').on('click','>section .delete',function() {
			_this.deleteQuote($(this).parents("section"));
		});
		$('main>article').on('click','>section .edit',function() {
			_this.editQuote($(this).parents("section"));
		});
	},

	renderSection: function(id,quote,source,type) {
		var html = new Array();
		html.push("<section class='animated bounceInDown' id='quote_"+id+"'><blockquote>");
		html.push("<div class='quote'>"+quote+"</div>");
		html.push("<div class='source-container'>— <span class='source'>"+source);
		if (type) { html.push(" ("+type+")");}
		html.push("</div></blockquote>");
		html.push("<aside class='button-panel animated'><button class='blue delete'><span>✖</span></button> <button class='green edit'><span>✎</span></button></aside>");
		html.push("</section>");
		this.pinSection(html.join(""));
	},

	pinSection: function(sectionHtml) {
		$('main>article').prepend(sectionHtml);
	},

	unpinSection: function (section) {
		section.addClass('bounceOutLeft'); 
		setTimeout(function() {			// setTimeout is more efficent than jQuery's remove or queueRemove.
			section.remove();
		},800);
	},

	clearModal: function(argument) {
		$('#new-quote').val("");
		$('#new-source').val("");
		$('#new-source-type').val("");
	},

	init: function() {
		this.loadAllQuotes();
		this.modalConfig();
		this.attachEvents();
	},
};