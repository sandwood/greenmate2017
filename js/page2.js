function sorting_page2(){
	var $divs = $("tr.guide_");
	console.log('sorted');
	var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
		 return $(b).find("#guide_ .date_").text() > $(a).find("#guide_ .date_").text();
	});
	$("#guide_").html(alphabeticallyOrderedDivs);
}

function get_numberof_guides(){
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/manager/getGuideList',
		data:{
			category: 'all'
		}
		}).success(function( data, textStatus, jqXHR ){
			$('#num_guides').html(data.guideList.length);
		});
}
function start_guide_pages(){
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/manager/getGuideList',
		data:{
			category: 'all',
			page: 1,
			pageNumber: 5
		},
		success: function( data, textStatus, jqXHR ){
			console.log(data);

			$('#guide_').empty();
			for(var i=0; i<data.guideList.length; i++){
				var qid = data.guideList[i].guideId;
				var new_date = data.guideList[i].published_date;
				var block = data.guideList[i].block;
				var block_string = '';
				if(block == 1){
					block_string = '<input type="checkbox" disabled="disabled" id="guide5"><label for="guide5"></label>';
				}
				else if(block == 0){
					block_string = '<input type="checkbox" checked="checked" disabled="disabled" id="guide5"><label for="guide5"></label>';
				}

				new_date = new_date.replace('T',' / ');
				new_date = new_date.slice(0,18);
				$('#guide_').append(`
					<tr class="guide_" id="`+qid+`">
						<td>`+data.guideList[i].writer+`</td>
						<td width="320px" class="truncate">`+data.guideList[i].title+`</td>
						<td class="date_">`+new_date+`</td>
						<td>`+block_string+`</td>
					</tr>`);
			}
		},
		complete: function(){
			$.ajax({
				type: "POST",  
				url: 'https://greenmate-163904.appspot.com/manager/getGuideList',
				data:{
					category: 'all'
				},
				success: function( data, textStatus, jqXHR ){
					if(data.guideList.length>5){
						var guide_pages = data.guideList.length/5;
						guide_pages = Math.ceil(guide_pages);
					}
					else{
						var guide_pages = 1;
					}
					$('.guide_pagination').empty();
					$('.guide_pagination').append('<li class="active"><a href="#!">1</a></li>');
					for(var i=2; i<guide_pages+1; i++){
						$('.guide_pagination').append('<li class="waves-effect"><a href="#!">'+i+'</a></li>');
					}
				},
				complete: function(){
					sorting_page2();
					goto_guide_pages();
					get_numberof_guides();
					loading_active();
				}
			});;
		}
	});
}
function goto_guide_pages(){
	$('.guide_pagination li').click(function(){
		loading_active();
		var guide_page = $(this).children().html();
		$(".guide_pagination li").removeClass('active');
		$(this).addClass('active');
		get_guide_pages(guide_page);
	})
}
function get_guide_pages(guide_page){
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/manager/getGuideList',
		data:{
			category: 'all',
			page: guide_page,
			pageNumber: 5
		}
	}).success(function( data, textStatus, jqXHR ){
		$('#guide_').empty();
		for(var i=0; i<data.guideList.length; i++){
			var qid = data.guideList[i].guideId;
			var new_date = data.guideList[i].published_date;
			var block = data.guideList[i].block;
			var block_string = '';
			if(block == 1){
				block_string = '<input type="checkbox" disabled="disabled" id="guide5"><label for="guide5"></label>';
			}
			else if(block == 0){
				block_string = '<input type="checkbox" checked="checked" disabled="disabled" id="guide5"><label for="guide5"></label>';
			}
			new_date = new_date.replace('T',' / ');
			new_date = new_date.slice(0,18);
			$('#guide_').append(`
				<tr class="guide_" id="`+qid+`">
					<td>`+data.guideList[i].writer+`</td>
					<td width="320px" class="truncate">`+data.guideList[i].title+`</td>
					<td class="date_">`+new_date+`</td>
					<td>`+block_string+`</td>
				</tr>`);
		}
		sorting_page2();
		loading_active();
	});
}

