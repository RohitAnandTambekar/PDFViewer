
 /*
 *  costanti per i placaholder 
 */
var maxPDFx = 595;
var maxPDFy = 842;
var offsetY = 7;

npage=1;
var pdf=null;
 
'use strict';


// The workerSrc property shall be specified.
//
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.min.js';

  //
  // Asynchronous download PDF
  //

function showpdf(url){
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(_pdf) {
    //
    // Fetch the first page


    //
	
	pdf=_pdf;
	console.log(pdf)
	document.getElementById('page_count').textContent=pdf.numPages;
	GenPdf(npage);
    // _pdf.getPage(npage).then(function(page) {
    //   var scale = 1.0;
    //   var viewport = page.getViewport(scale);
    //   //
    //   // Prepare canvas using PDF page dimensions
    //   //
    //   var canvas = document.getElementById('the-canvas');
    //   var context = canvas.getContext('2d');
    //   canvas.height = viewport.height;
    //   canvas.width = viewport.width;
    //   //
    //   // Render PDF page into canvas context
    //   //
    //   var renderContext = {
    //     canvasContext: context,
    //     viewport: viewport
    //   };
    //   //page.render(renderContext);
      
    //   page.render(renderContext).then(function() {
    // 	  $(document).trigger("pagerendered");
    // 	}, function() {
    // 	  console.log("ERROR");
    // 	});
      
    // });
  });
}

  function GenPdf(num){
	pdf.getPage(num).then(function(page) {
		var scale = 1.0;
		var viewport = page.getViewport(scale);
		//
		// Prepare canvas using PDF page dimensions
		//
		var canvas = document.getElementById('the-canvas');
		var context = canvas.getContext('2d');
		console.log(viewport.height);
		console.log(viewport.width);
		canvas.height = viewport.height;
		canvas.width = viewport.width;
		//
		// Render PDF page into canvas context
		//
		var renderContext = {
		  canvasContext: context,
		  viewport: viewport
		};
		//page.render(renderContext);
		
		page.render(renderContext).then(function() {
			$(document).trigger("pagerendered");
		  }, function() {
			console.log("ERROR");
		  });
		});

		document.getElementById('page_num').textContent=npage;
  }



const PrevPage = () => {
	console.log("entered prev page");
	if(npage === 1){
	return
	}
	npage--;
	GenPdf(npage);
	}

