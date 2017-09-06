function start_qa_pages(){
	$('#seeqa').attr('checked', false);
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/question/getQuestions',
		data:{
			page: 1,
			pageNumber: 5
		}
		}).success(function( data, textStatus, jqXHR ){
		console.log(data);
			$('#qa_').empty();
			for(var i=0; i<data.questions.length; i++){
				var qid = data.questions[i].questionId;
				var new_date = data.questions[i].published_date;
				new_date = new_date.replace('T',' / ');
				new_date = new_date.slice(0,18);
				$('#qa_').append(`
					<tr class="qa_" id="`+qid+`">
						<td>`+data.questions[i].username+`</td>
						<td width="320px" class="truncate">`+data.questions[i].title+`</td>
						<td class="date_">`+new_date+`</td>
						<td>`+data.questions[i].numOfComment+`</td>
						<td>`+data.questions[i].numOfManagerReply+`</td>
					</tr>`);
			}
			date_sorting();

		});

	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/question/getQuestions'
	}).success(function( data, textStatus, jqXHR ){
		if(data.questions.length>5){
			var qa_pages = data.questions.length/5;
			qa_pages = Math.ceil(qa_pages);
		}
		else{
			var qa_pages = 1;
		}
		$('.qa_pagination').empty();
		$('.qa_pagination').append('<li class="active"><a href="#!">1</a></li>');
		for(var i=2; i<qa_pages+1; i++){
			$('.qa_pagination').append('<li class="waves-effect"><a href="#!">'+i+'</a></li>');
		}
		goto_qa_pages();
		get_numberof_questions();
		loading_active();
	});
}


function start_qa_no_a(){
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/question/getUnsolved',
		data:{
			page: 1,
			pageNumber: 5
		}
		}).success(function( data, textStatus, jqXHR ){
			console.log(data);
			$('#qa_').empty();
			for(var i=0; i<data.questions.length; i++){
				var qid = data.questions[i].questionId;
				var new_date = data.questions[i].published_date;
				new_date = new_date.replace('T',' / ');
				new_date = new_date.slice(0,18);
				$('#qa_').append(`
					<tr class="qa_" id="`+qid+`">
						<td>`+data.questions[i].username+`</td>
						<td width="320px" class="truncate">`+data.questions[i].title+`</td>
						<td class="date_">`+new_date+`</td>
						<td>`+data.questions[i].numOfComment+`</td>
						<td>`+data.questions[i].numOfManagerReply+`</td>
					</tr>`);
			}
			date_sorting();

		});

	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/question/getUnsolved'
	}).success(function( data, textStatus, jqXHR ){
		if(data.questions.length>5){
			var qa_pages = data.questions.length/5;
			qa_pages = Math.ceil(qa_pages);
		}
		else{
			qa_pages = 1;
		}
		$('.qa_pagination').empty();
		$('.qa_pagination').append('<li class="active"><a href="#!">1</a></li>');
		for(var i=2; i<qa_pages+1; i++){
			$('.qa_pagination').append('<li class="waves-effect"><a href="#!">'+i+'</a></li>');
		}
		goto_qa_no_a_pages();
		get_numberof_questions();
		loading_active();
	});
}


function start_qa_search(){
	var keyword_ = $('#qa_search').val();
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/search/searchQuestion',
		data:{
			keyword: keyword_,
			page: 1,
			pageNumber: 5
		}
		}).success(function( data, textStatus, jqXHR ){
			$('#qa_').empty();
			for(var i=0; i<data.questions.length; i++){
				var qid = data.questions[i].questionId;
				var new_date = data.questions[i].published_date;
				new_date = new_date.replace('T',' / ');
				new_date = new_date.slice(0,18);
				$('#qa_').append(`
					<tr class="qa_" id="`+qid+`">
						<td>`+data.questions[i].username+`</td>
						<td width="320px" class="truncate">`+data.questions[i].title+`</td>
						<td class="date_">`+new_date+`</td>
						<td>`+data.questions[i].numOfComment+`</td>
						<td>`+data.questions[i].numOfManagerReply+`</td>
					</tr>`);
			}
			date_sorting();

		});

	$.ajax({
		type: "POST",
		url: 'https://greenmate-163904.appspot.com/search/searchQuestion',
		data:{
			keyword: keyword_
		}
	}).success(function( data, textStatus, jqXHR ){
		if(data.questions.length>5){
			var qa_pages = data.questions.length/5;
			qa_pages = Math.ceil(qa_pages);
		}
		else{
			var qa_pages = 1;
		}
		$('.qa_pagination').empty();
		$('.qa_pagination').append('<li class="active"><a href="#!">1</a></li>');
		for(var i=2; i<qa_pages+1; i++){
			$('.qa_pagination').append('<li class="waves-effect"><a href="#!">'+i+'</a></li>');
		}
		goto_qa_search_pages();
		get_numberof_questions();
		loading_active();
	});
}


