function sorting_page3(){
	var $table = $("#plant_sorting").stupidtable();
	var $th_to_sort = $table.find("thead th").eq(7);
	// You can also force a direction.
	$th_to_sort.stupidsort('desc');
//					$th_to_sort.stupidsort('asc');
}
function get_numberof_plants(){
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/plant/getAllPlants',
		data:{
			category: 'all'
		}
		}).success(function( data, textStatus, jqXHR ){
			$('#num_plants').html(data.plants.length);
		});
}

function start_plant(){
	$('#plant_search').val('');
	$('#seeplant').attr('checked', false);
	
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/plant/getAllPlants',
		data:{
			page: 1,
			pageNumber: 5
		},
		success: function( data, textStatus, jqXHR ){
			console.log(data);

			$('#plant_').empty();
			for(var i=0; i<data.plants.length; i++){
				var position = data.plants[i].position;
				var plantId = data.plants[i].plantId;
				var factory = data.plants[i].factory;
				var manager = data.plants[i].manager;
				var username = data.plants[i].username;
				var plantname = data.plants[i].plantName;
				var published_date = data.plants[i].published_date;
				var updated_at = data.plants[i].updated_at;

				$('#plant_').append(`
					<tr class="plant_">
						<td><div class="chip transparent plant_checkbox" id="`+position+`"><i class="material-icons">library_add</i></div></td>
						<td class="plant_id">`+position+`</td>
						<td id="place_`+position+`">`+factory+`</td>
						<td>`+manager+`</td>
						<td>`+username+`</td>
						<td id="plantname_`+position+`">`+plantname+`</td>
						<td>`+published_date+`</td>
						<td id="date_`+position+`" class="date_">`+updated_at+`</td>
						<td class="hidden_plant_id" style="display:none">`+plantId+`</td>
					</tr>`);
			}
		},
		complete: function(){
			$.ajax({
				type: "POST",  
				url: 'https://greenmate-163904.appspot.com/plant/getAllPlants',
				data:{
				},
				success: function( data, textStatus, jqXHR ){
					if(data.plants.length>5){
						var plant_pages = data.plants.length/5;
						plant_pages = Math.ceil(plant_pages);
					}
					else{
						var plant_pages = 1;
					}
					$('.plant_pagination').empty();
					$('.plant_pagination').append('<li class="active"><a href="#!">1</a></li>');
					for(var i=2; i<plant_pages+1; i++){
						$('.plant_pagination').append('<li class="waves-effect"><a href="#!">'+i+'</a></li>');
					}
					
					goto_plants_pages();
					get_numberof_plants();
					
					plant_checkbox();
					
					
					var qr_temp;
					$('#qr_checker').click(function(){
						qr_temp = $(this).children('.chip')[0].id;
						qr_temp = qr_temp.replace('qr_check_','');
						console.log(qr_temp);
					})
					
					
				},
				complete: function(){
					sorting_page3();
					loading_active();
				}
			});
			
					
		}
	});
}
function goto_plants_pages(){
	$('.plant_pagination li').click(function(){
		loading_active();
		var plant_page = $(this).children().html();
		$(".plant_pagination li").removeClass('active');
		$(this).addClass('active');
		get_plants_pages(plant_page);
	})
}
function get_plants_pages(plant_page){
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/plant/getAllPlants',
		data:{
			page: plant_page,
			pageNumber: 5
		},
		success: function( data, textStatus, jqXHR ){
			console.log(data);

			$('#plant_').empty();
			for(var i=0; i<data.plants.length; i++){
				var position = data.plants[i].position;
				var plantId = data.plants[i].plantId;
				var factory = data.plants[i].factory;
				var manager = data.plants[i].manager;
				var username = data.plants[i].username;
				var plantname = data.plants[i].plantName;
				var published_date = data.plants[i].published_date;
				var updated_at = data.plants[i].updated_at;

				$('#plant_').append(`
					<tr class="plant_">
						<td><div class="chip transparent plant_checkbox" id="`+position+`"><i class="material-icons">library_add</i></div></td>
						<td class="plant_id">`+position+`</td>
						<td id="place_`+position+`">`+factory+`</td>
						<td>`+manager+`</td>
						<td>`+username+`</td>
						<td id="plantname_`+position+`">`+plantname+`</td>
						<td>`+published_date+`</td>
						<td id="date_`+position+`" class="date_">`+updated_at+`</td>
						<td class="hidden_plant_id" style="display:none">`+plantId+`</td>
					</tr>`);
			}
		},
		complete: function(){
			
			loading_active();
			plant_checkbox();
		}
	});
	
}