const NextPage = () => {
	console.log("next page");
	if(npage >= pdf.numPages){
	return
	}
	npage++;
	GenPdf(npage);
	}
  

	document.querySelector('#prev').addEventListener('click', PrevPage)
	document.querySelector('#next').addEventListener('click', NextPage)
	
  /* The dragging code for '.draggable' from the demo above
   * applies to this demo as well so it doesn't have to be repeated. */

  // enable draggables to be dropped into this
  interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.drag-drop',
    // Require a 100% element overlap for a drop to be possible
    overlap: 1,

    // listen for drop related events:

    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;

      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');
      draggableElement.classList.remove('dropped-out');
      //draggableElement.textContent = 'Dragged in';
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target');
      event.relatedTarget.classList.remove('can-drop');
      event.relatedTarget.classList.add('dropped-out');
      //event.relatedTarget.textContent = 'Dragged out';
    },
    ondrop: function (event) {
      //event.relatedTarget.textContent = 'Dropped';
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });

  interact('.drag-drop')
    .draggable({
      inertia: true,
      restrict: {
        restriction: "#selectorContainer",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      autoScroll: true,
      // dragMoveListener from the dragging demo above
      onmove: dragMoveListener,
    });
  
  
  function dragMoveListener (event) {
	    var target = event.target,
	        // keep the dragged position in the data-x/data-y attributes
	        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform ='translate(' + x + 'px, ' + y + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
	  }

	  // this is used later in the resizing demo
	  window.dragMoveListener = dragMoveListener;

  $(document).bind('pagerendered', function (e) {
	   $('#pdfManager').show();
	   var parametri = JSON.parse($('#parameters').val());
		 $('#parametriContainer').empty();
	   renderizzaPlaceholder(0, parametri);	
	});
  
  function renderizzaPlaceholder(currentPage, parametri){
		  var maxHTMLx = $('#the-canvas').width();
			var maxHTMLy = $('#the-canvas').height();
		
			var paramContainerWidth = $('#parametriContainer').width();
			var yCounterOfGenerated = 0;
			var numOfMaxItem = 25;
			var notValidHeight = 30;
			var y = 0;
			var x = 6;
			var page=0;
			

			var totalPages=Math.ceil(parametri.length/numOfMaxItem);
			
			for (i = 0; i < parametri.length; i++) {
				var param = parametri[i];
				var page = Math.floor(i/numOfMaxItem);
				var display= currentPage == page ? "block" : "none";
				
				if(i > 0 && i%numOfMaxItem == 0){
					yCounterOfGenerated = 0;
				}

				var classStyle = "";
				var valore = param.valore;
				// The placeholder is not valid: it aligns it to the left
		
				if(i > 0 && i%numOfMaxItem == 0){
					yCounterOfGenerated = 0;
				}

				var classStyle = "";
				var valore = param.valore;
				// The placeholder is not valid: it aligns it to the left
		
				y = yCounterOfGenerated;
				yCounterOfGenerated += notValidHeight;
				classStyle = "drag-drop dropped-out";


				
				$("#parametriContainer").append('<div class="'+classStyle+'" data-id="-1" data-page="'+page+'" data-toggle="'+valore+'" data-valore="'+valore+'" data-x="'+x+'" data-y="'+y+'" style="transform: translate('+x+'px, '+y+'px); display:'+display+'">  <span class="circle"></span><span class="descrizione">'+param.descrizione+' </span></div>');
			}
			
			y = notValidHeight * (numOfMaxItem+1);
			var prevStyle = "";
			var nextStyle = "";
			var prevDisabled = false;
			var nextDisabled = false;
			if(currentPage == 0){
				prevStyle = "disabled";
				prevDisabled = true;
			}
			
			if(currentPage >= totalPages-1 || totalPages == 1){
				nextDisabled=true;
				nextStyle="disabled";
			} 
			
			//Adds pagination.
			$("#parametriContainer").append('<ul id="pager" class="pager" style="transform: translate('+x+'px, '+y+'px); width:200px;"><li onclick="changePage('+prevDisabled+','+currentPage+',-1)" class="page-item '+prevStyle+'"><span>«</span></li><li onclick="changePage('+nextDisabled+','+currentPage+',1)" class="page-item '+nextStyle+'" style="margin-left:10px;"><span>&raquo;</span></li></ul>');
			
	 }
  
  	function renderizzaInPagina(parametri){
		var maxHTMLx = $('#the-canvas').width();
		var maxHTMLy = $('#the-canvas').height();
	
		var paramContainerWidth = $('#parametriContainer').width();
		var yCounterOfGenerated = 0;
		var numOfMaxItem = 26;
		var notValidHeight = 30;
		var y = 0;
		var x = 6;
  		for (i = 0; i < parametri.length; i++) {
			var param = parametri[i];
			
			var classStyle = "drag-drop can-drop";
			var valore = param.valore;
			// the placeholder is not valid: it aligns to the left
			
			var pdfY = maxPDFy - param.posizioneY - offsetY;
			y = (pdfY * maxHTMLy) / maxPDFy;
			x = ((param.posizioneX * maxHTMLx) / maxPDFx) + paramContainerWidth;
	
			$("#parametriContainer").append('<div class="'+classStyle+'" data-id="'+param.idParametroModulo+'" data-toggle="'+valore+'" data-valore="'+valore+'" data-x="'+x+'" data-y="'+y+'" style="transform: translate('+x+'px, '+y+'px);">  <span class="circle"></span><span class="descrizione">'+param.descrizione+' </span></div>');
		}
  	}
	 
	 
	 function changePage(disabled, currentPage, delta){
		 if(disabled){
			return;	 
		 }

		//  retrieve only the parameters not positioned on the page
		 var parametri = [];
		 $(".drag-drop.dropped-out").each(function() {
			var valore = $(this).data("valore");
			var descrizione = $(this).find(".descrizione").text();
			parametri.push({valore:valore, descrizione:descrizione, posizioneX:-1000, posizioneY:-1000});
			$(this).remove();
		 });
		 
		//empty the container
		 $('#pager').remove();
		 currentPage += delta;
		 renderizzaPlaceholder(currentPage, parametri);
		//update the buttons
		//update the displayed elements
	 }

  
  function showCoordinates(){
    var validi = [];
  	  var nonValidi = [];
  	  
  	  var maxHTMLx = $('#the-canvas').width();
  	  var maxHTMLy = $('#the-canvas').height();
      var paramContainerWidth = $('#parametriContainer').width();
  	  
	  //retrieve all valid placeholders
  	  $('.drag-drop.can-drop').each(function( index ) {
  		  var x = parseFloat($(this).data("x"));
  		  var y = parseFloat($(this).data("y"));
  		  var valore = $(this).data("valore");
  		  var descrizione = $(this).find(".descrizione").text();
  		    
  		  var pdfY = y * maxPDFy / maxHTMLy;
  		  var posizioneY = maxPDFy - offsetY - pdfY;	  
  		  var posizioneX =  (x * maxPDFx / maxHTMLx)  - paramContainerWidth;
  		  
  		  var val = {"description": descrizione, "positionX in cm":(posizioneX/72)*2.54,   "positionY in cm":((maxHTMLy-posizioneY)/72)*2.54, "valore":valore};
  		  validi.push(val);
      
  	  });
    
      if(validi.length == 0){
         alert('No placeholder dragged into document');
      }
     else{
      alert(JSON.stringify(validi));
     }
  }


/* showing upload file dialog */
document.querySelector("#upload-dialog").addEventListener('click', function() {
    document.querySelector("#pdf-file").click();
});

/* when users selects a file */
document.querySelector("#pdf-file").addEventListener('change', function() {
    // user selected PDF
    var file = this.files[0];

    // allowed MIME types
    var mime_types = [ 'application/pdf' ];
    
    // validate whether PDF
    if(mime_types.indexOf(file.type) == -1) {
        alert('Error : Incorrect file type');
        return;
    }

    // validate file size
    if(file.size > 10*1024*1024) {
        alert('Error : Exceeded size 10MB');
        return;
    }

    // validation is successful

    // hide upload dialog
    // document.querySelector("#upload-dialog").style.display = 'none';
    
    // show the PDF preview loader
    // document.querySelector("#pdf-loader").style.display = 'inline-block';

    // object url of PDF 
    _OBJECT_URL = URL.createObjectURL(file)

    // send the object url of the pdf to the PDF preview function
    showpdf(_OBJECT_URL);
});