function start_guide_search(){
	var keyword_ = $('#guide_search').val();
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/search/searchGuide',
		data:{
			keyword: keyword_,
			page: 1,
			pageNumber: 5
		}
		}).success(function( data, textStatus, jqXHR ){
			console.log(data);
			$('#guide_').empty();
			for(var i=0; i<data.guideList.length; i++){
				var qid = data.guideList[i].guideId;
				var new_date = data.guideList[i].published_date;
				var block = data.guideList[i].block;
				var block_string = '';
				if(block == 1){
					block_string = '<input type="checkbox" disabled="disabled" id="guide5"><label for="guide5"></label>';
				}
				else if(block == 0){
					block_string = '<input type="checkbox" checked="checked" disabled="disabled" id="guide5"><label for="guide5"></label>';
				}

				new_date = new_date.replace('T',' / ');
				new_date = new_date.slice(0,18);
				$('#guide_').append(`
					<tr class="guide_" id="`+qid+`">
						<td>`+data.guideList[i].writer+`</td>
						<td width="320px" class="truncate">`+data.guideList[i].title+`</td>
						<td class="date_">`+new_date+`</td>
						<td>`+block_string+`</td>
					</tr>`);
			}
			sorting_page2();

		});

	$.ajax({
		type: "POST",
		url: 'https://greenmate-163904.appspot.com/search/searchGuide',
		data:{
			keyword: keyword_
		}
	}).success(function( data, textStatus, jqXHR ){
		if(data.guideList.length>5){
			var guide_pages = data.guideList.length/5;
			guide_pages = Math.ceil(guide_pages);
		}
		else{
			var guide_pages = 1;
		}
		$('.guide_pagination').empty();
		$('.guide_pagination').append('<li class="active"><a href="#!">1</a></li>');
		for(var i=2; i<guide_pages+1; i++){
			$('.guide_pagination').append('<li class="waves-effect"><a href="#!">'+i+'</a></li>');
		}
		sorting_page2();
		goto_guide_pages();
		get_numberof_guides();
		loading_active();
	});
}
function goto_guide_search_pages(){
	$('.guide_pagination li').click(function(){
		loading_active();
		var guide_page = $(this).children().html();
		$(".guide_pagination li").removeClass('active');
		$(this).addClass('active');
		get_guide_search_pages(guide_page);
	})
}
function get_guide_search_pages(guide_page){
	$('#guide_').empty();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/search/searchGuide',
		data:{
			page: guide_page,
			pageNumber: 5
		}
	}).success(function( data, textStatus, jqXHR ){
		$('#guide_').empty();
		for(var i=0; i<data.guideList.length; i++){
			var qid = data.guideList[i].guideId;
			var new_date = data.guideList[i].published_date;
			var block = data.guideList[i].block;
			var block_string = '';
			if(block == 1){
				block_string = '<input type="checkbox" disabled="disabled" id="guide5"><label for="guide5"></label>';
			}
			else if(block == 0){
				block_string = '<input type="checkbox" checked="checked" disabled="disabled" id="guide5"><label for="guide5"></label>';
			}
			new_date = new_date.replace('T',' / ');
			new_date = new_date.slice(0,18);
			$('#guide_').append(`
				<tr class="guide_" id="`+qid+`">
					<td>`+data.guideList[i].writer+`</td>
					<td width="320px" class="truncate">`+data.guideList[i].title+`</td>
					<td class="date_">`+new_date+`</td>
					<td>`+block_string+`</td>
				</tr>`);
		}
		sorting_page2();
		loading_active();
	});
}