function start_plants_search(){
	var keyword_ = $('#plant_search').val();
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/search/searchPlant',
		data:{
			keyword: keyword_,
			page: 1,
			pageNumber: 5
		},
		success: function( data, textStatus, jqXHR ){
			console.log(data);

			$('#plant_').empty();
			for(var i=0; i<data.plants.length; i++){
				var position = data.plants[i].position;
				var plantId = data.plants[i].plantId;
				var factory = data.plants[i].factory;
				var manager = data.plants[i].manager;
				var username = data.plants[i].username;
				var plantname = data.plants[i].plantName;
				var published_date = data.plants[i].published_date;
				var updated_at = data.plants[i].updated_at;

				$('#plant_').append(`
					<tr class="plant_">
						<td><div class="chip transparent plant_checkbox" id="`+position+`"><i class="material-icons">library_add</i></div></td>
						<td class="plant_id">`+position+`</td>
						<td id="place_`+position+`">`+factory+`</td>
						<td>`+manager+`</td>
						<td>`+username+`</td>
						<td id="plantname_`+position+`">`+plantname+`</td>
						<td>`+published_date+`</td>
						<td id="date_`+position+`" class="date_">`+updated_at+`</td>
						<td class="hidden_plant_id" style="display:none">`+plantId+`</td>
					</tr>`);
			}
		},
		complete: function(){
			$.ajax({
				type: "POST",  
				url: 'https://greenmate-163904.appspot.com/search/searchPlant',
				data:{
					keyword: keyword_
				},
				success: function( data, textStatus, jqXHR ){
					console.log(data);
					if(data.plants.length>5){
						var plant_pages = data.plants.length/5;
						plant_pages = Math.ceil(plant_pages);
					}
					else{
						var plant_pages = 1;
					}
					$('.plant_pagination').empty();
					$('.plant_pagination').append('<li class="active"><a href="#!">1</a></li>');
					for(var i=2; i<plant_pages+1; i++){
						$('.plant_pagination').append('<li class="waves-effect"><a href="#!">'+i+'</a></li>');
					}
				},
				complete: function(){

					sorting_page3();
					goto_plants_search_pages();
					get_numberof_plants();
					loading_active();

					plant_checkbox();

				}
			});
		}
	});
	
}
function goto_plants_search_pages(){
	$('.plant_pagination li').click(function(){
		loading_active();
		var plant_page = $(this).children().html();
		$(".plant_pagination li").removeClass('active');
		$(this).addClass('active');
		get_plants_search_pages(plant_page);
	})
}
function get_plants_search_pages(guide_page){
	var keyword_ = $('#plant_search').val();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/search/searchPlant',
		data:{
			keyword: keyword_,
			page: guide_page,
			pageNumber: 5
		},
		success: function( data, textStatus, jqXHR ){
			console.log(data);

			$('#plant_').empty();
			for(var i=0; i<data.plants.length; i++){
				var position = data.plants[i].position;
				var plantId = data.plants[i].plantId;
				var factory = data.plants[i].factory;
				var manager = data.plants[i].manager;
				var username = data.plants[i].username;
				var plantname = data.plants[i].plantName;
				var published_date = data.plants[i].published_date;
				var updated_at = data.plants[i].updated_at;

				$('#plant_').append(`
					<tr class="plant_">
						<td><div class="chip transparent plant_checkbox" id="`+position+`"><i class="material-icons">library_add</i></div></td>
						<td class="plant_id">`+position+`</td>
						<td id="place_`+position+`">`+factory+`</td>
						<td>`+manager+`</td>
						<td>`+username+`</td>
						<td id="plantname_`+position+`">`+plantname+`</td>
						<td>`+published_date+`</td>
						<td id="date_`+position+`" class="date_">`+updated_at+`</td>
						<td class="hidden_plant_id" style="display:none">`+plantId+`</td>
					</tr>`);
			}
		},
		complete: function(){
			
		loading_active();
		plant_checkbox();
		}
	});
}


