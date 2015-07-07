(function(){
	var deps = [
		'ngMaterial',
		'ui.router',
		'fsngutils',
		'quantofalta',
		'qfapi',
	];
	if(FS.USE_TEAMPLE_CACHE){
		deps.push('fstemplates');
	}
	angular.module('fs_main', deps);

})();
