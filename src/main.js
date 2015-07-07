(function(){
	var deps = [
		'ngMaterial',
		'ui.router',
		'quantofalta',
		'qfapi',
	];
	if(FS.USE_TEAMPLE_CACHE){
		deps.push('fstemplates');
	}
	angular.module('main', deps);

})();