function start_plant_mine(){
	var userSeq = $('#userSeq').html();
	$('#plant_search').val('');
	loading_active();

	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/manager/managingPlants',
		headers: {
			'userSeq': userSeq
		},
		data:{
			page: 1,
			pageNumber: 51
		},
		success: function( data, textStatus, jqXHR ){
			console.log(data);

			$('#plant_').empty();
			for(var i=0; i<data.plants.length; i++){
				var position = data.plants[i].position;
				var plantId = data.plants[i].plantId;
				var factory = data.plants[i].factory;
				var manager = data.plants[i].manager;
				var username = data.plants[i].username;
				var plantname = data.plants[i].plantName;
				var published_date = data.plants[i].published_date;
				var updated_at = data.plants[i].updated_at;

				$('#plant_').append(`
					<tr class="plant_">
						<td><div class="chip transparent plant_checkbox" id="`+position+`"><i class="material-icons">library_add</i></div></td>
						<td class="plant_id">`+position+`</td>
						<td id="place_`+position+`">`+factory+`</td>
						<td>`+manager+`</td>
						<td>`+username+`</td>
						<td id="plantname_`+position+`">`+plantname+`</td>
						<td>`+published_date+`</td>
						<td id="date_`+position+`" class="date_">`+updated_at+`</td>
						<td class="hidden_plant_id" style="display:none">`+plantId+`</td>
					</tr>`);
			}
		},
		complete: function(){
			$.ajax({
				type: "POST",  
				url: 'https://greenmate-163904.appspot.com/manager/managingPlants',
				headers: {
					'userSeq': userSeq
				},
				data:{
				},
				success: function( data, textStatus, jqXHR ){
					if(data.plants.length>5){
						var plant_pages = data.plants.length/5;
						plant_pages = Math.ceil(plant_pages);
					}
					else{
						var plant_pages = 1;
					}
					$('.plant_pagination').empty();
					$('.plant_pagination').append('<li class="active"><a href="#!">1</a></li>');
					for(var i=2; i<plant_pages+1; i++){
						$('.plant_pagination').append('<li class="waves-effect"><a href="#!">'+i+'</a></li>');
					}
				},
				complete: function(){
					sorting_page3();
					goto_plants_mine_pages();
					get_numberof_plants();
					loading_active();

					plant_checkbox();
				}
			});
		}
	});
}
function goto_plants_mine_pages(){
	$('.plant_pagination li').click(function(){
		loading_active();
		var plant_page = $(this).children().html();
		$(".plant_pagination li").removeClass('active');
		$(this).addClass('active');
		get_plants_mine_pages(plant_page);
	})
}
function get_plants_mine_pages(plant_page){
	var userSeq = $('#userSeq').html();
	$('#plant_search').val('');
	console.log(plant_page);
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/manager/managingPlants',
		headers: {
			'userSeq': userSeq
		},
		data:{
			page: plant_page,
			pageNumber: 5
		},
		success: function( data, textStatus, jqXHR ){
			console.log(data);

			$('#plant_').empty();
			for(var i=0; i<data.plants.length; i++){
				var position = data.plants[i].position;
				var plantId = data.plants[i].plantId;
				var factory = data.plants[i].factory;
				var manager = data.plants[i].manager;
				var username = data.plants[i].username;
				var plantname = data.plants[i].plantName;
				var published_date = data.plants[i].published_date;
				var updated_at = data.plants[i].updated_at;

				$('#plant_').append(`
					<tr class="plant_">
						<td><div class="chip transparent plant_checkbox" id="`+position+`"><i class="material-icons">library_add</i></div></td>
						<td class="plant_id">`+position+`</td>
						<td id="place_`+position+`">`+factory+`</td>
						<td>`+manager+`</td>
						<td>`+username+`</td>
						<td id="plantname_`+position+`">`+plantname+`</td>
						<td>`+published_date+`</td>
						<td id="date_`+position+`" class="date_">`+updated_at+`</td>
						<td class="hidden_plant_id" style="display:none">`+plantId+`</td>
					</tr>`);
			}
		},
		complete: function(){
			
			loading_active();
			plant_checkbox();
		}
	});
	
}