function goto_qa_pages(){
	$('.qa_pagination li').click(function(){
		loading_active();
		var qa_page = $(this).children().html();
		$(".qa_pagination li").removeClass('active');
		$(this).addClass('active');
		get_qa_pages(qa_page);
	})
}


function goto_qa_no_a_pages(){
	$('.qa_pagination li').click(function(){
		loading_active();
		var qa_no_a_page = $(this).children().html();
		$(".qa_pagination li").removeClass('active');
		$(this).addClass('active');
		get_qa_no_a_pages(qa_no_a_page);
	})
}


function goto_qa_search_pages(){
	$('.qa_pagination li').click(function(){
		loading_active();
		var qa_page = $(this).children().html();
		$(".qa_pagination li").removeClass('active');
		$(this).addClass('active');
		get_qa_search_pages(qa_page);
	})
}


function get_qa_pages(qa_page){
	$('#qa_').empty();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/question/getQuestions',
		data:{
			page: qa_page,
			pageNumber: 5
		}
	}).success(function( data, textStatus, jqXHR ){
		$('#qa_').empty();
		for(var i=0; i<data.questions.length; i++){
			var qid = data.questions[i].questionId;
			var new_date = data.questions[i].published_date;
			new_date = new_date.replace('T',' / ');
			new_date = new_date.slice(0,18);
			$('#qa_').append(`
					<tr class="qa_" id="`+qid+`">
						<td>`+data.questions[i].username+`</td>
						<td width="320px" class="truncate">`+data.questions[i].title+`</td>
						<td class="date_">`+new_date+`</td>
						<td>`+data.questions[i].numOfComment+`</td>
						<td>`+data.questions[i].numOfManagerReply+`</td>
					</tr>`);
		}
		date_sorting();
		loading_active();
	});
}


function get_qa_no_a_pages(qa_no_a_page){
	$('#qa_').empty();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/question/getUnsolved',
		data:{
			page: qa_no_a_page,
			pageNumber: 5
		}
		}).success(function( data, textStatus, jqXHR ){
			$('#qa_').empty();
			for(var i=0; i<data.questions.length; i++){
				var qid = data.questions[i].questionId;
				var new_date = data.questions[i].published_date;
				new_date = new_date.replace('T',' / ');
				new_date = new_date.slice(0,18);
				$('#qa_').append(`
					<tr class="qa_" id="`+qid+`">
						<td>`+data.questions[i].username+`</td>
						<td width="320px" class="truncate">`+data.questions[i].title+`</td>
						<td class="date_">`+new_date+`</td>
						<td>`+data.questions[i].numOfComment+`</td>
						<td>`+data.questions[i].numOfManagerReply+`</td>
					</tr>`);
			}
		loading_active();

		});
}


function get_qa_search_pages(qa_page){
	$('#qa_').empty();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/search/searchQuestion',
		data:{
			page: qa_page,
			pageNumber: 5
		}
	}).success(function( data, textStatus, jqXHR ){
		$('#qa_').empty();
		for(var i=0; i<data.questions.length; i++){
			var qid = data.questions[i].questionId;
			var new_date = data.questions[i].published_date;
			new_date = new_date.replace('T',' / ');
			new_date = new_date.slice(0,18);
			$('#qa_').append(`
					<tr class="qa_" id="`+qid+`">
						<td>`+data.questions[i].username+`</td>
						<td width="320px" class="truncate">`+data.questions[i].title+`</td>
						<td class="date_">`+new_date+`</td>
						<td>`+data.questions[i].numOfComment+`</td>
						<td>`+data.questions[i].numOfManagerReply+`</td>
					</tr>`);
		}
		loading_active();
	});
}


