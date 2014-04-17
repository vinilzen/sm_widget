$(function() {

	var getRegionsUrl = 'js/regions.json';

	// $.get('js/region193.json', function(data){
	// 	console.log(data);
	// });

	// $.get('js/region213.json', function(data){
	// 	console.log(data);
	// });

	var text_input = $('.search input[type=text]'),
		ul = $('.where-to-buy__towns');

	text_input.on('keyup', function(){
		var val = text_input.val();
		if ( val.length > 1 ) {
			$('li', ul).each(function(index, element){
				var data_value = $(element).attr('data-value').toLowerCase();

				// 0 если проверяем вхождение с первой буквы, или >-1 если в любом месте строки
				if (data_value.indexOf(val.toLowerCase()) === 0) {
					$(element).show();
				} else {
					$(element).hide();
				}

			});
			ul.fadeIn();
		} else if (val.length == 0) {
			ul.fadeOut(400, function(){
				$('li', ul).hide();
			});
		}
	});


	$('.where-to-buy__trigger').click(function(){
		if ($('.search').hasClass('show')) {
			$('.search').fadeOut('fast').removeClass('show');
		} else {
			$('.search').fadeIn('fast').addClass('show');

			text_input.focus();

			$.get(getRegionsUrl, function(data){
				ul.empty();
				if (data) {
					data.forEach(function(v,k){
						ul.append('<li data-town-id="'+v.region_id+'" data-value="'+ v.region +'"><a href="#">'+ v.region +'</a></li>');
					});
				}
			});
		}
	});
});