function goto_inner_plant(plantId){
	loading_active();
	$.ajax({
		type: "POST",  
		url: 'https://greenmate-163904.appspot.com/manager/plantDetail',
		data:{
			plantId: plantId
		},
		success: function( data, textStatus, jqXHR ){
			var diaries = [];
			$('#plant_diaries').empty();
			for(var i=0; i<data.diaries.length; i++){
				diaries[i] = data.diaries[i];
				$('#plant_diaries').append(`
						<div class="diaries_wrapper col s12">
							<p class="published_date">`+data.diaries[i].published_date+`</p>
							<img class="lazy" data-original="`+data.diaries[i].picUrl+`">
							<p class="col s12">`+data.diaries[i].content+`</p>
						</div>
				`);
			}
			
			var plant_factory = data.factory;
			var plant_harvest_stat = data.harvest;
			var plant_manager = data.manager;
			var plant_id = data.plantId;
			var plant_name = data.plantName;
			var plant_published = data.published_date;
			var sensorData = [];
			for(var i=0; i<data.sensorData.length; i++){
				sensorData[i] = data.sensorData[i];
			}
			var plant_updated_at = data.updated_at;
			var plant_username = data.username;
			
			$('#plant_plant_id').html(plant_id);
			$('#plant_manager').html(plant_manager);
			$('#plant_name').html(plant_name);
			$('#plant_username').html(plant_username);
			$('#plant_place').html(plant_factory);
			$('#plant_harvest_stat').html(plant_harvest_stat);
			$('#plant_date').html(plant_published);
			$('#plant_update').html(plant_updated_at);
			console.log(data);
		},
		complete: function(){
			$("img.lazy").lazyload({
				effect: 'fadeIn',
				effectTime: 2000,
    		threshold : 0
			});
			$('img.lazy').trigger('sporty');
			
			loading_active();
		}
	});
}
function delete_plant(){
	var del = confirm('지우시겠습니까?');
	if(del == true){
		loading_active();
		var userSeq = $('#userSeq').html();
		var plantId = $('#plant_plant_id').html();
		$.ajax({
			type: "PUT",  
			url: 'https://greenmate-163904.appspot.com/delete/deletePlant',
			headers:{
				userSeq: userSeq
			},
			data:{
				plantId: plantId
			},
			success: function( data, textStatus, jqXHR ){
				console.log(data);
			},
			complete: function(){
				setTimeout(function(){
					loading_active();
					start_plant();
					goto_pages();
				},2000);
			}
		});
	}
	else{}
}

function plant_checkbox(){
	$('.plant_checkbox').click(function(){
		var target = $(this).attr('id');
		var check;
		var place = $('#place_'+target).html();
		var plantname = $('#plantname_'+target).html();
		var date = $('#date_'+target).html();
		
		$('#qr_checker').append(`
			<div class="chip" id="qr_check_`+target+`">
				`+target+`
				<i class="close material-icons">close</i>
				<span class="place_chip" style="display:none">`+place+`</span>
				<span class="plantname_chip" style="display:none">`+plantname+`</span>
				<span class="date_chip" style="display:none">`+date+`</span>
			</div>
		`)
	})
}
function get_userIds(){
	var users = new Object();
	$.ajax({
		type: "POST",  
		url: 'https://ide.c9.io/petercha90/green_mate2/search/searchUser',
		headers: {
			userSeq: userSeq
		},
		data:{
			userId: ''
		},
		success: function( data, textStatus, jqXHR ){
			for(var i=0; i<data.userId.length; i++){
				users[data.userId[i]] = null; 
			}
			console.log(data);
		},
		complete: function(){
			$('input.autocomplete').autocomplete({
				data: users
			});
		}
	});
}
function add_plant(){
	var userSeq = $('#userSeq').html();
	
	var userId_autucomplete = $('#userId_autucomplete').val();
	var plantName = $('#plantName').val();
	var harvestDue = $('#harvestDue').val();
	var plantPosition = $('#plantPosition').val();
	var plantGateway = $('#plantGateway').val();
	var plantSpecies = $('#plantSpecies').val();
	if($('#userId_autucomplete').val().length == 0 || $('#plantName').val().length == 0 || $('#harvestDue').val().length == 0 || $('#plantPosition').val().length == 0 || $('#plantGateway').val().length == 0 || $('#plantSpecies').val().length == 0){
		alert('정확히 입력하세요');
	}
	else{
		loading_active();
		$.ajax({
			type: "POST",  
			url: 'https://greenmate-163904.appspot.com/plant/addPlant',
			headers: {
				userSeq: userSeq
			},
			data:{
				userId: userId_autucomplete,
				plantName: plantName,
				harvestDue: harvestDue,
				position: plantPosition,
				gateway: plantGateway,
				species: plantSpecies
			},
			success: function( data, textStatus, jqXHR ){
				console.log(data);
				setTimeout(function(){
					start_plant();
					loading_active();
					goto_pages();
				},2000);
			},
			complete: function(){
			}
		});
		
	}
}