function guide_block(){
	var qid = $('#hidden_guide_id').html();
	$.ajax({
		url: 'https://greenmate-163904.appspot.com/manager/guideOnOff/',
		headers: {
			guideID: qid
		},
		type: "GET"
		}).success(function( data, textStatus, jqXHR ){
			console.log(data);
		});
}
function goto_inner_guide(id_){
	var contents = [];
	var categories = [];
	loading_active();
	$.ajax({
		type: "POST",
		url: 'https://greenmate-163904.appspot.com/manager/getGuideList',
		data:{
			category: 'all'
		},
		success:function( data, textStatus, jqXHR ){
			for(var i=0; i<data.categories.length; i++){
				categories[i] = data.categories[i].category;
			}
		},
		complete: function(){
			$('select').material_select('destroy');
			$.ajax({
				type: "POST",  
				url: 'https://greenmate-163904.appspot.com/guide/getGuideDetail',
				data:{
					guideId: id_
				},
				success: function( data, textStatus, jqXHR ){
					console.log(data);
					var _id = data._id;
					var block = data.block;
					var species = data.category;		
					var guideId = data.guideId;
					var date = data.published_date;
					var category = data.species;
					var title = data.title;
					var writer = data.writer;


					for(var i=0; i<data.contents.length; i++){
						contents[i] = data.contents[i];
					}


		//			if(data.picUrl == '(null)'){
		//				picUrl = 'img/plant_.png';
		//			}

					if(block == 1){
						$("input:checkbox[id='seeguide']").prop("checked", false);
						temp_block = 1;
					}
					else if(block == 0){
						$("input:checkbox[id='seeguide']").prop("checked", true);
						temp_block = 0;
					}

					$('#guide_title').val(title);
					$('#guide_date').val(date);
					$('#guide_species').val(species);
					$('#guide_category').empty();
					$('#guide_category').val(category);
					//가이드 카테고리 수정할때 사용
					$('#guide_species_').empty();
					for(var i=0; i<categories.length; i++){
						$('#guide_species_').append(`<option value="`+categories[i]+`">`+categories[i]+`</option>`);
					}
					$('#guide_writer').val(writer);
					$('#hidden_guide_id').html(guideId);
					$('#add_guide').empty();
					for(var i=0; i<contents.length; i++){
						if(i==0){
							$('#add_guide').append(`
							<div id="guide_contents_`+i+`" class="row guide_contents_wrapper">
								<div class="col s12">
									<div class="additional_guide_pics" id="additional_guide_pics_`+i+`">
										<img class="guide_contents_pics_" src="`+contents[i].picUrl+`" id="guide_pics_`+i+`" alt="">
									</div>
								</div>

								<div class="col s12">
									<form id="modify_form_`+i+`" method="POST" enctype="multipart/form-data">
										<div class="file-field input-field">
											<div class="btn">
												<span>파일</span>
												<input class="guide_add_file" id="guide_file_`+i+`" type="file" name="file`+i+`[]" accept="image/*" >
											</div>
											<div class="file-path-wrapper">
												<input id="guide_file_url_`+i+`" class="file-path" type="text" placeholder="파일을 선택해주세요">
											</div>
										</div>
									</form>
								</div>

								<div class="input-field col s12">
									<textarea id="guide_content_`+i+`" class="materialize-textarea">`+contents[i].text+`</textarea>
									<label for="guide_content_`+i+`">가이드 내용</label>
								</div>
							</div>
						`);
						}
						else{
							$('#add_guide').append(`
								<div id="guide_contents_`+i+`" class="row guide_contents_wrapper">
									<a href="#!" onclick="delete_guide_wrapper(this)" class="delete_guide_wrapper btn red">삭제</a>
									<div class="col s12">
										<div class="additional_guide_pics" id="additional_guide_pics_`+i+`">
											<img class="guide_contents_pics_" src="`+contents[i].picUrl+`" id="guide_pics_`+i+`" alt="">
										</div>
									</div>

									<div class="col s12">
										<form id="modify_form_`+i+`" method="POST" enctype="multipart/form-data">
											<div class="file-field input-field">
												<div class="btn">
													<span>파일</span>
													<input class="guide_add_file" id="guide_file_`+i+`" type="file" name="file`+i+`[]" accept="image/*" >
												</div>
												<div class="file-path-wrapper">
													<input id="guide_file_url_`+i+`" class="file-path" type="text" placeholder="파일을 선택해주세요">
												</div>
											</div>
										</form>
									</div>

									<div class="input-field col s12">
										<textarea id="guide_content_`+i+`" class="materialize-textarea">`+contents[i].text+`</textarea>
										<label for="guide_content_`+i+`">가이드 내용</label>
									</div>
								</div>
							`);
						}
					}

				},
				complete: function(){
					Materialize.updateTextFields();
					$('.guide_add_file:file').change(function(){
						upload_img(this);
					});
					$('.materialize-textarea').trigger('autoresize');
					$('select').material_select();
					loading_active();
				}
			}) //second ajax end
		}//first ajax complete()
	}) //first ajax end

}
function delete_guide_wrapper(target){
	$(target).parent().remove();
}
function modify_guide(){
	loading_active();

	var block_checker;
	if($("#seeguide").prop("checked") == true){
		block_checker = 1;
	}
	else if($("#seeguide").prop("checked") == false){
		block_checker = 0;
	}

	if(temp_block == block_checker){
		guide_block();
	}
	else{
	}

	var id_ = $('#hidden_guide_id').html();
	var title_ = $('#guide_title').val();
	var category = $('#guide_category').val();
	var species = $('#guide_species_').val();
	var managerName = $('#guide_writer').val();
	var contents = new Array();

	var l = $('.guide_contents_wrapper').length;

	for(var i=0; i<l; i++){
		var content_object = new Object();
		content_object.picUrl = $('#additional_guide_pics_'+i+' .guide_contents_pics_').attr('src');
		content_object.text = $('#guide_content_'+i).val();

		contents.push(content_object);
	}
	contents = JSON.stringify(contents);
	console.log(id_);
	console.log(title_);
	console.log(category);
	console.log(species);
	console.log(managerName);
	console.log(contents);
	$.ajax({
		type: "PUT",  
		url: 'https://greenmate-163904.appspot.com/manager/modifyGuide',
		headers:{
			guideId: id_
		},
		data:{
			title: title_,
			category: category,
			species: species,
			managerName: managerName,
			contents: contents
		},
		success: function( data, textStatus, jqXHR ){
			console.log(data);
			setTimeout(function(){
				loading_active();
				start_guide_pages();
			},2000);
		},
		complete: function(){
		}
	});
}
function delete_guide(){
	var del = confirm('지우시겠습니까?');
	if(del == true){
		var id_ = $('#hidden_guide_id').html();
		$.ajax({
			type: "GET",  
			url: 'https://greenmate-163904.appspot.com/manager/deleteGuide',
			headers:{
				guideId: id_
			},
			success: function( data, textStatus, jqXHR ){
				console.log(data);
				loading_active();
				setTimeout(function(){
				},2000);
			},
			complete: function(){
				goto_pages();
				start_guide_pages();
				loading_active();
			}
		});
	}
	else{}
}
function upload_img(target){
	loading_active();
	var file = target.files[0];
	var target_form = $(target).closest('form')[0].id;
	var target_pic_wrapper = $(target).closest('.guide_contents_wrapper').find('.additional_guide_pics');

	console.log(target_form);
	console.log(target_pic_wrapper);

	if(file == undefined){
		loading_active();
		$(target_pic_wrapper).empty();
	}
	name = file.name;
	size = file.size;
	type = file.type;
	if(file.name.length < 1) {}
	else if(file.size > 500000) {
		alert("파일이 너무 큽니다!");
		loading_active();
	}
	else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
		alert("확장자가 png, jpg 또는 gif 여야 합니다!");
	}
	else {
		var pic_url = [];
		$(target_pic_wrapper).empty();
		$.ajax({
			type: "POST",  
			url: 'https://greenmate-163904.appspot.com/uploadImage',
			data: new FormData($('#'+target_form)[0]),
			cache: false,
			contentType: false,
			processData: false,
			xhr: function() {
				var myXhr = $.ajaxSettings.xhr();
					if (myXhr.upload) {
							// For handling the progress of the upload
							myXhr.upload.addEventListener('progress', function(e) {
									if (e.lengthComputable) {
											$('progress').attr({
													value: e.loaded,
													max: e.total,
											});
									}
							} , false);
					}
					return myXhr;
			},
			success: function( data, textStatus, jqXHR ){
				for(var i=0; i<data.picUrl.length; i++){
					pic_url[i] = data.picUrl[i];
				}
			},
			complete: function(){
				for(var i=0; i<pic_url.length; i++){
					$(target_pic_wrapper).append(`<img class="guide_contents_pics_" src="`+pic_url[i]+`" alt="">`);
				}
				loading_active();
			}
		});

	}

}
function add_guide(){
	loading_active();
	goto_innerpage();

	$('select').material_select('destroy');
	$('.page_guide_add').css('display','inherit');
	$('#guide_ad_file_url_').val('');
	$('#guide_add_title').val('');
	$('#guide_add_category').val('');
	$('#guide_add_content_').val('');
	$.ajax({
	type: "POST",  
	url: 'https://greenmate-163904.appspot.com/manager/getGuideList',
	data:{
		category: 'all'
	},
	success: function( data, textStatus, jqXHR ){
		console.log(data);
		$('#guide_add_species').empty();
		$('#guide_add_species').append(`<option value="" disabled selected>종 선택</option>`);
		for(var i=0; i<data.categories.length;i++){
			$('#guide_add_species').append(`<option value="`+data.categories[i].category+`">`+data.categories[i].category+`</option>`);
		}
		$('#add_guide2').append(`
			<div id="guide_contents_add_0" class="row guide_contents_wrapper">
				<div class="col s12">
					<div class="additional_guide_pics" id="additional_guide_pics2_0"></div>
				</div>
				<div class="col s12">
					<form id="add_form_0" method="POST" enctype="multipart/form-data">
						<div class="file-field input-field">
							<div class="btn">
								<span>파일</span>
								<input class="guide_add_file" id="guide_add_file_0" type="file" name="file0[]" accept="image/*">
							</div>
							<div class="file-path-wrapper">
								<input id="guide_add_file_url_0" class="file-path" type="text" placeholder="파일을 선택해주세요">
							</div>
						</div>
					</form>
				</div>

				<div class="input-field col s12">
					<textarea id="guide_content_0" class="materialize-textarea"></textarea>
					<label for="guide_content_0">가이드 내용</label>
				</div>
			</div>
		`);
	},
	complete: function(){
		$('select').material_select();
		loading_active();
		$('.guide_add_file:file').change(function(){
			upload_img(this);
		});
	}
	});
}
function upload_guide(){
	var title = $('#guide_add_title').val();
	var category = $('#guide_add_category').val();
	var species = $('#guide_add_species').val();
	var managerName = $('#id').val();
	var contents = new Array();

	var l = $('.guide_contents_wrapper').length;

	for(var i=0; i<l; i++){
		var content_object = new Object();
		content_object.picUrl = $('#additional_guide_pics2_'+i+' .guide_contents_pics_').attr('src');
		content_object.text = $('#guide_content_'+i).val();

		contents.push(content_object);
	}
	contents = JSON.stringify(contents);

	console.log('title:',title);
	console.log('category:',category);
	console.log('species:',species);
	console.log('managerName:',managerName);
	console.log('contents:',contents);


	if(title.length == '' || category.length == '' || species == null){
		alert('내용을 확인해주세요');
	}
	else{
		$.ajax({
			type: "POST",  
			url: 'https://greenmate-163904.appspot.com/manager/addGuide',
			data:{
				title: title,
				species: category,
				category: species,
				managerName: managerName,
				contents: contents
			},
			success: function( data, textStatus, jqXHR ){
				console.log(data);
			},
			complete: function(){
				goto_pages();
				start_guide_pages();
			}
		});
	} //else end

}