function goto_inner_qa(id_){
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/question/getQuestionDetail',
		data:{
			questionId: id_
		}
		}).success(function( data, textStatus, jqXHR ){
			console.log(data);
			var title = data.title;
			var picUrl = data.picUrl;
			var date = data.published_date;
			var username = data.username;
			var contents = data.contents;
			var qid = data.questionId;
			if(data.picUrl == '(null)'){
				picUrl = 'img/plant_.png';
			}

			$('#memeber_q_title').val(title);
			$('#memeber_q_date').val(date);
			$('#memeber_q_id').val(username);
			$('#memeber_q_content').val(contents);
			$('#member_q_pic').attr('src', picUrl);
			$('#hidden_id').html(qid);
			$('#memeber_qa_comment_start').empty();
			for(var i=0; i<data.comments.length; i++){
				console.log(data.comments[i].username);
				if(data.comments[i].writer == 0){
					$('#memeber_qa_comment_start').append(`
					<tr class="comments_">
						<td class="comment_name">`+data.comments[i].username+`:</td>
						<td class="comment_content">`+data.comments[i].comment+`<i class="material-icons grey-text lighten-2">not_interested</i></td>
						<td class="comment_date">`+data.comments[i].published_date+`</td>
					</tr>`);
				}
				if(data.comments[i].writer == 1){
					$('#memeber_qa_comment_start').append(`
					<tr class="comments_">
						<td class="comment_name green-text">`+data.comments[i].username+`:</td>
						<td class="comment_content">`+data.comments[i].comment+`<i class="material-icons grey-text lighten-2">not_interested</i></td>
						<td class="comment_date">`+data.comments[i].published_date+`</td>
					</tr>`);
				}
			}
			loading_active();
		
//			댓글 삭제기능
//			$('.comments_').hover(function(){
//				$(this).find('td.comment_content i').stop().animate({opacity: 1},500); 
//			}, function(){
//				$(this).find('td.comment_content i').stop().animate({opacity: 0},500);
//			});
//		
//			$('.comments_ td.comment_content i').click(function(){
//				var del = confirm('지우시겠습니까?');
//				if(del == true){
//					$.ajax({
//						type: "POST",  
//						url: 'https://greenmate-163904.appspot.com/question/deleteComment',
//						data:{
//							questionId: '',
//							commentId: ''
//						}
//					}).success(function( data, textStatus, jqXHR ){
//						
//					});
//				}
//				else{	}
//			})

		});
}


function memeber_qa_add_comment(){
	var qid = $('#hidden_id').html();
	var userSeq = $('#userSeq').html();
	var id = $('#id').val();
	var member_contents =  $('#memeber_a').val();
	console.log('qid: ',qid);
	console.log('userSeq: ',userSeq);
	console.log('id: ', id);
	console.log('member_contents: ', member_contents);


	$.ajax({
		url: 'https://greenmate-163904.appspot.com/question/addComment',
		headers: {
			'userSeq': userSeq
		},
		type: "POST",
		dataType: 'json',
		data:{
			questionId: qid,
			writer: 1,
			userName: id,
			comment: member_contents
		}
		}).success(function( data, textStatus, jqXHR ){
			console.log(data);
			if(data.isSuccess == 1){
				goto_inner_qa(qid);
			}
			else if(data.isSuccess ==0){
				alert('실패..');
			}
		});
}


function date_sorting(){
	var $divs = $("tr.qa_");
	console.log($divs);
	var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
		 return $(b).find(".date_").text() > $(a).find(".date_").text();
	});
	$("#qa_").html(alphabeticallyOrderedDivs);
}


function get_numberof_questions(){
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/question/getQuestions',
		}).success(function( data, textStatus, jqXHR ){
			$('#num_questions').html(data.questions.length);
		});
}


function delete_question(){
	var del = confirm('지우시겠습니까?');
	if(del == true){
		var qid = $('#hidden_id').html();
		$.ajax({
			url: 'https://greenmate-163904.appspot.com/delete/deleteQuestion/',
			headers: {
				'userSeq': userSeq
			},
			type: "PUT",
			dataType: 'json',
			data:{
				questionId: qid,
			}
			}).success(function( data, textStatus, jqXHR ){
				console.log(data);
				if(data.isSuccess == 1){
					alert('삭제되었습니다!');
					goto_pages(); 
					start_qa_pages();
				}
				else if(data.isSuccess ==0){
					alert('실패..');
				}
			});
	}
	else{}
}
